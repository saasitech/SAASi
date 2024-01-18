ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY select_for_all_users ON public.pricing FOR SELECT USING (true);

CREATE POLICY insert_for_authenticated ON public.pricing FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY update_for_authenticated ON public.pricing FOR UPDATE TO authenticated USING (true);
CREATE POLICY delete_for_authenticated ON public.pricing FOR DELETE TO authenticated USING (true);