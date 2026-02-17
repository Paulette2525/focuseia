import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Clock, CheckCircle, Loader2, CalendarDays } from "lucide-react";
import { useAvailability, type TimeSlot } from "@/hooks/useAvailability";
import { useBookings } from "@/hooks/useBookings";
import { toast } from "sonner";

interface BookingCalendarProps {
  prospectId: string;
  prospectName: string;
  onBookingConfirmed: (date: string, time: string) => void;
}

const BookingCalendar = ({ prospectId, prospectName, onBookingConfirmed }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { isDateDisabled, getTimeSlotsForDate, loading: availLoading } = useAvailability();
  const { createBooking } = useBookings();

  useEffect(() => {
    if (!selectedDate) return;
    setSelectedSlot(null);
    setLoadingSlots(true);
    getTimeSlotsForDate(selectedDate).then((slots) => {
      setTimeSlots(slots);
      setLoadingSlots(false);
    });
  }, [selectedDate]);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot) return;
    setIsConfirming(true);

    const { error } = await createBooking({
      prospect_id: prospectId,
      booking_date: format(selectedDate, "yyyy-MM-dd"),
      start_time: selectedSlot.start,
      end_time: selectedSlot.end,
    });

    if (error) {
      toast.error("Erreur lors de la réservation. Veuillez réessayer.");
      console.error("Booking error:", error);
    } else {
      setIsConfirmed(true);
      onBookingConfirmed(
        format(selectedDate, "EEEE d MMMM yyyy", { locale: fr }),
        formatTime(selectedSlot.start)
      );
    }
    setIsConfirming(false);
  };

  const formatTime = (time: string) => time.slice(0, 5);

  if (isConfirmed && selectedDate && selectedSlot) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-foreground">Rendez-vous confirmé !</h3>
        <div className="bg-card/50 border border-primary/20 rounded-xl p-4 space-y-2">
          <p className="text-muted-foreground text-sm">
            <span className="font-medium text-foreground">{prospectName}</span>
          </p>
          <p className="text-primary font-semibold">
            {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
          </p>
          <p className="text-foreground font-medium">
            {formatTime(selectedSlot.start)} - {formatTime(selectedSlot.end)}
          </p>
        </div>
      </div>
    );
  }

  if (availLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <CalendarDays className="w-5 h-5 text-primary" />
        <h3 className="text-base font-semibold text-foreground">
          Choisissez un créneau
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Calendar */}
        <div className="flex-shrink-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={isDateDisabled}
            locale={fr}
            className="rounded-xl border border-primary/20 bg-card/30"
          />
        </div>

        {/* Time Slots */}
        <div className="flex-1 min-w-0">
          {!selectedDate ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm py-8">
              <p>← Sélectionnez un jour</p>
            </div>
          ) : loadingSlots ? (
            <div className="flex items-center justify-center h-full py-8">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          ) : timeSlots.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm py-8">
              <p>Aucun créneau disponible ce jour</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {format(selectedDate, "EEEE d MMMM", { locale: fr })}
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto pr-1">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.start}
                    variant={selectedSlot?.start === slot.start ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSlot(slot)}
                    className={`text-sm transition-all ${
                      selectedSlot?.start === slot.start
                        ? "shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                        : "border-primary/20 hover:border-primary/40"
                    }`}
                  >
                    {formatTime(slot.start)}
                  </Button>
                ))}
              </div>

              {selectedSlot && (
                <Button
                  onClick={handleConfirm}
                  disabled={isConfirming}
                  className="w-full mt-3 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                >
                  {isConfirming ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Confirmer {formatTime(selectedSlot.start)} - {formatTime(selectedSlot.end)}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
