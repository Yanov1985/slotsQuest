const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function loadJsonData(filename) {
  const filePath = path.join(__dirname, 'studio-data', filename);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Файл ${filename} не найден`);
    return [];
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`✅ Загружено ${data.length} записей из ${filename}`);
    return data;
  } catch (error) {
    console.error(`❌ Ошибка чтения ${filename}:`, error.message);
    return [];
  }
}

async function restoreProviders() {
  console.log('\n🚀 Восстановление провайдеров...');
  const providers = await loadJsonData('providers.json');
  
  if (providers.length === 0) return false;
  
  try {
    // Проверяем текущее количество
    const currentCount = await prisma.providers.count();
    console.log(`📊 Текущее количество провайдеров: ${currentCount}`);
    
    if (currentCount > 0) {
      console.log('⚠️  Провайдеры уже существуют. Пропускаем...');
      return true;
    }
    
    // Восстанавливаем по частям для избежания таймаутов
    const batchSize = 10;
    let restored = 0;
    
    for (let i = 0; i < providers.length; i += batchSize) {
      const batch = providers.slice(i, i + batchSize);
      
      try {
        await prisma.providers.createMany({
          data: batch,
          skipDuplicates: true
        });
        restored += batch.length;
        console.log(`✅ Восстановлено ${restored}/${providers.length} провайдеров`);
      } catch (error) {
        console.error(`❌ Ошибка восстановления пакета ${i}-${i + batchSize}:`, error.message);
        
        // Пробуем восстановить по одной записи
        for (const provider of batch) {
          try {
            await prisma.providers.create({ data: provider });
            restored++;
            console.log(`✅ Восстановлен провайдер: ${provider.name}`);
          } catch (singleError) {
            console.error(`❌ Не удалось восстановить ${provider.name}:`, singleError.message);
          }
        }
      }
    }
    
    console.log(`🎉 Восстановлено ${restored} провайдеров из ${providers.length}`);
    return restored > 0;
    
  } catch (error) {
    console.error('❌ Критическая ошибка при восстановлении провайдеров:', error.message);
    return false;
  }
}

async function restoreMechanics() {
  console.log('\n🚀 Восстановление механик...');
  const mechanics = await loadJsonData('mechanics.json');
  
  if (mechanics.length === 0) return false;
  
  try {
    const currentCount = await prisma.mechanics.count();
    console.log(`📊 Текущее количество механик: ${currentCount}`);
    
    if (currentCount > 0) {
      console.log('⚠️  Механики уже существуют. Пропускаем...');
      return true;
    }
    
    await prisma.mechanics.createMany({
      data: mechanics,
      skipDuplicates: true
    });
    
    console.log(`🎉 Восстановлено ${mechanics.length} механик`);
    return true;
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении механик:', error.message);
    return false;
  }
}

async function restoreThemes() {
  console.log('\n🚀 Восстановление тем...');
  const themes = await loadJsonData('themes.json');
  
  if (themes.length === 0) return false;
  
  try {
    const currentCount = await prisma.themes.count();
    console.log(`📊 Текущее количество тем: ${currentCount}`);
    
    if (currentCount > 0) {
      console.log('⚠️  Темы уже существуют. Пропускаем...');
      return true;
    }
    
    // Восстанавливаем по частям
    const batchSize = 20;
    let restored = 0;
    
    for (let i = 0; i < themes.length; i += batchSize) {
      const batch = themes.slice(i, i + batchSize);
      
      try {
        await prisma.themes.createMany({
          data: batch,
          skipDuplicates: true
        });
        restored += batch.length;
        console.log(`✅ Восстановлено ${restored}/${themes.length} тем`);
      } catch (error) {
        console.error(`❌ Ошибка восстановления пакета тем ${i}-${i + batchSize}:`, error.message);
      }
    }
    
    console.log(`🎉 Восстановлено ${restored} тем из ${themes.length}`);
    return restored > 0;
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении тем:', error.message);
    return false;
  }
}

async function restoreCategories() {
  console.log('\n🚀 Восстановление категорий слотов...');
  const categories = await loadJsonData('slot_categories.json');
  
  if (categories.length === 0) return false;
  
  try {
    const currentCount = await prisma.slot_categories.count();
    console.log(`📊 Текущее количество категорий: ${currentCount}`);
    
    if (currentCount > 0) {
      console.log('⚠️  Категории уже существуют. Пропускаем...');
      return true;
    }
    
    await prisma.slot_categories.createMany({
      data: categories,
      skipDuplicates: true
    });
    
    console.log(`🎉 Восстановлено ${categories.length} категорий`);
    return true;
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении категорий:', error.message);
    return false;
  }
}

async function restoreSlots() {
  console.log('\n🚀 Восстановление слотов...');
  const slots = await loadJsonData('slots.json');
  
  if (slots.length === 0) return false;
  
  try {
    const currentCount = await prisma.slots.count();
    console.log(`📊 Текущее количество слотов: ${currentCount}`);
    
    if (currentCount > 0) {
      console.log('⚠️  Слоты уже существуют. Пропускаем...');
      return true;
    }
    
    // Восстанавливаем по одному для проверки связей
    let restored = 0;
    for (const slot of slots) {
      try {
        await prisma.slots.create({ data: slot });
        restored++;
        console.log(`✅ Восстановлен слот: ${slot.name}`);
      } catch (error) {
        console.error(`❌ Не удалось восстановить слот ${slot.name}:`, error.message);
      }
    }
    
    console.log(`🎉 Восстановлено ${restored} слотов из ${slots.length}`);
    return restored > 0;
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении слотов:', error.message);
    return false;
  }
}

async function verifyData() {
  console.log('\n🔍 Проверка восстановленных данных...');
  
  try {
    const counts = {
      providers: await prisma.providers.count(),
      mechanics: await prisma.mechanics.count(),
      themes: await prisma.themes.count(),
      categories: await prisma.slot_categories.count(),
      slots: await prisma.slots.count()
    };
    
    console.log('\n📊 Итоговая статистика:');
    console.log(`   Провайдеры: ${counts.providers}`);
    console.log(`   Механики: ${counts.mechanics}`);
    console.log(`   Темы: ${counts.themes}`);
    console.log(`   Категории: ${counts.categories}`);
    console.log(`   Слоты: ${counts.slots}`);
    
    const expectedCounts = {
      providers: 93,
      mechanics: 6,
      themes: 241,
      categories: 31,
      slots: 5
    };
    
    let allGood = true;
    for (const [table, count] of Object.entries(counts)) {
      const expected = expectedCounts[table];
      if (count !== expected) {
        console.log(`⚠️  ${table}: ожидалось ${expected}, получено ${count}`);
        allGood = false;
      } else {
        console.log(`✅ ${table}: ${count}/${expected} - OK`);
      }
    }
    
    return allGood;
    
  } catch (error) {
    console.error('❌ Ошибка при проверке данных:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Автоматическое восстановление данных из бэкапа');
  console.log('=' .repeat(50));
  
  try {
    // Проверяем подключение
    await prisma.$connect();
    console.log('✅ Подключение к базе данных установлено');
    
    // Восстанавливаем данные в правильном порядке
    const results = {
      providers: await restoreProviders(),
      mechanics: await restoreMechanics(),
      themes: await restoreThemes(),
      categories: await restoreCategories(),
      slots: await restoreSlots()
    };
    
    // Проверяем результат
    const success = await verifyData();
    
    console.log('\n' + '='.repeat(50));
    if (success) {
      console.log('🎉 Восстановление данных завершено успешно!');
    } else {
      console.log('⚠️  Восстановление завершено с предупреждениями');
    }
    
  } catch (error) {
    console.error('❌ Критическая ошибка:', error.message);
    
    if (error.message.includes('FATAL: Tenant or user not found')) {
      console.log('\n🔧 Проблема с подключением к Supabase:');
      console.log('1. Проверьте DATABASE_URL в .env файле');
      console.log('2. Убедитесь, что Supabase проект активен');
      console.log('3. Попробуйте восстановить данные через Prisma Studio: http://localhost:5555');
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Запускаем восстановление
main().catch(console.error);