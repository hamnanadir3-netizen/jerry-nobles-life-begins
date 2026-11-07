CREATE TABLE public.contact_submission_rate_limits (
  client_key text PRIMARY KEY,
  last_submitted_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.contact_submission_rate_limits TO service_role;
REVOKE ALL ON public.contact_submission_rate_limits FROM anon, authenticated;
ALTER TABLE public.contact_submission_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.submit_contact_message(
  _name text,
  _email text,
  _message text,
  _client_key text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _allowed_key text;
  _submission_id uuid;
BEGIN
  IF length(trim(_name)) < 1 OR length(trim(_name)) > 100
     OR length(trim(_email)) > 255
     OR trim(_email) !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$'
     OR length(trim(_message)) < 1 OR length(trim(_message)) > 2000
     OR _client_key !~ '^[a-f0-9]{64}$' THEN
    RAISE EXCEPTION 'Contact details are invalid.' USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.contact_submission_rate_limits (client_key, last_submitted_at)
  VALUES (_client_key, now())
  ON CONFLICT (client_key) DO UPDATE
    SET last_submitted_at = now()
    WHERE public.contact_submission_rate_limits.last_submitted_at <= now() - interval '30 seconds'
  RETURNING client_key INTO _allowed_key;

  IF _allowed_key IS NULL THEN
    RAISE EXCEPTION 'Please wait before sending another message.' USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO public.contact_submissions (name, email, message)
  VALUES (trim(_name), trim(_email), trim(_message))
  RETURNING id INTO _submission_id;

  RETURN _submission_id;
END;
$$;
REVOKE ALL ON FUNCTION public.submit_contact_message(text, text, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_contact_message(text, text, text, text) TO service_role;