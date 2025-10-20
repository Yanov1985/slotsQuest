const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const slot = await prisma.slots.findFirst({
    select: {
      slug: true,
      overview_keyword_1: true,
      overview_keyword_2: true,
      overview_keyword_3: true,
      overview_description_1: true,
    },
  })

  console.log('\n✅ Ключевые слова:')
  console.log(`  keyword_1: "${slot.overview_keyword_1}"`)
  console.log(`  keyword_2: "${slot.overview_keyword_2}"`)
  console.log(`  keyword_3: "${slot.overview_keyword_3}"`)

  console.log('\n📝 Текст:')
  console.log(`"${slot.overview_description_1.substring(0, 200)}..."`)

  const has1 = slot.overview_description_1.includes('[keyword_1]')
  const has2 = slot.overview_description_1.includes('[keyword_2]')
  const has3 = slot.overview_description_1.includes('[keyword_3]')

  console.log('\n🔍 Маркеры:')
  console.log(`  [keyword_1]: ${has1 ? '✅' : '❌'}`)
  console.log(`  [keyword_2]: ${has2 ? '✅' : '❌'}`)
  console.log(`  [keyword_3]: ${has3 ? '✅' : '❌'}`)

  if (has1 || has2 || has3) {
    console.log('\n✅ РАБОТАЕТ! Маркеры найдены!\n')
  } else {
    console.log('\n❌ Маркеры не найдены! Добавь их в админке.\n')
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
