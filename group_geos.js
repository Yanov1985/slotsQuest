const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

const oldModalGrid = `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    <button type="button" v-for="locale in filteredAllLocales" :key="locale.code" 
                            @click="toggleLocale(locale.code)"
                            class="flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 gap-2 relative"
                            :class="activeLocaleCodes.includes(locale.code) ? 'bg-indigo-600/10 border-indigo-500/40 text-white shadow-[0_0_10px_rgba(99,102,241,0.05)]' : 'bg-[#1B1E26] border-[#353A4A] text-[#9CA3AF] hover:border-[#4B5563] hover:bg-[#2A2F3D]'"
                    >
                       <span class="text-3xl">{{ locale.flag }}</span>
                       <span class="text-xs sm:text-sm font-medium text-center line-clamp-1">{{ locale.name }}</span>
                       
                       <div v-if="activeLocaleCodes.includes(locale.code)" class="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                       </div>
                    </button>
                 </div>`;

const newModalGrid = `<div v-for="(locales, region) in filteredGroupedLocales" :key="region" class="mb-8">
                    <div class="flex items-center gap-3 mb-4">
                       <h4 class="text-xs font-semibold text-[#E5E7EB] uppercase tracking-wider">{{ region }}</h4>
                       <div class="h-px flex-1 bg-gradient-to-r from-[#353A4A] to-transparent"></div>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <button type="button" v-for="locale in locales" :key="locale.code" 
                                @click="toggleLocale(locale.code)"
                                class="flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 gap-2 relative"
                                :class="activeLocaleCodes.includes(locale.code) ? 'bg-indigo-600/10 border-indigo-500/40 text-white shadow-[0_0_10px_rgba(99,102,241,0.05)]' : 'bg-[#1B1E26] border-[#353A4A] text-[#9CA3AF] hover:border-[#4B5563] hover:bg-[#2A2F3D]'"
                        >
                           <span class="text-3xl">{{ locale.flag }}</span>
                           <span class="text-xs sm:text-sm font-medium text-center line-clamp-1">{{ locale.name }}</span>
                           
                           <div v-if="activeLocaleCodes.includes(locale.code)" class="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                              <svg class="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                           </div>
                        </button>
                    </div>
                 </div>`;

content = content.replace(oldModalGrid, newModalGrid);

content = content.replace('<div v-if="filteredAllLocales.length === 0"', '<div v-if="Object.keys(filteredGroupedLocales).length === 0"');

const oldScriptTarget = `const ALL_LOCALES = [
  { code: 'en', name: 'English (Default)', flag: '🇬🇧' },
  { code: 'ru', name: 'Россия', flag: '🇷🇺' },
  { code: 'hi', name: 'Индия', flag: '🇮🇳' },
  { code: 'pt-BR', name: 'Бразилия', flag: '🇧🇷' },
  { code: 'uz', name: 'Узбекистан', flag: '🇺🇿' },
  { code: 'az', name: 'Азербайджан', flag: '🇦🇿' },
  { code: 'tr', name: 'Турция', flag: '🇹🇷' },
  { code: 'es-CL', name: 'Чили', flag: '🇨🇱' },
  { code: 'es-AR', name: 'Аргентина', flag: '🇦🇷' },
  { code: 'en-CA', name: 'Канада', flag: '🇨🇦' },
  { code: 'es-CO', name: 'Колумбия', flag: '🇨🇴' },
  { code: 'id', name: 'Индонезия', flag: '🇮🇩' },
  { code: 'bn', name: 'Бангладеш', flag: '🇧🇩' },
  { code: 'fr-SN', name: 'Сенегал', flag: '🇸🇳' },
  { code: 'en-UG', name: 'Уганда', flag: '🇺🇬' },
  { code: 'de', name: 'Германия', flag: '🇩🇪' },
  { code: 'es', name: 'Испания', flag: '🇪🇸' },
  { code: 'fr', name: 'Франция', flag: '🇫🇷' },
  { code: 'it', name: 'Италия', flag: '🇮🇹' },
  { code: 'ja', name: 'Япония', flag: '🇯🇵' },
  { code: 'ko', name: 'Южная Корея', flag: '🇰🇷' },
  { code: 'zh', name: 'Китай', flag: '🇨🇳' },
  { code: 'vi', name: 'Вьетнам', flag: '🇻🇳' },
  { code: 'th', name: 'Таиланд', flag: '🇹🇭' },
  { code: 'pl', name: 'Польша', flag: '🇵🇱' },
  { code: 'bg', name: 'Болгария', flag: '🇧🇬' },
  { code: 'ro', name: 'Румыния', flag: '🇷🇴' },
  { code: 'el', name: 'Греция', flag: '🇬🇷' },
  { code: 'hu', name: 'Венгрия', flag: '🇭🇺' },
  { code: 'cs', name: 'Чехия', flag: '🇨🇿' }
]

const currentLocale = ref('en')
const activeLocaleCodes = ref(['en'])
const localizations = ref({})

const getLocale = (code) => ALL_LOCALES.find(l => l.code === code) || { code, name: code, flag: '🌍' }

const filteredAllLocales = computed(() => {
  if (!geoSearch.value) return ALL_LOCALES;
  const q = geoSearch.value.toLowerCase()
  return ALL_LOCALES.filter(l => l.name.toLowerCase().includes(q) || l.code.toLowerCase().includes(q))
})`;

