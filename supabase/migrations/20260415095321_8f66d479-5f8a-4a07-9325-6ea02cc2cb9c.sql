
-- Fix prospects: restrict SELECT and DELETE to authenticated users only
DROP POLICY "Anyone can view prospects" ON public.prospects;
DROP POLICY "Anyone can delete prospects" ON public.prospects;

CREATE POLICY "Authenticated users can view prospects"
  ON public.prospects FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete prospects"
  ON public.prospects FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
