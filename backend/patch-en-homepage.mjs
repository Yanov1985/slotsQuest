import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function start() {
  console.log('📝 Fetching index page from DB...');
  const page = await prisma.pages.findUnique({ where: { slug: 'home' } });
  
  if (!page) {
    console.error('❌ Index page not found in DB!');
    return;
  }

  const localizations = page.localizations || {};
  if (!localizations.en) {
    localizations.en = {};
  }

  console.log('✍️ Injecting Reworked ClashOfSlots content exclusively into EN...');
  
  if (!Array.isArray(localizations.en.content)) {
    localizations.en.content = [];
  }

  localizations.en.content.push(
    {
      title: "Best Online Slots Rating Overview 2025",
      text: "<p>The landscape of the best online slots in 2025 continues to be dominated by familiar industry giants. While the selection of the most popular slots is somewhat expected, players are treated to a massive influx of fresh additions to legendary series alongside timeless classics.</p><p>The longevity of top-tier provider releases is truly incredible. While typical games lose momentum over time, flagship titles seem immune, demonstrating unprecedented performance years after their original debut. Furthermore, the high-volatility <b>Pay Anywhere + Multiplier</b> combinations continue to heavily trend globally, proving that players prefer mastering familiar mechanics while chasing massive maximum win potential.</p>",
      icon: "solar:star-fall-line-duotone"
    },
    {
      title: "Top Performing Slot Machines",
      text: "<p>Unsurprisingly, variations of mythological and candy-themed heavyweights secure top positions. In 2025, the <b>Super Scatter</b> variations have completely dominated player preference. Their consistent performance across international casino platforms is driven by instant maximum win multipliers that allow for record-breaking payouts up to 50,000x the base bet.</p><p>As these epic themes combine the power of Pay Anywhere with extreme volatility, they maintain an unshakeable grip on the overall global slot ratings.</p>",
      icon: "solar:ranking-line-duotone"
    },
    {
      title: "Super Scatter Era & Anticipated Releases",
      text: "<p>We are officially operating within the <i>Super Scatter Era</i>, which has effectively marginalized the previous '1000' series expansions. Exclusive super features are currently driving the most successful player sessions across the industry.</p><p>Simultaneously, studios utilizing extreme volatility continue to cater to hardcore fans who demand intricate mechanics like <b>Expanding Wilds</b>, <b>Increasing Multipliers</b>, and proprietary splitting grids. Whether you are hunting for nostalgic fruit mechanics or high-octane modern releases, the 2025 catalog offers unprecedented depth and optimization.</p>",
      icon: "solar:flame-line-duotone"
    },
    {
      title: "Top 2025 Online Slot Creators",
      text: "<p>Over the last several years, market dominance has been heavily contested. However, premier studios maintain their significant lead by relentlessly capitalizing on their core franchises and expanding their thematic universes.</p><p>We are also witnessing aggressive innovation from specialized studios who remain dedicated to their dark, gritty, and highly creative signature styles. These developers consistently disrupt the vertical, forcing the entire industry to adapt and evolve to higher standards of audiovisual excellence.</p>",
      icon: "solar:crown-line-duotone"
    }
  );

  await prisma.pages.update({
    where: { slug: 'home' },
    data: { localizations }
  });

  console.log('✅ English Homepage semantic text successfully overhauled!');
}

start()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
