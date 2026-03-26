const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

const oldUIStartTag = '<div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 mt-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg p-2">';
const oldUIEndTag = '<!-- Collapse/expand SEO section button -->';

const startIndex = content.indexOf(oldUIStartTag);
const endIndex = content.indexOf(oldUIEndTag, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const newUI = `
<div class="mb-6 bg-gradient-to-br from-[#161A21]/80 to-[#12141A]/90 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-[#353A4A] shadow-2xl relative overflow-visible z-20">
  <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
    <div class="flex items-center gap-4">
       <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 transform hover:scale-105 transition-all">
         <span class="text-2xl">🌍</span>
       </div>
       <div>
         <h2 class="text-xl font-bold text-white tracking-tight">Geo Localization</h2>
         <p class="text-sm text-gray-400 mt-0.5">Manage target markets and translated content</p>
       </div>
    </div>
    
    <button @click="showGeoModal = true" type="button" class="group px-5 py-2.5 bg-[#1B1E26] hover:bg-[#252A36] border border-[#353A4A] hover:border-indigo-500/50 text-gray-300 hover:text-white rounded-xl transition-all duration-300 flex items-center gap-2.5 text-sm font-semibold shadow-sm overflow-hidden relative">
      <div class="absolute inset-0 bg-indigo-500/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
      <svg class="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
      <span class="relative z-10">Manage GEOs</span>
    </button>
  </div>
  
  <div class="mt-6 border-t border-[#353A4A]/50 pt-5">
    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#353A4A] scrollbar-track-transparent">
       <button v-for="code in activeLocaleCodes" :key="code" type="button"
           @click="switchLocale(code)" 
           class="flex-shrink-0 relative group px-4 py-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2.5 min-w-[120px] justify-center"
           :class="currentLocale === code ? 'bg-indigo-600/20 border-indigo-500/60 text-indigo-100 shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/30' : 'bg-[#0B0E14]/50 border-[#2A2E39] text-gray-400 hover:text-gray-200 hover:border-[#4B5563] hover:bg-[#161A21]'"
       >
          <span class="text-lg drop-shadow-sm">{{ getLocale(code).flag }}</span>
          <span class="font-medium text-sm tracking-wide">{{ getLocale(code).name }}</span>
          
          <span v-if="code !== 'en'" @click.stop="removeLocale(code)" class="absolute -top-2 -right-2 w-6 h-6 bg-[#161A21] border border-[#353A4A] text-red-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 transition-all shadow-lg scale-90 hover:scale-100 z-10">
             <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </span>
       </button>
    </div>
  </div>
  
  <div class="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium">
    <div v-if="currentLocale !== 'en'" class="px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
      Auto-translate mode: Editing {{ getLocale(currentLocale).name }} data.
    </div>
    <div v-else class="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      Base Content: Editing default English data.
    </div>
  </div>

  <Teleport to="body">
    <div v-if="showGeoModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0B0E14]/80 backdrop-blur-md">
      <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col h-[85vh] sm:h-[80vh] overflow-hidden transform transition-all">
        <div class="px-6 py-5 border-b border-[#2A2E39] flex items-center justify-between bg-gradient-to-r from-[#161A21] to-[#1B1E26]">
           <h3 class="text-xl font-bold text-white flex items-center gap-3">
             <span class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">🎯</span>
             Manage Target Markets
           </h3>
           <button type="button" @click="showGeoModal = false" class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#2A2E39] hover:text-white transition-all">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
           </button>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6 bg-[#0B0E14]/30">
           <div class="mb-6 relative">
              <svg class="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input v-model="geoSearch" type="text" placeholder="Search countries..." class="w-full bg-[#161A21] border border-[#353A4A] rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium placeholder-gray-500" />
           </div>
           
           <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              <button type="button" v-for="locale in filteredAllLocales" :key="locale.code" 
                      @click="toggleLocale(locale.code)"
                      class="group flex flex-col items-center justify-center p-5 rounded-xl border transition-all duration-200 gap-3 relative overflow-hidden"
                      :class="activeLocaleCodes.includes(locale.code) ? 'bg-indigo-600/10 border-indigo-500/60 shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'bg-[#1B1E26] border-[#353A4A] hover:border-[#4B5563] hover:bg-[#252A36]'"
              >
                 <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span class="text-4xl drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">{{ locale.flag }}</span>
                 <span class="text-sm font-semibold text-center line-clamp-1" :class="activeLocaleCodes.includes(locale.code) ? 'text-indigo-100' : 'text-gray-400 group-hover:text-gray-200'">{{ locale.name }}</span>
                 
                 <div class="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
                      :class="activeLocaleCodes.includes(locale.code) ? 'bg-indigo-500 text-white scale-100' : 'bg-[#161A21] border border-[#4B5563] scale-0 group-hover:scale-100 opacity-50'">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                 </div>
              </button>
           </div>
           
           <div v-if="filteredAllLocales.length === 0" class="flex flex-col items-center justify-center py-12 text-gray-500">
             <span class="text-4xl mb-4 opacity-50">🔍</span>
             <p>No countries found matching your search.</p>
           </div>
        </div>
        
        <div class="px-6 py-4 border-t border-[#2A2E39] bg-[#161A21] flex justify-between items-center">
           <div class="text-sm text-gray-400">
             <span class="font-bold text-white">{{ activeLocaleCodes.length }}</span> GEOs activated
           </div>
           <button type="button" @click="showGeoModal = false" class="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-600/20 border border-indigo-400/20 active:scale-95">
             Apply Changes
           </button>
        </div>
      </div>
    </div>
  </Teleport>
</div>
`;
    content = content.substring(0, startIndex) + newUI + content.substring(endIndex);
}

