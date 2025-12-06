<template>
  <!--
    🎯 JSON-LD Editor Component - Компонент управления JSON-LD схемами

    Этот компонент позволяет:
    - Включать/выключать отдельные схемы (Game, Review, FAQ, HowTo, Video, Breadcrumb)
    - Редактировать FAQ вопросы-ответы (добавление/удаление)
    - Редактировать HowTo шаги (добавление/удаление)
    - Просматривать превью сгенерированного JSON-LD
    - Тестировать схему в Google Rich Results Test
  -->
  <div class="space-y-6">
    <!-- 🔧 Главный переключатель JSON-LD -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#8B5CF6]/20 to-[#7C3AED]/20 rounded-xl border border-[#8B5CF6]/30">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div>
          <h4 class="font-medium text-[#E5E7EB]">JSON-LD для SEO</h4>
          <p class="text-xs text-[#9CA3AF]">Структурированные данные для поисковых систем</p>
        </div>
      </div>
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          v-model="localForm.jsonld_enabled"
          class="sr-only peer"
        />
        <div class="w-11 h-6 bg-[#353A4A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#8B5CF6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5CF6]"></div>
        <span class="ml-3 text-sm font-medium text-[#E5E7EB]">{{ localForm.jsonld_enabled ? 'Включено' : 'Выключено' }}</span>
      </label>
    </div>

    <!-- 📊 Статус и кнопки действий -->
    <div v-if="localForm.jsonld_enabled" class="flex flex-wrap gap-3">
      <!-- Кнопка загрузки превью -->
      <button
        type="button"
        @click="loadJsonLdPreview"
        :disabled="loadingPreview"
        class="flex items-center gap-2 px-4 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] hover:bg-[#353A4A] hover:border-[#8B5CF6]/40 transition-all duration-200 text-sm font-medium disabled:opacity-50"
      >
        <svg v-if="loadingPreview" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {{ loadingPreview ? 'Загрузка...' : 'Превью JSON-LD' }}
      </button>

      <!-- Кнопка теста Google -->
      <button
        type="button"
        @click="openGoogleTest"
        :disabled="!slotId"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-lg hover:from-[#059669] hover:to-[#047857] transition-all duration-200 text-sm font-medium disabled:opacity-50"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Тест в Google
      </button>

      <!-- Статус валидации -->
      <div v-if="validationStatus"
           class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
           :class="validationStatus.isValid
             ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
             : 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30'">
        <svg v-if="validationStatus.isValid" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ validationStatus.isValid ? 'Схема валидна' : `Ошибок: ${validationStatus.errors?.length || 0}` }}
      </div>
    </div>

    <!-- 📋 Включение схем (чекбоксы) -->
    <div v-if="localForm.jsonld_enabled" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <h5 class="text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
        <svg class="w-4 h-4 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Включить схемы
      </h5>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <!-- Game Schema (всегда активна) -->
        <label class="flex items-center gap-3 p-3 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-lg cursor-not-allowed opacity-75">
          <input type="checkbox" checked disabled class="w-4 h-4 rounded border-[#353A4A] text-[#8B5CF6] focus:ring-[#8B5CF6]" />
          <div>
            <span class="text-sm font-medium text-[#E5E7EB]">🎮 Game</span>
            <p class="text-xs text-[#9CA3AF]">Основная схема</p>
          </div>
        </label>

        <!-- Review Schema -->
        <label class="flex items-center gap-3 p-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg cursor-pointer hover:border-[#F59E0B]/40 transition-all">
          <input type="checkbox" v-model="localForm.jsonld_enable_review" class="w-4 h-4 rounded border-[#353A4A] text-[#F59E0B] focus:ring-[#F59E0B]" />
          <div>
            <span class="text-sm font-medium text-[#E5E7EB]">⭐ Review</span>
            <p class="text-xs text-[#9CA3AF]">Звёзды в поиске</p>
          </div>
        </label>

        <!-- FAQ Schema -->
        <label class="flex items-center gap-3 p-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg cursor-pointer hover:border-[#3B82F6]/40 transition-all">
          <input type="checkbox" v-model="localForm.jsonld_enable_faq" class="w-4 h-4 rounded border-[#353A4A] text-[#3B82F6] focus:ring-[#3B82F6]" />
          <div>
            <span class="text-sm font-medium text-[#E5E7EB]">❓ FAQ</span>
            <p class="text-xs text-[#9CA3AF]">Вопросы-ответы</p>
          </div>
        </label>

        <!-- HowTo Schema -->
        <label class="flex items-center gap-3 p-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg cursor-pointer hover:border-[#10B981]/40 transition-all">
          <input type="checkbox" v-model="localForm.jsonld_enable_howto" class="w-4 h-4 rounded border-[#353A4A] text-[#10B981] focus:ring-[#10B981]" />
          <div>
            <span class="text-sm font-medium text-[#E5E7EB]">📋 HowTo</span>
            <p class="text-xs text-[#9CA3AF]">Пошаговая инструкция</p>
          </div>
        </label>

        <!-- Breadcrumb Schema -->
        <label class="flex items-center gap-3 p-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg cursor-pointer hover:border-[#EC4899]/40 transition-all">
          <input type="checkbox" v-model="localForm.jsonld_enable_breadcrumb" class="w-4 h-4 rounded border-[#353A4A] text-[#EC4899] focus:ring-[#EC4899]" />
          <div>
            <span class="text-sm font-medium text-[#E5E7EB]">🍞 Breadcrumb</span>
            <p class="text-xs text-[#9CA3AF]">Хлебные крошки</p>
          </div>
        </label>

        <!-- Video Schema -->
        <label class="flex items-center gap-3 p-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg cursor-pointer hover:border-[#EF4444]/40 transition-all">
          <input type="checkbox" v-model="localForm.jsonld_enable_video" class="w-4 h-4 rounded border-[#353A4A] text-[#EF4444] focus:ring-[#EF4444]" />
          <div>
            <span class="text-sm font-medium text-[#E5E7EB]">🎬 Video</span>
            <p class="text-xs text-[#9CA3AF]">Видео-обзор</p>
          </div>
        </label>
      </div>
    </div>

    <!-- ⭐ Review Schema настройки -->
    <div v-if="localForm.jsonld_enabled && localForm.jsonld_enable_review"
         class="bg-[#1B1E26]/50 border border-[#F59E0B]/20 rounded-xl p-4">
      <h5 class="text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
        <span class="text-lg">⭐</span>
        Review Schema - Экспертный обзор
      </h5>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="block text-xs font-medium text-[#9CA3AF]">Автор обзора</label>
          <input
            v-model="localForm.jsonld_review_author"
            type="text"
            placeholder="SlotQuest Editorial Team"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] text-sm"
          />
        </div>
        <div class="space-y-2">
          <label class="block text-xs font-medium text-[#9CA3AF]">Рейтинг (1-5)</label>
          <input
            v-model.number="localForm.jsonld_review_rating"
            type="number"
            step="0.1"
            min="1"
            max="5"
            placeholder="4.8"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] text-sm"
          />
        </div>
        <div class="space-y-2 md:col-span-2">
          <label class="block text-xs font-medium text-[#9CA3AF]">Текст обзора</label>
          <textarea
            v-model="localForm.jsonld_review_text"
            rows="2"
            placeholder="Краткий текст экспертного обзора (100-200 символов)"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] text-sm resize-none"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- ❓ FAQ Editor -->
    <div v-if="localForm.jsonld_enabled && localForm.jsonld_enable_faq"
         class="bg-[#1B1E26]/50 border border-[#3B82F6]/20 rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-sm font-medium text-[#E5E7EB] flex items-center gap-2">
          <span class="text-lg">❓</span>
          FAQ Schema - Вопросы и ответы
          <span class="text-xs text-[#9CA3AF]">({{ faqItems.length }}/10)</span>
        </h5>
        <button
          type="button"
          @click="addFaqItem"
          :disabled="faqItems.length >= 10"
          class="flex items-center gap-1 px-3 py-1.5 bg-[#3B82F6] text-white rounded-lg text-xs font-medium hover:bg-[#2563EB] transition-all disabled:opacity-50"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Добавить вопрос
        </button>
      </div>

      <div class="space-y-3">
        <div v-for="(item, index) in faqItems" :key="index"
             class="bg-[#1B1E26] border border-[#353A4A] rounded-lg p-3 relative group">
          <button
            type="button"
            @click="removeFaqItem(index)"
            class="absolute top-2 right-2 w-6 h-6 bg-[#EF4444]/20 text-[#EF4444] rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="space-y-2">
            <input
              v-model="item.question"
              type="text"
              :placeholder="`Вопрос ${index + 1}`"
              class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] text-sm"
            />
            <textarea
              v-model="item.answer"
              rows="2"
              :placeholder="`Ответ на вопрос ${index + 1}`"
              class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] text-sm resize-none"
            ></textarea>
          </div>
        </div>

        <p v-if="faqItems.length === 0" class="text-center text-[#9CA3AF] text-sm py-4">
          Нажмите "Добавить вопрос" чтобы создать FAQ
        </p>
      </div>
    </div>

    <!-- 📋 HowTo Editor -->
    <div v-if="localForm.jsonld_enabled && localForm.jsonld_enable_howto"
         class="bg-[#1B1E26]/50 border border-[#10B981]/20 rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-sm font-medium text-[#E5E7EB] flex items-center gap-2">
          <span class="text-lg">📋</span>
          HowTo Schema - Как играть
          <span class="text-xs text-[#9CA3AF]">({{ howToSteps.length }}/10)</span>
        </h5>
        <button
          type="button"
          @click="addHowToStep"
          :disabled="howToSteps.length >= 10"
          class="flex items-center gap-1 px-3 py-1.5 bg-[#10B981] text-white rounded-lg text-xs font-medium hover:bg-[#059669] transition-all disabled:opacity-50"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Добавить шаг
        </button>
      </div>

      <div class="space-y-3">
        <div v-for="(step, index) in howToSteps" :key="index"
             class="bg-[#1B1E26] border border-[#353A4A] rounded-lg p-3 relative group">
          <div class="absolute top-2 left-3 w-6 h-6 bg-[#10B981] text-white rounded-full flex items-center justify-center text-xs font-bold">
            {{ index + 1 }}
          </div>
          <button
            type="button"
            @click="removeHowToStep(index)"
            class="absolute top-2 right-2 w-6 h-6 bg-[#EF4444]/20 text-[#EF4444] rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="space-y-2 pl-8">
            <input
              v-model="step.name"
              type="text"
              :placeholder="`Название шага ${index + 1}`"
              class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#10B981] text-sm"
            />
            <textarea
              v-model="step.text"
              rows="2"
              :placeholder="`Описание шага ${index + 1}`"
              class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#10B981] text-sm resize-none"
            ></textarea>
          </div>
        </div>

        <p v-if="howToSteps.length === 0" class="text-center text-[#9CA3AF] text-sm py-4">
          Нажмите "Добавить шаг" чтобы создать инструкцию
        </p>
      </div>
    </div>

    <!-- 🎬 Video Schema настройки -->
    <div v-if="localForm.jsonld_enabled && localForm.jsonld_enable_video"
         class="bg-[#1B1E26]/50 border border-[#EF4444]/20 rounded-xl p-4">
      <h5 class="text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
        <span class="text-lg">🎬</span>
        Video Schema - Видео-обзор
      </h5>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="block text-xs font-medium text-[#9CA3AF]">URL видео (YouTube/Vimeo)</label>
          <input
            v-model="localForm.jsonld_video_url"
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#EF4444] text-sm"
          />
        </div>
        <div class="space-y-2">
          <label class="block text-xs font-medium text-[#9CA3AF]">URL превью</label>
          <input
            v-model="localForm.jsonld_video_thumbnail"
            type="url"
            placeholder="https://img.youtube.com/..."
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#EF4444] text-sm"
          />
        </div>
        <div class="space-y-2">
          <label class="block text-xs font-medium text-[#9CA3AF]">Длительность (ISO 8601)</label>
          <input
            v-model="localForm.jsonld_video_duration"
            type="text"
            placeholder="PT3M30S (3 мин 30 сек)"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#EF4444] text-sm"
          />
        </div>
        <div class="space-y-2">
          <label class="block text-xs font-medium text-[#9CA3AF]">Описание видео</label>
          <input
            v-model="localForm.jsonld_video_description"
            type="text"
            placeholder="Обзор и геймплей слота..."
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#EF4444] text-sm"
          />
        </div>
      </div>
    </div>

    <!-- 👁️ Превью JSON-LD -->
    <div v-if="localForm.jsonld_enabled && jsonLdPreview"
         class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-sm font-medium text-[#E5E7EB] flex items-center gap-2">
          <svg class="w-4 h-4 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Превью JSON-LD
          <span class="text-xs text-[#9CA3AF]">({{ jsonLdPreview.meta?.totalSchemas || 0 }} схем)</span>
        </h5>
        <button
          type="button"
          @click="copyJsonLd"
          class="flex items-center gap-1 px-3 py-1.5 bg-[#353A4A] text-[#E5E7EB] rounded-lg text-xs font-medium hover:bg-[#4B5563] transition-all"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Копировать
        </button>
      </div>

      <!-- Включённые схемы -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="schema in jsonLdPreview.meta?.enabledSchemas" :key="schema"
              class="px-2 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded text-xs font-medium">
          {{ schema }}
        </span>
      </div>

      <!-- JSON превью (сворачиваемое) -->
      <div class="relative">
        <button
          type="button"
          @click="showFullPreview = !showFullPreview"
          class="w-full text-left"
        >
          <pre class="bg-[#161A21] border border-[#353A4A] rounded-lg p-4 text-xs text-[#9CA3AF] overflow-x-auto"
               :class="{ 'max-h-48 overflow-hidden': !showFullPreview }">{{ JSON.stringify(jsonLdPreview.schemas?.combined || [], null, 2) }}</pre>
          <div v-if="!showFullPreview" class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#161A21] to-transparent pointer-events-none"></div>
        </button>
        <p class="text-center text-xs text-[#9CA3AF] mt-2">
          {{ showFullPreview ? 'Нажмите чтобы свернуть' : 'Нажмите чтобы развернуть' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * 🎯 JSON-LD Editor Component
 *
 * Компонент для управления JSON-LD схемами слота в админке.
 * Использует API эндпоинты из backend для генерации и валидации.
 */

import { ref, watch, computed, onMounted } from 'vue'

// 📦 Props - данные от родительского компонента
const props = defineProps({
  // ID слота для API запросов
  slotId: {
    type: String,
    default: ''
  },
  // Объект формы с JSON-LD полями
  modelValue: {
    type: Object,
    required: true
  }
})

// 📤 Emits - события для родителя
const emit = defineEmits(['update:modelValue'])

// 🔧 Локальная копия формы для двустороннего связывания
const localForm = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 📊 Состояния компонента
const loadingPreview = ref(false)
const jsonLdPreview = ref(null)
const validationStatus = ref(null)
const showFullPreview = ref(false)

// ❓ FAQ Items - вопросы-ответы
const faqItems = ref([])

// 📋 HowTo Steps - шаги инструкции
const howToSteps = ref([])

// 🔄 Инициализация при монтировании
onMounted(() => {
  // Парсим существующие FAQ из JSON строки
  if (localForm.value.jsonld_faq_json) {
    try {
      faqItems.value = JSON.parse(localForm.value.jsonld_faq_json)
    } catch (e) {
      console.error('Ошибка парсинга FAQ JSON:', e)
      faqItems.value = []
    }
  }

  // Парсим существующие HowTo шаги из JSON строки
  if (localForm.value.jsonld_howto_json) {
    try {
      howToSteps.value = JSON.parse(localForm.value.jsonld_howto_json)
    } catch (e) {
      console.error('Ошибка парсинга HowTo JSON:', e)
      howToSteps.value = []
    }
  }
})

// 👀 Следим за изменениями FAQ и обновляем JSON
watch(faqItems, (newItems) => {
  localForm.value.jsonld_faq_json = JSON.stringify(newItems)
}, { deep: true })

// 👀 Следим за изменениями HowTo и обновляем JSON
watch(howToSteps, (newSteps) => {
  // Добавляем номера шагов
  const stepsWithNumbers = newSteps.map((step, index) => ({
    ...step,
    step: index + 1
  }))
  localForm.value.jsonld_howto_json = JSON.stringify(stepsWithNumbers)
}, { deep: true })

// ➕ Добавить FAQ вопрос
const addFaqItem = () => {
  if (faqItems.value.length < 10) {
    faqItems.value.push({
      question: '',
      answer: ''
    })
  }
}

// ➖ Удалить FAQ вопрос
const removeFaqItem = (index) => {
  faqItems.value.splice(index, 1)
}

// ➕ Добавить HowTo шаг
const addHowToStep = () => {
  if (howToSteps.value.length < 10) {
    howToSteps.value.push({
      name: '',
      text: ''
    })
  }
}

// ➖ Удалить HowTo шаг
const removeHowToStep = (index) => {
  howToSteps.value.splice(index, 1)
}

// 📥 Загрузить превью JSON-LD с сервера
const loadJsonLdPreview = async () => {
  if (!props.slotId) {
    console.warn('Slot ID не указан для загрузки превью')
    return
  }

  loadingPreview.value = true

  try {
    // Запрос к API
    const response = await $fetch(`http://localhost:3001/api/jsonld/${props.slotId}`)
    jsonLdPreview.value = response

    // Также получаем валидацию
    const validation = await $fetch(`http://localhost:3001/api/jsonld/${props.slotId}/validate`, {
      method: 'POST'
    })
    validationStatus.value = validation

  } catch (error) {
    console.error('Ошибка загрузки JSON-LD превью:', error)
  } finally {
    loadingPreview.value = false
  }
}

// 🔗 Открыть тест Google Rich Results
const openGoogleTest = async () => {
  if (!props.slotId) return

  try {
    const response = await $fetch(`http://localhost:3001/api/jsonld/${props.slotId}/test`)
    if (response.url) {
      window.open(response.url, '_blank')
    }
  } catch (error) {
    console.error('Ошибка получения URL теста:', error)
    // Fallback - открываем общую страницу теста
    window.open('https://search.google.com/test/rich-results', '_blank')
  }
}

// 📋 Копировать JSON-LD в буфер обмена
const copyJsonLd = async () => {
  if (!jsonLdPreview.value?.schemas?.combined) return

  try {
    const jsonString = JSON.stringify(jsonLdPreview.value.schemas.combined, null, 2)
    await navigator.clipboard.writeText(jsonString)
    // Можно добавить уведомление об успехе
  } catch (error) {
    console.error('Ошибка копирования:', error)
  }
}
</script>
