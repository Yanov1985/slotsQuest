import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🎰 Seeding Promotions (Phase 5)...');

  const allCasinos = await prisma.casinos.findMany({
    select: { id: true, name: true, slug: true }
  });

  if (allCasinos.length === 0) {
    console.log('❌ No casinos found. Please seed casinos first.');
    return;
  }

  const promoTypes = [
    { type: 'welcome', suffix: 'Welcome Bonus', amount: '100% up to $1000' },
    { type: 'no_deposit', suffix: 'No Deposit Bonus', amount: '$20 Free Chip' },
    { type: 'free_spins', suffix: 'Free Spins', amount: '100 Free Spins' },
    { type: 'reload', suffix: 'Reload Bonus', amount: '50% up to $500' }
  ];

  for (const casino of allCasinos) {
    for (const p of promoTypes) {
      const slug = `${casino.slug}-${p.type}-bonus`.toLowerCase();
      
      const existing = await prisma.promotions.findUnique({
        where: { slug }
      });

      if (!existing) {
        await prisma.promotions.create({
          data: {
            casino_id: casino.id,
            title: `${casino.name} ${p.suffix}`,
            slug,
            promo_type: p.type,
            amount: p.amount,
            wager_requirement: '35x',
            promo_code: p.type === 'no_deposit' ? 'QUEST24' : null,
            is_exclusive: p.type === 'no_deposit',
            is_active: true
          }
        });
        console.log(`✅ Created promo: ${casino.name} ${p.type}`);
      } else {
        console.log(`⏩ Skipping existing promo: ${casino.name} ${p.type}`);
      }
    }
  }

  console.log('🎉 Promotions seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
