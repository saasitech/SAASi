CREATE TABLE "pricing" (
    "id" SERIAL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "currency" TEXT,
    "theme" TEXT,
    "isDefault" BOOLEAN DEFAULT false,
    "billingOptions" JSONB,
    "metadata" JSONB,
    "tiers" JSONB []
);