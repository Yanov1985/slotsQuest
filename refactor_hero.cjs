const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend/components/slots/SlotHero.vue');
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = '            <!-- Title and main information -->';
// Find the exact line
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
    console.error("Could not find start marker");
    process.exit(1);
}

const endMarker = '            <!-- ЗДЕСЬ был мобильный плеер с кнопкой плей.';
const endIdx = content.indexOf(endMarker);
if (endIdx === -1) {
    console.error("Could not find end marker");
    process.exit(1);
}

const replacement = `            <!-- Unified Hero Content -->
            <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start mb-8 w-full">

              <!-- Title & Provider (Mobile Only - flex order-1) -->
              <header class="w-full lg:hidden flex flex-col gap-2 xs:gap-3 order-1" role="banner">
                <!-- Provider (mobile version) -->
                <section class="flex items-center gap-3 flex-wrap" aria-labelledby="provider-label-mobile" role="region" itemprop="provider" itemscope itemtype="https://schema.org/Organization">
                  <meta itemprop="name" :content="slot.providers?.name || 'Pragmatic Play'" />
                  <link v-if="slot.providers?.website" itemprop="url" :href="slot.providers.website" />
                  <h2 id="provider-label-mobile" class="sr-only">Game Provider Information</h2>
                  <address class="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-purple-400/30 not-italic transition-all duration-300 hover:from-purple-500/40 hover:to-pink-500/40 hover:border-purple-400/50" role="contentinfo" aria-label="Game developer and publisher information">
                    <span class="font-semibold" title="Game Provider" itemprop="name">{{ slot.providers?.name || 'Pragmatic Play' }}</span>
                  </address>
                </section>

                <!-- Main Title (mobile) -->
                <h1 class="text-2xl xs:text-3xl font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent leading-tight drop-shadow-md transition-all duration-500" tabindex="0" role="heading" aria-level="1" :aria-label="\`\${slot.name || 'Slot'} - Online slot game\`" itemprop="name">
                  <span class="block" itemprop="headline">{{ slot.name || 'Slot' }}</span>
                </h1>
              </header>

              <!-- Media (Image/Video) (order-2 on mobile, order-1 on desktop) -->
              <figure class="w-full lg:w-2/5 order-2 lg:order-1">
                <CometCard :rotate-depth="17.5" :translate-depth="20" containerClassName="w-full h-full rounded-2xl" className="relative aspect-[4/3] sm:aspect-video lg:aspect-[3/4] rounded-2xl overflow-hidden backdrop-blur-md border border-white/20 shadow-2xl">
                  <div class="absolute inset-0">
                    <div class="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-blue-500/10 pointer-events-none" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                    <div v-if="slot.media_type === 'image' && slot.image_url" class="absolute inset-0">
                      <img :src="slot.image_url" :alt="slot.name" class="w-full h-full object-cover" :style="\`object-position: \${slot.image_focus_point || 'center 20%'}\`" loading="eager" @error="$emit('image-error', $event)" />
                    </div>
                    <div v-else-if="slot.media_type === 'video' && slot.video_url" class="absolute inset-0">
                      <video :src="slot.video_url" class="w-full h-full object-cover" controls autoplay loop muted :poster="slot.image_url || ''" @error="$emit('video-error', $event)"></video>
                    </div>
                    <div v-if="!slot.image_url && !slot.video_url" class="flex items-center justify-center h-full text-white/70 bg-black/30">
                      <span>Image Placeholder</span>
                    </div>
                  </div>
                </CometCard>
              </figure>

              <!-- Content (Desktop Title/Provider, Rating, Desc, Buttons) (order-3 on mobile, order-2 on desktop) -->
              <section class="flex-1 min-w-0 w-full flex flex-col order-3 lg:order-2">
                <!-- Desktop Title & Provider -->
                <header class="hidden lg:flex flex-col gap-4 mb-6" role="banner">
                  <!-- Provider (desktop) -->
                  <section class="flex items-center gap-3 flex-wrap" aria-labelledby="provider-label-desktop" role="region">
                    <h2 id="provider-label-desktop" class="sr-only">Game Provider Information</h2>
                    <address class="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-purple-400/30 not-italic">
                      {{ slot.providers?.name || 'Pragmatic Play' }}
                    </address>
                  </section>

                  <!-- Главный заголовок (desktop) -->
                  <h1 class="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent leading-tight drop-shadow-md">
                    <span>{{ slot.name || 'Slot' }}</span>
                  </h1>
                </header>

                <!-- Rating and voting (Unified mobile/desktop) -->
                <section class="flex flex-wrap items-center gap-4 lg:gap-6 mb-4 lg:mb-8" role="group" aria-label="Rating, popularity and voting" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
                  <meta itemprop="ratingValue" :content="String(slot.rating || 4.5)" />
                  <meta itemprop="bestRating" content="5" />
                  <meta itemprop="worstRating" content="1" />
                  <meta itemprop="ratingCount" :content="String(slot.reviews_count || 100)" />
                  <meta itemprop="reviewCount" :content="String(slot.reviews_count || 100)" />

                  <div class="flex items-center gap-2" :aria-label="\`Rating \${slot.rating || 4.5} out of 5 stars\`">
                    <div class="flex text-yellow-400" aria-hidden="true">
                      <!-- Responsive stars -->
                      <svg v-for="n in 5" :key="n" class="w-6 h-6 lg:w-6 lg:h-6 drop-shadow-lg cursor-pointer" :class="n <= Math.round(slot.rating || 4.5) ? 'text-yellow-400' : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                    <span class="text-white font-bold text-lg lg:text-lg">{{ slot.rating || 4.5 }}</span>
                    <span class="hidden lg:inline text-white/60">/ 5</span>
                    <span class="text-white/50 lg:text-white/40 text-sm lg:ml-2">({{ formatNumber(slot.reviews_count || 100) }} reviews)</span>
                  </div>

                  <div v-if="slot.play_count && slot.play_count > 0" class="hidden xs:flex items-center gap-1.5 px-2.5 py-1 lg:px-3 lg:py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-400/30">
                    <span class="text-xs lg:text-sm font-bold text-orange-300">🔥 {{ formatNumber(slot.play_count) }} plays</span>
                  </div>

                  <button
                    class="px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-sm font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors ml-auto lg:ml-0"
                    @click="$emit('toggle-rating')"
                    :aria-expanded="showRatingPicker"
                    type="button"
                  >
                    ⭐ Rate
                  </button>
                </section>

                <!-- Voting panel (Unified) -->
                <div v-if="showRatingPicker" class="mt-2 mb-4 lg:mb-6 p-4 bg-white/10 border border-white/20 rounded-xl w-full">
                  <div class="flex items-center justify-between gap-4 flex-wrap">
                    <div class="flex items-center gap-3">
                      <button
                        class="px-3 py-1 rounded-full text-sm font-semibold bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 transition-colors"
                        :class="{'bg-white/20 text-white': hoverStars === 0 || selectedStars === 0}"
                        @mouseenter="setHover(0)" @mouseleave="setHover(selectedStars ?? 0)" @click="$emit('pick-rating', 0)"
                      >0</button>
                      <div class="flex text-yellow-400">
                        <button
                          v-for="n in 5" :key="n"
                          class="w-6 h-6 lg:w-7 lg:h-7 cursor-pointer transition-all duration-200"
                          :class="[hoverStars >= n || (hoverStars === 0 && (selectedStars || 0) >= n) ? 'opacity-100 scale-110' : 'opacity-40']"
                          @mouseenter="setHover(n)" @mouseleave="setHover(selectedStars || 0)" @click="$emit('pick-rating', n)"
                        >
                          <svg fill="currentColor" viewBox="0 0 20 20" class="w-full h-full"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        </button>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <button
                        class="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-md disabled:opacity-50"
                        :disabled="selectedStars === null || ratingSubmitting"
                        @click="$emit('submit-rating')"
                      >
                        {{ ratingSubmitting ? '...' : 'Submit' }}
                      </button>
                      <button class="px-4 py-2 rounded-xl text-sm font-bold bg-white/10 text-white" @click="$emit('toggle-rating')">Cancel</button>
                      <div v-if="ratingSubmitted" class="block lg:hidden w-full text-center mt-2 text-emerald-300 font-semibold text-sm">✔ Vote counted!</div>
                      <div v-if="ratingSubmitted" class="hidden lg:flex items-center gap-2 text-emerald-300 font-semibold">✔ Vote counted!</div>
                    </div>
                  </div>
                </div>

                <!-- 🖥️ Описание слота (Unified) -->
                <section class="mb-4 lg:mb-6" role="region" aria-labelledby="slot-description">
                  <meta itemprop="description" :content="shortDescriptionRaw" />
                  <p id="slot-description" class="text-sm sm:text-base lg:text-lg leading-relaxed lg:leading-loose text-justify text-white/90 font-normal tracking-wide max-w-prose">
                    <span class="text-white/85" v-html="shortDescriptionHtml"></span>
                  </p>
                </section>

                <!-- Game option buttons (Unified) order-4 on mobile, order-3 on desktop -->
                <nav class="flex flex-col gap-3 lg:gap-4 w-full max-w-md mx-auto lg:mx-0 mt-2 lg:mt-0 order-4 lg:order-3">
                  <BackgroundGradient :animate="true" className="rounded-xl lg:rounded-2xl" containerClassName="w-full">
                    <component
                      :is="slot.demo_url ? 'a' : 'button'"
                      :href="slot.demo_url ? slot.demo_url : null"
                      target="_blank"
                      rel="nofollow noopener"
                      class="group relative w-full bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-sm border border-emerald-400/30 text-white text-base lg:text-lg font-black py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02] lg:hover:-translate-y-2 lg:hover:scale-[1.03] flex items-center justify-center gap-2 lg:gap-3"
                      @click="!slot.demo_url ? $emit('play-demo') : null"
                    >
                      <span class="relative z-10 whitespace-nowrap font-extrabold tracking-wide">Play Free Demo</span>
                      <span class="relative z-10 bg-emerald-500/30 text-[10px] lg:text-xs px-2 py-0.5 lg:px-3 lg:py-1 rounded-full font-bold border border-emerald-400/50 shadow-lg">DEMO</span>
                    </component>
                  </BackgroundGradient>

                  <BackgroundGradient :animate="true" className="rounded-xl lg:rounded-2xl" containerClassName="w-full">
                    <component
                      :is="slot.real_play_url ? 'a' : 'button'"
                      :href="slot.real_play_url ? slot.real_play_url : null"
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      class="group relative w-full bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm border border-orange-400/30 text-white text-base lg:text-lg font-black py-3 lg:py-4 px-4 lg:px-6 rounded-xl lg:rounded-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02] lg:hover:-translate-y-2 lg:hover:scale-[1.03] flex items-center justify-center gap-2 lg:gap-3"
                      @click="!slot.real_play_url ? $emit('play-real') : null"
                    >
                      <span class="relative z-10 whitespace-nowrap font-extrabold tracking-wide">Play for Real Money</span>
                      <span class="relative z-10 bg-orange-500/30 text-[10px] lg:text-xs px-2 py-0.5 lg:px-3 lg:py-1 rounded-full font-bold border border-orange-400/50 shadow-lg">REAL</span>
                    </component>
                  </BackgroundGradient>
                </nav>
              </section>
            </div>
`;

content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully generated unified responsive structure in SlotHero.vue');
