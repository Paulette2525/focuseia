import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Calendar, Clock, Mail, Phone, Building2, Loader2, XCircle, RefreshCw } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
import { toast } from "sonner";
import { format, parseISO, isBefore, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";

const AdminBookings = () => {
  const { bookings, loading, fetchBookings, cancelBooking } = useBookings();

  const handleCancel = async (id: string) => {
    const { error } = await cancelBooking(id);
    if (error) toast.error("Erreur lors de l'annulation");
    else toast.success("Rendez-vous annulé");
  };

  const upcomingBookings = bookings.filter(
    (b) => b.status === "confirmed" && !isBefore(startOfDay(parseISO(b.booking_date)), startOfDay(new Date()))
  );

  const pastBookings = bookings.filter(
    (b) => b.status !== "confirmed" || isBefore(startOfDay(parseISO(b.booking_date)), startOfDay(new Date()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const BookingCard = ({ booking }: { booking: typeof bookings[0] }) => {
    const isPast = isBefore(startOfDay(parseISO(booking.booking_date)), startOfDay(new Date()));
    const isCancelled = booking.status === "cancelled";

    return (
      <Card className={isCancelled || isPast ? "opacity-60" : ""}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-foreground">
                  {booking.prospects?.full_name || "Prospect inconnu"}
                </span>
                <Badge variant={isCancelled ? "destructive" : isPast ? "secondary" : "default"}>
                  {isCancelled ? "Annulé" : isPast ? "Passé" : "Confirmé"}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(parseISO(booking.booking_date), "EEEE d MMMM yyyy", { locale: fr })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
                </span>
              </div>
              {booking.prospects && (
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {booking.prospects.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {booking.prospects.phone}
                  </span>
                  {booking.prospects.company_name && (
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {booking.prospects.company_name}
                    </span>
                  )}
                </div>
              )}
            </div>
            {!isCancelled && !isPast && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10">
                    <XCircle className="h-4 w-4" />
                    Annuler
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Annuler ce rendez-vous ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Le rendez-vous avec <strong>{booking.prospects?.full_name}</strong> sera annulé.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Non</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleCancel(booking.id)}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Annuler le RDV
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {upcomingBookings.length} rendez-vous à venir
        </h3>
        <Button onClick={fetchBookings} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Actualiser
        </Button>
      </div>

      {upcomingBookings.length === 0 && pastBookings.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            Aucun rendez-vous pour le moment
          </CardContent>
        </Card>
      ) : (
        <>
          {upcomingBookings.length > 0 && (
            <div className="space-y-3">
              {upcomingBookings.map((b) => (
                <BookingCard key={b.id} booking={b} />
              ))}
            </div>
          )}

          {pastBookings.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Historique</h4>
              {pastBookings.map((b) => (
                <BookingCard key={b.id} booking={b} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBookings;
