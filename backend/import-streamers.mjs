import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📺 Seeding Streamers (Phase 5)...');

  const streamers = [
    {
      name: 'Trainwreckstv',
      slug: 'trainwreckstv',
      platform: 'Kick',
      channel_url: 'https://kick.com/trainwreckstv',
      bio_markdown: 'One of the biggest gambling streamers in history. Known for massive high-stakes sessions on slots like Wanted Dead or a Wild.'
    },
    {
      name: 'Roshtein',
      slug: 'roshtein',
      platform: 'Kick',
      channel_url: 'https://kick.com/roshtein',
      bio_markdown: 'The legendary "philosopher" of high stakes gambling. Known for his technical analysis and huge wins on Hacksaw Gaming slots.'
    },
    {
      name: 'XQC',
      slug: 'xqc',
      platform: 'Twitch',
      channel_url: 'https://twitch.tv/xqc',
      bio_markdown: 'Variety streamer who frequently dominates the gambling category with high-energy sessions.'
    }
  ];

  for (const s of streamers) {
    const existing = await prisma.streamers.findUnique({
      where: { name: s.name }
    });

    if (!existing) {
      await prisma.streamers.create({
        data: s
      });
      console.log(`✅ Created streamer: ${s.name}`);
    } else {
      console.log(`⏩ Skipping existing streamer: ${s.name}`);
    }
  }

  console.log('🎉 Streamers seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
