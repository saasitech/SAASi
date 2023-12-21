ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY insert_for_authenticated ON public.pricing FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY select_for_authenticated ON public.pricing FOR SELECT TO authenticated USING (true);
CREATE POLICY update_for_authenticated ON public.pricing FOR UPDATE TO authenticated USING (true);
CREATE POLICY delete_for_authenticated ON public.pricing FOR DELETE TO authenticated USING (true);