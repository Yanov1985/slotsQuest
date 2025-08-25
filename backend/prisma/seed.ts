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

// Список стартовых механик слотов
const START_MECHANICS = [
  {
    name: 'Free Spins',
    type: 'bonus',
    description: 'Бесплатные вращения барабанов с возможностью выигрыша без дополнительных ставок',
    icon: '🎰',
    is_popular: true
  },
  {
    name: 'Wild Symbol',
    type: 'wild',
    description: 'Символ-джокер, который заменяет другие символы для создания выигрышных комбинаций',
    icon: '🃏',
    is_popular: true
  },
  {
    name: 'Scatter Symbol',
    type: 'scatter',
    description: 'Специальный символ, который активирует бонусные функции независимо от позиции на барабанах',
    icon: '💎',
    is_popular: true
  },
  {
    name: 'Multiplier',
    type: 'multiplier',
    description: 'Увеличивает выигрыш в определенное количество раз',
    icon: '✖️',
    is_popular: true
  },
  {
    name: 'Cascading Reels',
    type: 'special',
    description: 'Выигрышные символы исчезают, а новые падают сверху, создавая цепочки выигрышей',
    icon: '⬇️',
    is_popular: false
  },
  {
    name: 'Expanding Wild',
    type: 'wild',
    description: 'Wild символ, который расширяется на весь барабан',
    icon: '📏',
    is_popular: false
  },
  {
    name: 'Sticky Wild',
    type: 'wild',
    description: 'Wild символ, который остается на месте в течение нескольких спинов',
    icon: '📌',
    is_popular: false
  },
  {
    name: 'Progressive Jackpot',
    type: 'progressive',
    description: 'Прогрессивный джекпот, который увеличивается с каждой ставкой игроков',
    icon: '💰',
    is_popular: true
  },
  {
    name: 'Bonus Game',
    type: 'bonus',
    description: 'Дополнительная мини-игра с уникальными правилами и призами',
    icon: '🎮',
    is_popular: true
  },
  {
    name: 'Gamble Feature',
    type: 'special',
    description: 'Возможность удвоить выигрыш в игре на риск',
    icon: '🎲',
    is_popular: false
  },
  {
    name: 'Megaways',
    type: 'special',
    description: 'Динамическая система с изменяющимся количеством способов выиграть',
    icon: '🔄',
    is_popular: true
  },
  {
    name: 'Hold & Spin',
    type: 'bonus',
    description: 'Механика удержания определенных символов с повторными спинами',
    icon: '🔒',
    is_popular: false
  }
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

  const themesTotal = await prisma.themes.count()
  console.log(`Themes seeding completed. Total themes in DB: ${themesTotal}`)

  console.log('Seeding mechanics...')

  // Проходим по всем механикам и создаём их, если их ещё нет в БД
  for (let i = 0; i < START_MECHANICS.length; i++) {
    const mechanic = START_MECHANICS[i]
    const slug = toSlug(mechanic.name)

    // upsert по уникальному slug — безопасно повторно запускать скрипт
    await prisma.mechanics.upsert({
      where: { slug },
      update: {
        // если механика уже есть — синхронизируем данные
        name: mechanic.name,
        type: mechanic.type,
        description: mechanic.description,
        icon: mechanic.icon,
        is_popular: mechanic.is_popular,
        is_active: true
      },
      create: {
        name: mechanic.name,
        slug,
        type: mechanic.type,
        description: mechanic.description,
        icon: mechanic.icon,
        is_popular: mechanic.is_popular,
        is_active: true,
        sort_order: i + 1
      }
    })
  }

  const mechanicsTotal = await prisma.mechanics.count()
  console.log(`Mechanics seeding completed. Total mechanics in DB: ${mechanicsTotal}`)
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
