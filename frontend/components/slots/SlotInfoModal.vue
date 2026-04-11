<template>
  <Transition name="fade-modal">
    <div
      v-show="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div
        class="relative w-full max-w-[95vw] sm:max-w-2xl bg-[#161A21] border border-[#353A4A] rounded-2xl shadow-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto custom-scrollbar safe-area-pb transform transition-transform duration-300"
      >
        <!-- Header -->
        <div class="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-[#161A21]/95 backdrop-blur border-b border-[#353A4A]">
          <h2 class="text-lg sm:text-xl font-bold text-white truncate pr-2">
            <span class="text-[#8B5CF6]">#{{ slotData.popularity_rank || '1' }}</span>
            {{ slotData.name }}
          </h2>

          <button
            @click="closeModal"
            class="text-gray-400 hover:text-white transition-colors p-2 -mr-2 flex items-center justify-center"
            aria-label="Close modal"
          >
            <Icon name="solar:close-circle-bold" class="w-7 h-7" />
          </button>
        </div>

        <!-- Content -->
        <div class="p-4 sm:p-6 space-y-6 sm:space-y-8">
          <!-- 📖 0. Overview & Mechanics -->
          <section v-if="slotData.overview || slotData.mechanics">
            <div v-if="slotData.overview" class="mb-6">
              <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Icon name="solar:document-text-bold" class="text-[#8B5CF6] w-6 h-6" /> {{ slotData.overview_title || t('overview') }}
              </h3>
              <div class="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300 leading-relaxed bg-[#1F2937]/50 p-4 rounded-xl border border-[#374151]" v-html="slotData.overview"></div>
            </div>
            
            <div v-if="slotData.mechanics || (slotMechanics && slotMechanics.length > 0)">
              <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Icon name="solar:bolt-bold-duotone" class="text-yellow-400 w-6 h-6" /> {{ slotData.mechanics_title || t('coreMechanics') }}
              </h3>
              <div v-if="slotData.mechanics" class="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300 leading-relaxed bg-[#1F2937]/50 p-4 mb-4 rounded-xl border border-[#374151]" v-html="slotData.mechanics"></div>
              
              <!-- Dynamic Mechanics from DB -->
              <div v-if="slotMechanics && slotMechanics.length > 0" class="flex flex-wrap gap-2">
                <div v-for="(mech, i) in slotMechanics" :key="'mech-' + i" class="bg-[#1F2937]/80 rounded-xl p-3 border border-[#374151] flex-1 min-w-[200px]">
                  <h4 class="text-white font-bold text-sm mb-1">{{ mech.mechanics?.name || mech.name || mech.mechanic?.name }}</h4>
                  <p class="text-gray-400 text-xs">{{ mech.mechanics?.description || mech.description || mech.mechanic?.description }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- 🏆 1. Expert Verdict -->
          <section>
            <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:cup-star-bold" class="text-yellow-400 w-6 h-6" /> {{ t('expertVerdict') }}
            </h3>
            <div class="text-gray-300 leading-relaxed text-sm sm:text-base bg-[#1F2937]/50 p-4 rounded-xl border border-[#374151]">
              <div v-if="slotData.expert_verdict" v-html="slotData.expert_verdict"></div>
              <div v-else-if="slotData.info_expert_verdict" v-html="slotData.info_expert_verdict"></div>
              <p v-else>
                {{ slotData.name }} ({{ slotData.providers?.name || t('devFallback') }}) {{ t('isA') }} {{ getVolatilityText(slotData.volatility).toLowerCase() }} {{ t('volSlot') }} {{ slotData.rtp ? formatRTP(slotData.rtp) : '96.00' }}% {{ t('andMaxWin') }} {{ formatMaxWin(slotData.max_win) }}x.
                {{ slotData.rtp >= 96.5 ? t('aboveRTP') : t('belowRTP') }}
                {{ t('overallRate') }} {{ slotData.rating || 4.5 }} {{ t('forIts') }} {{ slotData.volatility?.toLowerCase() === 'high' ? t('highPot') : t('balPot') }}
              </p>
            </div>
          </section>

          <!-- ✅❌ 2. Pros & Cons -->
          <section>
            <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:checklist-bold" class="text-blue-400 w-6 h-6" /> {{ t('prosCons') }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <!-- Pros -->
              <div class="bg-emerald-500/5 p-3 sm:p-4 rounded-xl border border-emerald-500/20">
                <h3 class="font-semibold text-emerald-400 text-sm mb-2 flex items-center gap-1.5">
                  <Icon name="solar:check-circle-bold" class="w-4 h-4" /> {{ t('pros') }}
                </h3>
                <ul class="space-y-1.5 text-gray-300 text-xs sm:text-sm">
                  <li v-for="(pro, i) in pros" :key="'pro-'+i" class="flex items-start gap-2">
                    <Icon name="solar:add-circle-bold" class="text-emerald-400 w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{{ pro }}</span>
                  </li>
                </ul>
              </div>
              <!-- Cons -->
              <div class="bg-red-500/5 p-3 sm:p-4 rounded-xl border border-red-500/20">
                <h3 class="font-semibold text-red-400 text-sm mb-2 flex items-center gap-1.5">
                  <Icon name="solar:forbidden-circle-bold" class="w-4 h-4" /> {{ t('cons') }}
                </h3>
                <ul class="space-y-1.5 text-gray-300 text-xs sm:text-sm">
                  <li v-for="(con, i) in cons" :key="'con-'+i" class="flex items-start gap-2">
                    <Icon name="solar:minus-circle-bold" class="text-red-400 w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{{ con }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- ❓ 3. FAQ (Accordion Animated) -->
          <section>
            <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:question-square-bold" class="text-blue-400 w-6 h-6" /> {{ t('faq') }}
            </h2>
            <div class="space-y-2">
              <div
                v-for="(item, i) in faq"
                :key="'faq-'+i"
                class="group bg-[#1F2937]/50 rounded-xl border border-[#374151] overflow-hidden"
              >
                <button
                  @click="toggleFaq(i)"
                  class="w-full flex items-center justify-between p-3 sm:p-4 cursor-pointer text-white font-medium text-sm sm:text-base hover:bg-white/5 transition-colors select-none text-left"
                  :aria-expanded="openFaqIndex === i"
                >
                  <span>{{ item.question }}</span>
                  <Icon
                    name="solar:alt-arrow-down-bold"
                    class="text-gray-400 transition-transform duration-300 ml-2 shrink-0 w-5 h-5"
                    :class="{ 'rotate-180': openFaqIndex === i }"
                  />
                </button>
                <div
                  class="grid transition-all duration-300 ease-in-out"
                  :class="openFaqIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
                >
                  <div class="overflow-hidden">
                    <div class="px-3 sm:px-4 pb-3 sm:pb-4 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-[#374151]">
                      <p class="pt-3">{{ item.answer }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 📝 4. Player Reviews -->
          <section>
            <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:chart-square-bold" class="text-purple-400 w-6 h-6" /> {{ slotData.name }} {{ t('reviewAnalysis') }}
            </h2>
            <div class="space-y-3">
              <div
                v-for="(review, i) in reviews"
                :key="'review-'+i"
                class="bg-[#1F2937]/50 p-3 sm:p-4 rounded-xl border border-[#374151]"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {{ review.author?.charAt(0)?.toUpperCase() || 'U' }}
                    </div>
                    <div>
                      <div class="text-white text-sm font-medium">{{ review.author }}</div>
                      <div class="text-gray-400 text-xs">{{ review.date }}</div>
                    </div>
                  </div>
                  <div class="flex text-yellow-400 text-sm gap-0.5">
                    <Icon v-for="n in 5" :key="'star-'+i+'-'+n" :name="n <= review.rating ? 'solar:star-bold' : 'solar:star-linear'" class="w-4 h-4" />
                  </div>
                </div>
                <p class="text-gray-300 text-xs sm:text-sm leading-relaxed">{{ review.text }}</p>
              </div>
            </div>
          </section>

          <!-- 🎮 5. How to Play -->
          <section>
            <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:gamepad-bold" class="text-green-400 w-6 h-6" /> {{ t('howToPlay') }} {{ slotData.name }}
            </h2>
            <div class="space-y-3">
              <div
                v-for="(step, i) in howTo"
                :key="'step-'+i"
                class="flex items-start gap-3 sm:gap-4"
              >
                <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {{ i + 1 }}
                </div>
                <div class="pt-1">
                  <h3 class="text-white font-medium text-sm sm:text-base mb-1">{{ step.step }}</h3>
                  <p class="text-gray-400 text-xs sm:text-sm leading-relaxed">{{ step.text }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- 🔗 6. Similar Slots -->
          <section v-if="similar?.length > 0">
            <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:link-bold" class="text-orange-400 w-6 h-6" /> {{ t('similarSlots') }}
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              <NuxtLink
                v-for="sim in similar.slice(0, 6)"
                :key="sim.id"
                :to="`/slots/${sim.slug}`"
                class="bg-[#1F2937]/50 p-3 rounded-xl border border-[#374151] hover:border-[#8B5CF6]/50 transition-colors group text-center"
                @click="closeModal"
              >
                <div class="text-white text-xs sm:text-sm font-medium group-hover:text-[#8B5CF6] transition-colors truncate">{{ sim.name }}</div>
                <div class="text-gray-400 text-[10px] sm:text-xs mt-1">{{ sim.providers?.name || 'Provider' }}</div>
              </NuxtLink>
            </div>
          </section>

          <!-- CTA -->
          <section class="bg-gradient-to-r from-[#8B5CF6]/10 to-[#EC4899]/10 p-4 rounded-xl border border-[#8B5CF6]/20">
            <h2 class="text-lg font-bold text-white mb-2">{{ t('freePlayDemo') }}
            </h2>
            <p class="text-gray-300 mb-4 text-sm">
              {{ t('demoDesc').replace('{name}', slotData.name) }}
            </p>
            <component
              :is="(globalAffiliateLink || slotData.demo_url) ? 'a' : 'button'"
              :href="globalAffiliateLink ? globalAffiliateLink : (slotData.demo_url ? slotData.demo_url : null)"
              target="_blank"
              rel="nofollow noopener"
              @click="!(globalAffiliateLink || slotData.demo_url) ? playSlot() : null"
              class="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-white outline-none"
            >
              <Icon name="solar:play-bold" class="w-5 h-5" />
              <!-- Using playDemoNow specifically based on request context -->
              {{ t('playDemoNow') }}
            </component>
          </section>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { getVolatilityText, formatMaxWin, formatRTP } from '~/utils/slotFormatters'

const { locale } = useI18n()

// Local Translations for Modal Headers
const translations = {
  en: {
    expertVerdict: 'Expert Verdict',
    devFallback: 'the developer',
    isA: 'is a',
    volSlot: '-volatility slot with an RTP of',
    andMaxWin: 'and a maximum win of',
    aboveRTP: 'The above-average RTP makes it a solid choice for long sessions.',
    belowRTP: 'It delivers a balanced gaming experience suitable for most players.',
    overallRate: 'Overall, we rate it',
    forIts: '/5 for its',
    highPot: 'thrilling high-reward potential.',
    balPot: 'balanced gameplay and consistent payouts.',
    prosCons: 'Pros & Cons',
    pros: 'Pros',
    cons: 'Cons',
    faq: 'Frequently Asked Questions',
    reviewAnalysis: 'Review & Analysis',
    howToPlay: 'How to Play',
    similarSlots: 'Similar Slots You May Like',
    freePlayDemo: 'Free Play or Demo',
    demoDesc: 'You can easily try out {name} online slot at our catalog without paying real money. Take advantage of our free demo mode and dive right in!',
    playDemoNow: 'Play Demo Now'
  },
  'pt-BR': {
    expertVerdict: 'Veredito do Especialista',
    devFallback: 'o desenvolvedor',
    isA: 'é um slot de',
    volSlot: 'volatilidade com um RTP de',
    andMaxWin: 'e um ganho máximo de',
    aboveRTP: 'O RTP acima da média o torna uma escolha sólida para sessões longas.',
    belowRTP: 'Oferece uma experiência de jogo equilibrada, adequada para a maioria dos jogadores.',
    overallRate: 'No geral, avaliamos',
    forIts: '/5 por seu',
    highPot: 'alto potencial de recompensa emocionante.',
    balPot: 'jogabilidade equilibrada e pagamentos consistentes.',
    prosCons: 'Prós e Contras',
    pros: 'Prós',
    cons: 'Contras',
    faq: 'Perguntas Frequentes',
    reviewAnalysis: 'Análise e Avaliação',
    howToPlay: 'Como Jogar',
    similarSlots: 'Slots Semelhantes',
    freePlayDemo: 'Jogo Grátis ou Demo',
    demoDesc: 'Você pode testar facilmente o slot {name} em nosso catálogo sem pagar dinheiro real. Aproveite nosso modo demo gratuito e mergulhe de cabeça!',
    playDemoNow: 'Jogar Demo Agora'
  },
  ru: {
    expertVerdict: 'Вердикт эксперта',
    devFallback: 'разработчиком',
    isA: 'это слот с',
    volSlot: 'волатильностью и RTP',
    andMaxWin: 'а также максимальным выигрышем',
    aboveRTP: 'РТП выше среднего делает его отличным выбором для долгих сессий.',
    belowRTP: 'Он обеспечивает сбалансированный игровой процесс, подходящий для большинства игроков.',
    overallRate: 'В целом мы оцениваем его на',
    forIts: '/5 за его',
    highPot: 'захватывающий потенциал высоких выплат.',
    balPot: 'сбалансированный геймплей и стабильные выплаты.',
    prosCons: 'Плюсы и минусы',
    pros: 'Плюсы',
    cons: 'Минусы',
    faq: 'Часто задаваемые вопросы',
    reviewAnalysis: 'Обзор и аналитика',
    howToPlay: 'Как играть в',
    similarSlots: 'Похожие слоты',
    freePlayDemo: 'Бесплатная игра (Демо)',
    demoDesc: 'Вы можете легко попробовать онлайн-слот {name} в нашем каталоге без риска реальными деньгами. Воспользуйтесь бесплатным демо-режимом прямо сейчас!',
    playDemoNow: 'Играть Демо'
  },
  es: {
    expertVerdict: 'Veredicto del Experto',
    devFallback: 'el desarrollador',
    isA: 'es una tragamonedas de',
    volSlot: 'volatilidad con un RTP de',
    andMaxWin: 'y una ganancia máxima de',
    aboveRTP: 'El RTP por encima de la media lo convierte en una opción sólida.',
    belowRTP: 'Ofrece una experiencia de juego equilibrada.',
    overallRate: 'En general, lo calificamos con',
    forIts: '/5 por su',
    highPot: 'emocionante potencial de altas recompensas.',
    balPot: 'jugabilidad equilibrada y pagos consistentes.',
    prosCons: 'Pros y Contras',
    pros: 'Pros',
    cons: 'Contras',
    faq: 'Preguntas Frecuentes',
    reviewAnalysis: 'Análisis y Reseña',
    howToPlay: 'Cómo Jugar',
    similarSlots: 'Tragamonedas Similares',
    freePlayDemo: 'Juego Gratis (Demo)',
    demoDesc: 'Puedes probar fácilmente este slot en línea en nuestro catálogo sin pagar dinero real.',
    playDemoNow: 'Jugar Demo Ahora'
  },
  fr: {
    expertVerdict: 'Verdict de l\'Expert', devFallback: 'le développeur', isA: 'est une machine à sous à', volSlot: 'volatilité avec un RTP de', andMaxWin: 'et un gain max de', aboveRTP: 'Le RTP le rend excellent pour les longues sessions.', belowRTP: 'Il offre une expérience équilibrée.', overallRate: 'Nous le notons', forIts: '/5 pour son', highPot: 'potentiel de gains élevés.', balPot: 'gameplay équilibré.', prosCons: 'Avantages et Inconvénients', pros: 'Avantages', cons: 'Inconvénients', faq: 'Questions Fréquentes', reviewAnalysis: 'Avis et Analyse', howToPlay: 'Comment Jouer', similarSlots: 'Slots Similaires', freePlayDemo: 'Démo Gratuite', demoDesc: 'Essayez ce jeu gratuitement sans argent réel.', playDemoNow: 'Jouer la Démo'
  },
  it: {
    expertVerdict: 'Verdetto dell\'Esperto', devFallback: 'lo sviluppatore', isA: 'è una slot ad', volSlot: 'volatilità con un RTP del', andMaxWin: 'e una vincita massima di', aboveRTP: 'L\'RTP la rende un\'ottima scelta per lunghe sessioni.', belowRTP: 'Offre un\'esperienza equilibrata.', overallRate: 'Valutiamo', forIts: '/5 per il suo', highPot: 'emozionante potenziale.', balPot: 'gameplay equilibrato.', prosCons: 'Pro e Contro', pros: 'Pro', cons: 'Contro', faq: 'Domande Frequenti', reviewAnalysis: 'Recensione', howToPlay: 'Come Giocare', similarSlots: 'Slot Simili', freePlayDemo: 'Prova Gratuita', demoDesc: 'Prova questa slot facilmente e gratis.', playDemoNow: 'Gioca la Demo'
  },
  pl: {
    expertVerdict: 'Werdykt Eksperta', devFallback: 'deweloper', isA: 'to automat o', volSlot: 'zmienności z RTP w wysokości', andMaxWin: 'i maksymalną wygraną', aboveRTP: 'RTP czyni to solidnym wyborem na długie gry.', belowRTP: 'Dostarcza zrównoważone doświadczenie.', overallRate: 'Oceniamy go na', forIts: '/5 za jego', highPot: 'ekscytujący potencjał.', balPot: 'zrównoważoną rozgrywkę.', prosCons: 'Plusy i Minusy', pros: 'Zalety', cons: 'Wady', faq: 'Częste Pytania', reviewAnalysis: 'Recenzje i Analiza', howToPlay: 'Jak Grać', similarSlots: 'Podobne Gry', freePlayDemo: 'Darmowe Demo', demoDesc: 'Możesz wypróbować tę grę za darmo.', playDemoNow: 'Zagraj w Demo'
  },
  hi: {
    expertVerdict: 'विशेषज्ञ का निर्णय', devFallback: 'डेवलपर', isA: 'एक', volSlot: 'अस्थिरता वाला स्लॉट है जिसका RTP', andMaxWin: 'और अधिकतम जीत', aboveRTP: 'औसत से अधिक RTP इसे एक ठोस विकल्प बनाता है।', belowRTP: 'यह एक संतुलित अनुभव प्रदान करता है।', overallRate: 'हम इसे', forIts: '/5 रेट करते हैं इसके', highPot: 'रोमांचक जीत की क्षमता के लिए।', balPot: 'संतुलित गेमप्ले के लिए।', prosCons: 'पक्ष और विपक्ष', pros: 'फायदे', cons: 'नुकसान', faq: 'अक्सर पूछे जाने वाले प्रश्न', reviewAnalysis: 'समीक्षा', howToPlay: 'कैसे खेलें', similarSlots: 'समान स्लॉट', freePlayDemo: 'मुफ्त डेमो', demoDesc: 'आप इस स्लॉट को बिना पैसे के आज़मा सकते हैं।', playDemoNow: 'डेमो खेलें'
  },
  tr: {
    expertVerdict: 'Uzman Görüşü',
    devFallback: 'geliştirici',
    isA: 'bir',
    volSlot: 'oynaklık slotudur; RTP oranı',
    andMaxWin: 've maksimum kazancı',
    aboveRTP: 'Ortalamanın üzerindeki RTP, onu uzun seanslar için sağlam bir seçim haline getirir.',
    belowRTP: 'Çoğu oyuncu için uygun dengeli bir oyun deneyimi sunar.',
    overallRate: 'Genel olarak, ona',
    forIts: '/5 veriyoruz; nedeni',
    highPot: 'heyecan verici yüksek ödül potansiyeli.',
    balPot: 'dengeli oynanış ve tutarlı ödemeler.',
    prosCons: 'Artılar ve Eksiler',
    pros: 'Artılar',
    cons: 'Eksiler',
    faq: 'Sıkça Sorulan Sorular',
    reviewAnalysis: 'İnceleme ve Analiz',
    howToPlay: 'Nasıl Oynanır:',
    similarSlots: 'Beğenebileceğiniz Benzer Slotlar',
    freePlayDemo: 'Ücretsiz Oyna veya Demo',
    demoDesc: 'Kataloğumuzdaki {name} slotunu gerçek para ödemeden kolayca deneyebilirsiniz. Ücretsiz demo modumuzdan yararlanın ve hemen oynamaya başlayın!',
    playDemoNow: 'Şimdi Demo Oyna'
  },
  de: {
    expertVerdict: 'Expertenurteil',
    devFallback: 'der Entwickler',
    isA: 'ist ein',
    volSlot: '-Volatilitäts-Slot mit einem RTP von',
    andMaxWin: 'und einem maximalen Gewinn von',
    aboveRTP: 'Der überdurchschnittliche RTP macht es zu einer soliden Wahl für lange Sitzungen.',
    belowRTP: 'Es bietet ein ausgewogenes Spielerlebnis, das für die meisten Spieler geeignet ist.',
    overallRate: 'Insgesamt bewerten wir es mit',
    forIts: '/5 für sein',
    highPot: 'aufregendes Potenzial für hohe Belohnungen.',
    balPot: 'ausgewogenes Gameplay und beständige Auszahlungen.',
    prosCons: 'Vor- und Nachteile',
    pros: 'Vorteile',
    cons: 'Nachteile',
    faq: 'Häufig gestellte Fragen',
    reviewAnalysis: 'Überprüfung & Analyse',
    howToPlay: 'Spielanleitung',
    similarSlots: 'Ähnliche Slots, die Ihnen gefallen könnten',
    freePlayDemo: 'Kostenloses Spiel oder Demo',
    demoDesc: 'Sie können den Online-Slot {name} in unserem Katalog ganz einfach und ohne echtes Geld ausprobieren. Nutzen Sie unseren kostenlosen Demo-Modus!',
    playDemoNow: 'Jetzt Demo Spielen'
  }
}
translations['en-IN'] = translations.en

const t = (key) => {
  const loc = locale?.value || 'en';
  const baseLoc = loc.split('-')[0];
  const lang = translations[loc] || translations[baseLoc] || translations.en;
  return lang[key] || translations.en[key] || key;
}

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  slotData: { type: Object, required: true },
  pros: { type: Array, default: () => [] },
  cons: { type: Array, default: () => [] },
  faq: { type: Array, default: () => [] },
  reviews: { type: Array, default: () => [] },
  howTo: { type: Array, default: () => [] },
  similar: { type: Array, default: () => [] },
  slotMechanics: { type: Array, default: () => [] }
})

const emit = defineEmits(['close', 'play'])

const openFaqIndex = ref(null)
const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

const globalData = useNuxtData('global-footer-data')
const globalAffiliateLink = computed(() => globalData.data.value?.global_affiliate_link || null)

const closeModal = () => emit('close')
const playSlot = () => emit('play')

const handleEsc = (e) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  document.addEventListener('keydown', handleEsc)
})

watch(() => props.isOpen, (newVal) => {
  if (typeof window === 'undefined') return
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('keydown', handleEsc)
    document.body.style.overflow = ''
  }
})
</script>
