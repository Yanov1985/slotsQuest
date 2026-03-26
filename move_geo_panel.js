const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Find the start of the ugly injected geo panel
const badStartStr = '<div class="mb-6 bg-gradient-to-br from-[#161A21]/80 to-[#12141A]/90 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-[#353A4A] shadow-2xl relative overflow-visible z-20">';
const badEndStr = '</Teleport>\n</div>';

const startIndex = content.indexOf(badStartStr);
if (startIndex !== -1) {
    const endIndex = content.indexOf(badEndStr, startIndex);
    if (endIndex !== -1) {
        // DELETE the old panel from the SEO block completely
        const fullEndIndex = endIndex + badEndStr.length;
        content = content.substring(0, startIndex) + content.substring(fullEndIndex);
    }
} else {
    console.log("Could not find old UI block. Perhaps it was already moved?");
}

// 2. Prepare the beautiful, native, non-intrusive new GEO Panel
const newSleekGeoPanel = `
        <!-- GEO Localization Panel (Minimal & Native) -->
        <div class="mb-8 bg-[#161A21]/50 backdrop-blur-sm border border-[#353A4A] rounded-2xl p-4 sm:p-6 relative overflow-hidden">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h2 class="text-base sm:text-lg font-semibold text-[#E5E7EB]">Target Markets</h2>
                <p class="text-xs sm:text-sm text-[#9CA3AF]">Manage and translate slot content</p>
              </div>
            </div>
            <button @click="showGeoModal = true" type="button" class="h-9 px-4 bg-[#1B1E26] hover:bg-[#2A2F3D] border border-[#353A4A] hover:border-indigo-500/40 text-[#9CA3AF] hover:text-[#E5E7EB] rounded-lg transition-colors text-sm font-medium flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Manage GEOs
            </button>
          </div>
          
          <div class="mt-5">
            <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#353A4A] scrollbar-track-transparent">
               <button v-for="code in activeLocaleCodes" :key="code" type="button"
                   @click="switchLocale(code)" 
                   class="flex-shrink-0 group px-3 sm:px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2 min-w-max relative"
                   :class="currentLocale === code ? 'bg-indigo-600/10 border-indigo-500/50 text-[#E5E7EB]' : 'bg-[#1B1E26] border-[#353A4A] text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#2A2F3D]'"
               >
                  <span class="text-base">{{ getLocale(code).flag }}</span>
                  <span class="font-medium text-xs sm:text-sm">{{ getLocale(code).name }}</span>
                  
                  <span v-if="code !== 'en'" @click.stop="removeLocale(code)" class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#1B1E26] border border-[#353A4A] text-red-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:border-red-500/40 transition-all z-10 hidden sm:flex">
                     <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </span>
               </button>
            </div>
          </div>
          
          <div class="mt-3 flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-medium">
            <div v-if="currentLocale !== 'en'" class="px-2.5 py-1 bg-amber-500/10 text-amber-400/90 border border-amber-500/20 rounded-md">
              <span class="mr-1">⚠️</span> Auto-translate mode: Editing localized <strong>{{ getLocale(currentLocale).name }}</strong> data.
            </div>
            <div v-else class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400/90 border border-emerald-500/20 rounded-md">
              <span class="mr-1">✅</span> Base Content: Editing default English data.
            </div>
          </div>
        </div>

        <Teleport to="body">
          <div v-if="showGeoModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
              <div class="px-6 py-4 border-b border-[#353A4A] flex items-center justify-between bg-[#1B1E26]">
                 <h3 class="text-lg sm:text-xl font-bold text-[#E5E7EB] flex items-center gap-2">
                   <svg class="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                   Select Target Markets
                 </h3>
                 <button type="button" @click="showGeoModal = false" class="text-[#9CA3AF] hover:text-white transition-colors">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
              </div>
              
              <div class="flex-1 overflow-y-auto p-4 sm:p-6">
                 <div class="mb-5 relative">
                    <svg class="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <input v-model="geoSearch" type="text" placeholder="Search countries..." class="w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors placeholder-[#6B7280]" />
                 </div>
                 
                 <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
                 </div>
              </div>
              
              <div class="px-6 py-4 border-t border-[#353A4A] bg-[#1B1E26] flex justify-end">
                 <button type="button" @click="showGeoModal = false" class="h-10 px-6 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-colors">
                   Done
                 </button>
              </div>
            </div>
          </div>
        </Teleport>
`;

// 3. Find the exact spot to inject the new panel
// The user wants it separated from SEO Optimization, right below the main header bar and ABOVE the rest of the forms.
// That is exactly right inside the main <div class="max-w-5xl mx-auto..."> or immediately before `<form @submit.prevent="saveSlot" class="w-full space-y-6 sm:space-y-8">`
const injectionTarget = '<form @submit.prevent="saveSlot" class="w-full space-y-6 sm:space-y-8">';
if (content.includes(injectionTarget)) {
    // If it's already there (maybe we ran this twice), remove it first
    if (!content.includes('<!-- GEO Localization Panel (Minimal & Native) -->')) {
        content = content.replace(injectionTarget, newSleekGeoPanel + '\n' + injectionTarget);
    }
} else {
    console.log("Could not find '<form @submit.prevent...>' line.");
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully moved and redesigned the GEO panel!");
