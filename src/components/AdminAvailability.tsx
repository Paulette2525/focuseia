import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Plus, Trash2, Loader2 } from "lucide-react";
import { useAvailability, DAY_NAMES } from "@/hooks/useAvailability";
import { toast } from "sonner";

const AdminAvailability = () => {
  const { slots, loading, updateSlot, addSlot, deleteSlot } = useAvailability();
  const [adding, setAdding] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day_of_week: 1,
    start_time: "09:00",
    end_time: "17:00",
    slot_duration: 30,
  });

  const handleToggle = async (id: string, isActive: boolean) => {
    const { error } = await updateSlot(id, { is_active: isActive });
    if (error) toast.error("Erreur lors de la mise à jour");
  };

  const handleAdd = async () => {
    setAdding(true);
    const { error } = await addSlot({
      ...newSlot,
      start_time: newSlot.start_time,
      end_time: newSlot.end_time,
      is_active: true,
    });
    if (error) {
      toast.error("Erreur lors de l'ajout");
    } else {
      toast.success("Disponibilité ajoutée");
    }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await deleteSlot(id);
    if (error) toast.error("Erreur lors de la suppression");
    else toast.success("Disponibilité supprimée");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Existing slots */}
      <div className="space-y-3">
        {slots.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Aucune disponibilité configurée
            </CardContent>
          </Card>
        ) : (
          slots.map((slot) => (
            <Card key={slot.id} className={!slot.is_active ? "opacity-50" : ""}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <Switch
                    checked={slot.is_active}
                    onCheckedChange={(checked) => handleToggle(slot.id, checked)}
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground min-w-[80px]">
                      {DAY_NAMES[slot.day_of_week]}
                    </span>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">
                      {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      ({slot.slot_duration} min)
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(slot.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add new slot */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Ajouter une disponibilité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div>
              <Label className="text-sm mb-1.5 block">Jour</Label>
              <Select
                value={String(newSlot.day_of_week)}
                onValueChange={(v) => setNewSlot((p) => ({ ...p, day_of_week: Number(v) }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DAY_NAMES.map((name, i) => (
                    <SelectItem key={i} value={String(i)}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Début</Label>
              <Input
                type="time"
                value={newSlot.start_time}
                onChange={(e) => setNewSlot((p) => ({ ...p, start_time: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Fin</Label>
              <Input
                type="time"
                value={newSlot.end_time}
                onChange={(e) => setNewSlot((p) => ({ ...p, end_time: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-sm mb-1.5 block">Durée (min)</Label>
              <Select
                value={String(newSlot.slot_duration)}
                onValueChange={(v) => setNewSlot((p) => ({ ...p, slot_duration: Number(v) }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[15, 30, 45, 60].map((d) => (
                    <SelectItem key={d} value={String(d)}>{d} min</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAdd} disabled={adding} className="gap-2">
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Ajouter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAvailability;
