import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const topCasinos = [
  { name: 'Stake', slug: 'stake', website_url: 'https://stake.com', rating: 4.8 },
  { name: 'Roobet', slug: 'roobet', website_url: 'https://roobet.com', rating: 4.7 },
  { name: 'BC.Game', slug: 'bc-game', website_url: 'https://bc.game', rating: 4.6 },
  { name: '1win', slug: '1win', website_url: 'https://1win.pro', rating: 4.5 },
  { name: 'Pin-up', slug: 'pin-up', website_url: 'https://pin-up.casino', rating: 4.4 },
  { name: 'Vavada', slug: 'vavada', website_url: 'https://vavada.com', rating: 4.3 },
  { name: 'Gama', slug: 'gama', website_url: 'https://gama.casino', rating: 4.2 },
  { name: 'CatCasino', slug: 'cat-casino', website_url: 'https://catcasino.com', rating: 4.2 },
  { name: 'Stake US', slug: 'stake-us', website_url: 'https://stake.us', rating: 4.8 },
  { name: '7Bit Casino', slug: '7bit-casino', website_url: 'https://7bitcasino.com', rating: 4.1 }
];

async function seed() {
  console.log('🚀 Seeding top casinos...');
  await client.connect();
  
  for (const casino of topCasinos) {
    try {
      const res = await client.query(
        'INSERT INTO casinos (id, name, slug, website_url, rating, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) ON CONFLICT (name) DO NOTHING',
        [crypto.randomUUID(), casino.name, casino.slug, casino.website_url, casino.rating]
      );
      if (res.rowCount > 0) {
        console.log(`✅ Seeded: ${casino.name}`);
      } else {
        console.log(`⏭️ Skipped (already exists): ${casino.name}`);
      }
    } catch (err) {
      console.error(`❌ Error seeding ${casino.name}:`, err.message);
    }
  }
  
  await client.end();
  console.log('🎉 Seeding complete!');
}

seed().catch(console.error);
