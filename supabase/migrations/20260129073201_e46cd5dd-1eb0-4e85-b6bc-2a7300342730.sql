-- Create email_logs table for tracking sent emails
CREATE TABLE public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prospect_id UUID REFERENCES public.prospects(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  template_type TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'sent',
  sent_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view email logs
CREATE POLICY "Authenticated users can view email logs"
ON public.email_logs
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can insert email logs
CREATE POLICY "Authenticated users can insert email logs"
ON public.email_logs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = sent_by);

-- Create index for faster queries
CREATE INDEX idx_email_logs_prospect_id ON public.email_logs(prospect_id);
CREATE INDEX idx_email_logs_sent_at ON public.email_logs(sent_at DESC);