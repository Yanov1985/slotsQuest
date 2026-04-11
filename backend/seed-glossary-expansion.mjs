import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const terms = [
    // Mechanics
    { term: "RNG (Random Number Generator)", slug: "rng-random-number-generator" },
    { term: "Hit Frequency", slug: "hit-frequency" },
    { term: "Payline", slug: "payline" },
    { term: "Volatility", slug: "volatility" },
    { term: "RTP (Return to Player)", slug: "rtp-return-to-player" },
    { term: "Expanding Wilds", slug: "expanding-wilds" },
    { term: "Sticky Wilds", slug: "sticky-wilds" },
    { term: "Cascading Reels", slug: "cascading-reels" },
    { term: "Multiplier", slug: "multiplier" },
    { term: "Scatter Symbol", slug: "scatter-symbol" },
    { term: "Wild Symbol", slug: "wild-symbol" },
    { term: "Free Spins", slug: "free-spins" },
    { term: "Bonus Round", slug: "bonus-round" },
    { term: "Gamble Feature", slug: "gamble-feature" },
    { term: "Cluster Pays", slug: "cluster-pays" },
    { term: "Megaways", slug: "megaways" },
    { term: "Both Ways Pay", slug: "both-ways-pay" },
    { term: "Hold and Win", slug: "hold-and-win" },
    { term: "Bonus Buy", slug: "bonus-buy" },
    { term: "Jackpot", slug: "jackpot" },
    { term: "Progressive Jackpot", slug: "progressive-jackpot" },
    { term: "Local Jackpot", slug: "local-jackpot" },
    { term: "Must-Drop Jackpot", slug: "must-drop-jackpot" },
    { term: "Feature Drop", slug: "feature-drop" },
    { term: "Nudge", slug: "nudge" },
    { term: "Re-spin", slug: "re-spin" },
    { term: "Symbol Transform", slug: "symbol-transform" },
    { term: "Walking Wilds", slug: "walking-wilds" },
    { term: "Stacked Symbols", slug: "stacked-symbols" },
    { term: "Max Win", slug: "max-win" },
    { term: "Bet Level", slug: "bet-level" },
    { term: "Coin Value", slug: "coin-value" },

    // Types of Slots
    { term: "Classic Slots", slug: "classic-slots" },
    { term: "Video Slots", slug: "video-slots" },
    { term: "3D Slots", slug: "3d-slots" },
    { term: "Vegas Slots", slug: "vegas-slots" },
    { term: "Fruit Machines", slug: "fruit-machines" },
    { term: "Branded Slots", slug: "branded-slots" },
    { term: "Grid Slots", slug: "grid-slots" },

    // Casino & Bonuses
    { term: "Wagering Requirement", slug: "wagering-requirement" },
    { term: "Playthrough", slug: "playthrough" },
    { term: "No Deposit Bonus", slug: "no-deposit-bonus" },
    { term: "Welcome Bonus", slug: "welcome-bonus" },
    { term: "Reload Bonus", slug: "reload-bonus" },
    { term: "Cashback", slug: "cashback" },
    { term: "VIP Program", slug: "vip-program" },
    { term: "Comp Points", slug: "comp-points" },
    { term: "KYC (Know Your Customer)", slug: "kyc-know-your-customer" },
    { term: "AML (Anti-Money Laundering)", slug: "aml-anti-money-laundering" },
    { term: "Withdrawal Limit", slug: "withdrawal-limit" },
    { term: "Pending Period", slug: "pending-period" },
    { term: "Audit Trail", slug: "audit-trail" },
    { term: "Certifications (GLI, eCOGRA)", slug: "gaming-certifications" },
    { term: "Licensing Authorities", slug: "licensing-authorities" },
    { term: "MGA License", slug: "mga-license" },
    { term: "Curacao License", slug: "curacao-license" },
    { term: "UKGC License", slug: "ukgc-license" },
    { term: "Responsible Gambling", slug: "responsible-gambling" },
    { term: "Self-Exclusion", slug: "self-exclusion" },
    { term: "Deposit Limits", slug: "deposit-limits" },
    { term: "Reality Check", slug: "reality-check" },
    { term: "Session Timer", slug: "session-timer" },
    { term: "House Edge", slug: "house-edge" },
    { term: "Table Games", slug: "table-games" },
    { term: "Live Dealer Games", slug: "live-dealer-games" },
    { term: "Provably Fair", slug: "provably-fair" },
    { term: "Cryptocurrency Gambling", slug: "cryptocurrency-gambling" },
    { term: "Smart Contracts in Gambling", slug: "smart-contracts-gambling" },
    { term: "Casino Software Providers", slug: "casino-software-providers" },
    { term: "Live Chat Support", slug: "live-chat-support" },
    { term: "Mobile Compatibility", slug: "mobile-compatibility" },
    { term: "Native Casino Apps", slug: "native-casino-apps" },
    { term: "Web-Based Casino", slug: "web-based-casino" },
    { term: "Social Casinos", slug: "social-casinos" },
    { term: "Sweepstakes Casinos", slug: "sweepstakes-casinos" },
    { term: "Betting Limits", slug: "betting-limits" },
    { term: "Market Volatility in iGaming", slug: "igaming-market-volatility" },
    { term: "Affiliate Marketing in Gambling", slug: "gambling-affiliate-marketing" }
];

async function main() {
    console.log(`🚀 Seeding ${terms.length} glossary terms...`);
    for (const t of terms) {
        try {
            await prisma.glossary.upsert({
                where: { slug: t.slug },
                update: {},
                create: {
                  term: t.term,
                  slug: t.slug,
                  brief_definition: `Encyclopedia entry for ${t.term}.`,
                  localizations: {}
                }
            });
            console.log(`✅ Seeded: ${t.term}`);
        } catch (e) {
            console.error(`❌ Failed: ${t.term} - ${e.message}`);
        }
    }
    console.log("🎉 Seeding complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
