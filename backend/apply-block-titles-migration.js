// Скрипт для применения миграции: добавление заголовков статистических блоков
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function applyMigration() {
  try {
    console.log('🚀 Применяем миграцию: добавление заголовков блоков популярности...\n')

    // Выполняем команды по отдельности
    console.log('1️⃣ Добавляем popularity_global_title...')
    await prisma.$executeRawUnsafe(
      `ALTER TABLE slots ADD COLUMN IF NOT EXISTS popularity_global_title VARCHAR(255)`
    )

    console.log('2️⃣ Добавляем popularity_players_title...')
    await prisma.$executeRawUnsafe(
      `ALTER TABLE slots ADD COLUMN IF NOT EXISTS popularity_players_title VARCHAR(255)`
    )

    console.log('3️⃣ Добавляем popularity_rtp_title...')
    await prisma.$executeRawUnsafe(
      `ALTER TABLE slots ADD COLUMN IF NOT EXISTS popularity_rtp_title VARCHAR(255)`
    )

    console.log('\n✅ Миграция успешно применена!')
    console.log('✅ Добавлены поля:')
    console.log('   - popularity_global_title (VARCHAR 255)')
    console.log('   - popularity_players_title (VARCHAR 255)')
    console.log('   - popularity_rtp_title (VARCHAR 255)')
  } catch (error) {
    console.error('\n❌ Ошибка при применении миграции:', error.message)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

applyMigration()
