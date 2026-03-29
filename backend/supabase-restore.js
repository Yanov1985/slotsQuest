const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function restoreCloudBackup() {
  const backupsDir = path.join(__dirname, 'backups', 'cloud');
  const filePath = path.join(backupsDir, 'supabase_backup_LATEST.json');

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Ошибка: Файл бэкапа не найден! Ожидался: ${filePath}`);
    console.log(`Сначала создайте бэкап командой: npm run db:backup`);
    process.exit(1);
  }

  console.log(`🔄 Восстановление БД Supabase из файла: ${filePath}`);
  const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const data = rawData.data;

  try {
    // 1. Pages
    if (data.pages?.length) {
      console.log(`⏳ Восстановление страниц (${data.pages.length})...`);
      for (const p of data.pages) {
        await prisma.pages.upsert({ where: { slug: p.slug }, create: p, update: p });
      }
    }

    // 2. Providers
    if (data.providers?.length) {
      console.log(`⏳ Восстановление провайдеров (${data.providers.length})...`);
      for (const p of data.providers) {
        await prisma.providers.upsert({ where: { id: p.id }, create: p, update: p });
      }
    }

    // 3. Categories, Themes, Mechanics, Features, Bonuses
    if (data.slot_categories?.length) {
      for (const c of data.slot_categories) await prisma.slot_categories.upsert({ where: { id: c.id }, create: c, update: c });
    }
    if (data.themes?.length) {
      for (const t of data.themes) await prisma.themes.upsert({ where: { id: t.id }, create: t, update: t });
    }
    if (data.mechanics?.length) {
      for (const m of data.mechanics) await prisma.mechanics.upsert({ where: { id: m.id }, create: m, update: m });
    }
    if (data.features?.length) {
      for (const f of data.features) await prisma.features.upsert({ where: { id: f.id }, create: f, update: f });
    }
    if (data.bonuses?.length) {
      for (const b of data.bonuses) await prisma.bonuses.upsert({ where: { id: b.id }, create: b, update: b });
    }

    // 4. Slots & Relations
    if (data.slots?.length) {
      console.log(`⏳ Восстановление слотов и их связей (${data.slots.length})...`);
      for (const s of data.slots) {
        const { slotThemes, slot_mechanics, slot_features, slot_bonuses, ...slotData } = s;

        // Восстанавливаем слот
        await prisma.slots.upsert({ where: { id: slotData.id }, create: slotData, update: slotData });

        // Восстанавливаем связи (игнорируя дубликаты)
        for (const st of slotThemes || []) {
          try { await prisma.slot_themes.create({ data: { slot_id: st.slot_id, theme_id: st.theme_id } }); } catch (e) { }
        }
        for (const sm of slot_mechanics || []) {
          try { await prisma.slot_mechanics.create({ data: { slot_id: sm.slot_id, mechanic_id: sm.mechanic_id } }); } catch (e) { }
        }
        for (const sf of slot_features || []) {
          try { await prisma.slot_features.create({ data: { slot_id: sf.slot_id, feature_id: sf.feature_id } }); } catch (e) { }
        }
        for (const sb of slot_bonuses || []) {
          try { await prisma.slot_bonuses.create({ data: { slot_id: sb.slot_id, bonus_id: sb.bonus_id } }); } catch (e) { }
        }
      }
    }

    console.log(`✅ ВОССТАНОВЛЕНИЕ УСПЕШНО ЗАВЕРШЕНО!`);
  } catch (error) {
    console.error(`❌ Критическая Ошибка при восстановлении:`, error);
  } finally {
    await prisma.$disconnect();
  }
}

restoreCloudBackup();
