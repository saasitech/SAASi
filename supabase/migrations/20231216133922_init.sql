

CREATE TABLE "pricing" (
    "id" SERIAL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "settings" JSONB,
    "tiers" JSONB[]
);
