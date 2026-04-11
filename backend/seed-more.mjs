import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function toSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const casinos = [
  "Stake", "Roobet", "Rollbit", "Gamdom", "Duelbits", "BC.Game", "MyStake", 
  "BitStarz", "7Bit Casino", "mBit Casino", "FortuneJack", "Cloudbet", 
  "Betplay", "Vave", "Metaspins", "Winz.io", "Wild.io", "Mirax Casino", 
  "Katsubet", "Fairspin", "Weiss", "Jackbit", "Betfury", "LTC Casino",
  "JustBit", "TrueFlip", "Bets.io", "Kryptosino", "Empire.io", "Bitcasino.io"
];

const streamers = [
  "Roshtein", "Trainwreckstv", "Xposed", "ClassyBeef", "AyeZee", "Corinna Kopf", 
  "Adin Ross", "ProdigyDDK", "NELK", "xQc", "VonDice", "DeuceAce", "Fossy", 
  "Teufeurs", "CasinoDaddy", "LetsGiveItASpin", "Spintwix", "Chipmonkz", 
  "Rocknrolla", "NickSlots", "DavidLabowsky", "Moe", "Bizzo"
];

const newsTitles = [
  "Pragmatic Play Launches New Drops & Wins Promo",
  "Hacksaw Gaming Unveils Revolutionary New Game Mechanic",
  "Nolimit City Pushes Boundaries with Controversial New Slot",
  "Evolution Gaming Reports Record Q3 Revenue",
  "Relax Gaming Hands Out Massive Mega Jackpot Dream Drop",
  "Play'n GO Expands into US Markets Successfully",
  "Top 10 Crypto Casinos Dominate the Market in 2025",
  "Stake Signs Historic Partnership with Major Sports League",
  "Bitcoin Hits New ATH: What It Means for Crypto Gambling",
  "Push Gaming Releases Highly Anticipated Sequel",
  "ELK Studios Introduces X-iter 2.0 Feature",
  "Red Tiger Gaming Drops Daily Jackpots in New Region",
  "NetEnt Revamps Classic Slots for Mobile Users",
  "Yggdrasil YGS Masters Program Welcomes New Studios",
  "Big Time Gaming Licenses Megaways to More Providers",
  "Slot Trends 2025: Hold and Win Resurgence",
  "Regulation Changes: How New EU Laws Impact Affiliates",
  "Roobet Expands Globally with New Localized Sites",
  "New Live Casino Studios Opened in Europe",
  "Gamdom Partners with Major Esports Sentinels",
  "BC.Game Upgrades VIP Club with Luxury Rewards",
  "Record Breaking Win Caught on Kick Stream",
  "SlotQuest Listed as Top Affiliate Portal of the Year!",
  "Are VR Slots the Future of iGaming?",
  "Responsible Gambling: New AI Tools Detect Problem Habits",
  "Twitch Bans Unlicensed Gambling Streams: Impact Report",
  "Kick Platform Attracts Top Casino Streamers",
  "Maltese Regulators Introduce Stricter KYC Norms",
  "UKGC Releases New Guidelines for Slot Speed",
  "Curaçao Gaming License Gets a Massive Overhaul"
];

