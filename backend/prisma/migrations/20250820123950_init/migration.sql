-- CreateTable
CREATE TABLE "providers" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "logo_url" VARCHAR(500),
    "website_url" VARCHAR(500),
    "founded_year" INTEGER,
    "country" VARCHAR(100),
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slot_categories" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "slot_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slots" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "provider_id" UUID NOT NULL,
    "category_id" UUID,
    "theme_id" TEXT,
    "description" TEXT,
    "thumbnail_url" VARCHAR(500),
    "media_type" VARCHAR(20),
    "image_url" VARCHAR(500),
    "video_url" VARCHAR(500),
    "demo_url" VARCHAR(500),
    "real_play_url" VARCHAR(500),
    "screenshots" TEXT[],
    "rtp" DECIMAL(5,2),
    "volatility" VARCHAR(20),
    "min_bet" DECIMAL(10,2),
    "max_bet" DECIMAL(10,2),
    "max_win" DECIMAL(15,2),
    "game_field" VARCHAR(50),
    "paylines" VARCHAR(100),
    "reels" INTEGER DEFAULT 5,
    "rows" INTEGER DEFAULT 3,
    "theme" VARCHAR(255),
    "features" TEXT[],
    "release_date" DATE,
    "is_mobile_compatible" BOOLEAN DEFAULT true,
    "is_demo_available" BOOLEAN DEFAULT true,
    "rating" DECIMAL(3,2) DEFAULT 0.00,
    "rating_count" INTEGER DEFAULT 0,
    "popularity_rank" INTEGER,
    "popularity_percentage" INTEGER,
    "show_awards" BOOLEAN DEFAULT false,
    "awards" JSONB,
    "play_count" INTEGER DEFAULT 0,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "type" VARCHAR(50),
    "icon" VARCHAR(10),
    "color" VARCHAR(7) DEFAULT '#8b5cf6',
    "image_url" VARCHAR(500),
    "sort_order" INTEGER DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_popular" BOOLEAN NOT NULL DEFAULT false,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slot_features" (
    "id" SERIAL NOT NULL,
    "slot_id" TEXT NOT NULL,
    "feature_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "slot_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "themes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "icon" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "providers_name_key" ON "providers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "providers_slug_key" ON "providers"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "slot_categories_name_key" ON "slot_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "slot_categories_slug_key" ON "slot_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "slots_slug_key" ON "slots"("slug");

-- CreateIndex
CREATE INDEX "idx_slots_provider_id" ON "slots"("provider_id");

-- CreateIndex
CREATE INDEX "idx_slots_category_id" ON "slots"("category_id");

-- CreateIndex
CREATE INDEX "idx_slots_theme_id" ON "slots"("theme_id");

-- CreateIndex
CREATE INDEX "idx_slots_is_active" ON "slots"("is_active");

-- CreateIndex
CREATE INDEX "idx_slots_rating" ON "slots"("rating" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "features_slug_key" ON "features"("slug");

-- CreateIndex
CREATE INDEX "idx_features_type" ON "features"("type");

-- CreateIndex
CREATE INDEX "idx_features_is_active" ON "features"("is_active");

-- CreateIndex
CREATE INDEX "idx_features_is_popular" ON "features"("is_popular");

-- CreateIndex
CREATE INDEX "idx_features_sort_order" ON "features"("sort_order");

-- CreateIndex
CREATE INDEX "idx_slot_features_slot_id" ON "slot_features"("slot_id");

-- CreateIndex
CREATE INDEX "idx_slot_features_feature_id" ON "slot_features"("feature_id");

-- CreateIndex
CREATE UNIQUE INDEX "slot_features_slot_id_feature_id_key" ON "slot_features"("slot_id", "feature_id");

-- CreateIndex
CREATE UNIQUE INDEX "themes_name_key" ON "themes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "themes_slug_key" ON "themes"("slug");

-- CreateIndex
CREATE INDEX "themes_is_active_idx" ON "themes"("is_active");

-- CreateIndex
CREATE INDEX "themes_is_featured_idx" ON "themes"("is_featured");

-- CreateIndex
CREATE INDEX "themes_slug_idx" ON "themes"("slug");

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "slot_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "slot_features" ADD CONSTRAINT "slot_features_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slot_features" ADD CONSTRAINT "slot_features_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;
