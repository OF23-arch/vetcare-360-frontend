import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProducts, type Product } from "@/hooks/useProducts";
import { useInventoryMovements } from "@/hooks/useInventoryMovements";
import { AddProductDialog } from "@/components/inventory/AddProductDialog";
import { EditProductDialog } from "@/components/inventory/EditProductDialog";
import { AddMovementDialog } from "@/components/inventory/AddMovementDialog";
import { Search, Package, AlertTriangle, Edit, History, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Inventario() {
  const { products, isLoading } = useProducts();
  const { movements } = useInventoryMovements();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockProducts = products.filter((p) => p.stock <= p.reorder_level);
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const recentMovements = movements.slice(0, 10);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      medicamentos: "Medicamentos",
      alimentos: "Alimentos",
      accesorios: "Accesorios",
      higiene: "Higiene",
      juguetes: "Juguetes",
      otros: "Otros",
    };
    return labels[category] || category;
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Inventario</h1>
            <p className="text-muted-foreground">Administra productos, stock y movimientos</p>
          </div>
          <div className="flex gap-2">
            <AddMovementDialog />
            <AddProductDialog />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">productos en catálogo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Bs. {totalValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">valor del inventario</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{lowStockProducts.length}</div>
              <p className="text-xs text-muted-foreground">productos necesitan reorden</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Productos en Inventario</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-[300px]"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Cargando productos...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No se encontraron productos</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead className="text-right">Costo</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                      <TableHead className="text-center">Stock</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            {product.description && (
                              <div className="text-sm text-muted-foreground line-clamp-1">
                                {product.description}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{getCategoryLabel(product.category)}</Badge>
                        </TableCell>
                        <TableCell className="text-right">Bs. {product.cost.toFixed(2)}</TableCell>
                        <TableCell className="text-right">Bs. {product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <span className={product.stock <= product.reorder_level ? "text-warning font-semibold" : ""}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          {product.stock === 0 ? (
                            <Badge variant="destructive">Sin Stock</Badge>
                          ) : product.stock <= product.reorder_level ? (
                            <Badge className="bg-warning text-warning-foreground">Stock Bajo</Badge>
                          ) : (
                            <Badge className="bg-success text-white">Disponible</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Movimientos Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentMovements.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No hay movimientos registrados</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-center">Tipo</TableHead>
                      <TableHead className="text-right">Cantidad</TableHead>
                      <TableHead>Motivo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentMovements.map((movement) => {
                      const product = products.find(p => p.id === movement.product_id);
                      return (
                        <TableRow key={movement.id}>
                          <TableCell className="text-sm">
                            {format(new Date(movement.created_at), "dd/MM/yyyy HH:mm", { locale: es })}
                          </TableCell>
                          <TableCell>{product?.name || "Producto desconocido"}</TableCell>
                          <TableCell className="text-center">
                            {movement.movement_type === "IN" ? (
                              <Badge className="bg-success text-white">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Entrada
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <TrendingDown className="h-3 w-3 mr-1" />
                                Salida
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-medium">{movement.quantity}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {movement.reason || "Sin motivo especificado"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <EditProductDialog
        product={selectedProduct}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </DashboardLayout>
  );
}
