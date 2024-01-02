CREATE TABLE "pricing" (
    "id" SERIAL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "currency" TEXT,
    "theme" TEXT,
    "showBillingCycle" BOOLEAN DEFAULT false,
    "isDefault" BOOLEAN DEFAULT false,
    "settings" JSONB,
    "tiers" JSONB []
);