<template>
  <div class="flex-1 flex flex-col">
    <JackpotConfetti />
    <!-- 📱 Навигация - адаптивная для всех устройств с эффектом стекла -->
    <nav
      class="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-lg shadow-black/20"
    >
      <div class="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div class="flex items-center justify-between gap-2">
          <!-- Кнопка назад - компактная на mobile -->
          <NuxtLink
            to="/"
            class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm sm:text-base min-w-0"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span class="hidden xs:inline">{{ $t('slug.back_to') }} </span>Slots<span class="hidden sm:inline"> {{ $t('nav.catalog') }}</span>
          </NuxtLink>

          <!-- Хлебные крошки - показываем на планшетах и выше -->
          <div class="hidden md:flex items-center text-xs sm:text-sm text-white/50 truncate">
            <NuxtLink to="/" class="hover:text-blue-400 transition-colors whitespace-nowrap"
              >{{ $t('nav.home') }}</NuxtLink
            >
            <span class="mx-1 sm:mx-2">/</span>
            <NuxtLink to="/" class="hover:text-blue-400 transition-colors whitespace-nowrap"
              >{{ $t('nav.catalog') }}</NuxtLink
            >
            <span class="mx-1 sm:mx-2">/</span>
            <span class="text-white font-medium truncate max-w-[120px] lg:max-w-[200px]" v-if="gameSlot">{{
              gameSlot.name || 'Slot'
            }}</span>
          </div>

          <!-- Мобильные хлебные крошки - только название слота -->
          <div class="md:hidden text-xs text-white/70 truncate max-w-[140px] sm:max-w-[200px]" v-if="gameSlot">
            {{ gameSlot.name || 'Slot' }}
          </div>
        </div>
      </div>
    </nav>

    <!-- Загрузка -->
    <!-- 💀 Skeleton Loading -->
    <div v-if="loading" class="min-h-screen bg-zinc-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto">
        <div class="flex flex-col lg:flex-row gap-8 animate-pulse">
          <!-- Левая колонка (Основной контент) -->
          <div class="w-full lg:w-[70%] space-y-8">

            <!-- Mobile Layout (Visible only on mobile) -->
            <div class="lg:hidden space-y-6">
               <div class="h-8 w-3/4 bg-white/5 rounded-lg"></div>
               <div class="h-6 w-1/2 bg-white/5 rounded-full"></div>
               <div class="space-y-2">
                 <div class="h-4 w-full bg-white/5 rounded"></div>
                 <div class="h-4 w-full bg-white/5 rounded"></div>
                 <div class="h-4 w-2/3 bg-white/5 rounded"></div>
               </div>
               <div class="grid grid-cols-2 gap-3 mt-4">
                 <div class="h-10 bg-white/5 rounded-lg"></div>
                 <div class="h-10 bg-white/5 rounded-lg"></div>
                 <div class="h-10 bg-white/5 rounded-lg"></div>
                 <div class="h-10 bg-white/5 rounded-lg"></div>
               </div>
               <div class="h-12 w-full bg-white/5 rounded-xl mt-4"></div>
            </div>

            <!-- Desktop Layout (Visible only on desktop) -->
            <div class="hidden lg:flex gap-8 items-start">
               <!-- Portrait Image Column (2/5) -->
               <div class="w-2/5 aspect-[3/4] bg-white/5 rounded-2xl border border-white/5"></div>

               <!-- Content Column (3/5) -->
               <div class="flex-1 space-y-6">
                 <div class="h-8 w-1/3 bg-white/5 rounded-full"></div>
                 <div class="h-12 w-3/4 bg-white/5 rounded-xl"></div>
                 <div class="space-y-3">
                   <div class="h-4 w-full bg-white/5 rounded"></div>
                   <div class="h-4 w-full bg-white/5 rounded"></div>
                   <div class="h-4 w-5/6 bg-white/5 rounded"></div>
                 </div>
                 <div class="flex gap-4 pt-4">
                   <div class="h-14 w-40 bg-white/5 rounded-xl"></div>
                   <div class="h-14 w-40 bg-white/5 rounded-xl"></div>
                 </div>
               </div>
            </div>

             <!-- Bottom Content (Common) -->
             <div class="hidden lg:grid grid-cols-2 gap-6 mt-8">
                 <div class="h-32 bg-white/5 rounded-2xl"></div>
                 <div class="h-32 bg-white/5 rounded-2xl"></div>
             </div>

          </div>

          <!-- Правая колонка (Сайдбар) -->
          <div class="hidden lg:block w-[30%] space-y-6">
            <div class="w-full h-80 bg-white/5 rounded-3xl border border-white/5"></div>
            <div class="w-full h-96 bg-white/5 rounded-3xl border border-white/5"></div>
          </div>
        </div>
      </div>
    </div>


    <!-- Ошибка -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center max-w-md mx-auto px-4">
        <div class="text-red-500 mb-6">
          <svg
            class="w-20 h-20 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
          <h2 class="text-3xl font-bold mb-4 text-gray-800">{{ $t('slug.slot_not_found') }}</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
        </div>
        <NuxtLink
          to="/"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors font-semibold"
        >
          {{ $t('slug.go_to_catalog') }}
        </NuxtLink>
      </div>
    </div>

    <!-- 📱 Hero секция -->
    <SlotHero
      :slot="gameSlot"
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
      @open-fullscreen="showFullscreenImage = true"
    >
      <template #after-hero>
        <!-- Награды и достижения (мобильные и десктоп) -->
        <aside
          v-if="gameSlot.show_awards && gameSlot.awards && gameSlot.awards.length > 0"
          class="mt-5 lg:mt-0"
          :aria-label="$t('slug.awards_and_achievements')"
        >
          <div class="bg-[#121722] border border-[#1D2535] rounded-2xl p-4">
            <header class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 shadow-lg flex items-center justify-center border border-white/10" aria-hidden="true">
                <span class="text-white text-lg">🏆</span>
              </div>
              <h2 class="text-white font-extrabold text-lg tracking-wide">{{ $t('slug.awards_and_achievements') }}</h2>
            </header>

            <div class="grid grid-cols-2 gap-3" role="list">
              <div
                v-for="(award, index) in gameSlot.awards"
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
        <!-- 📱 Правая часть: Характеристики и информация (прокручиваемая) -->
        <aside
          class="w-full lg:w-[30%] bg-[#121722] p-4 sm:p-6 md:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-[#1D2535] min-w-0 order-2 z-10"
          style="min-height: auto"
          aria-label="Game characteristics and additional information"
        >
          <div class="space-y-4 sm:space-y-6 md:space-y-8">
            <SlotCharacteristics :slot="gameSlot" />
          </div>
        </aside>
      </template>
    </SlotHero>



    <!-- 📱 Info Popup & Like Button Control Panel -->
    <div
      class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[100] flex flex-col gap-3 print:hidden safe-area-pb"
      v-if="gameSlot && gameSlot.id"
    >
      <!-- Info Button -->
      <button
        @click="showInfoModal = true"
        class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg hover:bg-white/20 transition-all hover:scale-105 group animated-gradient-border pointer-events-auto"
        aria-label="Slot Information"
      >
        <Icon name="solar:info-circle-bold" class="text-2xl group-hover:animate-pulse" />
      </button>

      <!-- Like Button -->
      <button
        @click="toggleLike"
        class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg hover:bg-white/20 transition-all hover:scale-105 group animated-gradient-border pointer-events-auto"
        :class="{ '!bg-red-500/20 !border-red-500/50': isLiked }"
        aria-label="Add to Favorites"
      >
        <span
          class="text-2xl transition-transform duration-300"
          :class="{ 'scale-125': isLiked, 'animate-[heartbeat_1s_ease-in-out_infinite]': isLiked }"
        >
          {{ isLiked ? '❤️' : '🤍' }}
        </span>
      </button>
    </div>

    <!-- 📋 Info Modal (Rendered natively for SEO, hidden visually via v-show managed inside component) -->
    <SlotInfoModal
      :is-open="showInfoModal"
      :slot-data="gameSlot"
      :pros="computedPros"
      :cons="computedCons"
      :faq="computedFaq"
      :reviews="computedReviews"
      :how-to="computedHowToPlay"
      :similar="similarSlots"
      :slot-mechanics="slotMechanics"
      @close="showInfoModal = false"
      @play="playSlot(); showInfoModal = false"
    />

    <!-- 🖼️ Fullscreen Image Modal (Teleport to Body) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showFullscreenImage && gameSlot?.image_url"
          class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
          @click="showFullscreenImage = false"
        >
          <button
            class="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
            @click="showFullscreenImage = false"
          >
            <Icon name="solar:close-circle-bold" class="w-8 h-8" />
          </button>
          <img
            :src="gameSlot.image_url"
            :alt="gameSlot.name"
            class="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/20"
            @click.stop
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSlotSEO } from '~/composables/useSlotSEO'
import {
  formatArticleDate,
  getEffectColorsFor,
  getAwardEffectColors,
  getAwardPublicClasses,
  getAwardBgClasses,
  getAwardIconClasses,
  getAwardTextClasses,
  getSlotIcon,
  getImageFormat,
  getVolatilityText,
  getMaxWin,
  formatReleaseDate,
  getSlotDescription,
  getShortDescription,
  getDetailedDescription,
  getCleanSlotName,
  getSlotNameWithKeyword,
  processCtaSubtitle,
  processConclusionRatingTitle,
  processPopularityTitle,
  processProfExpertQuote,
  processProfRecommendation,
  processConclusionText1,
  processConclusionVerdict,
  replaceKeywordsInText,
  getSlotThemes,
  getSlotBonuses,
  getSlotThemesFromDB,
  formatMaxWin,
  formatPaylines,
  formatNumber,
  mergeLocalizedSlotData
} from '~/utils/slotFormatters'