const newScriptTarget = `const ALL_LOCALES = [
  // Global / Default
  { code: 'en', name: 'English (Default)', flag: '🇬🇧', region: 'Global & Default' },
  
  // CIS & Eastern Europe
  { code: 'ru', name: 'Россия', flag: '🇷🇺', region: 'CIS & Eastern Europe' },
  { code: 'uz', name: 'Узбекистан', flag: '🇺🇿', region: 'CIS & Eastern Europe' },
  { code: 'az', name: 'Азербайджан', flag: '🇦🇿', region: 'CIS & Eastern Europe' },
  { code: 'kk', name: 'Казахстан', flag: '🇰🇿', region: 'CIS & Eastern Europe' },
  { code: 'uk', name: 'Украина', flag: '🇺🇦', region: 'CIS & Eastern Europe' },
  { code: 'pl', name: 'Польша', flag: '🇵🇱', region: 'CIS & Eastern Europe' },
  { code: 'bg', name: 'Болгария', flag: '🇧🇬', region: 'CIS & Eastern Europe' },
  { code: 'ro', name: 'Румыния', flag: '🇷🇴', region: 'CIS & Eastern Europe' },
  { code: 'cs', name: 'Чехия', flag: '🇨🇿', region: 'CIS & Eastern Europe' },
  { code: 'hu', name: 'Венгрия', flag: '🇭🇺', region: 'CIS & Eastern Europe' },
  
  // Western Europe
  { code: 'de', name: 'Германия', flag: '🇩🇪', region: 'Western Europe' },
  { code: 'fr', name: 'Франция', flag: '🇫🇷', region: 'Western Europe' },
  { code: 'es', name: 'Испания', flag: '🇪🇸', region: 'Western Europe' },
  { code: 'it', name: 'Италия', flag: '🇮🇹', region: 'Western Europe' },
  { code: 'pt', name: 'Португалия', flag: '🇵🇹', region: 'Western Europe' },
  { code: 'nl', name: 'Нидерланды', flag: '🇳🇱', region: 'Western Europe' },
  { code: 'sv', name: 'Швеция', flag: '🇸🇪', region: 'Western Europe' },
  { code: 'el', name: 'Греция', flag: '🇬🇷', region: 'Western Europe' },
  
  // Americas
  { code: 'pt-BR', name: 'Бразилия', flag: '🇧🇷', region: 'Americas' },
  { code: 'es-AR', name: 'Аргентина', flag: '🇦🇷', region: 'Americas' },
  { code: 'es-CL', name: 'Чили', flag: '🇨🇱', region: 'Americas' },
  { code: 'es-CO', name: 'Колумбия', flag: '🇨🇴', region: 'Americas' },
  { code: 'es-PE', name: 'Перу', flag: '🇵🇪', region: 'Americas' },
  { code: 'es-MX', name: 'Мексика', flag: '🇲🇽', region: 'Americas' },
  { code: 'en-US', name: 'США', flag: '🇺🇸', region: 'Americas' },
  { code: 'en-CA', name: 'Канада', flag: '🇨🇦', region: 'Americas' },
  
  // Asia
  { code: 'hi', name: 'Индия', flag: '🇮🇳', region: 'Asia' },
  { code: 'id', name: 'Индонезия', flag: '🇮🇩', region: 'Asia' },
  { code: 'bn', name: 'Бангладеш', flag: '🇧🇩', region: 'Asia' },
  { code: 'ph', name: 'Филиппины', flag: '🇵🇭', region: 'Asia' },
  { code: 'th', name: 'Таиланд', flag: '🇹🇭', region: 'Asia' },
  { code: 'vi', name: 'Вьетнам', flag: '🇻🇳', region: 'Asia' },
  { code: 'my', name: 'Малайзия', flag: '🇲🇾', region: 'Asia' },
  { code: 'ja', name: 'Япония', flag: '🇯🇵', region: 'Asia' },
  { code: 'ko', name: 'Южная Корея', flag: '🇰🇷', region: 'Asia' },
  { code: 'zh', name: 'Китай', flag: '🇨🇳', region: 'Asia' },
  
  // Middle East & North Africa
  { code: 'tr', name: 'Турция', flag: '🇹🇷', region: 'Middle East & MENA' },
  { code: 'ar', name: 'ОАЭ', flag: '🇦🇪', region: 'Middle East & MENA' },
  { code: 'fa', name: 'Иран', flag: '🇮🇷', region: 'Middle East & MENA' },
  { code: 'ar-EG', name: 'Египет', flag: '🇪🇬', region: 'Middle East & MENA' },
  { code: 'ar-MA', name: 'Марокко', flag: '🇲🇦', region: 'Middle East & MENA' },
  
  // Sub-Saharan Africa
  { code: 'fr-SN', name: 'Сенегал', flag: '🇸🇳', region: 'Sub-Saharan Africa' },
  { code: 'en-UG', name: 'Уганда', flag: '🇺🇬', region: 'Sub-Saharan Africa' },
  { code: 'en-NG', name: 'Нигерия', flag: '🇳🇬', region: 'Sub-Saharan Africa' },
  { code: 'en-ZA', name: 'ЮАР', flag: '🇿🇦', region: 'Sub-Saharan Africa' },
  { code: 'en-KE', name: 'Кения', flag: '🇰🇪', region: 'Sub-Saharan Africa' },
  { code: 'fr-CI', name: 'Кот-д’Ивуар', flag: '🇨🇮', region: 'Sub-Saharan Africa' },
  { code: 'fr-CM', name: 'Камерун', flag: '🇨🇲', region: 'Sub-Saharan Africa' },
  
  // Oceania
  { code: 'en-AU', name: 'Австралия', flag: '🇦🇺', region: 'Oceania' },
  { code: 'en-NZ', name: 'Новая Зеландия', flag: '🇳🇿', region: 'Oceania' }
]

const currentLocale = ref('en')
const activeLocaleCodes = ref(['en'])
const localizations = ref({})

const getLocale = (code) => ALL_LOCALES.find(l => l.code === code) || { code, name: code, flag: '🌍', region: 'Other' }

const filteredGroupedLocales = computed(() => {
  const filtered = geoSearch.value 
    ? ALL_LOCALES.filter(l => l.name.toLowerCase().includes(geoSearch.value.toLowerCase()) || l.code.toLowerCase().includes(geoSearch.value.toLowerCase()))
    : ALL_LOCALES;
    
  return filtered.reduce((groups, locale) => {
    if (!groups[locale.region]) {
      groups[locale.region] = [];
    }
    groups[locale.region].push(locale);
    return groups;
  }, {});
})`;

content = content.replace(oldScriptTarget, newScriptTarget);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully grouped GEOs in [id].vue!');
