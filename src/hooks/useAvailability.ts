import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format, isToday, isBefore, startOfDay } from "date-fns";

export interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  slot_duration: number;
}

export interface TimeSlot {
  start: string;
  end: string;
}

export const DAY_NAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export const useAvailability = () => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("availability_slots")
      .select("*")
      .order("day_of_week");

    if (!error && data) {
      setSlots(data as AvailabilitySlot[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const updateSlot = async (id: string, updates: Partial<AvailabilitySlot>) => {
    const { error } = await supabase
      .from("availability_slots")
      .update(updates)
      .eq("id", id);
    if (!error) await fetchSlots();
    return { error };
  };

  const addSlot = async (slot: Omit<AvailabilitySlot, "id">) => {
    const { error } = await supabase
      .from("availability_slots")
      .insert(slot);
    if (!error) await fetchSlots();
    return { error };
  };

  const deleteSlot = async (id: string) => {
    const { error } = await supabase
      .from("availability_slots")
      .delete()
      .eq("id", id);
    if (!error) await fetchSlots();
    return { error };
  };

  // Get available days of week (for calendar disabled days)
  const getActiveDays = (): number[] => {
    return slots
      .filter((s) => s.is_active)
      .map((s) => s.day_of_week);
  };

  // Generate time slots for a given date
  const getTimeSlotsForDate = async (date: Date): Promise<TimeSlot[]> => {
    const dayOfWeek = date.getDay();
    const activeSlots = slots.filter(
      (s) => s.day_of_week === dayOfWeek && s.is_active
    );

    if (activeSlots.length === 0) return [];

    // Get existing bookings for this date
    const dateStr = format(date, "yyyy-MM-dd");
    const { data: bookings } = await supabase
      .from("bookings")
      .select("start_time, end_time")
      .eq("booking_date", dateStr)
      .eq("status", "confirmed");

    const bookedTimes = new Set(
      (bookings || []).map((b: { start_time: string }) => b.start_time)
    );

    const timeSlots: TimeSlot[] = [];
    const now = new Date();

    for (const slot of activeSlots) {
      const [startH, startM] = slot.start_time.split(":").map(Number);
      const [endH, endM] = slot.end_time.split(":").map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;

      for (let m = startMinutes; m + slot.slot_duration <= endMinutes; m += slot.slot_duration) {
        const h = Math.floor(m / 60);
        const min = m % 60;
        const slotStart = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}:00`;
        const endM2 = m + slot.slot_duration;
        const slotEnd = `${String(Math.floor(endM2 / 60)).padStart(2, "0")}:${String(endM2 % 60).padStart(2, "0")}:00`;

        // Skip past slots for today
        if (isToday(date)) {
          const slotDate = new Date(date);
          slotDate.setHours(h, min, 0, 0);
          if (isBefore(slotDate, now)) continue;
        }

        // Skip booked slots
        if (bookedTimes.has(slotStart)) continue;

        timeSlots.push({ start: slotStart, end: slotEnd });
      }
    }

    return timeSlots;
  };

  // Get the next N available dates from tomorrow onwards
  const getNextAvailableDates = (count: number = 3): Date[] => {
    const activeDays = getActiveDays();
    if (activeDays.length === 0) return [];

    const dates: Date[] = [];
    const today = new Date();
    let current = new Date(today);
    current.setDate(current.getDate() + 1); // start from tomorrow

    // Search up to 60 days ahead
    for (let i = 0; i < 60 && dates.length < count; i++) {
      if (activeDays.includes(current.getDay())) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // Check if a date should be disabled in the calendar
  const isDateDisabled = (date: Date): boolean => {
    const allowedDates = getNextAvailableDates(3);
    return !allowedDates.some(
      (d) => startOfDay(d).getTime() === startOfDay(date).getTime()
    );
  };

  return {
    slots,
    loading,
    fetchSlots,
    updateSlot,
    addSlot,
    deleteSlot,
    getActiveDays,
    getTimeSlotsForDate,
    isDateDisabled,
  };
};