import SlotHero from '~/components/slots/SlotHero.vue'
import SlotCharacteristics from '~/components/slots/SlotCharacteristics.vue'
import SlotInfoModal from '~/components/slots/SlotInfoModal.vue'

// 🎯 Импорт composable для JSON-LD
const { getJsonLdScriptSync, fetchRawJsonLd } = useJsonLd()

// Получаем slug из роута
const route = useRoute()
const slug = route.params.slug

// 🌍 i18n Localization
const { locale } = useI18n()

// We will use existing t() function if available
// Define dynamic multi-language fallbacks
const fallbackLangObj = {
  en: {
    pro1: 'High quality graphics', pro2: 'Exciting bonus rounds', pro3: 'Mobile friendly interface',
    con1: 'High volatility might not suit everyone', con2: 'Bonus game is hard to trigger',
    howTo1: 'Select your bet size', howTo2: 'Use the plus and minus buttons to adjust your total bet amount',
    howTo3: 'Spin the reels', howTo4: 'Click the prominent spin button to start the game',
    howTo5: 'Understand the payouts', howTo6: 'Check the paytable for symbol values and feature rules',
    
    faq1q: 'Is this slot safe to play online?', faq1a: 'Yes, it is developed by a licensed and regulated game provider. All games are tested by independent auditing agencies to ensure fair play.',
    faq2q: 'What is the RTP?', faq2a: 'The Return to Player (RTP) provides a solid theoretical return over time.',
    faq3q: 'Can I play for free?', faq3a: 'Yes! You can play in free demo mode right here on our site. No registration or deposit required.',
    faq4q: 'What is the maximum win?', faq4a: 'The maximum win offers solid winning potential for players.',
    faq5q: 'What is the volatility?', faq5a: 'The volatility rules dictate how often and how much the slot pays out on average.',
    
    rev1: 'is one of my favorite slots! The graphics are stunning and the bonus features keep me coming back.',
    rev2: 'Great slot with solid RTP. The free spins feature is especially exciting. I play it regularly on our site in demo mode before wagering real money.',
    rev3: 'Decent slot from the developer. The max win potential is attractive. Love the theme and sound design. Would recommend trying the demo first.',
    
    htp1: 'Open the Demo', htp1a: 'Click the play button on this page to launch the game in free play mode. No registration or deposit required.',
    htp2: 'Set Your Bet', htp2a: 'Use the controls at the bottom of the game screen to adjust your bet size. Start with the minimum bet to learn the mechanics.',
    htp3: 'Spin the Reels', htp3a: 'Click the Spin button or press Space. Watch for winning combinations across the paylines.',
    htp4: 'Trigger Bonuses', htp4a: 'Land special symbols to activate bonus features like free spins, multipliers, and other rewards. Check the paytable for details.'
  },
  'pt-BR': {
    pro1: 'Gráficos de alta qualidade', pro2: 'Rodadas de bônus emocionantes', pro3: 'Interface amigável para celular',
    con1: 'A alta volatilidade pode não agradar a todos', con2: 'O jogo de bônus é difícil de ativar',
    howTo1: 'Selecione o tamanho da sua aposta', howTo2: 'Use os botões mais e menos para ajustar o valor da aposta',
    howTo3: 'Gire os cilindros', howTo4: 'Clique no botão de giro para iniciar o jogo',
    howTo5: 'Entenda os pagamentos', howTo6: 'Verifique a tabela de pagamentos e regras',
    
    faq1q: 'Este slot é seguro para jogar online?', faq1a: 'Sim, é desenvolvido por um provedor de jogos licenciado. Todos os jogos são testados para garantir jogo justo.',
    faq2q: 'Qual é o RTP?', faq2a: 'O Retorno ao Jogador (RTP) oferece um retorno teórico sólido ao longo do tempo.',
    faq3q: 'Posso jogar de graça?', faq3a: 'Sim! Você pode jogar no modo de demonstração gratuito aqui no nosso site. Sem registro.',
    faq4q: 'Qual é a vitória máxima?', faq4a: 'A vitória máxima oferece um sólido potencial de vitória.',
    faq5q: 'O que é a volatilidade?', faq5a: 'As regras de volatilidade ditam a frequência e a quantidade de pagamentos em média.',
    
    rev1: 'é um dos meus slots favoritos! Os gráficos são impressionantes.',
    rev2: 'Ótimo slot com RTP sólido. O recurso de rodadas grátis é muito emocionante.',
    rev3: 'Slot decente do desenvolvedor. O potencial de ganho máximo é atraente.',
    
    htp1: 'Abra o Demo', htp1a: 'Clique no botão de jogar para abrir o modo grátis. Não requer registro.',
    htp2: 'Defina a Aposta', htp2a: 'Use os controles na parte inferior para ajustar sua aposta.',
    htp3: 'Gire os Cilindros', htp3a: 'Clique em Girar ou pressione Espaço para jogar.',
    htp4: 'Ative Bônus', htp4a: 'Junte símbolos especiais para ativar recursos de bônus.'
  },
  ru: {
    pro1: 'Высококачественная графика', pro2: 'Захватывающие бонусные раунды', pro3: 'Удобный мобильный интерфейс',
    con1: 'Высокая волатильность подходит не всем', con2: 'Бонусную игру сложно активировать',
    howTo1: 'Выберите размер ставки', howTo2: 'Используйте кнопки для управления ставкой',
    howTo3: 'Вращайте барабаны', howTo4: 'Нажмите кнопку спина, чтобы начать',
    howTo5: 'Изучите выплаты', howTo6: 'Проверьте таблицу выплат',
    
    faq1q: 'Безопасно ли играть в этот слот онлайн?', faq1a: 'Да, он разработан лицензированным провайдером. Все игры тестируются на честность.',
    faq2q: 'Какой здесь RTP?', faq2a: 'Отдача игроку (RTP) обеспечивает солидный теоретический возврат.',
    faq3q: 'Можно играть бесплатно?', faq3a: 'Да! Вы можете играть в бесплатном демо-режиме прямо на нашем сайте. Без регистрации.',
    faq4q: 'Какой максимальный выигрыш?', faq4a: 'Максимальный множитель дает отличный потенциал выигрыша.',
    faq5q: 'Что такое волатильность?', faq5a: 'Волатильность определяет частоту и размер выплат.',
    
    rev1: 'один из моих любимых слотов! Графика потрясающая, а бонусы просто супер.',
    rev2: 'Отличный слот с высоким RTP. Часто играю в демо перед игрой на деньги.',
    rev3: 'Достойный релиз от провайдера. Потенциал макс. выигрыша привлекает. Советую попробовать!',
    
    htp1: 'Откройте Демо', htp1a: 'Нажмите кнопку играть на этой странице, чтобы запустить бесплатный режим. Регистрация не нужна.',
    htp2: 'Сделайте Ставку', htp2a: 'Используйте кнопки внизу экрана, чтобы выбрать размер ставки.',
    htp3: 'Вращайте Барабаны', htp3a: 'Нажмите Спин или Пробел для запуска раунда.',
    htp4: 'Ловите Бонусы', htp4a: 'Соберите специальные символы, чтобы запустить фриспины и множители.'
  },
  tr: {
    pro1: 'Yüksek kaliteli grafikler', pro2: 'Heyecan verici bonus turları', pro3: 'Mobil uyumlu arayüz',
    con1: 'Yüksek oynaklık herkese uygun olmayabilir', con2: 'Bonus oyununu tetiklemek zordur',
    howTo1: 'Bahis boyutunuzu seçin', howTo2: 'Toplam bahis miktarınızı ayarlamak için kullanın',
    howTo3: 'Makaraları döndürün', howTo4: 'Oyunu başlatmak için tıklayın',
    howTo5: 'Ödemeleri anlayın', howTo6: 'Ödeme tablosunu kontrol edin',
    
    faq1q: 'Bu slotu oynamak güvenli mi?', faq1a: 'Evet, lisanslı ve düzenlenmiş bir sağlayıcı tarafından geliştirilmiştir.',
    faq2q: 'RTP nedir?', faq2a: 'Oyuncuya Dönüş (RTP), zaman içinde sağlam bir teorik getiri sağlar.',
    faq3q: 'Ücretsiz oynayabilir miyim?', faq3a: 'Evet! Sitemizde ücretsiz demo modunda oynayabilirsiniz. Kayıt gerekmez.',
    faq4q: 'Maksimum kazanç nedir?', faq4a: 'Maksimum kazanç, oyuncular için sağlam kazanma potansiyeli sunar.',
    faq5q: 'Oynaklık nedir?', faq5a: 'Oynaklık kuralları, slotun ne sıklıkla ödeme yaptığını yönetir.',
    
    rev1: 'en sevdiğim slotlardan biri! Grafikler çarpıcı.',
    rev2: 'Sağlam RTP değeri. Bedava döndürme özelliği çok heyecan verici.',
    rev3: 'Sağlayıcıdan iyi bir slot. Temayı ve tasarımı seviyorum.',
    
    htp1: 'Demoyu Aç', htp1a: 'Oyunu ücretsiz oynamak için düğmeye tıklayın. Kayıt gerekmez.',
    htp2: 'Bahis Ayarla', htp2a: 'Bahis boyutunuzu ayarlamak için alt kısımdaki kontrolleri kullanın.',
    htp3: 'Döndür', htp3a: 'Başlamak için Döndür düğmesine tıklayın veya Boşluk tuşuna basın.',
    htp4: 'Bonus Tetikle', htp4a: 'Tetiklemek için özel sembolleri bulun.'
  },
  de: {
    pro1: 'Hochwertige Grafik', pro2: 'Spannende Bonusrunden', pro3: 'Mobilfreundliche Schnittstelle',
    con1: 'Hohe Volatilität ist möglicherweise nicht für jeden geeignet', con2: 'Bonusspiel ist schwer auszulösen',
    howTo1: 'Wählen Sie Ihren Einsatz', howTo2: 'Verwenden Sie die Tasten',
    howTo3: 'Drehen Sie die Walzen', howTo4: 'Klicken Sie auf den Button',
    howTo5: 'Auszahlungen verstehen', howTo6: 'Überprüfen Sie die Auszahlungstabelle',
    faq1q: 'Ist dieser Slot sicher?', faq1a: 'Ja, es wurde von einem lizenzierten Anbieter entwickelt.',
    faq2q: 'Was ist der RTP?', faq2a: 'Der Return to Player (RTP) bietet eine gute theoretische Rendite.',
    faq3q: 'Kann ich kostenlos spielen?', faq3a: 'Ja! Sie können bei uns im Demo-Modus spielen. Ohne Anmeldung.',
    faq4q: 'Was ist der Höchstgewinn?', faq4a: 'Der Höchstgewinn bietet großartiges Gewinnpotenzial.',
    faq5q: 'Was ist die Volatilität?', faq5a: 'Die Volatilität bestimmt, wie oft der Slot durchschnittlich auszahlt.',
    rev1: 'ist einer meiner Lieblingsslots! Die Grafik ist atemberaubend.',
    rev2: 'Toller Slot mit solidem RTP. Bevor ich um echtes Geld spiele.',
    rev3: 'Guter Slot, das Design ist großartig. Unbedingt die Demo ausprobieren!',
    htp1: 'Demo öffnen', htp1a: 'Klicken Sie auf den Play-Button.',
    htp2: 'Einsatz festlegen', htp2a: 'Passen Sie Ihren Einsatz an.',
    htp3: 'Walzen drehen', htp3a: 'Klicken Sie auf Drehen.',
    htp4: 'Bonus aktivieren', htp4a: 'Sammeln Sie Spezialsymbole.'
  },
  es: {
    pro1: 'Gráficos de alta calidad', pro2: 'Emocionantes rondas de bonificación', pro3: 'Interfaz amigable para móviles',
    con1: 'La alta volatilidad puede no ser para todos', con2: 'El juego de bonificación es difícil de activar',
    howTo1: 'Elige tu apuesta', howTo2: 'Usa los botones para ajustar tu apuesta total',
    howTo3: 'Gira los rodillos', howTo4: 'Haz clic en el botón de girar para iniciar',
    howTo5: 'Entiende los pagos', howTo6: 'Revisa la tabla de pagos para ver las reglas',
    faq1q: '¿Es seguro?', faq1a: 'Sí, está desarrollado por un proveedor con licencia.',
    faq2q: '¿Cuál es el RTP?', faq2a: 'El RTP ofrece un retorno teórico sólido.',
    faq3q: '¿Puedo jugar gratis?', faq3a: '¡Sí! Puedes jugar en modo demo en nuestro sitio. Sin registro.',
    faq4q: '¿Cuál es la ganancia máxima?', faq4a: 'La ganancia máxima ofrece un gran potencial.',
    faq5q: '¿Qué es la volatilidad?', faq5a: 'La volatilidad indica la frecuencia de los pagos.',
    rev1: '¡es uno de mis slots favoritos! Los gráficos son impresionantes.',
    rev2: 'Gran tragamonedas con buen RTP. Muy recomendable jugar el demo primero.',
    rev3: 'Un lanzamiento decente del proveedor. Todo se ve muy bien.',
    htp1: 'Abre el Demo', htp1a: 'Haz clic en el botón de jugar en esta página. No requiere registro.',
    htp2: 'Ajusta la Apuesta', htp2a: 'Utiliza los controles inferiores para establecer tu límite.',
    htp3: 'Gira', htp3a: 'Presiona Iniciar o Espacio.',
    htp4: 'Activa Bonos', htp4a: 'Obtén símbolos especiales para ganar premios mayores.'
  },
  fr: {
    pro1: 'Graphismes de haute qualité', pro2: 'Tours de bonus passionnants', pro3: 'Interface adaptée aux mobiles',
    con1: 'La forte volatilité peut ne pas convenir à tous', con2: 'Le jeu bonus est difficile à déclencher',
    howTo1: 'Choisissez la mise', howTo2: 'Ajustez votre mise', howTo3: 'Tournez les rouleaux', howTo4: 'Cliquez sur Jouer', howTo5: 'Comprenez les paiements', howTo6: 'Vérifiez la table des gains',
    faq1q: 'Est-ce sûr de jouer ?', faq1a: 'Oui, c\'est développé par un fournisseur licencié.', faq2q: 'Quel est le RTP ?', faq2a: 'Le RTP offre un bon retour théorique.', faq3q: 'Puis-je jouer gratuitement ?', faq3a: 'Oui, en mode démo sur notre site.', faq4q: 'Gain maximum ?', faq4a: 'Le potentiel de gain est très attractif.', faq5q: 'Volatilité ?', faq5a: 'La volatilité indique la fréquence des gains.',
    rev1: 'est un de mes favoris ! Graphismes superbes.', rev2: 'Très bonne machine, je joue souvent en démo.', rev3: 'Belle réalisation du développeur.',
    htp1: 'Ouvrir la Démo', htp1a: 'Cliquez sur jouer.', htp2: 'Régler la mise', htp2a: 'Utilisez les contrôles.', htp3: 'Tourner', htp3a: 'Cliquez sur Tourner.', htp4: 'Bonus', htp4a: 'Attendez les symboles spéciaux.'
  },
  it: {
    pro1: 'Grafica di alta qualità', pro2: 'Giri bonus emozionanti', pro3: 'Interfaccia compatibile per smartphone',
    con1: 'L\'alta volatilità non è per tutti', con2: 'Il gioco bonus è difficile da attivare',
    howTo1: 'Scegli la puntata', howTo2: 'Regola la tua scommessa', howTo3: 'Gira i rulli', howTo4: 'Clicca su Gioca', howTo5: 'Capisci i pagamenti', howTo6: 'Controlla la tabella dei pagamenti',
    faq1q: 'È sicuro giocare?', faq1a: 'Sì, è sviluppato da fornitori con licenza.', faq2q: 'Qual è l\'RTP?', faq2a: 'L\'RTP offre rendimenti teorici solidi.', faq3q: 'Posso giocare gratis?', faq3a: 'Sì, usa la nostra modalità demo.', faq4q: 'Vincita massima?', faq4a: 'Ottimo potenziale di vincita.', faq5q: 'Volatilità?', faq5a: 'La volatilità indica la frequenza dei pagamenti.',
    rev1: 'è la mia slot preferita! Grafica fantastica.', rev2: 'Buona slot, ci gioco sempre in demo.', rev3: 'Slot molto divertente e potenziale alto.',
    htp1: 'Apri la Demo', htp1a: 'Clicca su gioca.', htp2: 'Punta', htp2a: 'Imposta i coin.', htp3: 'Gira', htp3a: 'Clicca sul tasto per girare.', htp4: 'Bonus', htp4a: 'Trova i simboli giusti.'
  },
  pl: {
    pro1: 'Wysoka jakość grafiki', pro2: 'Ekscytujące rundy bonusowe', pro3: 'Interfejs dla urządzeń mobilnych',
    con1: 'Wysoka zmienność może nie odpowiadać każdememu', con2: 'Trudno trafić w bonus',
    howTo1: 'Wybierz zakład', howTo2: 'Użyj przycisków, aby dostosować zakład', howTo3: 'Zakręć', howTo4: 'Kliknij przycisk, aby rozpocząć grę', howTo5: 'Zrozum wypłaty', howTo6: 'Sprawdź zasady gry',
    faq1q: 'Czy to bezpieczne?', faq1a: 'Tak, dostawca jest w pełni licencjonowany.', faq2q: 'Jaki jest RTP?', faq2a: 'RTP oferuje niezły teoretyczny zwrot.', faq3q: 'Zagram za darmo?', faq3a: 'Tak, zagraj w demo bez rejestracji.', faq4q: 'Maksymalna wygrana?', faq4a: 'Masz wielkie szanse na duże pomnożenie.', faq5q: 'Co to jest zmienność?', faq5a: 'Oznacza, jak rzadko padają wielkie wygrane.',
    rev1: 'jest jedną z moich ulubionych! Piękna grafika.', rev2: 'Super świetne demo do przetestowania.', rev3: 'Dostawca zrobił genialną maszynę. Oceniam wysoko.',
    htp1: 'Otwórz Demo', htp1a: 'Kliknij graj na tej stronie.', htp2: 'Ustaw Zakład', htp2a: 'Dostosuj wartość na dole.', htp3: 'Zakręć', htp3a: 'Naciśnij spację.', htp4: 'Uruchom Bonus', htp4a: 'Złap symbole Scatter.'
  },
  hi: {
    pro1: 'उच्च गुणवत्ता वाले ग्राफिक्स', pro2: 'शानदार बोनस', pro3: 'मोबाइल के अनुकूल इंटरफ़ेस',
    con1: 'उच्च अस्थिरता सभी के लिए नहीं हो सकती है', con2: 'बोनस गेम मुश्किल है',
    howTo1: 'अपना दांव चुनें', howTo2: 'दांव सेट करने के लिए बटन का उपयोग करें', howTo3: 'रीलों को स्पिन करें', howTo4: 'खेलने के लिए स्पिन पर क्लिक करें', howTo5: 'भुगतान को समझें', howTo6: 'पे-टेबल देखें',
    faq1q: 'क्या यह सुरक्षित है?', faq1a: 'हां, यह एक लाइसेंस प्राप्त प्रदाता से है।', faq2q: 'RTP क्या है?', faq2a: 'RTP एक ठोस सैद्धांतिक वापसी प्रदान करता है।', faq3q: 'क्या मैं मुफ्त में खेल सकता हूँ?', faq3a: 'हाँ, बिना पंजीकरण के डेमो खेलें।', faq4q: 'अधिकतम जीत क्या है?', faq4a: 'अधिकतम जीत शानदार है।', faq5q: 'अस्थिरता क्या है?', faq5a: 'अस्थिरता लाभ की आवृत्ति को परिभाषित करती है।',
    rev1: 'मेरे पसंदीदा स्लॉट्स में से एक है! एनिमेशन बहुत बढ़िया है।', rev2: 'बहुत अच्छा खेल, पैसे लगाने से पहले डेमो खेलें।', rev3: 'बहुत रोमांचक स्लॉट और अच्छा ग्राफिक्स।',
    htp1: 'डेमो खोलें', htp1a: 'खेलने के लिए क्लिक करें।', htp2: 'शर्त तय करें', htp2a: 'अपनी शर्त सेट करें।', htp3: 'स्पिन', htp3a: 'घुमाएं।', htp4: 'बोनस', htp4a: 'विशेष प्रतीकों को पकड़ें।'
  }
}
const tf = (key) => {
  const loc = locale?.value || 'en';
  const baseLoc = loc.split('-')[0];
  const lang = fallbackLangObj[loc] || fallbackLangObj[baseLoc] || fallbackLangObj.en;
  return lang[key] || fallbackLangObj.en[key] || key;
}


