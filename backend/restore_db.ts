import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const content = [
    {
        id: "intro",
        title: "Why Trust SlotQuest?",
        icon: "solar:shield-star-bold-duotone",
        text: "<p>Welcome to <strong>SlotQuest</strong>, your ultimate destination for discovering the best online slots and trusted casino reviews in 2025. Navigating the massive ocean of online gaming shouldn't be a gamble. We provide you with the exact tools, filters, and insights needed to find the perfect slot machine without any hassle.</p><br/><p>Whether you're looking for high-RTP slots, progressive jackpots, or the latest Megaways releases, our constantly updated catalog is designed to give you an edge before you even spin the reels.</p>"
    },
    {
        id: "fairness",
        title: "Fair Play & Withdrawals",
        icon: "solar:wallet-money-bold-duotone",
        text: "<p>A hassle-free environment is the bare minimum you should expect from a premium operator. The perfect casino lets you relax and focus entirely on the game without worrying about unfair treatment, stalled payments, or hidden terms.</p><br/><p>We rigorously vet and rank casinos based on:</p><ul class=\"list-disc pl-5 mt-4 space-y-2\"><li><strong>Provably Fair Games:</strong> Verified RNG (Random Number Generator) certification by independent auditors like eCOGRA or iTech Labs.</li><li><strong>Rapid Payouts:</strong> Same-day or instant withdrawals to e-wallets and cryptocurrency. We don't recommend casinos that drag out verifications for weeks.</li><li><strong>High Withdrawal Limits:</strong> We check the fine print so you don't discover a restrictive $10k/month cap only *after* hitting a jackpot.</li><li><strong>Multi-Currency Support:</strong> True freedom of choice, including top-tier crypto and localized fiat options depending on your geolocation.</li></ul>"
    },
    {
        id: "games",
        title: "Universe of Slots",
        icon: "solar:gamepad-bold-duotone",
        text: "<p>The online casino vertical offers an insanely vast selection of titles. Content creation is continuously evolving, with studios rolling out new engines like <em>Slingo, Live Dealer Slots,</em> and <em>Infinite Reels</em>.</p><br/><p>However, traditional and modern video slots remain the undisputed kings. Navigating thousands of choices is daunting. That's why the <strong>SlotQuest Catalog</strong> features deep filtering options to narrow your search to exactly what you want to play today.</p><br/><p>Instead of thousands of overwhelming covers, you can filter down to specific mechanics like:</p><ul class=\"list-disc pl-5 mt-4 space-y-2\"><li><strong>Bonus Buy:</strong> Skip the grind, buy the feature.</li><li><strong>Megaways™:</strong> Up to 117,649 ways to win.</li></ul>"
    },
    {
        id: "bonuses",
        title: "Hunting the Best Bonuses",
        icon: "solar:gift-bold-duotone",
        text: "<p>A good promotion enriches your experience by extending your playtime and giving you more shots at that massive payout. From widespread Deposit Matches to No-Wager Free Spins, the key is understanding the terms.</p><br/><p>The best casinos release solid rewards without trapping you in impossible wagering requirements. We consider an industry-average wager to be around 30-40x. We also heavily emphasize casinos that offer straightforward VIP programs with weekly cashbacks.</p><br/><p><strong>Heads Up:</strong> Always check the restricted game list. High-volatility slots or progressive jackpots are frequently prohibited while clearing a bonus. Stick to the classic or low-volatility titles to clear your wagering faster.</p>"
    },
    {
        id: "mobile",
        title: "Free Demos & Mobile Play",
        icon: "solar:smartphone-bold-duotone",
        text: "<p>Before ever making a deposit at a real money casino, we believe it's paramount to test the waters. That's why nearly every slot review on SlotQuest contains an embedded, free-to-play demo version. You don't have to leave our secure site to try out a game.</p><br/><p>Simply load the slot page, hit \"Play Demo\", and spin. Whether you are on your powerful desktop setup or via your Android or iPhone browser, the HTML5 games scale perfectly to your screen.</p><br/><p>Once you've found a game whose math and mechanics you love, SlotQuest points you directly to the top-rated, certified safe casinos where you can play it for real money.</p>"
    }
];

async function main() {
    await prisma.pages.update({
        where: { slug: 'home' },
        data: { content: JSON.stringify(content) }
    });
    console.log("Restored 'Everything About Online Slots' content directly via Prisma.");
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
