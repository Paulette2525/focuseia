
-- Drop all RESTRICTIVE policies on availability_slots
DROP POLICY IF EXISTS "Public can read availability" ON public.availability_slots;
DROP POLICY IF EXISTS "Authenticated users can insert availability" ON public.availability_slots;
DROP POLICY IF EXISTS "Authenticated users can update availability" ON public.availability_slots;
DROP POLICY IF EXISTS "Authenticated users can delete availability" ON public.availability_slots;

-- Drop all RESTRICTIVE policies on bookings
DROP POLICY IF EXISTS "Authenticated users can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Public can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON public.bookings;

-- Recreate as PERMISSIVE on availability_slots
CREATE POLICY "Public can read availability"
  ON public.availability_slots FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert availability"
  ON public.availability_slots FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update availability"
  ON public.availability_slots FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete availability"
  ON public.availability_slots FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Recreate as PERMISSIVE on bookings
CREATE POLICY "Authenticated users can view bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Public can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() IS NOT NULL);