const blogs = [
  // --- BASICS & GUIDES ---
  { title: "Ultimate Guide to Slot Volatility and Variance", category: "Guides" },
  { title: "RTP Explained: How to Find the Highest Paying Slots", category: "Guides" },
  { title: "Are Online Slots Rigged? The Truth About RNG", category: "Guides" },
  { title: "How to Read a Slot Machine Paytable", category: "Guides" },
  { title: "Understanding Slot Symbols: Wilds, Scatters, and More", category: "Guides" },
  { title: "The Difference between Classic Slots and Video Slots", category: "Guides" },
  { title: "What is Hit Frequency and Why Does it Matter?", category: "Guides" },
  { title: "A Beginner's Guide to Online Casino Registration", category: "Guides" },
  { title: "Deposit Methods: Choosing the Best Way to Fund Your Account", category: "Guides" },
  { title: "How to Withdraw Your Winnings: A Step-by-Step Guide", category: "Guides" },
  { title: "Desktop vs Mobile Casino Apps: Which is Better?", category: "Guides" },
  { title: "The Pros and Cons of Playing for Free vs Real Money", category: "Guides" },
  { title: "What are Wagering Requirements? A Clear Explanation", category: "Guides" },
  { title: "How to Spot a Fake Online Casino", category: "Safety" },
  { title: "KYC Verification: Why Casinos Ask for Your ID", category: "Safety" },

  // --- STRATEGIES ---
  { title: "Bankroll Management: How to Play Slots Like a Pro", category: "Strategy" },
  { title: "Best High RTP Slots for Wagering Casino Bonuses", category: "Strategy" },
  { title: "How to Maximize Free Spins Offers", category: "Strategy" },
  { title: "Is There a Best Time of Day to Play Slots?", category: "Strategy" },
  { title: "Maximum Bet vs Minimum Bet: Which Strategy Wins?", category: "Strategy" },
  { title: "Stop Loss and Take Profit: Essential Tools for Gamblers", category: "Strategy" },
  { title: "The Martingale System in Casino Games: Does it Work?", category: "Strategy" },
  { title: "Bonus Hunting: Is it Still Possible in 2025?", category: "Strategy" },
  { title: "How to Choose a Slot Based on Your Budget", category: "Strategy" },
  { title: "Low Volatility Slots for Long Play Sessions", category: "Strategy" },
  { title: "High Volatility Slots: Chasing the Dream Wins", category: "Strategy" },
  { title: "Tournament Strategies: How to Win Slot Races", category: "Strategy" },

  // --- MECHANICS ---
  { title: "Megaways Mechanics Explained: 117,649 Ways to Win", category: "Mechanics" },
  { title: "Cluster Pays: How Grid Slots Changed the Game", category: "Mechanics" },
  { title: "Cascading Reels and Tumble Features Guide", category: "Mechanics" },
  { title: "How Does Bonus Buy Work and Is It Worth It?", category: "Mechanics" },
  { title: "Jackpot Mechanics: Local vs Network Progressives", category: "Mechanics" },
  { title: "Hold and Win: Why This Feature is Dominating the Market", category: "Mechanics" },
  { title: "Expanding and Sticky Wilds: Boosting Your Win Potential", category: "Mechanics" },
  { title: "Multipliers: How They Can Explode Your Payouts", category: "Mechanics" },
  { title: "Paylines vs Ways to Win: What's the Difference?", category: "Mechanics" },
  { title: "Infinite Reels: Exploring the Newest Slot Trend", category: "Mechanics" },
  { title: "Gigablox and Colossal Symbols Explained", category: "Mechanics" },
  { title: "Splitz and Mystery Symbols: Adding Surprise to the Reels", category: "Mechanics" },

  // --- PROVIDER SPOTLIGHTS ---
  { title: "Inside Nolimit City: Why Their Slots Are So Extreme", category: "Provider Spotlight" },
  { title: "Pragmatic Play: The King of Modern Video Slots", category: "Provider Spotlight" },
  { title: "Hacksaw Gaming: From Scratchcards to Slot Superstars", category: "Provider Spotlight" },
  { title: "Evolution Gaming: Leading the Live Casino Revolution", category: "Provider Spotlight" },
  { title: "NetEnt Classics: Why Starburst is Still Top 1", category: "Provider Spotlight" },
  { title: "Play'n GO: The Masters of High-Performance Mobile Slots", category: "Provider Spotlight" },
  { title: "Relax Gaming: Home of the Billion-Dollar Dream Drop", category: "Provider Spotlight" },
  { title: "Push Gaming: High Variance Specialists", category: "Provider Spotlight" },
  { title: "ELK Studios: Innovation and X-iter Features", category: "Provider Spotlight" },
  { title: "Big Time Gaming: The Inventors of Megaways", category: "Provider Spotlight" },
  { title: "Yggdrasil Gaming: Art Meets Gambling Technology", category: "Provider Spotlight" },
  { title: "Thunderkick: The Quirky Rebels of Slot Design", category: "Provider Spotlight" },

  // --- CRYPTO & TECH ---
  { title: "Crypto Gambling vs Traditional Casinos: Pros and Cons", category: "Tech" },
  { title: "How Bitcoin Blockchain Ensures Provably Fair Play", category: "Tech" },
  { title: "Ethereum Casinos: Smart Contracts and Instant Payouts", category: "Tech" },
  { title: "Stablecoins in Gambling: Avoid Volatility while Betting", category: "Tech" },
  { title: "The Rise of Solana Casinos: Speed and Low Fees", category: "Tech" },
  { title: "Web3 and the Future of Decentralized Gambling", category: "Tech" },
  { title: "Metaverse Casinos: Gambling in Virtual Reality", category: "Tech" },
  { title: "AI in iGaming: Personalized Bonuses and Fraud Detection", category: "Tech" },
  { title: "Cybersecurity Tips for Online Casino Players", category: "Safety" },

  // --- LEGAL & RESPONSIBLE GAMBLING ---
  { title: "Online Gambling Licenses: Curaçao vs Malta (MGA)", category: "Legal" },
  { title: "The Importance of Responsible Gambling Tools", category: "Ethics" },
  { title: "Self-Exclusion Programs: How to Take a Break", category: "Ethics" },
  { title: "Understanding UKGC and Stricter Gambling Laws", category: "Legal" },
  { title: "Taxes on Gambling Winnings: A Global Overview", category: "Legal" },
  { title: "Age Verification: Protecting Minors in iGaming", category: "Ethics" },
  { title: "How eCOGRA Protects Players from Unfair Practices", category: "Legal" },

  // --- SOCIAL & TRENDS ---
  { title: "Slot Streamers: How They Make Money and Who to Follow", category: "Culture" },
  { title: "The Biggest Slot Wins of All Time Caught on Camera", category: "Culture" },
  { title: "Twitch vs Kick: The Battle for Gambling Content", category: "Culture" },
  { title: "Social Casinos: Gambling Without Real Money Pressure", category: "Culture" },
  { title: "The Psychology of Slot Themes: Why We Love Ancient Egypt", category: "Culture" },
  { title: "How Music and Sound Effects Impact Your Slot Experience", category: "Culture" },
  { title: "Slot Trends 2025: What's Next for the Industry?", category: "Tech" },

  // --- ENCYCLOPEDIA TOPICS ---
  { title: "What is an Anonymous Casino? Benefits and Risks", category: "Guides" },
  { title: "Provably Fair Gaming Explained for Beginners", category: "Tech" },
  { title: "Low Odds vs High Odds: Matching Your Playstyle", category: "Strategy" },
  { title: "The History of Slot Machines: From Liberty Bell to Video Slots", category: "History" },
  { title: "Famous Land-Based Casinos that Every Player Should Know", category: "History" },
  { title: "The Evolution of Fruit Machines into Modern Slots", category: "History" },
  { title: "Why Branded Slots (Movies/Music) Are So Popular", category: "Culture" },
  { title: "How to Read Bonus Terms and Conditions Like a Pro", category: "Strategy" },
  { title: "The Math Behind Slots: Randomness vs Probability", category: "Tech" },
  { title: "Dual-RTP Slots: Why You Must Check the Settings", category: "Strategy" },
  { title: "VPN and Gambling: Is it Legal and Safe?", category: "Legal" },
  { title: "Gambling Addiction: Signs, Symptoms, and Where to Get Help", category: "Ethics" },
  { title: "Inside a Live Casino Studio: How the Magic Happens", category: "Tech" },
  { title: "The Best Progressive Jackpot Networks in the World", category: "Top Lists" },
  { title: "Top 10 High Stakes Slots for High Rollers", category: "Top Lists" },
  { title: "Best Low Stakes Slots for Penny Players", category: "Top Lists" },
  { title: "Slot Volatility vs Hit Frequency: The Ultimate Comparison", category: "Guides" },
  { title: "How Modern Slots Use Gamification to Keep You Engaged", category: "Tech" },
  { title: "Bonus Buy Scams: What to Avoid", category: "Safety" },
  { title: "Choosing an Online Casino based on Payout Speed", category: "Strategy" },
  { title: "The Role of Affiliates in the iGaming Ecosystem", category: "Business" },
  { title: "How Aggregators Like SoftSwiss Power New Casinos", category: "Business" },
  { title: "Whale Players: Who are the World's Biggest Gamblers?", category: "Culture" },
  { title: "Las Vegas vs Macau: Comparing the World's Gambling Hubs", category: "Culture" }
];

