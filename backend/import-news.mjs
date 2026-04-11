import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📰 Seeding News (Phase 5)...');

  const newsItems = [
    {
      title: 'Bitcoin Hits All-Time High: Crypto Casinos See Record Traffic',
      slug: 'bitcoin-ath-crypto-casinos-2024',
      content_markdown: 'As Bitcoin breaks new records, top crypto casinos like Stake and BC.Game are reporting unprecedented player activity. Experts predict a new era of decentralized gambling.',
      tags: 'crypto,bitcoin,trends'
    },
    {
      title: 'New Regulation in Brazil: What Slot Players Need to Know',
      slug: 'brazil-gambling-regulation-2024',
      content_markdown: 'The Brazilian government has finalized the framework for online gambling. This move is expected to bring more transparency and security to the multi-billion dollar market.',
      tags: 'regulation,brazil,news'
    },
    {
      title: 'Pragmatic Play Releases "Gates of Olympus 1000": Better Than The Original?',
      slug: 'gates-of-olympus-1000-review-news',
      content_markdown: 'The sequel to the legendary hit is finally here. With a 15,000x max win potential and enhanced multipliers, players are flocking to try the new king of slots.',
      tags: 'slots,pragmatic,new-release'
    }
  ];

  for (const item of newsItems) {
    const existing = await prisma.news.findUnique({
      where: { slug: item.slug }
    });

    if (!existing) {
      await prisma.news.create({
        data: {
          ...item,
          is_published: true,
          published_at: new Date()
        }
      });
      console.log(`✅ Created news: ${item.title}`);
    } else {
      console.log(`⏩ Skipping existing news: ${item.title}`);
    }
  }

  console.log('🎉 News seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
