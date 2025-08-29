<template>
  <div
    class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
  >
    <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-3">
      <svg
        class="w-6 h-6 text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        ></path>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        ></path>
      </svg>
      Предпросмотр Hero секции
    </h3>

    <!-- Мини Hero секция -->
    <div
      class="bg-zinc-950 text-slate-100 rounded-xl p-6 border border-white/10"
    >
      <!-- Заголовок слота -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white mb-2">
          {{ slotData.name || 'Название слота' }}
        </h1>
        <p class="text-gray-300 text-sm">
          Провайдер: {{ getProviderName(slotData.provider_id) }}
        </p>
      </div>

      <!-- Информационные блоки -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Характеристики -->
        <div
          class="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-4 rounded-xl border border-blue-400/30"
        >
          <h3 class="text-white font-semibold mb-2 flex items-center gap-2">
            <span class="text-base">⚡</span>
            Характеристики
          </h3>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span class="text-blue-200">RTP:</span>
              <span class="text-white font-medium"
                >{{ slotData.rtp || 96.5 }}%</span
              >
            </div>
            <div class="flex justify-between">
              <span class="text-blue-200">Волатильность:</span>
              <span class="text-white font-medium">{{
                getVolatilityText(slotData.volatility)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-blue-200">Макс. выигрыш:</span>
              <span class="text-white font-medium"
                >{{ slotData.max_win || 5000 }}x</span
              >
            </div>
          </div>
        </div>

        <!-- Бонусы -->
        <div
          class="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm p-4 rounded-xl border border-emerald-400/30"
        >
          <h3 class="text-white font-semibold mb-2 flex items-center gap-2">
            <span class="text-base">🎁</span>
            Бонусы
          </h3>
          <div class="flex flex-wrap gap-1">
            <span
              v-for="bonusId in selectedBonuses.slice(0, 3)"
              :key="bonusId"
              class="px-2 py-1 bg-emerald-500/30 text-emerald-200 rounded-full text-xs font-medium border border-emerald-400/20"
            >
              {{ getBonusName(bonusId) }}
            </span>
            <span
              v-if="selectedBonuses.length === 0"
              class="px-2 py-1 bg-gray-500/30 text-gray-300 rounded-full text-xs font-medium border border-gray-400/20"
            >
              Бонусы не указаны
            </span>
            <span
              v-if="selectedBonuses.length > 3"
              class="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-medium border border-emerald-400/20"
            >
              +{{ selectedBonuses.length - 3 }}
            </span>
          </div>
        </div>

        <!-- Тематика -->
        <div
          class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/30"
        >
          <h3 class="text-white font-semibold mb-2 flex items-center gap-2">
            <span class="text-base">🎨</span>
            Тематика
          </h3>
          <div class="flex flex-wrap gap-1">
            <span
              v-for="themeId in selectedThemes.slice(0, 2)"
              :key="themeId"
              class="px-2 py-1 bg-yellow-500/30 text-yellow-200 rounded-full text-xs font-medium border border-yellow-400/20"
            >
              {{ getThemeName(themeId) }}
            </span>
            <span
              v-if="selectedThemes.length === 0"
              class="px-2 py-1 bg-gray-500/30 text-gray-300 rounded-full text-xs font-medium border border-gray-400/20"
            >
              Тематика не указана
            </span>
            <span
              v-if="selectedThemes.length > 2"
              class="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium border border-yellow-400/20"
            >
              +{{ selectedThemes.length - 2 }}
            </span>
          </div>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="flex gap-3 mt-6">
        <button
          class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 text-sm"
        >
          Играть бесплатно
        </button>
        <button
          class="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 text-sm"
        >
          Играть на деньги
        </button>
      </div>
    </div>

    <!-- Информация об изменениях -->
    <div class="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
      <p class="text-blue-200 text-sm flex items-center gap-2">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        Так будет выглядеть Hero секция на клиентской странице. Изменения
        автоматически отображаются после сохранения.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  slotData: {
    type: Object,
    default: () => ({}),
  },
  selectedBonuses: {
    type: Array,
    default: () => [],
  },
  selectedThemes: {
    type: Array,
    default: () => [],
  },
  availableBonuses: {
    type: Array,
    default: () => [],
  },
  availableThemes: {
    type: Array,
    default: () => [],
  },
  providers: {
    type: Array,
    default: () => [],
  },
})

// Функции для получения названий
const getBonusName = (bonusId) => {
  const bonus = props.availableBonuses.find((b) => b.id === bonusId)
  return bonus?.name || 'Бонус'
}

const getThemeName = (themeId) => {
  const theme = props.availableThemes.find((t) => t.id === themeId)
  return theme?.name || 'Тема'
}

const getProviderName = (providerId) => {
  const provider = props.providers.find((p) => p.id === providerId)
  return provider?.name || 'Провайдер'
}

const getVolatilityText = (volatility) => {
  const map = {
    low: 'Низкая',
    medium: 'Средняя',
    high: 'Высокая',
  }
  return map[volatility] || 'Средняя'
}
</script>