// Инициализация реактивных состояний ДО await для сохранения контекста
const gameSlot = ref({})
const allSlots = ref([])
const slotMechanics = ref([])
const jsonLdSchemas = ref(null)
const loading = ref(true)
const error = ref(null)

// Dynamic OG Image Generation (Must be declared before any await)
defineOgImageComponent('NuxtSeo', {
  title: computed(() => gameSlot.value?.name || (gameSlot.value?.footer_company_name ? `${gameSlot.value.footer_company_name} Game` : 'Brand Game')),
  description: computed(() => `RTP: ${gameSlot.value?.rtp || '96'}% | Volatility: ${gameSlot.value?.volatility || 'Medium'} | Max Win: ${gameSlot.value?.max_win || '5000'}x`),
  theme: '#8B5CF6',
  colorMode: 'dark',
  siteName: computed(() => gameSlot.value?.footer_company_name || 'Brand'),
})

// --- SSR Data Fetching (Phase 4 SEO Optimization) ---
const { data: pageData, pending, error: fetchError, refresh } = await useAsyncData(
  `slot-page-data-${route.params.slug}`,
  async () => {
    const currentSlug = route.params.slug
    const slotRes = await $fetch(`http://127.0.0.1:3001/api/slots/${currentSlug}`)
    if (!slotRes) throw new Error(`Слот с адресом "${currentSlug}" не найден`)

    const [mechanicsRes, slotsRes, jsonLdRes] = await Promise.all([
      $fetch(`http://127.0.0.1:3001/api/mechanics/slot/${slotRes.id}`).catch(() => []),
      $fetch('http://127.0.0.1:3001/api/slots').catch(() => []),
      fetchRawJsonLd ? fetchRawJsonLd(slotRes.id).catch(() => null) : Promise.resolve(null)
    ])

    return {
      slot: slotRes,
      mechanics: mechanicsRes || [],
      allSlots: slotsRes?.data || slotsRes || [],
      jsonLd: jsonLdRes
    }
  },
  { watch: [() => route.params.slug] }
)

