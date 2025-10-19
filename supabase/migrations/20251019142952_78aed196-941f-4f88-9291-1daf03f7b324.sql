-- Create translation history table
CREATE TABLE IF NOT EXISTS public.translation_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  source_text TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  source_language TEXT NOT NULL,
  target_language TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_translation_history_user_id ON public.translation_history(user_id);
CREATE INDEX IF NOT EXISTS idx_translation_history_created_at ON public.translation_history(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.translation_history ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own translation history
CREATE POLICY "Users can view own translations" 
ON public.translation_history 
FOR SELECT 
USING (user_id IS NULL OR auth.uid() = user_id);

-- Allow anyone to insert translations (for anonymous users)
CREATE POLICY "Anyone can insert translations" 
ON public.translation_history 
FOR INSERT 
WITH CHECK (true);

-- Allow users to delete their own translations
CREATE POLICY "Users can delete own translations" 
ON public.translation_history 
FOR DELETE 
USING (user_id IS NULL OR auth.uid() = user_id);