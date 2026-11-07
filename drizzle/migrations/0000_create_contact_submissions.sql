CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.contact_submissions TO service_role;
REVOKE ALL ON public.contact_submissions FROM anon, authenticated;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;