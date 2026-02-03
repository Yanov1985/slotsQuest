<template>
  <!--
    🌍 Technical SEO Component v2.0

    Features:
    - Technical SEO Score indicator
    - Visual World Map with clickable regions
    - 50+ regions grouped by continents
    - Robots meta configuration
    - Canonical URL settings
    - Geo Coverage Score
    - Syntax highlighted preview
  -->
  <div class="space-y-6">
    <!-- Header with Score -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#059669]/20 to-[#047857]/20 rounded-xl border border-[#059669]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#059669] to-[#047857] rounded-xl flex items-center justify-center">
          <span class="text-2xl">🌍</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">Technical SEO</h3>
          <p class="text-sm text-[#9CA3AF]">Hreflang, Robots, Canonical</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <!-- Technical SEO Score -->
        <div
          class="relative w-14 h-14 rounded-full flex items-center justify-center"
          :class="{
            'bg-[#EF4444]/20': techScore < 40,
            'bg-[#F59E0B]/20': techScore >= 40 && techScore < 70,
            'bg-[#10B981]/20': techScore >= 70,
          }"
        >
          <span
            class="text-lg font-bold"
            :class="{
              'text-[#EF4444]': techScore < 40,
              'text-[#F59E0B]': techScore >= 40 && techScore < 70,
              'text-[#10B981]': techScore >= 70,
            }"
          >{{ techScore }}%</span>
        </div>
      </div>
    </div>

    <!-- Score Breakdown Cards -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div
        v-for="item in scoreItems"
        :key="item.name"
        class="p-3 rounded-xl border transition-all"
        :class="item.active ? 'bg-[#059669]/10 border-[#059669]/50' : 'bg-[#1B1E26] border-[#353A4A]'"
      >
        <div class="flex items-center gap-2 mb-1">
          <span class="text-lg">{{ item.icon }}</span>
          <span class="text-xs font-medium" :class="item.active ? 'text-[#10B981]' : 'text-[#9CA3AF]'">{{ item.name }}</span>
        </div>
        <div class="text-xs" :class="item.active ? 'text-[#059669]' : 'text-[#6B7280]'">
          {{ item.active ? '✓ Active' : '○ Off' }}
        </div>
      </div>
    </div>

    <!-- World Map Section -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-lg">🗺️</span>
          Geo Targeting — Карта мира
        </h4>
        <div class="flex items-center gap-3">
          <span class="text-xs text-[#9CA3AF]">{{ selectedRegions.length }} / {{ allRegions.length }} регионов</span>
          <div class="flex gap-1">
            <button
              type="button"
              @click="selectAll"
              class="px-2 py-1 bg-[#059669]/20 text-[#10B981] rounded text-xs hover:bg-[#059669]/30 transition-all"
            >Все</button>
            <button
              type="button"
              @click="clearAll"
              class="px-2 py-1 bg-[#EF4444]/20 text-[#EF4444] rounded text-xs hover:bg-[#EF4444]/30 transition-all"
            >Очистить</button>
          </div>
        </div>
      </div>

      <!-- Visual World Map -->
      <div class="relative bg-[#161A21] rounded-xl p-4 mb-4 overflow-hidden">
        <!-- Map Background Grid -->
        <div class="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 400">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#059669" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>

        <!-- Simplified World Map Outline -->
        <div class="relative h-48 md:h-64">
          <svg viewBox="0 0 800 400" class="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <!-- Simplified continents -->
            <!-- North America -->
            <path d="M100,80 L180,60 L200,100 L180,140 L120,160 L80,140 Z" fill="#1B1E26" stroke="#353A4A" stroke-width="1"/>
            <!-- South America -->
            <path d="M150,180 L190,200 L180,280 L140,320 L120,260 L130,200 Z" fill="#1B1E26" stroke="#353A4A" stroke-width="1"/>
            <!-- Europe -->
            <path d="M380,60 L440,50 L460,80 L440,120 L380,110 Z" fill="#1B1E26" stroke="#353A4A" stroke-width="1"/>
            <!-- Africa -->
            <path d="M380,140 L440,130 L480,180 L460,280 L380,280 L360,200 Z" fill="#1B1E26" stroke="#353A4A" stroke-width="1"/>
            <!-- Asia -->
            <path d="M480,40 L700,60 L720,120 L680,180 L560,180 L500,140 L460,80 Z" fill="#1B1E26" stroke="#353A4A" stroke-width="1"/>
            <!-- Australia -->
            <path d="M640,260 L720,250 L740,300 L700,340 L640,320 Z" fill="#1B1E26" stroke="#353A4A" stroke-width="1"/>

            <!-- Region Dots -->
            <g v-for="region in allRegions" :key="region.code">
              <circle
                :cx="region.x"
                :cy="region.y"
                :r="selectedRegions.includes(region.code) ? 8 : 5"
                :fill="selectedRegions.includes(region.code) ? '#10B981' : '#353A4A'"
                :stroke="selectedRegions.includes(region.code) ? '#059669' : '#4B5563'"
                stroke-width="2"
                class="cursor-pointer transition-all duration-200 hover:r-10"
                @click="toggleRegion(region.code)"
              />
              <text
                v-if="selectedRegions.includes(region.code)"
                :x="region.x"
                :y="region.y - 12"
                text-anchor="middle"
                class="text-[8px] fill-[#10B981] font-medium pointer-events-none"
              >{{ region.code }}</text>
            </g>
          </svg>
        </div>

        <!-- Geo Coverage Stats -->
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-[#353A4A]">
          <div class="flex items-center gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-[#10B981]">{{ geoScore }}%</div>
              <div class="text-xs text-[#9CA3AF]">Geo Coverage</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-[#3B82F6]">{{ languageCount }}</div>
              <div class="text-xs text-[#9CA3AF]">Languages</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-[#8B5CF6]">{{ continentCount }}</div>
              <div class="text-xs text-[#9CA3AF]">Continents</div>
            </div>
          </div>
          <div class="flex gap-2">
            <span class="flex items-center gap-1 text-xs text-[#9CA3AF]">
              <span class="w-2 h-2 bg-[#10B981] rounded-full"></span> Active
            </span>
            <span class="flex items-center gap-1 text-xs text-[#9CA3AF]">
              <span class="w-2 h-2 bg-[#353A4A] rounded-full"></span> Inactive
            </span>
          </div>
        </div>
      </div>

      <!-- Continents Accordion -->
      <div class="space-y-2">
        <div
          v-for="continent in continents"
          :key="continent.id"
          class="border border-[#353A4A] rounded-lg overflow-hidden"
        >
          <button
            type="button"
            @click="toggleContinent(continent.id)"
            class="w-full flex items-center justify-between p-3 bg-[#161A21] hover:bg-[#1B1E26] transition-all"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl">{{ continent.icon }}</span>
              <span class="text-sm font-medium text-[#E5E7EB]">{{ continent.name }}</span>
              <span class="px-2 py-0.5 bg-[#059669]/20 text-[#10B981] rounded text-xs">
                {{ getActiveCountForContinent(continent.id) }}/{{ continent.regions.length }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                @click.stop="selectContinent(continent.id)"
                class="px-2 py-1 bg-[#059669]/10 text-[#059669] rounded text-xs hover:bg-[#059669]/20"
              >+Все</button>
              <svg
                class="w-4 h-4 text-[#9CA3AF] transition-transform"
                :class="{ 'rotate-180': expandedContinents.includes(continent.id) }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>
          <div v-show="expandedContinents.includes(continent.id)" class="p-3 bg-[#1B1E26]/50">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="region in getRegionsForContinent(continent.id)"
                :key="region.code"
                type="button"
                @click="toggleRegion(region.code)"
                class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                :class="selectedRegions.includes(region.code)
                  ? 'bg-[#059669] text-white'
                  : 'bg-[#161A21] border border-[#353A4A] text-[#9CA3AF] hover:border-[#059669]/40'"
              >
                <span>{{ region.flag }}</span>
                <span>{{ region.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🎯 Geo Intelligence -->
    <div class="bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[#3B82F6]/30 rounded-xl p-4">
      <h4 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-4">
        <span class="text-lg">🎯</span>
        Geo Intelligence
        <span class="px-2 py-0.5 bg-[#3B82F6]/20 text-[#3B82F6] rounded text-xs">PRO</span>
      </h4>

      <!-- Traffic Potential -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A] text-center">
          <div class="text-2xl font-bold text-[#10B981]">{{ estimatedTraffic }}M</div>
          <div class="text-xs text-[#9CA3AF]">Est. Traffic</div>
        </div>
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A] text-center">
          <div class="text-2xl font-bold text-[#F59E0B]">{{ iGamingScore }}%</div>
          <div class="text-xs text-[#9CA3AF]">iGaming Score</div>
        </div>
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A] text-center">
          <div class="text-2xl font-bold text-[#8B5CF6]">{{ topLanguages }}</div>
          <div class="text-xs text-[#9CA3AF]">Top Languages</div>
        </div>
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A] text-center">
          <div class="text-2xl font-bold text-[#EC4899]">{{ competitionLevel }}</div>
          <div class="text-xs text-[#9CA3AF]">Competition</div>
        </div>
      </div>

      <!-- Recommendations -->
      <div class="space-y-2">
        <div v-for="rec in recommendations" :key="rec.code"
          class="flex items-center justify-between p-2 bg-[#161A21] rounded-lg border"
          :class="rec.type === 'success' ? 'border-[#10B981]/30' : rec.type === 'warning' ? 'border-[#F59E0B]/30' : 'border-[#3B82F6]/30'"
        >
          <div class="flex items-center gap-2">
            <span>{{ rec.icon }}</span>
            <span class="text-sm text-[#E5E7EB]">{{ rec.text }}</span>
          </div>
          <button v-if="rec.action" type="button" @click="rec.action"
            class="px-2 py-1 bg-[#3B82F6]/20 text-[#3B82F6] rounded text-xs hover:bg-[#3B82F6]/30">
            {{ rec.actionText }}
          </button>
        </div>
      </div>
    </div>

    <!-- 💾 Custom Presets -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-lg">💾</span>
          Мои пресеты
        </h4>
        <button type="button" @click="saveCurrentPreset"
          class="px-3 py-1.5 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded-lg text-xs hover:bg-[#8B5CF6]/30">
          + Сохранить текущий
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button v-for="preset in customPresets" :key="preset.name" type="button"
          @click="applyPreset(preset)"
          class="px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-sm text-[#E5E7EB] hover:border-[#8B5CF6]/40 flex items-center gap-2">
          <span>{{ preset.icon }}</span>
          <span>{{ preset.name }}</span>
          <span class="text-xs text-[#9CA3AF]">({{ preset.regions.length }})</span>
        </button>
        <button type="button" @click="showPresetModal = true"
          class="px-3 py-2 border border-dashed border-[#353A4A] rounded-lg text-sm text-[#9CA3AF] hover:border-[#8B5CF6]/40">
          + Создать
        </button>
      </div>
    </div>

    <!-- ⚠️ Live Validation -->
    <div v-if="validationWarnings.length > 0" class="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4">
      <h4 class="flex items-center gap-2 text-sm font-medium text-[#F59E0B] mb-3">
        <span class="text-lg">⚠️</span>
        Предупреждения
      </h4>
      <div class="space-y-2">
        <div v-for="(warning, idx) in validationWarnings" :key="idx"
          class="flex items-start gap-2 text-sm text-[#E5E7EB]">
          <span class="text-[#F59E0B]">•</span>
          <span>{{ warning }}</span>
        </div>
      </div>
    </div>

    <!-- Robots Configuration -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <h4 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-4">
        <span class="text-lg">🤖</span>
        Robots Meta Configuration
      </h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <!-- Index Toggle -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-[#E5E7EB]">Index</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="robotsConfig.index" class="sr-only peer"/>
              <div class="w-9 h-5 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10B981]"></div>
            </label>
          </div>
          <p class="text-xs text-[#6B7280]">{{ robotsConfig.index ? 'Страница индексируется' : 'Noindex' }}</p>
        </div>
        <!-- Follow Toggle -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-[#E5E7EB]">Follow</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="robotsConfig.follow" class="sr-only peer"/>
              <div class="w-9 h-5 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10B981]"></div>
            </label>
          </div>
          <p class="text-xs text-[#6B7280]">{{ robotsConfig.follow ? 'Ссылки follow' : 'Nofollow' }}</p>
        </div>
        <!-- Max Snippet -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <label class="text-sm text-[#E5E7EB] block mb-2">Max Snippet</label>
          <select v-model="robotsConfig.maxSnippet" class="w-full px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-sm text-[#E5E7EB]">
            <option value="-1">Без ограничений</option>
            <option value="0">Без сниппета</option>
            <option value="160">160 символов</option>
            <option value="320">320 символов</option>
          </select>
        </div>
        <!-- Max Image Preview -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <label class="text-sm text-[#E5E7EB] block mb-2">Image Preview</label>
          <select v-model="robotsConfig.maxImagePreview" class="w-full px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-sm text-[#E5E7EB]">
            <option value="large">Large</option>
            <option value="standard">Standard</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <!-- Robots Meta Preview -->
      <div class="mt-4 p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-[#9CA3AF]">Preview:</span>
          <button type="button" @click="copyRobots" class="text-xs text-[#059669] hover:text-[#10B981]">📋 Copy</button>
        </div>
        <code class="text-xs text-[#10B981]">{{ robotsMetaTag }}</code>
      </div>
    </div>

    <!-- Canonical URL -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <h4 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-4">
        <span class="text-lg">🔗</span>
        Canonical URL
      </h4>
      <div class="flex gap-3">
        <div class="flex-1">
          <input
            v-model="canonicalUrl"
            type="url"
            placeholder="https://slotquest.com/slots/your-slot"
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
          />
        </div>
        <button
          type="button"
          @click="generateCanonical"
          class="px-4 py-2 bg-[#059669] text-white rounded-lg text-sm hover:bg-[#047857] transition-all"
        >Auto</button>
      </div>
      <p class="text-xs text-[#6B7280] mt-2">Canonical URL предотвращает дублирование контента</p>
    </div>

    <!-- Hreflang Preview -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-lg">📝</span>
          Generated Hreflang Tags
          <span class="text-xs text-[#9CA3AF]">({{ selectedRegions.length + 2 }} tags)</span>
        </h4>
        <button type="button" @click="copyHreflang" class="px-3 py-1.5 bg-[#353A4A] text-[#E5E7EB] rounded-lg text-xs hover:bg-[#4B5563] transition-all">
          📋 Copy All
        </button>
      </div>
      <div class="bg-[#161A21] rounded-lg p-4 overflow-x-auto max-h-48 overflow-y-auto">
        <pre class="text-xs leading-relaxed"><code v-html="highlightedHreflang"></code></pre>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex flex-wrap gap-2">
      <a
        href="https://technicalseo.com/tools/hreflang/"
        target="_blank"
        class="px-3 py-2 bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30 rounded-lg text-xs hover:bg-[#3B82F6]/30 transition-colors"
      >🔧 Hreflang Validator</a>
      <a
        href="https://www.google.com/webmasters/tools/robots-testing-tool"
        target="_blank"
        class="px-3 py-2 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 rounded-lg text-xs hover:bg-[#F59E0B]/30 transition-colors"
      >🤖 Robots Tester</a>
      <a
        href="https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls"
        target="_blank"
        class="px-3 py-2 bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30 rounded-lg text-xs hover:bg-[#8B5CF6]/30 transition-colors"
      >📘 Canonical Guide</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  slug: { type: String, default: 'slot-name' },
  baseUrl: { type: String, default: 'https://slotquest.com' },
  modelValue: { type: Object, default: () => ({}) }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// All regions with coordinates for map (50+ regions)
const allRegions = [
  // CIS & Eastern Europe
  { code: 'RU', flag: '🇷🇺', name: 'Russia', lang: 'ru', continent: 'europe', x: 560, y: 80 },
  { code: 'UA', flag: '🇺🇦', name: 'Ukraine', lang: 'uk', continent: 'europe', x: 480, y: 100 },
  { code: 'KZ', flag: '🇰🇿', name: 'Kazakhstan', lang: 'ru', continent: 'asia', x: 540, y: 100 },
  { code: 'UZ', flag: '🇺🇿', name: 'Uzbekistan', lang: 'uz', continent: 'asia', x: 520, y: 120 },
  { code: 'AZ', flag: '🇦🇿', name: 'Azerbaijan', lang: 'az', continent: 'asia', x: 500, y: 120 },
  { code: 'BY', flag: '🇧🇾', name: 'Belarus', lang: 'be', continent: 'europe', x: 460, y: 90 },
  { code: 'GE', flag: '🇬🇪', name: 'Georgia', lang: 'ka', continent: 'asia', x: 490, y: 110 },
  { code: 'AM', flag: '🇦🇲', name: 'Armenia', lang: 'hy', continent: 'asia', x: 495, y: 115 },

  // Europe
  { code: 'DE', flag: '🇩🇪', name: 'Germany', lang: 'de', continent: 'europe', x: 420, y: 80 },
  { code: 'GB', flag: '🇬🇧', name: 'UK', lang: 'en', continent: 'europe', x: 395, y: 75 },
  { code: 'FR', flag: '🇫🇷', name: 'France', lang: 'fr', continent: 'europe', x: 400, y: 90 },
  { code: 'IT', flag: '🇮🇹', name: 'Italy', lang: 'it', continent: 'europe', x: 425, y: 100 },
  { code: 'ES', flag: '🇪🇸', name: 'Spain', lang: 'es', continent: 'europe', x: 385, y: 105 },
  { code: 'PT', flag: '🇵🇹', name: 'Portugal', lang: 'pt', continent: 'europe', x: 375, y: 105 },
  { code: 'NL', flag: '🇳🇱', name: 'Netherlands', lang: 'nl', continent: 'europe', x: 410, y: 75 },
  { code: 'PL', flag: '🇵🇱', name: 'Poland', lang: 'pl', continent: 'europe', x: 445, y: 80 },
  { code: 'SE', flag: '🇸🇪', name: 'Sweden', lang: 'sv', continent: 'europe', x: 435, y: 55 },
  { code: 'NO', flag: '🇳🇴', name: 'Norway', lang: 'no', continent: 'europe', x: 420, y: 50 },
  { code: 'FI', flag: '🇫🇮', name: 'Finland', lang: 'fi', continent: 'europe', x: 460, y: 50 },
  { code: 'CZ', flag: '🇨🇿', name: 'Czechia', lang: 'cs', continent: 'europe', x: 435, y: 85 },
  { code: 'AT', flag: '🇦🇹', name: 'Austria', lang: 'de', continent: 'europe', x: 430, y: 90 },
  { code: 'CH', flag: '🇨🇭', name: 'Switzerland', lang: 'de', continent: 'europe', x: 415, y: 90 },
  { code: 'GR', flag: '🇬🇷', name: 'Greece', lang: 'el', continent: 'europe', x: 455, y: 110 },
  { code: 'RO', flag: '🇷🇴', name: 'Romania', lang: 'ro', continent: 'europe', x: 460, y: 100 },

  // South Asia
  { code: 'IN', flag: '🇮🇳', name: 'India', lang: 'en', continent: 'asia', x: 560, y: 160 },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh', lang: 'bn', continent: 'asia', x: 580, y: 165 },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan', lang: 'ur', continent: 'asia', x: 535, y: 145 },
  { code: 'LK', flag: '🇱🇰', name: 'Sri Lanka', lang: 'si', continent: 'asia', x: 565, y: 190 },
  { code: 'NP', flag: '🇳🇵', name: 'Nepal', lang: 'ne', continent: 'asia', x: 570, y: 150 },

  // Southeast Asia
  { code: 'ID', flag: '🇮🇩', name: 'Indonesia', lang: 'id', continent: 'asia', x: 640, y: 220 },
  { code: 'TH', flag: '🇹🇭', name: 'Thailand', lang: 'th', continent: 'asia', x: 610, y: 175 },
  { code: 'VN', flag: '🇻🇳', name: 'Vietnam', lang: 'vi', continent: 'asia', x: 620, y: 170 },
  { code: 'PH', flag: '🇵🇭', name: 'Philippines', lang: 'en', continent: 'asia', x: 660, y: 175 },
  { code: 'MY', flag: '🇲🇾', name: 'Malaysia', lang: 'ms', continent: 'asia', x: 625, y: 195 },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore', lang: 'en', continent: 'asia', x: 625, y: 205 },

  // East Asia
  { code: 'JP', flag: '🇯🇵', name: 'Japan', lang: 'ja', continent: 'asia', x: 700, y: 110 },
  { code: 'KR', flag: '🇰🇷', name: 'South Korea', lang: 'ko', continent: 'asia', x: 680, y: 115 },
  { code: 'CN', flag: '🇨🇳', name: 'China', lang: 'zh', continent: 'asia', x: 620, y: 120 },
  { code: 'TW', flag: '🇹🇼', name: 'Taiwan', lang: 'zh', continent: 'asia', x: 670, y: 150 },
  { code: 'HK', flag: '🇭🇰', name: 'Hong Kong', lang: 'zh', continent: 'asia', x: 655, y: 155 },

  // Middle East
  { code: 'TR', flag: '🇹🇷', name: 'Turkey', lang: 'tr', continent: 'asia', x: 475, y: 115 },
  { code: 'AE', flag: '🇦🇪', name: 'UAE', lang: 'ar', continent: 'asia', x: 510, y: 155 },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia', lang: 'ar', continent: 'asia', x: 490, y: 160 },
  { code: 'IL', flag: '🇮🇱', name: 'Israel', lang: 'he', continent: 'asia', x: 475, y: 135 },

  // North America
  { code: 'US', flag: '🇺🇸', name: 'USA', lang: 'en', continent: 'northamerica', x: 140, y: 110 },
  { code: 'CA', flag: '🇨🇦', name: 'Canada', lang: 'en', continent: 'northamerica', x: 140, y: 80 },
  { code: 'MX', flag: '🇲🇽', name: 'Mexico', lang: 'es', continent: 'northamerica', x: 120, y: 150 },

  // Latin America
  { code: 'BR', flag: '🇧🇷', name: 'Brazil', lang: 'pt', continent: 'southamerica', x: 180, y: 240 },
  { code: 'AR', flag: '🇦🇷', name: 'Argentina', lang: 'es', continent: 'southamerica', x: 155, y: 300 },
  { code: 'CL', flag: '🇨🇱', name: 'Chile', lang: 'es', continent: 'southamerica', x: 145, y: 290 },
  { code: 'CO', flag: '🇨🇴', name: 'Colombia', lang: 'es', continent: 'southamerica', x: 145, y: 200 },
  { code: 'PE', flag: '🇵🇪', name: 'Peru', lang: 'es', continent: 'southamerica', x: 140, y: 230 },
  { code: 'VE', flag: '🇻🇪', name: 'Venezuela', lang: 'es', continent: 'southamerica', x: 160, y: 195 },
  { code: 'EC', flag: '🇪🇨', name: 'Ecuador', lang: 'es', continent: 'southamerica', x: 135, y: 210 },

  // Africa
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria', lang: 'en', continent: 'africa', x: 415, y: 195 },
  { code: 'ZA', flag: '🇿🇦', name: 'South Africa', lang: 'en', continent: 'africa', x: 445, y: 290 },
  { code: 'KE', flag: '🇰🇪', name: 'Kenya', lang: 'en', continent: 'africa', x: 475, y: 215 },
  { code: 'EG', flag: '🇪🇬', name: 'Egypt', lang: 'ar', continent: 'africa', x: 460, y: 150 },
  { code: 'MA', flag: '🇲🇦', name: 'Morocco', lang: 'ar', continent: 'africa', x: 385, y: 140 },
  { code: 'GH', flag: '🇬🇭', name: 'Ghana', lang: 'en', continent: 'africa', x: 400, y: 195 },

  // Oceania
  { code: 'AU', flag: '🇦🇺', name: 'Australia', lang: 'en', continent: 'oceania', x: 680, y: 290 },
  { code: 'NZ', flag: '🇳🇿', name: 'New Zealand', lang: 'en', continent: 'oceania', x: 740, y: 320 },
]

// Continents
const continents = [
  { id: 'europe', name: 'Europe', icon: '🇪🇺', regions: ['RU', 'UA', 'DE', 'GB', 'FR', 'IT', 'ES', 'PT', 'NL', 'PL', 'SE', 'NO', 'FI', 'CZ', 'AT', 'CH', 'GR', 'RO', 'BY'] },
  { id: 'asia', name: 'Asia', icon: '🌏', regions: ['KZ', 'UZ', 'AZ', 'GE', 'AM', 'IN', 'BD', 'PK', 'LK', 'NP', 'ID', 'TH', 'VN', 'PH', 'MY', 'SG', 'JP', 'KR', 'CN', 'TW', 'HK', 'TR', 'AE', 'SA', 'IL'] },
  { id: 'northamerica', name: 'North America', icon: '🌎', regions: ['US', 'CA', 'MX'] },
  { id: 'southamerica', name: 'South America', icon: '🌎', regions: ['BR', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC'] },
  { id: 'africa', name: 'Africa', icon: '🌍', regions: ['NG', 'ZA', 'KE', 'EG', 'MA', 'GH'] },
  { id: 'oceania', name: 'Oceania', icon: '🌏', regions: ['AU', 'NZ'] },
]

// State
const selectedRegions = ref(['RU', 'IN', 'BR', 'UZ', 'AZ', 'TR', 'CL', 'AR', 'CA', 'CO', 'ID', 'BD'])
const expandedContinents = ref(['europe', 'asia'])
const robotsConfig = ref({
  index: true,
  follow: true,
  maxSnippet: '-1',
  maxImagePreview: 'large'
})
const canonicalUrl = ref('')

// Computed
const techScore = computed(() => {
  let score = 0
  if (selectedRegions.value.length > 0) score += 30
  if (selectedRegions.value.length >= 10) score += 20
  if (robotsConfig.value.index) score += 15
  if (robotsConfig.value.follow) score += 15
  if (canonicalUrl.value) score += 20
  return Math.min(score, 100)
})

const scoreItems = computed(() => [
  { name: 'Hreflang', icon: '🌍', active: selectedRegions.value.length > 0 },
  { name: 'Robots', icon: '🤖', active: robotsConfig.value.index },
  { name: 'Canonical', icon: '🔗', active: !!canonicalUrl.value },
  { name: 'Geo', icon: '📍', active: selectedRegions.value.length >= 5 },
  { name: 'Lang', icon: '🗣️', active: languageCount.value >= 3 }
])

const geoScore = computed(() => {
  return Math.min(Math.round(selectedRegions.value.length / allRegions.length * 100), 100)
})

const languageCount = computed(() => {
  const langs = new Set(selectedRegions.value.map(code => {
    const region = allRegions.find(r => r.code === code)
    return region?.lang
  }).filter(Boolean))
  return langs.size
})

const continentCount = computed(() => {
  const conts = new Set(selectedRegions.value.map(code => {
    const region = allRegions.find(r => r.code === code)
    return region?.continent
  }).filter(Boolean))
  return conts.size
})

const robotsMetaTag = computed(() => {
  const parts = []
  parts.push(robotsConfig.value.index ? 'index' : 'noindex')
  parts.push(robotsConfig.value.follow ? 'follow' : 'nofollow')
  if (robotsConfig.value.maxSnippet !== '-1') parts.push(`max-snippet:${robotsConfig.value.maxSnippet}`)
  if (robotsConfig.value.maxImagePreview !== 'large') parts.push(`max-image-preview:${robotsConfig.value.maxImagePreview}`)
  return `<meta name="robots" content="${parts.join(', ')}">`
})

const highlightedHreflang = computed(() => {
  let html = '<span class="text-[#6B7280]">&lt;!-- Hreflang tags --&gt;</span>\n'
  html += `<span class="text-[#8B5CF6]">&lt;link</span> <span class="text-[#F59E0B]">rel=</span><span class="text-[#10B981]">"alternate"</span> <span class="text-[#F59E0B]">hreflang=</span><span class="text-[#10B981]">"x-default"</span> <span class="text-[#F59E0B]">href=</span><span class="text-[#10B981]">"${props.baseUrl}/slots/${props.slug}"</span> <span class="text-[#8B5CF6]">/&gt;</span>\n`
  html += `<span class="text-[#8B5CF6]">&lt;link</span> <span class="text-[#F59E0B]">rel=</span><span class="text-[#10B981]">"alternate"</span> <span class="text-[#F59E0B]">hreflang=</span><span class="text-[#10B981]">"en"</span> <span class="text-[#F59E0B]">href=</span><span class="text-[#10B981]">"${props.baseUrl}/slots/${props.slug}"</span> <span class="text-[#8B5CF6]">/&gt;</span>\n`

  selectedRegions.value.forEach(code => {
    const region = allRegions.find(r => r.code === code)
    if (region) {
      const hreflang = `${region.lang}-${region.code}`
      html += `<span class="text-[#8B5CF6]">&lt;link</span> <span class="text-[#F59E0B]">rel=</span><span class="text-[#10B981]">"alternate"</span> <span class="text-[#F59E0B]">hreflang=</span><span class="text-[#10B981]">"${hreflang}"</span> <span class="text-[#F59E0B]">href=</span><span class="text-[#10B981]">"${props.baseUrl}/slots/${props.slug}"</span> <span class="text-[#8B5CF6]">/&gt;</span>\n`
    }
  })

  return html
})

// Methods
function toggleRegion(code) {
  const idx = selectedRegions.value.indexOf(code)
  if (idx > -1) selectedRegions.value.splice(idx, 1)
  else selectedRegions.value.push(code)
}

function toggleContinent(id) {
  const idx = expandedContinents.value.indexOf(id)
  if (idx > -1) expandedContinents.value.splice(idx, 1)
  else expandedContinents.value.push(id)
}

function selectContinent(id) {
  const continent = continents.find(c => c.id === id)
  if (continent) {
    continent.regions.forEach(code => {
      if (!selectedRegions.value.includes(code)) selectedRegions.value.push(code)
    })
  }
}

function getRegionsForContinent(id) {
  const continent = continents.find(c => c.id === id)
  if (!continent) return []
  return allRegions.filter(r => continent.regions.includes(r.code))
}

function getActiveCountForContinent(id) {
  const continent = continents.find(c => c.id === id)
  if (!continent) return 0
  return selectedRegions.value.filter(code => continent.regions.includes(code)).length
}

function selectAll() {
  selectedRegions.value = allRegions.map(r => r.code)
}

function clearAll() {
  selectedRegions.value = []
}

function generateCanonical() {
  canonicalUrl.value = `${props.baseUrl}/slots/${props.slug}`
}

function copyRobots() {
  navigator.clipboard.writeText(robotsMetaTag.value)
}

function copyHreflang() {
  let text = `<!-- Hreflang tags -->\n`
  text += `<link rel="alternate" hreflang="x-default" href="${props.baseUrl}/slots/${props.slug}" />\n`
  text += `<link rel="alternate" hreflang="en" href="${props.baseUrl}/slots/${props.slug}" />\n`
  selectedRegions.value.forEach(code => {
    const region = allRegions.find(r => r.code === code)
    if (region) {
      text += `<link rel="alternate" hreflang="${region.lang}-${region.code}" href="${props.baseUrl}/slots/${props.slug}" />\n`
    }
  })
  navigator.clipboard.writeText(text)
}

// Watch and emit
watch([selectedRegions, robotsConfig, canonicalUrl], () => {
  emit('update:modelValue', {
    regions: selectedRegions.value,
    robots: robotsConfig.value,
    canonical: canonicalUrl.value
  })
}, { deep: true })

// ========== GEO INTELLIGENCE ==========

// Traffic data by region (estimated monthly iGaming traffic in millions)
const trafficData = {
  'RU': 8.5, 'IN': 12.0, 'BR': 9.2, 'DE': 7.8, 'GB': 6.5, 'US': 15.0, 'CA': 4.2,
  'TR': 5.1, 'ID': 3.8, 'PH': 2.9, 'TH': 2.1, 'VN': 1.8, 'PL': 2.4, 'UA': 1.9,
  'AR': 2.8, 'CL': 1.5, 'CO': 1.7, 'MX': 3.2, 'AU': 2.3, 'NZ': 0.8, 'ZA': 1.2,
  'NG': 1.8, 'KE': 0.6, 'KZ': 0.9, 'UZ': 0.7, 'AZ': 0.5, 'BD': 1.4, 'PK': 2.0
}

const estimatedTraffic = computed(() => {
  const total = selectedRegions.value.reduce((sum, code) => {
    return sum + (trafficData[code] || 0.5)
  }, 0)
  return total.toFixed(1)
})

const iGamingScore = computed(() => {
  const topRegions = ['DE', 'GB', 'US', 'CA', 'AU', 'BR', 'IN', 'TR', 'PL']
  const hasTop = selectedRegions.value.filter(r => topRegions.includes(r)).length
  return Math.min(Math.round((hasTop / topRegions.length) * 100 + geoScore.value / 2), 100)
})

const topLanguages = computed(() => {
  return Math.min(languageCount.value, 10)
})

const competitionLevel = computed(() => {
  if (selectedRegions.value.length > 30) return 'High'
  if (selectedRegions.value.length > 15) return 'Mid'
  return 'Low'
})

const recommendations = computed(() => {
  const recs = []

  // Check for top markets
  if (!selectedRegions.value.includes('DE')) {
    recs.push({ code: 'DE', icon: '🇩🇪', text: 'Добавьте Германию — топ-рынок iGaming', type: 'info', actionText: '+DE', action: () => toggleRegion('DE') })
  }
  if (!selectedRegions.value.includes('GB')) {
    recs.push({ code: 'GB', icon: '🇬🇧', text: 'Добавьте UK — регулируемый рынок', type: 'info', actionText: '+UK', action: () => toggleRegion('GB') })
  }

  // Success messages
  if (selectedRegions.value.includes('BR') && selectedRegions.value.includes('IN')) {
    recs.push({ code: 'emerging', icon: '✅', text: 'Отлично! Охвачены развивающиеся рынки', type: 'success' })
  }

  // Warnings
  if (selectedRegions.value.length < 5) {
    recs.push({ code: 'low', icon: '⚠️', text: 'Мало регионов — расширьте охват', type: 'warning' })
  }

  return recs.slice(0, 4)
})

// ========== CUSTOM PRESETS ==========

const showPresetModal = ref(false)
const customPresets = ref([
  { name: 'CIS Focus', icon: '🏛️', regions: ['RU', 'UA', 'KZ', 'UZ', 'AZ', 'BY'] },
  { name: 'LATAM', icon: '🌎', regions: ['BR', 'AR', 'CL', 'CO', 'MX', 'PE'] },
  { name: 'High Revenue', icon: '💰', regions: ['DE', 'GB', 'US', 'CA', 'AU'] }
])

function saveCurrentPreset() {
  const name = prompt('Название пресета:')
  if (name) {
    customPresets.value.push({
      name,
      icon: '📌',
      regions: [...selectedRegions.value]
    })
  }
}

function applyPreset(preset) {
  selectedRegions.value = [...preset.regions]
}

// ========== LIVE VALIDATION ==========

const validationWarnings = computed(() => {
  const warnings = []

  if (!robotsConfig.value.index) {
    warnings.push('Страница помечена как noindex — не будет индексироваться Google')
  }

  if (!robotsConfig.value.follow) {
    warnings.push('Ссылки nofollow — PageRank не передаётся')
  }

  if (!canonicalUrl.value && selectedRegions.value.length > 0) {
    warnings.push('Canonical URL не указан — рекомендуется для предотвращения дубликатов')
  }

  if (selectedRegions.value.length > 40) {
    warnings.push('Большое количество hreflang тегов (' + selectedRegions.value.length + ') — может замедлить парсинг')
  }

  return warnings
})
</script>
