-- CreateTable
CREATE TABLE "features" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "icon" TEXT,
    "color" TEXT DEFAULT '#8b5cf6',
    "image_url" TEXT,
    "sort_order" INTEGER DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_popular" BOOLEAN NOT NULL DEFAULT false,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slot_features" (
    "id" SERIAL NOT NULL,
    "slot_id" INTEGER NOT NULL,
    "feature_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "slot_features_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "features_slug_key" ON "features"("slug");

-- CreateIndex
CREATE INDEX "features_type_idx" ON "features"("type");

-- CreateIndex
CREATE INDEX "features_is_active_idx" ON "features"("is_active");

-- CreateIndex
CREATE INDEX "features_is_popular_idx" ON "features"("is_popular");

-- CreateIndex
CREATE INDEX "features_sort_order_idx" ON "features"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "slot_features_slot_id_feature_id_key" ON "slot_features"("slot_id", "feature_id");

-- CreateIndex
CREATE INDEX "slot_features_slot_id_idx" ON "slot_features"("slot_id");

-- CreateIndex
CREATE INDEX "slot_features_feature_id_idx" ON "slot_features"("feature_id");

-- AddForeignKey
ALTER TABLE "slot_features" ADD CONSTRAINT "slot_features_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slot_features" ADD CONSTRAINT "slot_features_feature_id_fkey" FOREIGN KEY ("feature_id") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Insert test data
INSERT INTO "features" ("name", "slug", "description", "type", "icon", "color", "sort_order", "is_active", "is_popular", "is_featured") VALUES
('Free Spins', 'free-spins', 'Бесплатные вращения барабанов', 'free_spins', '🎰', '#10b981', 1, true, true, true),
('Wild Symbol', 'wild-symbol', 'Символ, заменяющий любые другие символы', 'wild', '🃏', '#f59e0b', 2, true, true, true),
('Scatter Symbol', 'scatter-symbol', 'Символ, активирующий бонусные функции', 'scatter', '💎', '#8b5cf6', 3, true, true, false),
('Multiplier', 'multiplier', 'Увеличивает выигрыш в несколько раз', 'multiplier', '✖️', '#ef4444', 4, true, true, true),
('Bonus Game', 'bonus-game', 'Дополнительная мини-игра внутри слота', 'bonus', '🎮', '#3b82f6', 5, true, false, true),
('Progressive Jackpot', 'progressive-jackpot', 'Прогрессивный джекпот', 'progressive', '💰', '#fbbf24', 6, true, true, true),
('Expanding Wild', 'expanding-wild', 'Вайлд, расширяющийся на весь барабан', 'wild', '📏', '#06b6d4', 7, true, false, false),
('Sticky Wild', 'sticky-wild', 'Вайлд, остающийся на месте несколько спинов', 'wild', '📌', '#84cc16', 8, true, false, false),
('Cascading Reels', 'cascading-reels', 'Падающие символы с возможностью цепных выигрышей', 'special', '⬇️', '#a855f7', 9, true, false, true),
('Megaways', 'megaways', 'Механика с изменяющимся количеством способов выиграть', 'special', '🔀', '#ec4899', 10, true, true, true),
('Hold & Spin', 'hold-spin', 'Функция удержания и повторного вращения', 'bonus', '🔄', '#14b8a6', 11, true, false, false),
('Buy Feature', 'buy-feature', 'Возможность купить бонусную функцию', 'bonus', '💳', '#f97316', 12, true, false, false),
('Gamble Feature', 'gamble-feature', 'Функция удвоения выигрыша', 'bonus', '🎲', '#dc2626', 13, true, false, false),
('Autoplay', 'autoplay', 'Автоматическое вращение барабанов', 'special', '⚡', '#6366f1', 14, true, false, false),
('Turbo Mode', 'turbo-mode', 'Ускоренный режим игры', 'special', '🚀', '#8b5cf6', 15, true, false, false);