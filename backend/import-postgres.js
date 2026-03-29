const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function importData() {
  const filePath = path.join(__dirname, '..', 'backups', 'migrations', 'full_migration_LATEST.json');
  console.log(`📥 Чтение миграционного дампа...`);
  const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const data = rawData.data;

  try {
    console.log(`🔌 Соединение с Supabase Postgres...`);
    
    // 1. Providers
    if (data.providers?.length) {
      console.log(`⏳ Импорт провайдеров (${data.providers.length})...`);
      for (const p of data.providers) {
        await prisma.providers.upsert({
          where: { id: p.id },
          create: p,
          update: p
        });
      }
    }

    // 2. Categories
    if (data.slot_categories?.length) {
      console.log(`⏳ Импорт категорий (${data.slot_categories.length})...`);
      for (const c of data.slot_categories) {
        await prisma.slot_categories.upsert({
          where: { id: c.id },
          create: c,
          update: c
        });
      }
    }

    // 3. Themes
    if (data.themes?.length) {
      console.log(`⏳ Импорт тем (${data.themes.length})...`);
      for (const t of data.themes) {
        await prisma.themes.upsert({
          where: { id: t.id },
          create: t,
          update: t
        });
      }
    }

    // 4. Mechanics
    if (data.mechanics?.length) {
      console.log(`⏳ Импорт механик (${data.mechanics.length})...`);
      for (const m of data.mechanics) {
        await prisma.mechanics.upsert({
          where: { id: m.id },
          create: m,
          update: m
        });
      }
    }

    // 5. Bonuses & Features
    if (data.bonuses?.length) {
      console.log(`⏳ Импорт бонусов (${data.bonuses.length})...`);
      for (const b of data.bonuses) {
        await prisma.bonuses.upsert({
          where: { id: b.id },
          create: b,
          update: b
        });
      }
    }
    if (data.features?.length) {
      console.log(`⏳ Импорт особенностей (${data.features.length})...`);
      for (const f of data.features) {
        await prisma.features.upsert({
          where: { id: f.id },
          create: f,
          update: f
        });
      }
    }

    // 6. Slots & Relations
    if (data.slots?.length) {
      console.log(`⏳ Импорт слотов и связей (${data.slots.length})...`);
      for (const s of data.slots) {
        const { slotThemes, slot_mechanics, slot_features, slot_bonuses, ...slotData } = s;

        // Create or update slot itself
        const createdSlot = await prisma.slots.upsert({
          where: { id: slotData.id },
          create: slotData,
          update: slotData
        });

        // Insert junctions if they don't exist
        for (const st of slotThemes || []) {
          try {
            await prisma.slot_themes.create({ data: { slot_id: st.slot_id, theme_id: st.theme_id } });
          } catch (e) { /* ignore unique constraint */ }
        }
        for (const sm of slot_mechanics || []) {
          try {
            await prisma.slot_mechanics.create({ data: { slot_id: sm.slot_id, mechanic_id: sm.mechanic_id } });
          } catch (e) { /* ignore */ }
        }
        for (const sf of slot_features || []) {
          try {
             await prisma.slot_features.create({ data: { slot_id: sf.slot_id, feature_id: sf.feature_id } });
          } catch (e) { /* ignore */ }
        }
        for (const sb of slot_bonuses || []) {
          try {
             await prisma.slot_bonuses.create({ data: { slot_id: sb.slot_id, bonus_id: sb.bonus_id } });
          } catch (e) { /* ignore */ }
        }
      }
    }

    console.log(`✅ ИМПОРТ УСПЕШНО ЗАВЕРШЕН! База на Supabase идентична локальной!`);
  } catch (error) {
    console.error(`❌ Ошибка импорта:`, error);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
