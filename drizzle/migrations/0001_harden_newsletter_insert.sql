DROP POLICY IF EXISTS "newsletter public subscribe" ON public.newsletter_subscribers;
CREATE POLICY "newsletter public subscribe" ON public.newsletter_subscribers
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(email) BETWEEN 5 AND 254
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (source IS NULL OR char_length(source) <= 40)
);