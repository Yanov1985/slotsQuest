#!/usr/bin/env node

/**
 * 🧪 ТЕСТ ВСТАВКИ ОДНОЙ ЗАПИСИ
 *
 * Проверяем, почему не вставляются данные
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testInsert() {
  try {
    console.log('🧪 ТЕСТ ВСТАВКИ ОДНОЙ ЗАПИСИ\n');

    // Пробуем вставить одного провайдера
    const testProvider = {
      id: "test-uuid-123",
      name: "Test Provider",
      slug: "test-provider",
      description: "Test description",
      logo_url: null,
      website_url: null,
      founded_year: 2020,
      country: "USA",
      is_active: true,
      is_recommended: false,
      created_at: new Date(),
      updated_at: new Date()
    };

    console.log('📦 Пробуем вставить тестового провайдера...');
    console.log(JSON.stringify(testProvider, null, 2));

    const result = await prisma.providers.create({
      data: testProvider
    });

    console.log('\n✅ УСПЕШНО ВСТАВЛЕНО!');
    console.log('Результат:', result);

    // Проверяем
    const count = await prisma.providers.count();
    console.log(`\n📊 Всего провайдеров в базе: ${count}`);

  } catch (error) {
    console.log('\n❌ ОШИБКА:', error.message);
    console.log('\nПолная ошибка:');
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

testInsert();
