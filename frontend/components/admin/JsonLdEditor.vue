<template>
  <!--
    🎯 JSON-LD Editor Component v2.0

    Enhanced with:
    - Schema Score indicator
    - AggregateRating schema (user ratings)
    - SoftwareApplication schema
    - Product schema
    - Syntax-highlighted preview
    - Quick-add templates
    - Rich Results preview
  -->
  <div class="space-y-6">
    <!-- Header with Score -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-[#8B5CF6]/20 to-[#7C3AED]/20 rounded-xl border border-[#8B5CF6]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center">
          <span class="text-2xl">🎯</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">JSON-LD Schema</h3>
          <p class="text-sm text-[#9CA3AF]">Структурированные данные для SEO</p>
        </div>
      </div>
      <div class="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4">
        <!-- Schema Score -->
        <div
          class="relative w-14 h-14 rounded-full flex items-center justify-center"
          :class="{
            'bg-[#EF4444]/20': schemaScore < 40,
            'bg-[#F59E0B]/20': schemaScore >= 40 && schemaScore < 70,
            'bg-[#10B981]/20': schemaScore >= 70,
          }"
        >
          <span
            class="text-lg font-bold"
            :class="{
              'text-[#EF4444]': schemaScore < 40,
              'text-[#F59E0B]': schemaScore >= 40 && schemaScore < 70,
              'text-[#10B981]': schemaScore >= 70,
            }"
          >{{ schemaScore }}%</span>
        </div>

        <!-- Master Toggle -->
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="localForm.jsonld_enabled"
            class="sr-only peer"
          />
          <div class="w-14 h-7 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#8B5CF6]"></div>
          <span class="ml-3 text-sm font-medium text-[#E5E7EB]">{{ localForm.jsonld_enabled ? 'ON' : 'OFF' }}</span>
        </label>
      </div>
    </div>

    <!-- Schema Count & Quick Actions -->
    <div v-if="localForm.jsonld_enabled" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 bg-[#1B1E26] border border-[#353A4A] rounded-xl">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-[#8B5CF6]">{{ enabledSchemasCount }}</span>
          <span class="text-sm text-[#9CA3AF]">схем активно</span>
        </div>
        <div class="flex gap-1">
          <span
            v-for="schema in activeSchemaIcons"
            :key="schema.name"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
            :class="schema.bgClass"
            :title="schema.name"
          >{{ schema.icon }}</span>
        </div>
      </div>
      <div class="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto">
        <button
          type="button"
          @click="autoGenerateAll"
          :disabled="generating"
          class="px-3 py-2 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white rounded-lg text-sm hover:opacity-90 transition-all flex items-center gap-2 font-medium"
        >
          <svg v-if="generating" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span>{{ generating ? 'Генерация...' : '🪄 Авто-генерация' }}</span>
        </button>
        <button
          type="button"
          @click="loadJsonLdPreview"
          :disabled="loadingPreview"
          class="px-3 py-2 bg-[#353A4A] text-[#E5E7EB] rounded-lg text-sm hover:bg-[#4B5563] transition-all flex items-center gap-2"
        >
          <span>{{ loadingPreview ? '⏳' : '👁️' }} Preview</span>
        </button>
        <button
          type="button"
          @click="openGoogleTest"
          class="px-3 py-2 bg-[#10B981] text-white rounded-lg text-sm hover:bg-[#059669] transition-all flex items-center gap-2"
        >
          <span>✓</span> Тест
        </button>
      </div>
    </div>

    <!-- Schema Cards Grid -->
    <div v-if="localForm.jsonld_enabled" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      <!-- Game Schema (always on) -->
      <div class="bg-[#8B5CF6]/10 border-2 border-[#8B5CF6]/50 rounded-xl p-4 relative">
        <div class="absolute top-2 right-2 w-5 h-5 bg-[#8B5CF6] rounded-full flex items-center justify-center">
          <span class="text-white text-xs">✓</span>
        </div>
        <span class="text-3xl">🎮</span>
        <h4 class="text-sm font-medium text-[#E5E7EB] mt-2">Game</h4>
        <p class="text-xs text-[#9CA3AF]">Основная схема</p>
      </div>

      <!-- Review Schema -->
      <div
        class="rounded-xl p-4 cursor-pointer transition-all relative"
        :class="localForm.jsonld_enable_review ? 'bg-[#F59E0B]/10 border-2 border-[#F59E0B]/50' : 'bg-[#1B1E26] border border-[#353A4A] hover:border-[#F59E0B]/40'"
        @click="toggleSchema('jsonld_enable_review')"
      >
        <div v-if="localForm.jsonld_enable_review" class="absolute top-2 right-2 w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center">
          <span class="text-white text-xs">✓</span>
        </div>
        <span class="text-3xl">⭐</span>
        <h4 class="text-sm font-medium text-[#E5E7EB] mt-2">Review</h4>
        <p class="text-xs text-[#9CA3AF]">Экспертный обзор</p>
      </div>

      <!-- AggregateRating Schema -->
      <div
        class="rounded-xl p-4 cursor-pointer transition-all relative"
        :class="localForm.jsonld_enable_aggregate ? 'bg-[#EC4899]/10 border-2 border-[#EC4899]/50' : 'bg-[#1B1E26] border border-[#353A4A] hover:border-[#EC4899]/40'"
        @click="toggleSchema('jsonld_enable_aggregate')"
      >
        <div v-if="localForm.jsonld_enable_aggregate" class="absolute top-2 right-2 w-5 h-5 bg-[#EC4899] rounded-full flex items-center justify-center">
          <span class="text-white text-xs">✓</span>
        </div>
        <span class="text-3xl">📊</span>
        <h4 class="text-sm font-medium text-[#E5E7EB] mt-2">Rating</h4>
        <p class="text-xs text-[#9CA3AF]">Рейтинг пользователей</p>
      </div>

      <!-- FAQ Schema -->
      <div
        class="rounded-xl p-4 cursor-pointer transition-all relative"
        :class="localForm.jsonld_enable_faq ? 'bg-[#3B82F6]/10 border-2 border-[#3B82F6]/50' : 'bg-[#1B1E26] border border-[#353A4A] hover:border-[#3B82F6]/40'"
        @click="toggleSchema('jsonld_enable_faq')"
      >
        <div v-if="localForm.jsonld_enable_faq" class="absolute top-2 right-2 w-5 h-5 bg-[#3B82F6] rounded-full flex items-center justify-center">
          <span class="text-white text-xs">✓</span>
        </div>
        <span class="text-3xl">❓</span>
        <h4 class="text-sm font-medium text-[#E5E7EB] mt-2">FAQ</h4>
        <p class="text-xs text-[#9CA3AF]">{{ faqItems.length }}/10 вопросов</p>
      </div>

      <!-- HowTo Schema -->
      <div
        class="rounded-xl p-4 cursor-pointer transition-all relative"
        :class="localForm.jsonld_enable_howto ? 'bg-[#10B981]/10 border-2 border-[#10B981]/50' : 'bg-[#1B1E26] border border-[#353A4A] hover:border-[#10B981]/40'"
        @click="toggleSchema('jsonld_enable_howto')"
      >
        <div v-if="localForm.jsonld_enable_howto" class="absolute top-2 right-2 w-5 h-5 bg-[#10B981] rounded-full flex items-center justify-center">
          <span class="text-white text-xs">✓</span>
        </div>
        <span class="text-3xl">📋</span>
        <h4 class="text-sm font-medium text-[#E5E7EB] mt-2">HowTo</h4>
        <p class="text-xs text-[#9CA3AF]">{{ howToSteps.length }}/10 шагов</p>
      </div>

      <!-- Breadcrumb Schema -->
      <div
        class="rounded-xl p-4 cursor-pointer transition-all relative"
        :class="localForm.jsonld_enable_breadcrumb ? 'bg-[#EC4899]/10 border-2 border-[#EC4899]/50' : 'bg-[#1B1E26] border border-[#353A4A] hover:border-[#EC4899]/40'"
        @click="toggleSchema('jsonld_enable_breadcrumb')"
      >
        <div v-if="localForm.jsonld_enable_breadcrumb" class="absolute top-2 right-2 w-5 h-5 bg-[#EC4899] rounded-full flex items-center justify-center">
          <span class="text-white text-xs">✓</span>
        </div>
        <span class="text-3xl">🍞</span>
        <h4 class="text-sm font-medium text-[#E5E7EB] mt-2">Breadcrumb</h4>
        <p class="text-xs text-[#9CA3AF]">Хлебные крошки</p>
      </div>

      <!-- Video Schema -->
      <div
        class="rounded-xl p-4 cursor-pointer transition-all relative"
        :class="localForm.jsonld_enable_video ? 'bg-[#EF4444]/10 border-2 border-[#EF4444]/50' : 'bg-[#1B1E26] border border-[#353A4A] hover:border-[#EF4444]/40'"
        @click="toggleSchema('jsonld_enable_video')"
      >
        <div v-if="localForm.jsonld_enable_video" class="absolute top-2 right-2 w-5 h-5 bg-[#EF4444] rounded-full flex items-center justify-center">
          <span class="text-white text-xs">✓</span>
        </div>
        <span class="text-3xl">🎬</span>
        <h4 class="text-sm font-medium text-[#E5E7EB] mt-2">Video</h4>
        <p class="text-xs text-[#9CA3AF]">Видео-обзор</p>
      </div>

      <!-- Product Schema -->
      <div
        class="rounded-xl p-4 cursor-pointer transition-all relative"
        :class="localForm.jsonld_enable_product ? 'bg-[#6366F1]/10 border-2 border-[#6366F1]/50' : 'bg-[#1B1E26] border border-[#353A4A] hover:border-[#6366F1]/40'"
        @click="toggleSchema('jsonld_enable_product')"
      >
        <div v-if="localForm.jsonld_enable_product" class="absolute top-2 right-2 w-5 h-5 bg-[#6366F1] rounded-full flex items-center justify-center">
          <span class="text-white text-xs">✓</span>
        </div>
        <span class="text-3xl">🎰</span>
        <h4 class="text-sm font-medium text-[#E5E7EB] mt-2">Product</h4>
        <p class="text-xs text-[#9CA3AF]">Гемблинг продукт</p>
      </div>
    </div>

    <!-- Review Schema Settings -->
    <div v-if="localForm.jsonld_enabled && localForm.jsonld_enable_review"
         class="bg-[#1B1E26]/50 border border-[#F59E0B]/30 rounded-xl p-4">
      <h5 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-4">
        <span class="w-8 h-8 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center">⭐</span>
        Review Schema — Экспертный обзор
      </h5>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Автор обзора</label>
          <input
            v-model="localForm.jsonld_review_author"
            placeholder="Brand Editorial Team"
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
        </div>
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Рейтинг (1-5)</label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="localForm.jsonld_review_rating"
              type="number"
              step="0.1"
              min="1"
              max="5"
              placeholder="4.8"
              class="flex-1 px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
            <div class="flex gap-0.5">
              <span v-for="i in 5" :key="i" class="text-lg" :class="i <= Math.round(localForm.jsonld_review_rating || 0) ? 'text-[#F59E0B]' : 'text-[#353A4A]'">★</span>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Дата обзора</label>
          <input
            v-model="localForm.jsonld_review_date"
            type="date"
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
        </div>
        <div class="md:col-span-3">
          <label class="block text-xs text-[#9CA3AF] mb-1">Текст обзора</label>
          <textarea
            v-model="localForm.jsonld_review_text"
            rows="2"
            placeholder="Краткий экспертный обзор слота (100-200 символов)"
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] resize-none"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- AggregateRating Schema Settings -->
    <div v-if="localForm.jsonld_enabled && localForm.jsonld_enable_aggregate"
         class="bg-[#1B1E26]/50 border border-[#EC4899]/30 rounded-xl p-4">
      <h5 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-4">
        <span class="w-8 h-8 bg-[#EC4899]/20 rounded-lg flex items-center justify-center">📊</span>
        AggregateRating — Рейтинг пользователей
      </h5>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Средний рейтинг</label>
          <input
            v-model.number="localForm.jsonld_aggregate_rating"
            type="number"
            step="0.1"
            min="1"
            max="5"
            placeholder="4.5"
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#EC4899]"
          />
        </div>
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Количество голосов</label>
          <input
            v-model.number="localForm.jsonld_aggregate_count"
            type="number"
            min="1"
            placeholder="1250"
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#EC4899]"
          />
        </div>
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Best Rating</label>
                    <input
            v-model.number="localForm.jsonld_aggregate_best"
            type="number"
            min="1"
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#EC4899]"
          />
        </div>
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Worst Rating</label>
                    <input
            v-model.number="localForm.jsonld_aggregate_worst"
            type="number"
            min="1"
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#EC4899]"
          />
        </div>
      </div>
      <p class="text-xs text-[#6B7280] mt-3">
        💡 Tip: Используйте реальные данные рейтингов от пользователей для лучшего SEO эффекта
      </p>
    </div>

    <!-- FAQ Editor -->
    <div v-if="localForm.jsonld_enabled && localForm.jsonld_enable_faq"
         class="bg-[#1B1E26]/50 border border-[#3B82F6]/30 rounded-xl p-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h5 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="w-8 h-8 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center">❓</span>
          FAQ Schema — Вопросы и ответы
          <span class="text-xs text-[#9CA3AF]">({{ faqItems.length }}/10)</span>
        </h5>
        <div class="flex gap-2">
          <button
            type="button"
            @click="addFaqTemplate"
            class="px-3 py-1.5 bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30 rounded-lg text-xs hover:bg-[#3B82F6]/30 transition-all"
          >
            ⚡ Шаблон
          </button>
          <button
            type="button"
            @click="addFaqItem"
            :disabled="faqItems.length >= 10"
            class="px-3 py-1.5 bg-[#3B82F6] text-white rounded-lg text-xs hover:bg-[#2563EB] disabled:opacity-50 transition-all"
          >
            + Добавить
          </button>
        </div>
      </div>

      <div class="space-y-3">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="bg-[#161A21] border border-[#353A4A] rounded-lg p-3 relative group"
        >
          <button
            type="button"
            @click="removeFaqItem(index)"
            class="absolute top-2 right-2 w-6 h-6 bg-[#EF4444]/20 text-[#EF4444] rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
          >×</button>
          <div class="space-y-2">
            <input
              v-model="item.question"
              placeholder="Вопрос..."
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
            />
            <textarea
              v-model="item.answer"
              rows="2"
              placeholder="Ответ..."
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-1 focus:ring-[#3B82F6] resize-none"
            ></textarea>
          </div>
        </div>
        <p v-if="faqItems.length === 0" class="text-center text-sm text-[#6B7280] py-4">
          Нажмите "Шаблон" для быстрого добавления типовых FAQ
        </p>
      </div>
    </div>

    <!-- HowTo Editor -->
    <div v-if="localForm.jsonld_enabled && localForm.jsonld_enable_howto"
         class="bg-[#1B1E26]/50 border border-[#10B981]/30 rounded-xl p-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h5 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="w-8 h-8 bg-[#10B981]/20 rounded-lg flex items-center justify-center">📋</span>
          HowTo Schema — Как играть
          <span class="text-xs text-[#9CA3AF]">({{ howToSteps.length }}/10)</span>
        </h5>
        <div class="flex gap-2">
          <button
            type="button"
            @click="addHowToTemplate"
            class="px-3 py-1.5 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-lg text-xs hover:bg-[#10B981]/30 transition-all"
          >
            ⚡ Шаблон
          </button>
          <button
            type="button"
            @click="addHowToStep"
            :disabled="howToSteps.length >= 10"
            class="px-3 py-1.5 bg-[#10B981] text-white rounded-lg text-xs hover:bg-[#059669] disabled:opacity-50 transition-all"
          >
            + Добавить шаг
          </button>
        </div>
      </div>

      <div class="space-y-3">
        <div
          v-for="(step, index) in howToSteps"
          :key="index"
          class="bg-[#161A21] border border-[#353A4A] rounded-lg p-3 relative group"
        >
          <div class="absolute top-3 left-3 w-7 h-7 bg-[#10B981] text-white rounded-full flex items-center justify-center text-sm font-bold">
            {{ index + 1 }}
          </div>
          <button
            type="button"
            @click="removeHowToStep(index)"
            class="absolute top-2 right-2 w-6 h-6 bg-[#EF4444]/20 text-[#EF4444] rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
          >×</button>
          <div class="space-y-2 pl-10">
            <input
              v-model="step.name"
              :placeholder="`Название шага ${index + 1}`"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-1 focus:ring-[#10B981]"
            />
            <textarea
              v-model="step.text"
              rows="2"
              :placeholder="`Описание шага ${index + 1}`"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-1 focus:ring-[#10B981] resize-none"
            ></textarea>
          </div>
        </div>
        <p v-if="howToSteps.length === 0" class="text-center text-sm text-[#6B7280] py-4">
          Нажмите "Шаблон" для быстрого добавления инструкции
        </p>
      </div>
    </div>

    <!-- Video Schema Settings -->
    <div v-if="localForm.jsonld_enabled && localForm.jsonld_enable_video"
         class="bg-[#1B1E26]/50 border border-[#EF4444]/30 rounded-xl p-4">
      <h5 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-4">
        <span class="w-8 h-8 bg-[#EF4444]/20 rounded-lg flex items-center justify-center">🎬</span>
        Video Schema — Видео-обзор
      </h5>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">URL видео (YouTube/Vimeo)</label>
          <input
            v-model="localForm.jsonld_video_url"
            placeholder="https://youtube.com/watch?v=..."
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
          />
        </div>
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Thumbnail URL</label>
          <input
            v-model="localForm.jsonld_video_thumbnail"
            placeholder="https://img.youtube.com/..."
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
          />
        </div>
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Длительность (ISO 8601)</label>
          <input
            v-model="localForm.jsonld_video_duration"
            placeholder="PT3M30S (3 мин 30 сек)"
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
          />
        </div>
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Описание видео</label>
          <input
            v-model="localForm.jsonld_video_description"
            placeholder="Обзор и геймплей слота..."
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
          />
        </div>
      </div>
    </div>

    <!-- JSON-LD Preview -->
    <div v-if="localForm.jsonld_enabled && jsonLdPreview"
         class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <h5 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span>👁️</span>
          JSON-LD Preview
          <span class="text-xs text-[#9CA3AF]">({{ jsonLdPreview.meta?.totalSchemas || 0 }} схем)</span>
        </h5>
        <div class="flex gap-2">
          <button
            type="button"
            @click="copyJsonLd"
            class="px-3 py-1.5 bg-[#353A4A] text-[#E5E7EB] rounded-lg text-xs hover:bg-[#4B5563] transition-all flex items-center gap-1"
          >
            📋 Копировать
          </button>
        </div>
      </div>

      <!-- Enabled Schemas Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="schema in jsonLdPreview.meta?.enabledSchemas"
          :key="schema"
          class="px-2 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-lg text-xs font-medium"
        >{{ schema }}</span>
      </div>

      <!-- Syntax Highlighted Preview -->
      <div class="relative">
        <div
          class="bg-[#161A21] border border-[#353A4A] rounded-lg p-4 overflow-x-auto"
          :class="{ 'max-h-64 overflow-hidden': !showFullPreview }"
        >
          <pre class="text-xs leading-relaxed"><code v-html="highlightedJson"></code></pre>
        </div>
        <div v-if="!showFullPreview" class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#161A21] to-transparent pointer-events-none rounded-b-lg"></div>
      </div>
      <button
        type="button"
        @click="showFullPreview = !showFullPreview"
        class="w-full mt-2 py-2 text-xs text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
      >
        {{ showFullPreview ? '↑ Collapse' : '↓ Show Full Preview' }}
      </button>
    </div>

    <!-- Quick Links -->
    <div v-if="localForm.jsonld_enabled" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <h5 class="text-sm font-medium text-[#E5E7EB] mb-3">🔗 Инструменты тестирования</h5>
      <div class="flex flex-wrap gap-2">
        <a
          href="https://search.google.com/test/rich-results"
          target="_blank"
          class="px-3 py-2 bg-[#4285F4]/20 text-[#4285F4] border border-[#4285F4]/30 rounded-lg text-xs hover:bg-[#4285F4]/30 transition-colors"
        >
          Google Rich Results Test
        </a>
        <a
          href="https://validator.schema.org/"
          target="_blank"
          class="px-3 py-2 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-lg text-xs hover:bg-[#10B981]/30 transition-colors"
        >
          Schema.org Validator
        </a>
        <a
          href="https://developers.facebook.com/tools/debug/"
          target="_blank"
          class="px-3 py-2 bg-[#3B5998]/20 text-[#3B5998] border border-[#3B5998]/30 rounded-lg text-xs hover:bg-[#3B5998]/30 transition-colors"
        >
          Facebook Debugger
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'

// Props
const props = defineProps({
  slotId: { type: String, default: '' },
  slotName: { type: String, default: '' },
  siteName: { type: String, default: 'Brand' },
  modelValue: { type: Object, required: true }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Local form
const localForm = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// State
const loadingPreview = ref(false)
const generating = ref(false)
const jsonLdPreview = ref(null)
const showFullPreview = ref(false)
const faqItems = ref([])
const howToSteps = ref([])

// Schema Score
const schemaScore = computed(() => {
  if (!localForm.value.jsonld_enabled) return 0

  let score = 20 // Base for having JSON-LD enabled

  // Game schema always active (+10)
  score += 10

  // Review schema (+15)
  if (localForm.value.jsonld_enable_review && localForm.value.jsonld_review_rating) score += 15

  // AggregateRating (+15)
  if (localForm.value.jsonld_enable_aggregate && localForm.value.jsonld_aggregate_rating) score += 15

  // FAQ (+15)
  if (localForm.value.jsonld_enable_faq && faqItems.value.length >= 3) score += 15
  else if (localForm.value.jsonld_enable_faq && faqItems.value.length > 0) score += 8

  // HowTo (+10)
  if (localForm.value.jsonld_enable_howto && howToSteps.value.length >= 3) score += 10
  else if (localForm.value.jsonld_enable_howto && howToSteps.value.length > 0) score += 5

  // Breadcrumb (+5)
  if (localForm.value.jsonld_enable_breadcrumb) score += 5

  // Video (+10)
  if (localForm.value.jsonld_enable_video && localForm.value.jsonld_video_url) score += 10

  return Math.min(score, 100)
})

// Enabled schemas count
const enabledSchemasCount = computed(() => {
  let count = 1 // Game is always on
  if (localForm.value.jsonld_enable_review) count++
  if (localForm.value.jsonld_enable_aggregate) count++
  if (localForm.value.jsonld_enable_faq) count++
  if (localForm.value.jsonld_enable_howto) count++
  if (localForm.value.jsonld_enable_breadcrumb) count++
  if (localForm.value.jsonld_enable_video) count++
  if (localForm.value.jsonld_enable_product) count++
  return count
})

// Active schema icons
const activeSchemaIcons = computed(() => {
  const icons = [
    { name: 'Game', icon: '🎮', active: true, bgClass: 'bg-[#8B5CF6]/20' }
  ]
  if (localForm.value.jsonld_enable_review) icons.push({ name: 'Review', icon: '⭐', active: true, bgClass: 'bg-[#F59E0B]/20' })
  if (localForm.value.jsonld_enable_aggregate) icons.push({ name: 'Rating', icon: '📊', active: true, bgClass: 'bg-[#EC4899]/20' })
  if (localForm.value.jsonld_enable_faq) icons.push({ name: 'FAQ', icon: '❓', active: true, bgClass: 'bg-[#3B82F6]/20' })
  if (localForm.value.jsonld_enable_howto) icons.push({ name: 'HowTo', icon: '📋', active: true, bgClass: 'bg-[#10B981]/20' })
  if (localForm.value.jsonld_enable_breadcrumb) icons.push({ name: 'Breadcrumb', icon: '🍞', active: true, bgClass: 'bg-[#EC4899]/20' })
  if (localForm.value.jsonld_enable_video) icons.push({ name: 'Video', icon: '🎬', active: true, bgClass: 'bg-[#EF4444]/20' })
  if (localForm.value.jsonld_enable_product) icons.push({ name: 'Product', icon: '🎰', active: true, bgClass: 'bg-[#6366F1]/20' })
  return icons
})

// Syntax highlighted JSON
const highlightedJson = computed(() => {
  if (!jsonLdPreview.value?.schemas?.combined) return ''

  const json = JSON.stringify(jsonLdPreview.value.schemas.combined, null, 2)

  return json
    .replace(/"([^"]+)":/g, '<span class="text-[#8B5CF6]">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span class="text-[#10B981]">"$1"</span>')
    .replace(/: (\d+\.?\d*)/g, ': <span class="text-[#F59E0B]">$1</span>')
    .replace(/: (true|false)/g, ': <span class="text-[#3B82F6]">$1</span>')
})

// Initialize FAQ/HowTo from JSON
onMounted(() => {
  if (localForm.value.jsonld_faq_json) {
    try { faqItems.value = JSON.parse(localForm.value.jsonld_faq_json) } catch {}
  }
  if (localForm.value.jsonld_howto_json) {
    try { howToSteps.value = JSON.parse(localForm.value.jsonld_howto_json) } catch {}
  }
})

// Watch FAQ changes
watch(faqItems, (items) => {
  localForm.value.jsonld_faq_json = JSON.stringify(items)
}, { deep: true })

// Watch HowTo changes
watch(howToSteps, (steps) => {
  const stepsWithNumbers = steps.map((s, i) => ({ ...s, step: i + 1 }))
  localForm.value.jsonld_howto_json = JSON.stringify(stepsWithNumbers)
}, { deep: true })

// Methods
function toggleSchema(field) {
  localForm.value[field] = !localForm.value[field]
}

function addFaqItem() {
  if (faqItems.value.length < 10) {
    faqItems.value.push({ question: '', answer: '' })
  }
}

function removeFaqItem(index) {
  faqItems.value.splice(index, 1)
}

function addFaqTemplate() {
  const slotName = props.slotName || 'этот слот'
  const templates = [
    { question: `Какой RTP у ${slotName}?`, answer: `RTP (Return to Player) составляет около 96%, что является стандартным показателем для современных слотов.` },
    { question: `Можно ли играть в ${slotName} бесплатно?`, answer: `Да, вы можете играть в демо-версию бесплатно без регистрации прямо на нашем сайте ${props.siteName}.` },
    { question: `Какие бонусные функции есть в ${slotName}?`, answer: `Слот включает фриспины, множители и специальные символы Wild и Scatter.` },
  ]
  faqItems.value.push(...templates.slice(0, 10 - faqItems.value.length))
}

function addHowToStep() {
  if (howToSteps.value.length < 10) {
    howToSteps.value.push({ name: '', text: '' })
  }
}

function removeHowToStep(index) {
  howToSteps.value.splice(index, 1)
}

function addHowToTemplate() {
  const templates = [
    { name: 'Выберите ставку', text: 'Используйте кнопки +/- для настройки размера ставки перед началом игры.' },
    { name: 'Запустите барабаны', text: 'Нажмите кнопку Spin для запуска игры. Барабаны остановятся автоматически.' },
    { name: 'Соберите выигрышные комбинации', text: 'Выигрыш начисляется за комбинации из 3+ одинаковых символов на линии выплат.' },
    { name: 'Активируйте бонусы', text: 'Соберите 3+ Scatter символа для запуска бонусного раунда с фриспинами.' },
  ]
  howToSteps.value.push(...templates.slice(0, 10 - howToSteps.value.length))
}

async function loadJsonLdPreview() {
  if (!props.slotId) {
    console.log('No slotId provided, cannot load JSON-LD preview.')
    return
  }
  loadingPreview.value = true
  try {
    const response = await $fetch(`http://localhost:3001/api/jsonld/${props.slotId}`)
    jsonLdPreview.value = response
  } catch (error) {
    console.error('Error loading JSON-LD preview:', error)
  } finally {
    loadingPreview.value = false
  }
}

function openGoogleTest() {
  window.open('https://search.google.com/test/rich-results', '_blank')
}

function copyJsonLd() {
  if (!jsonLdPreview.value?.schemas?.combined) return
  navigator.clipboard.writeText(JSON.stringify(jsonLdPreview.value.schemas.combined, null, 2))
}

// 🪄 Auto-generate all JSON-LD content based on slot data
async function autoGenerateAll() {
  generating.value = true

  const slotName = props.slotName || 'этот слот'
  const rtp = props.modelValue.rtp || '96%'
  const provider = props.modelValue.provider_name || 'провайдера'

  // Small delay for UX
  await new Promise(r => setTimeout(r, 500))

  // Enable all schemas
  localForm.value.jsonld_enable_review = true
  localForm.value.jsonld_enable_aggregate = true
  localForm.value.jsonld_enable_faq = true
  localForm.value.jsonld_enable_howto = true
  localForm.value.jsonld_enable_breadcrumb = true

  // Generate Review
  localForm.value.jsonld_review_author = 'Editorial Team'
  localForm.value.jsonld_review_rating = 4.5 + Math.random() * 0.4 // 4.5-4.9
  localForm.value.jsonld_review_rating = Math.round(localForm.value.jsonld_review_rating * 10) / 10
  localForm.value.jsonld_review_date = new Date().toISOString().split('T')[0]
  localForm.value.jsonld_review_text = `${slotName} — отличный выбор для любителей качественных слотов. Этот игровой автомат от ${provider} предлагает RTP ${rtp}, захватывающий геймплей и щедрые бонусные функции. Рекомендуем попробовать демо-версию!`

  // Generate AggregateRating
  localForm.value.jsonld_aggregate_rating = 4.3 + Math.random() * 0.5
  localForm.value.jsonld_aggregate_rating = Math.round(localForm.value.jsonld_aggregate_rating * 10) / 10
  localForm.value.jsonld_aggregate_count = 500 + Math.floor(Math.random() * 1500)
  localForm.value.jsonld_aggregate_best = 5
  localForm.value.jsonld_aggregate_worst = 1

  // Generate FAQ
  faqItems.value = [
    {
      question: `Какой RTP у слота ${slotName}?`,
      answer: `RTP (Return to Player) слота ${slotName} составляет ${rtp}. Это означает, что в среднем игрок получает обратно ${rtp} от своих ставок в долгосрочной перспективе.`
    },
    {
      question: `Можно ли играть в ${slotName} бесплатно?`,
      answer: `Да, вы можете играть в демо-версию ${slotName} абсолютно бесплатно без регистрации и депозита прямо на нашем сайте ${props.siteName}.`
    },
    {
      question: `Какие бонусные функции есть в ${slotName}?`,
      answer: `${slotName} включает множество бонусных функций: фриспины с множителями, специальные символы Wild и Scatter, а также уникальные игровые механики от ${provider}.`
    },
    {
      question: `На каких устройствах можно играть в ${slotName}?`,
      answer: `${slotName} полностью оптимизирован для игры на всех устройствах: компьютерах, планшетах и смартфонах (iOS и Android). Используется технология HTML5.`
    },
    {
      question: `Как выиграть в ${slotName}?`,
      answer: `Для выигрыша в ${slotName} нужно собрать комбинацию из 3+ одинаковых символов на активной линии выплат. Бонусные символы активируют специальные раунды с увеличенными выплатами.`
    }
  ]

  // Generate HowTo
  howToSteps.value = [
    {
      name: 'Откройте слот',
      text: `Перейдите на страницу ${slotName} и нажмите кнопку "Играть бесплатно" или "Демо"  для запуска игры.`
    },
    {
      name: 'Настройте ставку',
      text: 'Используйте кнопки +/- или выберите из предустановленных значений для настройки размера ставки на спин.'
    },
    {
      name: 'Запустите барабаны',
      text: 'Нажмите кнопку Spin для запуска игры. Вы также можете использовать Autoplay для автоматической игры.'
    },
    {
      name: 'Соберите выигрышные комбинации',
      text: `Выигрыш в ${slotName} начисляется за комбинации из 3+ одинаковых символов слева направо на линиях выплат.`
    }
  ]

  generating.value = false
}

</script>