// Синхронизация данных при клиентских переходах или обновлении
watch([pageData, locale], ([newData, newLocale]) => {
  if (newData && newData.slot) {
    gameSlot.value = mergeLocalizedSlotData(newData.slot, newLocale)
    slotMechanics.value = newData.mechanics
    allSlots.value = newData.allSlots
    jsonLdSchemas.value = newData.jsonLd
  }
}, { deep: true, immediate: true })

watch(pending, (v) => loading.value = v)
watch(fetchError, (v) => error.value = v?.message || null)

// Первичная инициализация после первого рендера
if (pageData.value) {
  gameSlot.value = mergeLocalizedSlotData(pageData.value.slot || {}, locale.value)
  allSlots.value = pageData.value.allSlots || []
  slotMechanics.value = pageData.value.mechanics || []
  jsonLdSchemas.value = pageData.value.jsonLd || null
  loading.value = pending.value
  error.value = fetchError.value?.message || null
}

// Состояние для рейтинга
const showRatingPicker = ref(false)
const selectedStars = ref(null)
const hoverStars = ref(0)
const ratingSubmitting = ref(false)
const ratingSubmitted = ref(false)

// State for animated FAQ accordion
const openFaqIndex = ref(null)
const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

const parseField = (field1, field2) => {
  const getArray = (v) => {
    if (Array.isArray(v) && v.length > 0) return v;
    if (typeof v === 'string' && v.trim().length > 0 && v.trim() !== '[]') {
      try {
        const parsed = JSON.parse(v);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch(e) { }
    }
    return null;
  };
  return getArray(field1) || getArray(field2);
};

// 🆕 Computed properties for Enhanced Info Modal
const computedPros = computed(() => {
  const parsed = parseField(gameSlot.value.pros, gameSlot.value.info_pros);
  if (parsed) return parsed;
  
  const locStr = locale?.value || 'en';
  const baseLoc = locStr.split('-')[0];
  if (!fallbackLangObj[locStr] && !fallbackLangObj[baseLoc] && baseLoc !== 'en') return [];

  const s = gameSlot.value
  const pros = []
  if (s.rtp >= 96.5) pros.push(tf('pro1'))
  else if (s.rtp) pros.push(tf('pro1'))
  if (s.max_win >= 2000) pros.push(tf('pro2'))
  pros.push(tf('pro3'))
  return pros.slice(0, 4)
})

const computedCons = computed(() => {
  const parsed = parseField(gameSlot.value.cons, gameSlot.value.info_cons);
  if (parsed) return parsed;

  const locStr = locale?.value || 'en';
  const baseLoc = locStr.split('-')[0];
  if (!fallbackLangObj[locStr] && !fallbackLangObj[baseLoc] && baseLoc !== 'en') return [];

  const s = gameSlot.value
  const cons = []
  if (s.volatility?.toLowerCase() === 'high') cons.push(tf('con1'))
  if (s.rtp && s.rtp < 96.0) cons.push(tf('con1'))
  cons.push(tf('con2'))
  return cons.slice(0, 3)
})

const computedFaq = computed(() => {
  const parsed = parseField(gameSlot.value.faq, gameSlot.value.info_faq);
  if (parsed) return parsed;

  const locStr = locale?.value || 'en';
  const baseLoc = locStr.split('-')[0];
  if (!fallbackLangObj[locStr] && !fallbackLangObj[baseLoc] && baseLoc !== 'en') return [];

  return [
    { question: tf('faq1q'), answer: tf('faq1a') },
    { question: tf('faq2q'), answer: tf('faq2a') },
    { question: tf('faq3q'), answer: tf('faq3a') },
    { question: tf('faq4q'), answer: tf('faq4a') },
    { question: tf('faq5q'), answer: tf('faq5a') }
  ]
})

const computedReviews = computed(() => {
  const parsed = parseField(gameSlot.value.reviews, gameSlot.value.info_reviews);
  if (parsed) return parsed;

  const locStr = locale?.value || 'en';
  const baseLoc = locStr.split('-')[0];
  if (!fallbackLangObj[locStr] && !fallbackLangObj[baseLoc] && baseLoc !== 'en') return [];

  const name = gameSlot.value.name || 'Slot'
  return [
    { author: 'Alex R.', rating: 5, text: name + ' ' + tf('rev1'), date: '2024-12-15' },
    { author: 'Maria K.', rating: 4, text: tf('rev2'), date: '2024-11-28' },
    { author: 'James T.', rating: 4, text: tf('rev3'), date: '2024-10-10' }
  ]
})

const computedHowToPlay = computed(() => {
  const parsed = parseField(gameSlot.value.how_to_play, gameSlot.value.info_how_to_play);
  if (parsed) return parsed;

  const locStr = locale?.value || 'en';
  const baseLoc = locStr.split('-')[0];
  if (!fallbackLangObj[locStr] && !fallbackLangObj[baseLoc] && baseLoc !== 'en') return [];

  return [
    { step: tf('htp1'), text: tf('htp1a') },
    { step: tf('htp2'), text: tf('htp2a') },
    { step: tf('htp3'), text: tf('htp3a') },
    { step: tf('htp4'), text: tf('htp4a') }
  ]
})

const similarSlots = computed(() => {
  if (!allSlots.value?.length || !gameSlot.value?.id) return []
  const currentProvider = gameSlot.value.providers?.id
  const currentId = gameSlot.value.id
  return allSlots.value
    .filter(s => s.id !== currentId && (s.providers?.id === currentProvider || s.provider_id === currentProvider))
    .slice(0, 6)
})

// 🌍 Geo Targeting: Парсинг регионов из БД
const parsedGeoRegions = computed(() => {
  if (!gameSlot.value?.geo_regions) return []
  try {
    const regions = JSON.parse(gameSlot.value.geo_regions)
    return Array.isArray(regions) ? regions : []
  } catch (e) {
    return []
  }
})






// Вычисляемые свойства для текстов с заменой ключевых слов
// 🔑 Работает аналогично replaceKeywordsInText для hero_keyword
const overviewDescription1 = computed(() => {
  if (!gameSlot.value.overview_description_1) return ''

  let result = gameSlot.value.overview_description_1

  // Замена [keyword_1] с усиленной SEO-разметкой
  // Используем itemprop="keywords" для Schema.org + стилизацию
  if (gameSlot.value.overview_keyword_1) {
    result = result.replace(
      /\[keyword_1\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_1}</strong>`,
    )
  }

  // Замена [keyword_2] с усиленной SEO-разметкой
  if (gameSlot.value.overview_keyword_2) {
    result = result.replace(
      /\[keyword_2\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_2}</strong>`,
    )
  }

  // Замена [keyword_3] с усиленной SEO-разметкой
  if (gameSlot.value.overview_keyword_3) {
    result = result.replace(
      /\[keyword_3\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_3}</strong>`,
    )
  }

  return result
})

const overviewDescription2 = computed(() => {
  if (!gameSlot.value.overview_description_2) return ''

  let result = gameSlot.value.overview_description_2

  // Замена [keyword_1] с усиленной SEO-разметкой
  if (gameSlot.value.overview_keyword_1) {
    result = result.replace(
      /\[keyword_1\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_1}</strong>`,
    )
  }

  // Замена [keyword_2] с усиленной SEO-разметкой
  if (gameSlot.value.overview_keyword_2) {
    result = result.replace(
      /\[keyword_2\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_2}</strong>`,
    )
  }

  // Замена [keyword_3] с усиленной SEO-разметкой
  if (gameSlot.value.overview_keyword_3) {
    result = result.replace(
      /\[keyword_3\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_3}</strong>`,
    )
  }

  return result
})


// Награды теперь управляются через админку (убрали хардкод для Gates of Olympus)



// Методы

// 🎯 Initialize SEO
useSlotSEO({
  slot: gameSlot,
  parsedGeoRegions,
  computedFaq,
  computedHowToPlay,
  computedReviews,
  similarSlots,
  loading,
  error
})

// Функция для принудительного обновления данных slotа
const refreshSlot = async () => {
  await refresh()
}

const globalData = useNuxtData('global-footer-data')
const globalAffiliateLink = computed(() => {
  return globalData.data.value?.global_affiliate_link || null
})

const playSlot = () => {
  if (!gameSlot.value) return

  const link = globalAffiliateLink.value || gameSlot.value.demo_url

  // Проверяем, есть ли ссылка для демо-версии
  if (link && link.trim()) {
    // Открываем демо-версию в новой вкладке
    window.open(link, '_blank', 'noopener,noreferrer')
  } else {
    // Показываем уведомление, что демо-версия пока недоступна
    alert(`Демо-версия для игры "${gameSlot.value.name || 'slot'}" временно недоступна. Обратитесь к администратору сайта.`)
  }
}

const playForReal = () => {
  if (!gameSlot.value) return

  const link = globalAffiliateLink.value || gameSlot.value.real_play_url

  // Проверяем, есть ли ссылка для игры for real money
  if (link && link.trim()) {
    // Открываем страницу казино в новой вкладке
    window.open(link, '_blank', 'noopener,noreferrer,sponsored')
  } else {
    // Показываем уведомление с предложением связаться с поддержкой
    alert(`Игра for real money для "${gameSlot.value.name || 'slot'}" временно недоступна. Обратитесь к администратору сайта для получения информации о доступных казино.`)
  }
}

const findCasino = () => {
  if (!gameSlot.value) return
  // Здесь будет логика поиска казино с бонусами
  alert(`Поиск лучших казино для игры в ${gameSlot.value.name || 'slot'}`)
}

// Обработчики медиа событий
const handleSlotImageError = (event) => {
  event.target.parentElement.innerHTML =
    '<div class="flex items-center justify-center h-full text-white/60"><svg class="w-12 h-12 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span>Изображение не найдено</span></div>'
}

const handleSlotVideoError = (event) => {
  event.target.parentElement.innerHTML =
    '<div class="flex items-center justify-center h-full text-white/60"><svg class="w-12 h-12 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg><span>Видео не найдено</span></div>'
}



// 📱 Info Popup, Fullscreen & Like State
const showInfoModal = ref(false)
const showFullscreenImage = ref(false)

// Глобальное состояние Pinia для Лайков
import { useUserStore } from '~/stores/userStore'
const userStore = useUserStore()
const isLiked = computed(() => userStore.isLiked(gameSlot.value?.id))

const toggleLike = () => {
  userStore.toggleLike(gameSlot.value?.id)
}






// Методы для рейтинга
const toggleRatingPicker = () => {
  showRatingPicker.value = !showRatingPicker.value
  if (!showRatingPicker.value) {
    selectedStars.value = null
    hoverStars.value = 0
    ratingSubmitted.value = false
  }
}

const setHover = (value) => {
  hoverStars.value = value
}

const clearHover = () => {
  hoverStars.value = 0
}

const pickRating = (value) => {
  selectedStars.value = value
}

const submitRating = async () => {
  if (selectedStars.value === null || !gameSlot.value?.id) return
  try {
    ratingSubmitting.value = true
    // Заглушка отправки. При появлении API заменить на реальный вызов
    await new Promise((resolve) => setTimeout(resolve, 700))
    ratingSubmitted.value = true
  } finally {
    ratingSubmitting.value = false
  }
}



















// Note: `useAsyncData` automatically handles data fetching on route parameter changes due to the `watch` option.


</script>

<style scoped>
@keyframes scaleX {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* Анимация градиента для заголовка */
@keyframes gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1.2); }
  50% { transform: scale(1.35); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Улучшение читаемости first-letter */
.first-letter\:text-5xl::first-letter {
  line-height: 0.8;
}

/* Плавное появление контента */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

article {
  animation: fadeInUp 0.6s ease-out;
}

/* Улучшенный фокус для accessibility */
*:focus-visible {
  outline: 3px solid #4f46e5;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Animated Gradient Border for Icons */
@keyframes spin-gradient {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animated-gradient-border {
  position: relative;
  z-index: 10;
  border: none !important; /* Remove defaults if any */
}

.animated-gradient-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: conic-gradient(from 0deg, #3B82F6, #8B5CF6, #EC4899, #EF4444, #F59E0B, #10B981, #3B82F6);
  z-index: -1;
  animation: spin-gradient 4s linear infinite;

  /* Create a hollow ring */
  padding: 2px;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}

/* Optional: Glow effect */
.animated-gradient-border::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
  filter: blur(5px);
  z-index: -2;
  opacity: 0.5;
}

/* Modal Transitions */
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.3s ease;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}

.fade-modal-enter-active .relative,
.fade-modal-leave-active .relative {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}
.fade-modal-enter-from .relative {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}
.fade-modal-leave-to .relative {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}
</style>
