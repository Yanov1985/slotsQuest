<template>
  <div class="min-h-screen bg-[#0A0D14] text-white">
    <!-- Header -->
    <div class="bg-gradient-to-r from-[#8B5CF6]/20 to-[#7C3AED]/20 border-b border-[#353A4A]">
      <div class="container mx-auto px-6 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              📊 JSON-LD Аналитика
            </h1>
            <p class="text-gray-400 mt-2">
              Мониторинг состояния структурированных данных для SEO
            </p>
          </div>

          <!-- Кнопка массовой валидации -->
          <button
            @click="validateAll"
            :disabled="isValidating"
            class="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg v-if="isValidating" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ isValidating ? 'Валидация...' : 'Проверить все слоты' }}
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-6 py-8">
      <!-- Загрузка -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#8B5CF6] border-t-transparent"></div>
          <p class="mt-4 text-gray-400">Загрузка аналитики...</p>
        </div>
      </div>

      <div v-else class="space-y-8">
        <!-- Статистика карточки -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Всего слотов -->
          <div class="bg-gradient-to-br from-[#1B1E26] to-[#252A36] border border-[#353A4A] rounded-2xl p-6 hover:border-[#8B5CF6]/40 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-400 text-sm">Всего слотов</p>
            <p class="text-3xl font-bold text-white mt-1">{{ analytics.total || 0 }}</p>
          </div>

          <!-- JSON-LD включён -->
          <div class="bg-gradient-to-br from-[#1B1E26] to-[#252A36] border border-[#353A4A] rounded-2xl p-6 hover:border-green-500/40 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span class="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                {{ analytics.total > 0 ? Math.round((analytics.enabled / analytics.total) * 100) : 0 }}%
              </span>
            </div>
            <p class="text-gray-400 text-sm">JSON-LD включён</p>
            <p class="text-3xl font-bold text-green-400 mt-1">{{ analytics.enabled || 0 }}</p>
          </div>

          <!-- Требуют проверки -->
          <div class="bg-gradient-to-br from-[#1B1E26] to-[#252A36] border border-[#353A4A] rounded-2xl p-6 hover:border-yellow-500/40 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-400 text-sm">Требуют проверки</p>
            <p class="text-3xl font-bold text-yellow-400 mt-1">{{ analytics.needsValidation || 0 }}</p>
          </div>

          <!-- С ошибками -->
          <div class="bg-gradient-to-br from-[#1B1E26] to-[#252A36] border border-[#353A4A] rounded-2xl p-6 hover:border-red-500/40 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-400 text-sm">С ошибками</p>
            <p class="text-3xl font-bold text-red-400 mt-1">{{ analytics.withErrors || 0 }}</p>
          </div>
        </div>

        <!-- Распределение схем -->
        <div class="bg-gradient-to-br from-[#1B1E26] to-[#252A36] border border-[#353A4A] rounded-2xl p-6">
          <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Распределение схем
          </h2>

          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div
              v-for="(count, schema) in analytics.schemaDistribution"
              :key="schema"
              class="text-center p-4 bg-[#0A0D14] rounded-xl border border-[#353A4A] hover:border-[#8B5CF6]/40 transition-all duration-300"
            >
              <div class="text-2xl mb-2">
                {{ getSchemaIcon(schema) }}
              </div>
              <p class="text-gray-400 text-sm">{{ schema }}</p>
              <p class="text-xl font-bold text-white mt-1">{{ count }}</p>
              <p class="text-xs text-gray-500">
                {{ analytics.enabled > 0 ? Math.round((count / analytics.enabled) * 100) : 0 }}%
              </p>
            </div>
          </div>
        </div>

        <!-- Табы -->
        <div class="bg-gradient-to-br from-[#1B1E26] to-[#252A36] border border-[#353A4A] rounded-2xl overflow-hidden">
          <!-- Таб навигация -->
          <div class="flex border-b border-[#353A4A]">
            <button
              @click="activeTab = 'errors'"
              :class="[
                'flex-1 px-6 py-4 text-sm font-medium transition-all duration-300',
                activeTab === 'errors'
                  ? 'bg-red-500/10 text-red-400 border-b-2 border-red-500'
                  : 'text-gray-400 hover:text-white hover:bg-[#353A4A]/50'
              ]"
            >
              ❌ Слоты с ошибками ({{ slotsWithErrors.length }})
            </button>
            <button
              @click="activeTab = 'needs-validation'"
              :class="[
                'flex-1 px-6 py-4 text-sm font-medium transition-all duration-300',
                activeTab === 'needs-validation'
                  ? 'bg-yellow-500/10 text-yellow-400 border-b-2 border-yellow-500'
                  : 'text-gray-400 hover:text-white hover:bg-[#353A4A]/50'
              ]"
            >
              🔍 Требуют валидации ({{ slotsNeedingValidation.length }})
            </button>
            <button
              @click="activeTab = 'all'"
              :class="[
                'flex-1 px-6 py-4 text-sm font-medium transition-all duration-300',
                activeTab === 'all'
                  ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-b-2 border-[#8B5CF6]'
                  : 'text-gray-400 hover:text-white hover:bg-[#353A4A]/50'
              ]"
            >
              📋 Все слоты ({{ allSlots.length }})
            </button>
          </div>

          <!-- Контент табов -->
          <div class="p-6">
            <!-- Слоты с ошибками -->
            <div v-if="activeTab === 'errors'">
              <div v-if="slotsWithErrors.length === 0" class="text-center py-12">
                <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p class="text-gray-400">Отлично! Нет слотов с ошибками JSON-LD 🎉</p>
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="slot in slotsWithErrors"
                  :key="slot.id"
                  class="bg-[#0A0D14] rounded-xl p-4 border border-red-500/30 hover:border-red-500/50 transition-all duration-300"
                >
                  <div class="flex items-center justify-between mb-3">
                    <div>
                      <h3 class="font-medium text-white">{{ slot.name }}</h3>
                      <p class="text-sm text-gray-500">{{ slot.slug }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <button
                        @click="validateSingleSlot(slot.id)"
                        class="px-3 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-lg text-sm hover:bg-[#8B5CF6]/30 transition-colors"
                      >
                        Проверить
                      </button>
                      <NuxtLink
                        :to="`/admin/slots/${slot.id}`"
                        class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                      >
                        Редактировать
                      </NuxtLink>
                    </div>
                  </div>
                  <div class="bg-red-500/10 rounded-lg p-3">
                    <p class="text-xs text-red-300 font-mono" v-for="(err, idx) in slot.errors" :key="idx">
                      • {{ err }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Требуют валидации -->
            <div v-if="activeTab === 'needs-validation'">
              <div v-if="slotsNeedingValidation.length === 0" class="text-center py-12">
                <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p class="text-gray-400">Все слоты прошли валидацию! 🎉</p>
              </div>

              <div v-else class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-[#353A4A]">
                      <th class="text-left py-3 px-4 text-gray-400 font-medium">Слот</th>
                      <th class="text-left py-3 px-4 text-gray-400 font-medium">Slug</th>
                      <th class="text-left py-3 px-4 text-gray-400 font-medium">Последняя проверка</th>
                      <th class="text-left py-3 px-4 text-gray-400 font-medium">Дней назад</th>
                      <th class="text-right py-3 px-4 text-gray-400 font-medium">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="slot in slotsNeedingValidation.slice(0, 20)"
                      :key="slot.id"
                      class="border-b border-[#353A4A]/50 hover:bg-[#353A4A]/20 transition-colors"
                    >
                      <td class="py-3 px-4 text-white">{{ slot.name }}</td>
                      <td class="py-3 px-4 text-gray-400 font-mono text-sm">{{ slot.slug }}</td>
                      <td class="py-3 px-4 text-gray-400">
                        {{ slot.lastValidated ? formatDate(slot.lastValidated) : 'Никогда' }}
                      </td>
                      <td class="py-3 px-4">
                        <span
                          :class="[
                            'px-2 py-1 rounded-full text-xs',
                            slot.daysSinceValidation === null ? 'bg-red-500/20 text-red-400' :
                            slot.daysSinceValidation > 30 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          ]"
                        >
                          {{ slot.daysSinceValidation === null ? 'Никогда' : `${slot.daysSinceValidation} дн.` }}
                        </span>
                      </td>
                      <td class="py-3 px-4 text-right">
                        <button
                          @click="validateSingleSlot(slot.id)"
                          class="px-3 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-lg text-sm hover:bg-[#8B5CF6]/30 transition-colors"
                        >
                          Проверить
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Все слоты -->
            <div v-if="activeTab === 'all'">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-[#353A4A]">
                      <th class="text-left py-3 px-4 text-gray-400 font-medium">Слот</th>
                      <th class="text-left py-3 px-4 text-gray-400 font-medium">JSON-LD</th>
                      <th class="text-left py-3 px-4 text-gray-400 font-medium">Схемы</th>
                      <th class="text-right py-3 px-4 text-gray-400 font-medium">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="slot in allSlots.slice(0, 30)"
                      :key="slot.slotId"
                      class="border-b border-[#353A4A]/50 hover:bg-[#353A4A]/20 transition-colors"
                    >
                      <td class="py-3 px-4">
                        <div>
                          <p class="text-white font-medium">{{ slot.slug }}</p>
                        </div>
                      </td>
                      <td class="py-3 px-4">
                        <span
                          :class="[
                            'px-2 py-1 rounded-full text-xs',
                            slot.enabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                          ]"
                        >
                          {{ slot.enabled ? '✅ Включён' : '❌ Выключен' }}
                        </span>
                      </td>
                      <td class="py-3 px-4">
                        <div class="flex flex-wrap gap-1">
                          <span
                            v-for="schema in slot.schemas"
                            :key="schema"
                            class="px-2 py-0.5 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded text-xs"
                          >
                            {{ schema }}
                          </span>
                        </div>
                      </td>
                      <td class="py-3 px-4 text-right">
                        <NuxtLink
                          :to="`/admin/slots/${slot.slotId}`"
                          class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                        >
                          Настроить
                        </NuxtLink>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Результат массовой валидации -->
        <div
          v-if="validationResult"
          class="bg-gradient-to-br from-[#1B1E26] to-[#252A36] border border-[#353A4A] rounded-2xl p-6"
        >
          <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Результат валидации
          </h2>

          <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="bg-[#0A0D14] rounded-xl p-4 text-center">
              <p class="text-gray-400 text-sm">Проверено</p>
              <p class="text-2xl font-bold text-white">{{ validationResult.validated }}</p>
            </div>
            <div class="bg-[#0A0D14] rounded-xl p-4 text-center">
              <p class="text-gray-400 text-sm">Прошли</p>
              <p class="text-2xl font-bold text-green-400">{{ validationResult.passed }}</p>
            </div>
            <div class="bg-[#0A0D14] rounded-xl p-4 text-center">
              <p class="text-gray-400 text-sm">С ошибками</p>
              <p class="text-2xl font-bold text-red-400">{{ validationResult.failed }}</p>
            </div>
            <div class="bg-[#0A0D14] rounded-xl p-4 text-center">
              <p class="text-gray-400 text-sm">Успешность</p>
              <p class="text-2xl font-bold text-[#8B5CF6]">
                {{ validationResult.validated > 0 ? Math.round((validationResult.passed / validationResult.validated) * 100) : 0 }}%
              </p>
            </div>
          </div>

          <button
            @click="validationResult = null"
            class="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Скрыть результат
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// ============================================================================
// 📦 СОСТОЯНИЕ
// ============================================================================

const loading = ref(true)
const isValidating = ref(false)
const activeTab = ref('errors')

// Данные аналитики
const analytics = ref({
  total: 0,
  enabled: 0,
  disabled: 0,
  withErrors: 0,
  needsValidation: 0,
  schemaDistribution: {},
  recentlyValidated: 0,
})

// Списки слотов
const slotsWithErrors = ref([])
const slotsNeedingValidation = ref([])
const allSlots = ref([])

// Результат валидации
const validationResult = ref(null)

// API URL
const API_BASE = 'http://localhost:3001'

// ============================================================================
// 🔧 МЕТОДЫ
// ============================================================================

/**
 * 📊 Загрузить аналитику
 */
const loadAnalytics = async () => {
  try {
    loading.value = true

    // Загружаем все данные параллельно
    const [analyticsRes, errorsRes, needsValidationRes, summaryRes] = await Promise.all([
      $fetch(`${API_BASE}/api/jsonld/analytics`),
      $fetch(`${API_BASE}/api/jsonld/errors`),
      $fetch(`${API_BASE}/api/jsonld/needs-validation`),
      $fetch(`${API_BASE}/api/jsonld/summary`),
    ])

    // Обновляем данные
    if (analyticsRes.success) {
      analytics.value = analyticsRes
    }

    if (errorsRes.success) {
      slotsWithErrors.value = errorsRes.slots || []
    }

    if (needsValidationRes.success) {
      slotsNeedingValidation.value = needsValidationRes.slots || []
    }

    if (summaryRes.success) {
      allSlots.value = summaryRes.summary || []
    }

  } catch (error) {
    console.error('❌ Ошибка загрузки аналитики:', error)
  } finally {
    loading.value = false
  }
}

/**
 * 🔄 Массовая валидация
 */
const validateAll = async () => {
  if (isValidating.value) return

  try {
    isValidating.value = true

    const result = await $fetch(`${API_BASE}/api/jsonld/validate-all`, {
      method: 'POST',
    })

    if (result.success) {
      validationResult.value = result
      // Перезагружаем данные
      await loadAnalytics()
    }

  } catch (error) {
    console.error('❌ Ошибка массовой валидации:', error)
    alert('Ошибка при валидации. Проверьте консоль.')
  } finally {
    isValidating.value = false
  }
}

/**
 * ✅ Валидация одного слота
 */
const validateSingleSlot = async (slotId: string) => {
  try {
    const result = await $fetch(`${API_BASE}/api/jsonld/${slotId}/validate`, {
      method: 'POST',
    })

    if (result.isValid) {
      alert('✅ Слот прошёл валидацию!')
    } else {
      alert(`❌ Найдено ошибок: ${result.errors.length}\n\n${result.errors.join('\n')}`)
    }

    // Перезагружаем данные
    await loadAnalytics()

  } catch (error) {
    console.error('❌ Ошибка валидации слота:', error)
    alert('Ошибка при валидации')
  }
}

/**
 * 🎨 Получить иконку схемы
 */
const getSchemaIcon = (schema: string): string => {
  const icons: { [key: string]: string } = {
    Game: '🎮',
    Product: '🛍️',
    Review: '⭐',
    FAQ: '❓',
    HowTo: '📋',
    Breadcrumb: '🍞',
    Video: '🎬',
  }
  return icons[schema] || '📄'
}

/**
 * 📅 Форматирование даты
 */
const formatDate = (date: string | Date): string => {
  if (!date) return 'Никогда'
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ============================================================================
// 🚀 LIFECYCLE
// ============================================================================

onMounted(() => {
  loadAnalytics()
})
</script>
