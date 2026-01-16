-- Drop existing select policy and create a public one for admin access
DROP POLICY IF EXISTS "Authenticated users can view prospects" ON public.prospects;

-- Create a public read policy (for simple admin access without auth)
CREATE POLICY "Anyone can view prospects" 
ON public.prospects 
FOR SELECT 
USING (true);