const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.join(__dirname, '../popular_covers.json');
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`Файл ${jsonPath} не найден. Сначала запустите скрипт scrape-popular-images.js!`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`Загружено ${Object.keys(data).length} обложек из JSON-файла.`);

  // Получаем ID категории Popular (в таблице slot_categories slug обычно 'popular')
  const popularCategory = await prisma.slot_categories.findFirst({
    where: { 
      // Ищем по имени или слагу
      OR: [
        { name: { contains: 'Popular', mode: 'insensitive' } },
        { slug: 'popular' }
      ]
    }
  });

  if (!popularCategory) {
    console.log('⚠️ Категория "Popular" не найдена в таблице slot_categories. Обновление идет просто по совпадению slug(ссылки).');
  } else {
    console.log(`✅ Найдена категория: ${popularCategory.name} (ID: ${popularCategory.id})`);
  }

  let updatedCount = 0;
  let notFoundCount = 0;

  for (const [slug, imageUrl] of Object.entries(data)) {
    // В базе ищем слот по slug
    const slot = await prisma.slots.findUnique({ where: { slug } });
    
    if (slot) {
      // Обновляем слот, также убедимся, что он привязан к категории Popular
      let updateData = { image_url: imageUrl };
      
      if (popularCategory && slot.category_id !== popularCategory.id) {
        updateData.category_id = popularCategory.id;
      }

      await prisma.slots.update({
        where: { slug: slot.slug },
        data: updateData
      });
      
      updatedCount++;
    } else {
      notFoundCount++;
    }
  }

  console.log(`\n🎉 Готово! Успешно обновлено слотов обложками: ${updatedCount}`);
  if (notFoundCount > 0) {
    console.log(`Не найдено в базе слотов: ${notFoundCount} (видимо, база еще не содержит этих игр)`);
  }

  await prisma.$disconnect();
}

main().catch(e => {
  console.error('Критическая ошибка:', e);
  prisma.$disconnect();
});
