CREATE TABLE "pricing" (
    "id" SERIAL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "termsUrl" TEXT,
    "currency" TEXT,
    "theme" TEXT,
    "isDefault" BOOLEAN DEFAULT false,
    "billingOptions" JSONB,
    "branding" JSONB,
    "metadata" JSONB,
    "tiers" JSONB [],
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    "archivedAt" TIMESTAMP WITH TIME ZONE DEFAULT NULL
);