CREATE TYPE DiscountType AS ENUM ('percent', 'extraCycles', 'none');

CREATE TABLE "tier" (
    "id" SERIAL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "name" TEXT NOT NULL,
    "auto_payment" BOOLEAN NOT NULL DEFAULT false,
    "trial" INTEGER,
    "trial_text" TEXT,
    "description" TEXT NOT NULL,
    "meta" JSONB
);

CREATE TABLE "pricing" (
    "id" SERIAL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "default_billing" INTEGER,
    "discount_type" DiscountType,
    "title" TEXT,
    "show_billing_options" BOOLEAN NOT NULL DEFAULT false,
    "style_id" TEXT NOT NULL,
    "settings" JSONB,
    "allow_trial" BOOLEAN NOT NULL DEFAULT false,
    "meta" JSONB
);

CREATE TABLE "billing_cycle_option" (
    "id" SERIAL PRIMARY KEY,
    "cycle" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "discount" DECIMAL,
    "discount_type" DiscountType,
    "discount_text" TEXT
);

CREATE TABLE "pricing__tier__billing_cycle_option" (
    "billing_cycle_option_id" INTEGER NOT NULL,
    "tier_id" INTEGER NOT NULL,
    "pricing_id" INTEGER NOT NULL,
    "terms_summary_id" INTEGER NOT NULL,
    "applicable_discount" BOOLEAN NOT NULL DEFAULT false,
    primary key ("billing_cycle_option_id", "tier_id", "pricing_id")
);

CREATE TABLE "terms_summary" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NUll,
    "terms" JSONB[] NOT NULL
);

CREATE TABLE "feature" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL
);

CREATE TABLE "tier__feature" (
    "tier_id" INTEGER NOT NULL,
    "feature_id" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    primary key (tier_id, feature_id)
);



ALTER TABLE "pricing__tier__billing_cycle_option" 
    ADD CONSTRAINT "pricing__tier__billing_cycle_option_fk_boi" 
    FOREIGN KEY ("billing_cycle_option_id") REFERENCES "billing_cycle_option"("id");

ALTER TABLE "pricing__tier__billing_cycle_option" 
    ADD CONSTRAINT "pricing__tier__billing_cycle_option_fk_ti" 
    FOREIGN KEY ("tier_id") REFERENCES "tier"("id") ON DELETE CASCADE;

ALTER TABLE "pricing__tier__billing_cycle_option" 
    ADD CONSTRAINT "pricing__tier__billing_cycle_option_fk_pi" 
    FOREIGN KEY ("pricing_id") REFERENCES "pricing"("id") ON DELETE CASCADE;

ALTER TABLE "pricing__tier__billing_cycle_option" 
    ADD CONSTRAINT "pricing__tier__billing_cycle_option_fk_tsi" 
    FOREIGN KEY ("terms_summary_id") REFERENCES "terms_summary"("id");
