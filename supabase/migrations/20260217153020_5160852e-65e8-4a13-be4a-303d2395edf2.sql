
-- Table: availability_slots (recurring admin availability)
CREATE TABLE public.availability_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  slot_duration INTEGER NOT NULL DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table: bookings (confirmed appointments)
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prospect_id UUID NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS: availability_slots
CREATE POLICY "Public can read availability" ON public.availability_slots
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert availability" ON public.availability_slots
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update availability" ON public.availability_slots
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete availability" ON public.availability_slots
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS: bookings
CREATE POLICY "Public can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view bookings" ON public.bookings
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Insert default availability (Monday-Friday, 9h-17h, 30min slots)
INSERT INTO public.availability_slots (day_of_week, start_time, end_time, slot_duration) VALUES
  (1, '09:00', '17:00', 30),
  (2, '09:00', '17:00', 30),
  (3, '09:00', '17:00', 30),
  (4, '09:00', '17:00', 30),
  (5, '09:00', '17:00', 30);
