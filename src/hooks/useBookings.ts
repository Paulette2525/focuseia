import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Booking {
  id: string;
  prospect_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  created_at: string;
  prospects?: {
    full_name: string;
    email: string;
    phone: string;
    company_name: string | null;
  };
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*, prospects(full_name, email, phone, company_name)")
      .order("booking_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (!error && data) {
      setBookings(data as unknown as Booking[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const createBooking = async (booking: {
    prospect_id: string;
    booking_date: string;
    start_time: string;
    end_time: string;
  }) => {
    const { error } = await supabase.from("bookings").insert(booking);
    return { error };
  };

  const cancelBooking = async (id: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", id);
    if (!error) await fetchBookings();
    return { error };
  };

  return { bookings, loading, fetchBookings, createBooking, cancelBooking };
};
