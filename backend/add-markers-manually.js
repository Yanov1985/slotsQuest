const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('\n🔧 Добавляю маркеры в текст вручную...\n')

  const textWithMarkers = '[keyword_1] is a powerful slot from Pragmatic Play, drawing energy from the infinite power of Zeus, the king of the gods. In the world of ancient Greek mythology, there are dozens of online slots, but the superstar in this thematic category is none other than [keyword_3], sharing the top position with its sibling [keyword_2].'

  const result = await prisma.slots.updateMany({
    where: { slug: 'gates-of-olympus-review' },
    data: {
      overview_description_1: textWithMarkers,
      overview_keyword_1: 'Gates of Olympus',
      overview_keyword_2: 'Gates of Olympus 1,000',
      overview_keyword_3: 'Gates of Olympus',
    },
  })

  console.log('✅ Обновлено записей:', result.count)

  // Проверяем результат
  const slot = await prisma.slots.findFirst({
    where: { slug: 'gates-of-olympus-review' },
    select: {
      overview_keyword_1: true,
      overview_keyword_2: true,
      overview_keyword_3: true,
      overview_description_1: true,
    },
  })

  console.log('\n📝 Проверка:')
  console.log(`Keyword 1: "${slot.overview_keyword_1}"`)
  console.log(`Keyword 2: "${slot.overview_keyword_2}"`)
  console.log(`Keyword 3: "${slot.overview_keyword_3}"`)
  console.log(`\nТекст:\n"${slot.overview_description_1.substring(0, 200)}..."\n`)

  const hasK1 = slot.overview_description_1.includes('[keyword_1]')
  const hasK2 = slot.overview_description_1.includes('[keyword_2]')
  const hasK3 = slot.overview_description_1.includes('[keyword_3]')

  console.log('🔍 Маркеры в тексте:')
  console.log(`[keyword_1]: ${hasK1 ? '✅' : '❌'}`)
  console.log(`[keyword_2]: ${hasK2 ? '✅' : '❌'}`)
  console.log(`[keyword_3]: ${hasK3 ? '✅' : '❌'}`)

  if (hasK1 && hasK2 && hasK3) {
    console.log('\n✅ ОТЛИЧНО! Маркеры добавлены!')
    console.log('\nТеперь проверь:')
    console.log('http://localhost:3000/slots/gates-of-olympus-review')
    console.log('\nНажми Ctrl+Shift+R для жёсткой перезагрузки!\n')
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
