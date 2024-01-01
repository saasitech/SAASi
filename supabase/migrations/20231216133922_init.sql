CREATE TABLE "pricing" (
    "id" SERIAL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "currency" TEXT,
    "theme" TEXT,
    "show_billing_cycle" BOOLEAN DEFAULT false,
    "settings" JSONB,
    "tiers" JSONB []
);