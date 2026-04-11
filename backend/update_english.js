const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateEnglish() {
  const slug = 'home';
  
  const content = [
    {
      id: "welcome",
      icon: "solar:star-bold-duotone",
      title: "Welcome to the Ultimate Casino Catalog",
      text: "<p>Dive into the most comprehensive online slots universe available. Built by enthusiasts for enthusiasts, <strong>SlotQuest</strong> provides deep analytics, authentic reviews, and a native demo mode experience.</p>"
    },
    {
      id: "providers",
      icon: "solar:crown-bold-duotone",
      title: "Elite Game Providers",
      text: "<p>We partner with industry titans like Pragmatic Play, Hacksaw, and Nolimit City to deliver the freshest releases and most explosive mechanics as soon as they hit the market.</p>"
    },
    {
      id: "free-vs-real",
      icon: "solar:wallet-bold-duotone",
      title: "Free Demo vs Real Money",
      text: "<p>Master the mechanics risk-free with our flawless demo mode. Test your bonus buy strategies and volatility tolerance before putting real money on the line at our verified partner platforms.</p>"
    },
    {
      id: "data-driven",
      icon: "solar:shield-star-bold-duotone",
      title: "Data-Driven Advantage",
      text: "<p>Arm yourself with live RTP data, extreme volatility warnings, and community-rated success metrics. Stop guessing and start hunting for maximum wins strategically.</p>"
    },
    {
      id: "review-2026",
      icon: "solar:star-fall-line-duotone",
      title: "Best Online Slots 2026 Ranking Review",
      text: "<p>The landscape of the best online slots in 2026 continues to be dominated by familiar industry giants. While the very top slots might seem predictable, players are getting a massive influx of fresh additions to legendary series alongside timeless classics.</p><p>The longevity of top provider releases is truly incredible. While regular games lose momentum quickly, flagship titles appear invulnerable, showing unprecedented performance years after their initial debut. Furthermore, the <b>Pay Anywhere + Multiplier</b> mechanics combined with high volatility continue to gain massive traction globally.</p>"
    },
    {
      id: "top-performing",
      icon: "solar:ranking-line-duotone",
      title: "Top Performing Slot Games",
      text: "<p>It comes as no surprise that mythological and candy-themed variations hold the prime spots. In 2026, <b>Super Scatter</b> variations are completely dominating player preferences. Their steady performance across international casino platforms is driven by instant max win multipliers that trigger record-breaking payouts of up to 50,000x the base bet.</p>"
    },
    {
      id: "super-scatter-era",
      icon: "solar:flame-line-duotone",
      title: "Super Scatter Era & Anticipated Releases",
      text: "<p>We are officially operating in the <i>Super Scatter Era</i>, which has effectively marginalized previous '1000' series expansions. Exclusive super features are currently the driving force behind the industry's most successful game sessions.</p><p>Simultaneously, studios focusing on extreme volatility continue satisfying hardcore fans who demand complex mechanics like <b>Expanding Wilds</b>, <b>Incremental Multipliers</b>, and patented splitting grids.</p>"
    },
    {
      id: "best-creators",
      icon: "solar:crown-line-duotone",
      title: "Best Online Slot Creators 2026",
      text: "<p>Over the last few years, market dominance has been aggressively contested. However, leading studios retain a significant edge, relentlessly capitalizing on their core franchises and expanding their thematic universes.</p><p>We have also seen aggressive innovation from specialized studios remaining true to their dark, brutal, and highly creative signature styles. These developers continuously reshape the landscape, forcing the entire industry to adapt.</p>"
    }
  ];

  const fast_filters = [
    {
      icon: "solar:star-ring-bold-duotone",
      name: "Automatic Test Filter",
      category_id: "43854788-3f9b-4816-b09d-ef21eb11ab90"
    },
    {
      icon: "solar:star-fall-line-duotone",
      name: "Best Slots 2025",
      category_id: "b6a384c1-8b51-442c-ab16-69d3b6f3785e"
    },
    {
      icon: "solar:bolt-bold",
      name: "Spicy Slots",
      category_id: "5346b20e-0cec-4927-abdf-43841c1e71e5"
    }
  ];

  try {
    await prisma.pages.update({
      where: { slug },
      data: {
        content: JSON.stringify(content),
        fast_filters: JSON.stringify(fast_filters),
      }
    });
    console.log('Successfully updated English (root) content and fast_filters.');
  } catch (error) {
    console.error('Error updating english fields:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateEnglish();
