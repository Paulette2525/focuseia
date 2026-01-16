-- Add missing columns to store ALL form data
ALTER TABLE public.prospects 
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS role TEXT,
ADD COLUMN IF NOT EXISTS company_age TEXT,
ADD COLUMN IF NOT EXISTS sector TEXT,
ADD COLUMN IF NOT EXISTS speed_blocker TEXT,
ADD COLUMN IF NOT EXISTS no_change_consequence TEXT,
ADD COLUMN IF NOT EXISTS error_prone_areas TEXT,
ADD COLUMN IF NOT EXISTS unstructured_processes TEXT,
ADD COLUMN IF NOT EXISTS ai_tools_usage TEXT,
ADD COLUMN IF NOT EXISTS ai_frustrations TEXT,
ADD COLUMN IF NOT EXISTS top_automation_priority TEXT,
ADD COLUMN IF NOT EXISTS failure_criteria TEXT,
ADD COLUMN IF NOT EXISTS why_now TEXT,
ADD COLUMN IF NOT EXISTS session_expectations TEXT;