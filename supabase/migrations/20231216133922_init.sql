CREATE TABLE "tier" (
    "id" uuid NOT NULL UNIQUE,
    "slug" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "name" TEXT NOT NULL,
    "auto_payment" BOOLEAN NOT NULL DEFAULT 'false',
    "trial" integer,
    "trial_text" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" jsonb,
    CONSTRAINT "tier_pk" PRIMARY KEY ("id")
);

CREATE TABLE "pricing" (
    "id" uuid NOT NULL UNIQUE,
    "slug" TEXT NOT NULL,
    "default_billing" integer,
    "discount_type" TEXT,
    "title" TEXT,
    "show_billing_options" BOOLEAN NOT NULL DEFAULT 'false',
    "style_id" TEXT NOT NULL,
    "allow_trial" BOOLEAN NOT NULL DEFAULT 'false',
    CONSTRAINT "pricing_pk" PRIMARY KEY ("id")
);

CREATE TABLE "billing_cycle_option" (
    "id" uuid NOT NULL UNIQUE,
    "cycle" integer NOT NULL,
    "name" TEXT NOT NULL,
    "discount" DECIMAL,
    "discount_type" TEXT NOT NULL,
    "discount_text" TEXT,
    CONSTRAINT "billing_cycle_option_pk" PRIMARY KEY ("id")
);

CREATE TABLE "pricing__tier__billing_cycle_option" (
    "billing_option_id" uuid NOT NULL,
    "tier_id" uuid NOT NULL,
    "pricing_id" uuid NOT NULL,
    "terms_summary_id" uuid NOT NULL,
    "applicable_discount" BOOLEAN NOT NULL DEFAULT 'false',
    CONSTRAINT "unique_pricing_tier_billing" UNIQUE ("billing_option_id", "tier_id", "pricing_id")
);

CREATE TABLE "term_summary" (
    "id" uuid NOT NULL,
    "terms" jsonb NOT NULL,
    CONSTRAINT "term_summary_pk" PRIMARY KEY ("id")
);

CREATE TABLE "feature" (
    "id" uuid NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    CONSTRAINT "feature_pk" PRIMARY KEY ("id")
);

CREATE TABLE "tier__feature" (
    "tier_id" uuid NOT NULL,
    "feature_id" uuid NOT NULL
);

ALTER TABLE "pricing__tier__billing_cycle_option" 
    ADD CONSTRAINT "pricing__tier__billing_cycle_option_fk_boi" 
    FOREIGN KEY ("billing_option_id") REFERENCES "billing_cycle_option"("id");

ALTER TABLE "pricing__tier__billing_cycle_option" 
    ADD CONSTRAINT "pricing__tier__billing_cycle_option_fk_ti" 
    FOREIGN KEY ("tier_id") REFERENCES "tier"("id") ON DELETE CASCADE;

ALTER TABLE "pricing__tier__billing_cycle_option" 
    ADD CONSTRAINT "pricing__tier__billing_cycle_option_fk_pi" 
    FOREIGN KEY ("pricing_id") REFERENCES "pricing"("id") ON DELETE CASCADE;

ALTER TABLE "pricing__tier__billing_cycle_option" 
    ADD CONSTRAINT "pricing__tier__billing_cycle_option_fk_tsi" 
    FOREIGN KEY ("terms_summary_id") REFERENCES "term_summary"("id");

ALTER TABLE "tier__feature" 
    ADD CONSTRAINT "tier__feature_fk_ti" 
    FOREIGN KEY ("tier_id") REFERENCES "tier"("id") ON DELETE CASCADE;

ALTER TABLE "tier__feature" 
    ADD CONSTRAINT "tier__feature_fk_fi" 
    FOREIGN KEY ("feature_id") REFERENCES "feature"("id") ON DELETE CASCADE;