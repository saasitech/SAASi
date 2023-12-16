ALTER TABLE public.tier ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_cycle_option ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing__tier__billing_cycle_option ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.term_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tier__feature ENABLE ROW LEVEL SECURITY;


CREATE POLICY insert_for_authenticated ON public.tier FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY select_for_authenticated ON public.tier FOR SELECT TO authenticated USING (true);
CREATE POLICY update_for_authenticated ON public.tier FOR UPDATE TO authenticated USING (true);
CREATE POLICY delete_for_authenticated ON public.tier FOR DELETE TO authenticated USING (true);


CREATE POLICY insert_for_authenticated ON public.pricing FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY select_for_authenticated ON public.pricing FOR SELECT TO authenticated USING (true);
CREATE POLICY update_for_authenticated ON public.pricing FOR UPDATE TO authenticated USING (true);
CREATE POLICY delete_for_authenticated ON public.pricing FOR DELETE TO authenticated USING (true);


CREATE POLICY insert_for_authenticated ON public.billing_cycle_option FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY select_for_authenticated ON public.billing_cycle_option FOR SELECT TO authenticated USING (true);
CREATE POLICY update_for_authenticated ON public.billing_cycle_option FOR UPDATE TO authenticated USING (true);
CREATE POLICY delete_for_authenticated ON public.billing_cycle_option FOR DELETE TO authenticated USING (true);


CREATE POLICY insert_for_authenticated ON public.pricing__tier__billing_cycle_option FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY select_for_authenticated ON public.pricing__tier__billing_cycle_option FOR SELECT TO authenticated USING (true);
CREATE POLICY update_for_authenticated ON public.pricing__tier__billing_cycle_option FOR UPDATE TO authenticated USING (true);
CREATE POLICY delete_for_authenticated ON public.pricing__tier__billing_cycle_option FOR DELETE TO authenticated USING (true);


CREATE POLICY insert_for_authenticated ON public.term_summary FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY select_for_authenticated ON public.term_summary FOR SELECT TO authenticated USING (true);
CREATE POLICY update_for_authenticated ON public.term_summary FOR UPDATE TO authenticated USING (true);
CREATE POLICY delete_for_authenticated ON public.term_summary FOR DELETE TO authenticated USING (true);


CREATE POLICY insert_for_authenticated ON public.feature FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY select_for_authenticated ON public.feature FOR SELECT TO authenticated USING (true);
CREATE POLICY update_for_authenticated ON public.feature FOR UPDATE TO authenticated USING (true);
CREATE POLICY delete_for_authenticated ON public.feature FOR DELETE TO authenticated USING (true);


CREATE POLICY insert_for_authenticated ON public.tier__feature FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY select_for_authenticated ON public.tier__feature FOR SELECT TO authenticated USING (true);
CREATE POLICY update_for_authenticated ON public.tier__feature FOR UPDATE TO authenticated USING (true);
CREATE POLICY delete_for_authenticated ON public.tier__feature FOR DELETE TO authenticated USING (true);
