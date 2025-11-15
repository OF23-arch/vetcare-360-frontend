import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PetFiltersDialogProps {
  onApplyFilters: (filters: { species: string; sex: string }) => void;
}

export const PetFiltersDialog = ({ onApplyFilters }: PetFiltersDialogProps) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    species: "todos",
    sex: "todos",
  });

  const handleApply = () => {
    onApplyFilters(filters);
    setOpen(false);
  };

  const handleReset = () => {
    setFilters({ species: "todos", sex: "todos" });
    onApplyFilters({ species: "todos", sex: "todos" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Filtros</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrar Pacientes</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Especie</Label>
            <Select value={filters.species} onValueChange={(value) => setFilters({ ...filters, species: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="Perro">Perro</SelectItem>
                <SelectItem value="Gato">Gato</SelectItem>
                <SelectItem value="Ave">Ave</SelectItem>
                <SelectItem value="Conejo">Conejo</SelectItem>
                <SelectItem value="Hamster">Hámster</SelectItem>
                <SelectItem value="Otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sexo</Label>
            <Select value={filters.sex} onValueChange={(value) => setFilters({ ...filters, sex: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Macho">Macho</SelectItem>
                <SelectItem value="Hembra">Hembra</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>
              Limpiar
            </Button>
            <Button onClick={handleApply}>Aplicar Filtros</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