const glossaryTerms = [
  { term: "RTP (Return to Player)", brief_definition: "The percentage of wagered money that a slot machine is programmed to pay back to players over time.", category: "Mechanics", letter: "R" },
  { term: "Volatility / Variance", brief_definition: "Measures the risk level of a slot. High volatility implies rare but large wins; low volatility means frequent but small wins.", category: "Mechanics", letter: "V" },
  { term: "Hit Frequency", brief_definition: "The probability of a single spin resulting in a winning combination.", category: "Mechanics", letter: "H" },
  { term: "Payline", brief_definition: "A line across the reels where matching symbols must land to trigger a payout.", category: "Gameplay", letter: "P" },
  { term: "Scatter Symbol", brief_definition: "A symbol that pays or triggers a feature regardless of its position on the paylines.", category: "Symbols", letter: "S" },
  { term: "Wild Symbol", brief_definition: "A symbol that substitutes for others (usually excluding scatters) to help form winning combinations.", category: "Symbols", letter: "W" },
  { term: "Multiplier", brief_definition: "A feature that multiplies your winnings by a specific amount (e.g., 2x, 5x, 10x).", category: "Features", letter: "M" },
  { term: "Free Spins", brief_definition: "Bonus rounds where the player spins the reels without deducting from their real money balance.", category: "Features", letter: "F" },
  { term: "Progressive Jackpot", brief_definition: "A jackpot that increases every time players make a bet, until it is won by a lucky player.", category: "Features", letter: "P" },
  { term: "Megaways", brief_definition: "A dynamic reel modifier mechanic created by Big Time Gaming that changes the number of symbols per reel on every spin.", category: "Mechanics", letter: "M" },
  { term: "Cascading Reels", brief_definition: "Winning symbols disappear and new symbols fall from above, potentially creating consecutive wins from a single spin.", category: "Features", letter: "C" },
  { term: "Sticky Wild", brief_definition: "A wild symbol that remains locked in place on the reels for subsequent spins.", category: "Symbols", letter: "S" },
  { term: "Expanding Wild", brief_definition: "A wild symbol that stretches to cover the entire reel it lands on.", category: "Symbols", letter: "E" },
  { term: "RNG (Random Number Generator)", brief_definition: "The algorithm used in online casinos to ensure all slot results are completely random and fair.", category: "Technical", letter: "R" },
  { term: "Bankroll", brief_definition: "The total amount of money a player has set aside specifically for gambling.", category: "Strategy", letter: "B" },
  { term: "Bonus Buy / Feature Drop", brief_definition: "An option to pay a specific amount (e.g., 100x the bet) to instantly trigger the free spins or bonus round.", category: "Features", letter: "B" },
  { term: "Wagering Requirement", brief_definition: "A multiplier that represents the number of times you must play through a bonus before you can withdraw any winnings.", category: "Promotions", letter: "W" },
  { term: "Hold and Win", brief_definition: "A popular bonus feature where players collect special symbols (usually coins) that reset respins.", category: "Features", letter: "H" },
  { term: "Cluster Pays", brief_definition: "A payout mechanic where wins are formed by landing clusters of matching symbols touching horizontally or vertically, without paylines.", category: "Mechanics", letter: "C" },
  { term: "Grid Slot", brief_definition: "A type of slot that uses a larger grid (e.g., 7x7 or 8x8) instead of traditional spinning reels.", category: "Gameplay", letter: "G" }
];

