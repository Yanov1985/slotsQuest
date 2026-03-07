<template>
  <div class="w-full mt-12 mb-8 origin-top transition-all duration-500">

    <!-- Main Spoiler Toggle Button -->
    <div class="flex items-center justify-center mb-6">
      <button
        @click="isExpanded = !isExpanded"
        class="group flex items-center justify-between w-full max-w-2xl bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-6 py-4 transition-all duration-300 backdrop-blur-md cursor-pointer"
      >
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-transform duration-300">
            <Icon name="solar:document-text-line-duotone" class="w-5 h-5" />
          </div>
          <div class="text-left">
            <h2 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Everything About Online Slots</h2>
            <p class="text-xs text-white/50">Read our comprehensive guide to casinos, slots, and bonuses</p>
          </div>
        </div>
        <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-500 transform border border-white/10 group-hover:border-white/20" :class="{ 'rotate-180': isExpanded }">
          <Icon name="solar:alt-arrow-down-line-duotone" class="w-5 h-5 text-white/70" />
        </div>
      </button>
    </div>

    <!-- Collapsible SEO Content Grid -->
    <div
      class="grid transition-all duration-500 ease-in-out"
      :class="isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="overflow-hidden">

        <div class="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 relative overflow-hidden">

          <!-- Background Glow -->
          <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
             <div class="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
             <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
          </div>

          <!-- Navigation Menu (Left Sidebar) -->
          <nav class="lg:w-1/4 shrink-0 relative z-10 hidden md:block">
            <div class="sticky top-6 flex flex-col gap-2">
              <h3 class="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 pl-4">In this guide</h3>

              <button
                v-for="(section, index) in sections"
                :key="index"
                @click="scrollToSection(section.id)"
                class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left w-full group"
                :class="activeSection === section.id ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400' : 'hover:bg-white/5 border border-transparent text-white/60 hover:text-white'"
              >
                <Icon :name="section.icon" class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeSection === section.id ? 'text-blue-400' : 'text-white/40 group-hover:text-blue-400'" />
                <span class="text-sm font-medium">{{ section.title }}</span>
              </button>
            </div>
          </nav>

          <!-- Mobile Nav (Dropdown style) -->
          <div class="md:hidden w-full min-w-0 relative z-10 mb-4">
             <h3 class="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Jump to section</h3>
             <div class="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
                <button
                  v-for="(section, index) in sections"
                  :key="index"
                  @click="scrollToSection(section.id)"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap border text-sm font-medium"
                  :class="activeSection === section.id ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/5 border-white/10 text-white/60'"
                >
                  <Icon :name="section.icon" class="w-4 h-4 shrink-0" />
                  {{ section.title }}
                </button>
             </div>
          </div>

          <!-- Content Area (Right Side) -->
          <div class="lg:w-3/4 w-full relative z-10 html-content flex flex-col gap-12" ref="contentContainer">

            <!-- Section 1 -->
            <section :id="sections[0].id" class="scroll-mt-6 outline-none transition-opacity duration-300" tabindex="-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                  <Icon :name="sections[0].icon" class="w-6 h-6 text-blue-400" />
                </div>
                <h2 class="text-2xl font-bold text-white">{{ sections[0].title }}</h2>
              </div>
              <div class="prose prose-invert max-w-none text-white/70 space-y-4">
                <p>Welcome to <strong>SlotQuest</strong>, your ultimate destination for discovering the best online slots and trusted casino reviews in 2025. Navigating the massive ocean of online gaming shouldn't be a gamble. We provide you with the exact tools, filters, and insights needed to find the perfect slot machine without any hassle.</p>
                <p>While many gaming platforms look similar at first glance, their dedication to a fair and exciting player experience varies drastically. We've built an advanced and continuously updated catalog that analyzes slots by their Mathematics (RTP, Volatility), Mechanics (Megaways, Cascading Reels), and Theme, ensuring you're never playing blind.</p>
                <div class="p-5 mt-6 border border-blue-500/20 bg-blue-500/5 rounded-2xl">
                  <p class="text-sm text-blue-200/80 m-0"><strong class="text-blue-400">💡 Pro Tip:</strong> If you are completely new to playing online, we highly recommend starting in <em>Demo Mode</em> right here on our site. It costs absolutely nothing and allows you to test out complex Bonus Buys and features risk-free.</p>
                </div>
              </div>
            </section>

            <!-- Section 2 -->
            <section :id="sections[1].id" class="scroll-mt-6 outline-none transition-opacity duration-300" tabindex="-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/10">
                  <Icon :name="sections[1].icon" class="w-6 h-6 text-purple-400" />
                </div>
                <h2 class="text-2xl font-bold text-white">{{ sections[1].title }}</h2>
              </div>
              <div class="prose prose-invert max-w-none text-white/70 space-y-4">
                <p>A hassle-free environment is the bare minimum you should expect from a premium operator. The perfect casino lets you relax and focus entirely on the game without worrying about unfair treatment, stalled payments, or hidden terms.</p>
                <p>Before recommending any platform or letting you spin real money slots, we look for critical certificates of trust from respected organizations such as eCOGRA and independent testing labs. The best online gambling sites offer:</p>
                <ul class="list-none p-0 space-y-3 mt-4">
                  <li class="flex items-start gap-3">
                    <Icon name="solar:shield-check-bold-duotone" class="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span><strong>Lightning Fast Payouts:</strong> Good casinos don't stall. We highlight casinos known for processing withdrawals within hours, not weeks.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <Icon name="solar:wallet-money-bold-duotone" class="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span><strong>High Withdrawal Limits:</strong> We check the fine print so you don't discover a restrictive $10k/month cap only *after* hitting a jackpot.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <Icon name="solar:global-bold-duotone" class="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <span><strong>Multi-Currency Support:</strong> True freedom of choice, including top-tier crypto and localized fiat options depending on your geolocation.</span>
                  </li>
                </ul>
              </div>
            </section>

            <!-- Section 3 -->
            <section :id="sections[2].id" class="scroll-mt-6 outline-none transition-opacity duration-300" tabindex="-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-white/10">
                  <Icon :name="sections[2].icon" class="w-6 h-6 text-amber-400" />
                </div>
                <h2 class="text-2xl font-bold text-white">{{ sections[2].title }}</h2>
              </div>
              <div class="prose prose-invert max-w-none text-white/70 space-y-4">
                <p>The online casino vertical offers an insanely vast selection of titles. Content creation is continuously evolving, with studios rolling out new engines like <em>Slingo, Live Dealer Slots,</em> and <em>Infinite Reels</em>.</p>
                <p>However, traditional and modern video slots remain the undisputed kings. Navigating thousands of choices is daunting. That's why the <strong>SlotQuest Catalog</strong> features deep filtering options to narrow your search to exactly what you want to play today.</p>
                <p>Instead of thousands of overwhelming covers, you can filter down to specific mechanics like:</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div class="bg-black/30 border border-white/5 rounded-2xl p-4 flex gap-3 items-center">
                     <Icon name="solar:crown-star-bold-duotone" class="w-8 h-8 text-yellow-400" />
                     <div>
                       <strong class="text-white block">Bonus Buy</strong>
                       <span class="text-xs text-white/50">Skip the grind, buy the feature.</span>
                     </div>
                  </div>
                  <div class="bg-black/30 border border-white/5 rounded-2xl p-4 flex gap-3 items-center">
                     <Icon name="solar:bolt-bold-duotone" class="w-8 h-8 text-blue-400" />
                     <div>
                       <strong class="text-white block">Megaways™</strong>
                       <span class="text-xs text-white/50">Up to 117,649 ways to win.</span>
                     </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 4 -->
            <section :id="sections[3].id" class="scroll-mt-6 outline-none transition-opacity duration-300" tabindex="-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-white/10">
                  <Icon :name="sections[3].icon" class="w-6 h-6 text-green-400" />
                </div>
                <h2 class="text-2xl font-bold text-white">{{ sections[3].title }}</h2>
              </div>
              <div class="prose prose-invert max-w-none text-white/70 space-y-4">
                <p>A good promotion enriches your experience by extending your playtime and giving you more shots at that massive payout. From widespread Deposit Matches to No-Wager Free Spins, the key is understanding the terms.</p>
                <p>The best casinos release solid rewards without trapping you in impossible wagering requirements. We consider an industry-average wager to be around 30-40x. We also heavily emphasize casinos that offer straightforward VIP programs with weekly cashbacks.</p>
                <p><strong>Heads Up:</strong> Always check the restricted game list. High-volatility slots or those with progressive jackpots are frequently prohibited while clearing a bonus. Stick to the classic or low-volatility titles to clear your wagering faster.</p>
              </div>
            </section>

            <!-- Section 5 -->
            <section :id="sections[4].id" class="scroll-mt-6 outline-none transition-opacity duration-300" tabindex="-1">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center border border-white/10">
                  <Icon :name="sections[4].icon" class="w-6 h-6 text-rose-400" />
                </div>
                <h2 class="text-2xl font-bold text-white">{{ sections[4].title }}</h2>
              </div>
              <div class="prose prose-invert max-w-none text-white/70 space-y-4">
                <p>Before ever making a deposit at a real money casino, we believe it's paramount to test the waters. That's why nearly every slot review on SlotQuest contains an embedded, free-to-play demo version. You don't have to leave our secure site to try out a game.</p>
                <p>Simply load the slot page, hit "Play Demo", and spin. Whether you are on your powerful desktop setup or via your Android or iPhone browser, the HTML5 games scale perfectly to your screen.</p>
                <p>Once you've found a game whose math and mechanics you love, SlotQuest points you directly to the top-rated, certified safe casinos where you can play it for real money.</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isExpanded = ref(false)
const activeSection = ref('intro')
const contentContainer = ref(null)

const sections = [
  { id: 'intro', title: 'Why Trust SlotQuest?', icon: 'solar:shield-star-bold-duotone' },
  { id: 'fairness', title: 'Fair Play & Withdrawals', icon: 'solar:wallet-money-bold-duotone' },
  { id: 'games', title: 'Universe of Slots', icon: 'solar:gamepad-bold-duotone' },
  { id: 'bonuses', title: 'Hunting the Best Bonuses', icon: 'solar:gift-bold-duotone' },
  { id: 'mobile', title: 'Free Demos & Mobile Play', icon: 'solar:smartphone-bold-duotone' },
]

// Smooth scroll logic
const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const yOffset = -100 // Account for sticky headers
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
    activeSection.value = id
  }
}

// Intersection Observer for scroll highlighting
let observer = null

onMounted(() => {
  if (window.IntersectionObserver) {
    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    }, options)

    // Observe all sections once mounted
    setTimeout(() => {
      sections.forEach(section => {
        const el = document.getElementById(section.id)
        if (el) observer.observe(el)
      })
    }, 500)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
