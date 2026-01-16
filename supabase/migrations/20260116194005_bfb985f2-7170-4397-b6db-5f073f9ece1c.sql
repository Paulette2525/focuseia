-- Create prospects table to store form submissions
CREATE TABLE public.prospects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero SERIAL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_type TEXT,
  team_size TEXT,
  main_challenges TEXT,
  growth_vision TEXT,
  desired_revenue TEXT,
  time_savings TEXT,
  manual_tasks TEXT,
  current_ai_tools TEXT,
  is_decision_maker TEXT,
  previous_investments TEXT,
  project_priority TEXT,
  ready_to_change TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting prospects (public can insert)
CREATE POLICY "Anyone can submit a prospect form" 
ON public.prospects 
FOR INSERT 
WITH CHECK (true);

-- Create policy for reading prospects (only authenticated users can read)
CREATE POLICY "Authenticated users can view prospects" 
ON public.prospects 
FOR SELECT 
USING (auth.uid() IS NOT NULL);