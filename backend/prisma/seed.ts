/*
 * Скрипт начального наполнения БД игровыми тематиками (themes)
 *
 * Пояснение:
 * - В проекте уже есть таблица `features` для механик слотов.
 * - Для тематик слотов используется таблица `themes` (модель Prisma `themes`).
 * - Этот скрипт добавляет стартовый набор тематик, указанных заказчиком, если их ещё нет.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Список стартовых тематик, предоставленных заказчиком
const START_THEMES: string[] = [
  'Action',
  'Adventure',
  'Ancient',
  'Animals',
  'Anime',
  'Apocalypse',
  'Arabian',
  'Asian',
  'Aztec',
  'Bars',
  'Battle',
  'Beach',
  'Bells',
  'Best American Style Slots',
  'Bet Slip',
  'Bombs',
  'Bonus Bet',
  'Bonus Buy',
  'Bonus Multiplier',
  'Bonus Wheel',
  'Books',
  'Branded',
  'Buffalos',
  'Candy',
  'Carnival',
  'Cars',
  'Cascading Reels',
  'Cashpots',
  'Cats'
]

// Утилита для генерации slug на латинице
function toSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

async function main() {
  console.log('Seeding themes...')

  // Проходим по всем тематикам и создаём их, если их ещё нет в БД
  for (const name of START_THEMES) {
    const slug = toSlug(name)

    // upsert по уникальному slug — безопасно повторно запускать скрипт
    await prisma.themes.upsert({
      where: { slug },
      update: {
        // если тема уже есть — синхронизируем только name (и держим активной)
        name,
        is_active: true
      },
      create: {
        name,
        slug,
        is_active: true
      }
    })
  }

  const total = await prisma.themes.count()
  console.log(`Themes seeding completed. Total themes in DB: ${total}`)
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
