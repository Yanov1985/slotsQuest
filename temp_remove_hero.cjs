const fs = require('fs')
const path = require('path')

const targetFile = path.join(__dirname, 'frontend/pages/slots/[slug].vue')
let content = fs.readFileSync(targetFile, 'utf8')

// We need to replace everything from:
//     <!-- 📱 Hero секция - полностью адаптивная -->
//     <main
//       v-else-if="slot"
// to
//     </AuroraBackground>
//   </section>

const startIndex = content.indexOf('    <!-- 📱 Hero секция - полностью адаптивная -->')
const endIndex = content.indexOf('        </section>\n\n        <!-- 📱 Правая часть: Характеристики и информация (прокручиваемая) -->')

if (startIndex !== -1 && endIndex !== -1) {
    const newHero = `    <!-- 📱 Hero секция -->
    <SlotHero
      :slot="slot"
      :show-rating-picker="showRatingPicker"
      :hover-stars="hoverStars"
      :selected-stars="selectedStars"
      :rating-submitting="ratingSubmitting"
      :rating-submitted="ratingSubmitted"
      @toggle-rating="toggleRatingPicker"
      @pick-rating="pickRating"
      @submit-rating="submitRating"
      @play-demo="playSlot"
      @play-real="playForReal"
      @image-error="handleSlotImageError"
      @video-error="handleSlotVideoError"
      @hover-star="setHover"
    >
      <template #after-hero>
        <!-- Награды и достижения (мобильные и десктоп) -->
        <aside
          v-if="slot.show_awards && slot.awards && slot.awards.length > 0"
          class="mt-5 lg:mt-0"
          aria-label="Награды и достижения"
        >
          <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
            <header class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 shadow-lg flex items-center justify-center ring-2 ring-white/20" aria-hidden="true">
                <span class="text-white text-lg">🏆</span>
              </div>
              <h3 class="text-white font-extrabold text-lg tracking-wide">Награды и достижения</h3>
            </header>

            <div class="grid grid-cols-2 gap-3" role="list">
              <div
                v-for="(award, index) in slot.awards"
                :key="index"
                :class="getAwardPublicClasses(award.color_scheme)"
                class="group relative overflow-hidden rounded-xl p-4 hover:scale-105 transition-all duration-300"
                role="listitem"
              >
                <div :class="getAwardBgClasses(award.color_scheme)" class="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl transition-colors" aria-hidden="true"></div>
                <div class="flex items-center gap-3 relative z-10">
                  <div :class="getAwardIconClasses(award.color_scheme)" class="w-9 h-9 rounded-lg flex items-center justify-center shadow" aria-hidden="true">
                    <span class="text-white text-base">{{ award.emoji || '🏆' }}</span>
                  </div>
                  <div>
                    <div class="text-white font-bold text-sm leading-snug">{{ award.title || 'Награда' }}</div>
                    <div :class="getAwardTextClasses(award.color_scheme)" class="text-xs">{{ award.description || 'Описание награды' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </template>

      <template #right-column>
`

    // Notice that we leave it open, because the <aside> for the right column and </SlotHero> closing needs to wrap the right characteristics column.
    // Actually, the <main> block wrapped the entire column layout.
    // Let's replace up to `<!-- 📱 Правая часть: Характеристики и информация (прокручиваемая) -->`

    content = content.substring(0, startIndex) + newHero + content.substring(endIndex + 19) // skip "        </section>\n"

    // We need to replace closing main:
    //         </aside>
    //       </div>
    //     </main>

    const closingMainIndex = content.lastIndexOf('    </main>')
    if (closingMainIndex !== -1) {
        content = content.substring(0, closingMainIndex) + `    </template>\n    </SlotHero>` + content.substring(closingMainIndex + 11);
    }

    // We also need to auto-import SlotHero
    const importIndex = content.indexOf("import { computed, ref, onMounted, watch, onUnmounted } from 'vue'")
    if (importIndex !== -1) {
        content = content.slice(0, importIndex) + "import SlotHero from '@/components/slots/SlotHero.vue'\n" + content.slice(importIndex)
    }

    fs.writeFileSync(targetFile, content)
    console.log('Replaced Hero block successfully, length reduced significantly.')
} else {
    console.log('Could not find start or end index for Hero block.')
}