async function seedData() {
  console.log("🌱 STARTING SEED INJECTION TO MAXIMIZE SEO GENERATION...");

  // 1. Seed Casinos
  console.log(`Injecting ${casinos.length} Casinos...`);
  for (const c of casinos) {
    try {
      await prisma.casinos.upsert({
        where: { name: c },
        update: {},
        create: { name: c, slug: toSlug(c), is_active: true }
      });
    } catch (e) {
      console.warn(`  - Skipping casino "${c}": ${e.message.split('\n')[0]}`);
    }
  }

  // 2. Seed Streamers
  console.log(`Injecting ${streamers.length} Streamers...`);
  for (const s of streamers) {
    try {
      await prisma.streamers.upsert({
        where: { name: s },
        update: {},
        create: { name: s, slug: toSlug(s), platform: "Twitch/Kick" }
      });
    } catch (e) {
      console.warn(`  - Skipping streamer "${s}": ${e.message.split('\n')[0]}`);
    }
  }

  // 3. Seed News
  console.log(`Injecting ${newsTitles.length} News Articles...`);
  for (const title of newsTitles) {
    try {
      await prisma.news.upsert({
        where: { slug: toSlug(title) },
        update: {},
        create: { 
          title, 
          slug: toSlug(title),
          author_name: "SlotQuest NewsBot",
          is_published: true
        }
      });
    } catch (e) {
      console.warn(`  - Skipping news "${title}": ${e.message.split('\n')[0]}`);
    }
  }

  // 4. Seed Blogs
  console.log(`Injecting ${blogs.length} Blog Posts...`);
  for (const blog of blogs) {
    try {
      await prisma.blogs.upsert({
        where: { slug: toSlug(blog.title) },
        update: {},
        create: {
          title: blog.title,
          slug: toSlug(blog.title),
          category: blog.category,
          author_name: "SlotQuest Editor",
          is_published: true
        }
      });
    } catch (e) {
      console.warn(`  - Skipping blog "${blog.title}": ${e.message.split('\n')[0]}`);
    }
  }

  // 5. Seed Glossary
  console.log(`Injecting ${glossaryTerms.length} Glossary Terms...`);
  for (const term of glossaryTerms) {
    try {
      await prisma.glossary.upsert({
        where: { term: term.term },
        update: {},
        create: {
          term: term.term,
          slug: term.slug || toSlug(term.term),
          brief_definition: term.brief_definition,
          category: term.category,
          letter: term.letter,
          is_published: true
        }
      });
    } catch (e) {
      console.warn(`  - Skipping glossary term "${term.term}": ${e.message.split('\n')[0]}`);
    }
  }

  console.log("✅ BULK SEEDING COMPLETE! The SEO generator will now localize all these entities.");
}

seedData().catch(e => {
  console.error("Error during seeding:", e);
}).finally(() => {
  prisma.$disconnect();
});
