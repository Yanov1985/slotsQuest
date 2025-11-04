#!/usr/bin/env node

/**
 * 🔍 ПРОСТАЯ ПРОВЕРКА ДАННЫХ В БАЗЕ
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  try {
    console.log('\n📊 ПРОВЕРКА ДАННЫХ В БАЗЕ\n');
    console.log('='.repeat(50));

    const providers = await prisma.providers.count();
    const mechanics = await prisma.mechanics.count();
    const themes = await prisma.themes.count();
    const categories = await prisma.slot_categories.count();
    const slots = await prisma.slots.count();

    console.log(`🏢 Провайдеры:     ${providers}`);
    console.log(`🔧 Механики:       ${mechanics}`);
    console.log(`🎨 Темы:           ${themes}`);
    console.log(`📁 Категории:      ${categories}`);
    console.log(`🎰 Слоты:          ${slots}`);
    console.log('='.repeat(50));

    if (providers > 0 || slots > 0) {
      console.log('\n✅ ДАННЫЕ ЕСТЬ В БАЗЕ!');
      console.log('\n💡 Теперь запустите:');
      console.log('   npm run start:dev');
    } else {
      console.log('\n❌ БАЗА ПУСТАЯ');
    }

  } catch (error) {
    console.error('\n❌ ОШИБКА:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
