const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const olympus = await prisma.slots.findUnique({
    where: { slug: 'gates-of-olympus' }
  });

  if (!olympus) {
    console.log('Slot not found!');
    return;
  }

  const localizations = typeof olympus.localizations === 'string' ? JSON.parse(olympus.localizations) : (olympus.localizations || {});
  
  if (!localizations['pt-BR']) return;

  // Ensure database has the flawless SEO description!
  localizations['pt-BR'].seo_description = "Jogue a demo grátis do Gates of Olympus (O Velho do Raio)! Teste a estratégia do super scatter, alcance o max win de 5000x e divirta-se sem risco.";

  await prisma.slots.update({
    where: { id: olympus.id },
    data: { localizations }
  });
  
  console.log('SUCCESS! Updated real slots in the database.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
