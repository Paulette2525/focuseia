-- Add policy to allow deleting prospects
CREATE POLICY "Anyone can delete prospects"
ON public.prospects
FOR DELETE
USING (true);