const oldScriptStart = "// ======== Multi-GEO Localization ========";
const oldScriptEnd = "// ========================================";

const scriptStartIndex = content.indexOf(oldScriptStart);
const scriptEndIndex = content.indexOf(oldScriptEnd, scriptStartIndex);

if (scriptStartIndex !== -1 && scriptEndIndex !== -1) {
    const newScript = `// ======== Multi-GEO Localization ========
const showGeoModal = ref(false)
const geoSearch = ref('')

const ALL_LOCALES = [
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
})

const toggleLocale = (code) => {
  if (code === 'en') return
  if (activeLocaleCodes.value.includes(code)) {
    removeLocale(code)
  } else {
    activeLocaleCodes.value.push(code)
    if (!localizations.value[code]) {
      localizations.value[code] = {}
    }
  }
}

const removeLocale = (code) => {
  if (code === 'en') return
  if (currentLocale.value === code) {
    switchLocale('en')
  }
  activeLocaleCodes.value = activeLocaleCodes.value.filter(c => c !== code)
}

const switchLocale = (newLocale) => {
  if (currentLocale.value === newLocale) return
  
  if (!localizations.value[currentLocale.value]) localizations.value[currentLocale.value] = {}
  Object.keys(form.value).forEach(key => {
    if (typeof form.value[key] === 'string' && !key.includes('url') && !key.includes('_id') && key !== 'slug') {
      localizations.value[currentLocale.value][key] = form.value[key]
    }
  })
  
  currentLocale.value = newLocale
  const newData = localizations.value[newLocale] || {}
  
  Object.keys(form.value).forEach(key => {
    if (typeof form.value[key] === 'string' && !key.includes('url') && !key.includes('_id') && key !== 'slug') {
      form.value[key] = newData[key] !== undefined ? newData[key] : ''
    }
  })
}
`;
    content = content.substring(0, scriptStartIndex) + newScript + content.substring(scriptEndIndex);
}

const loadLogicHook = "// Switch to EN by default to make sure all is in sync";
if (content.indexOf(loadLogicHook) !== -1 && content.indexOf("const keys = Object.keys(localizations.value)") === -1) {
    const hydrateAddon = `
    const keys = Object.keys(localizations.value)
    keys.forEach(k => {
      if (!activeLocaleCodes.value.includes(k) && k !== '_metadata') {
        activeLocaleCodes.value.push(k)
      }
    })
    
    // Switch to EN by default to make sure all is in sync`;
    content = content.replace(loadLogicHook, hydrateAddon);
}

const saveHook = "if (!localizations.value[currentLocale.value]) localizations.value[currentLocale.value] = {}";
if (content.indexOf(saveHook) !== -1 && content.indexOf("const allowedLocalesObject = {}") === -1) {
    const saveLogicWrapper = `if (!localizations.value[currentLocale.value]) localizations.value[currentLocale.value] = {}
    Object.keys(form.value).forEach(key => {
      if (typeof form.value[key] === 'string' && !key.includes('url') && !key.includes('_id') && key !== 'slug') {
        localizations.value[currentLocale.value][key] = form.value[key]
      }
    })
    
    // Clean up localizations (only send active ones)
    const allowedLocalesObject = {}
    activeLocaleCodes.value.forEach(code => {
      if (localizations.value[code]) allowedLocalesObject[code] = localizations.value[code]
    })
    localizations.value = allowedLocalesObject`;
    content = content.replace(`if (!localizations.value[currentLocale.value]) localizations.value[currentLocale.value] = {}
    Object.keys(form.value).forEach(key => {
      if (typeof form.value[key] === 'string' && !key.includes('url') && !key.includes('_id') && key !== 'slug') {
        localizations.value[currentLocale.value][key] = form.value[key]
      }
    })`, saveLogicWrapper);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Magnificently injected the beautiful GEO Panel!');
