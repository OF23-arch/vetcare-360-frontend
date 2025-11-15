import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useInventoryMovements } from "@/hooks/useInventoryMovements";
import { useProducts } from "@/hooks/useProducts";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

interface AddMovementDialogProps {
  productId?: string;
}

export function AddMovementDialog({ productId }: AddMovementDialogProps) {
  const [open, setOpen] = useState(false);
  const { createMovement } = useInventoryMovements();
  const { products } = useProducts();
  const [formData, setFormData] = useState({
    product_id: productId || "",
    movement_type: "IN" as "IN" | "OUT",
    quantity: "",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createMovement.mutateAsync({
      product_id: formData.product_id,
      movement_type: formData.movement_type,
      quantity: parseInt(formData.quantity),
      reason: formData.reason || undefined,
    });

    setFormData({
      product_id: productId || "",
      movement_type: "IN",
      quantity: "",
      reason: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Registrar Movimiento
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Movimiento de Inventario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!productId && (
            <div className="space-y-2">
              <Label htmlFor="product">Producto *</Label>
              <Select 
                value={formData.product_id} 
                onValueChange={(value) => setFormData({ ...formData, product_id: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar producto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} (Stock: {product.stock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="movement_type">Tipo de Movimiento *</Label>
            <Select 
              value={formData.movement_type} 
              onValueChange={(value: "IN" | "OUT") => setFormData({ ...formData, movement_type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IN">
                  <div className="flex items-center gap-2">
                    <ArrowDownToLine className="h-4 w-4 text-success" />
                    <span>Entrada (Compra/Reposición)</span>
                  </div>
                </SelectItem>
                <SelectItem value="OUT">
                  <div className="flex items-center gap-2">
                    <ArrowUpFromLine className="h-4 w-4 text-destructive" />
                    <span>Salida (Venta/Uso)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Ej: Compra a proveedor, Venta a cliente, etc."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createMovement.isPending}>
              {createMovement.isPending ? "Registrando..." : "Registrar Movimiento"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
