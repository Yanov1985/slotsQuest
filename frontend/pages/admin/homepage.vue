<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white font-sans relative">
    <TheBackgroundBeams class="opacity-40" />

    <div class="relative z-10 w-full">
    <!-- Навигация -->
    <nav class="bg-[#161A21]/80 backdrop-blur-md border-b border-[#353A4A] sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">

          <div class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex flex-shrink-0 items-center justify-center border border-blue-500/20">
              <Icon name="solar:home-angle-bold-duotone" class="w-6 h-6 text-blue-400" />
            </div>
            <div class="text-left">
              <h1 class="text-xl font-semibold text-[#E5E7EB] font-display">Homepage Settings</h1>
              <p class="text-sm text-[#9CA3AF]">Advanced SEO & Content Management</p>
            </div>
          </div>

          <!-- Tab Switcher -->
          <div class="flex p-1 bg-[#0F1117] rounded-xl border border-[#353A4A] overflow-x-auto whitespace-nowrap max-w-[90vw] sm:max-w-full scrollbar-hide">
             <button v-for="tab in ['content', 'filters', 'seo', 'localization', 'structured', 'branding']" :key="tab" 
               @click="activeTab = tab"
               class="px-4 py-2 text-xs font-bold rounded-lg transition-all capitalize"
               :class="activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-[#9CA3AF] hover:text-white hover:bg-[#1B1E26]'"
             >
               {{ tab.replace('-', ' ') }}
             </button>
          </div>

          <!-- Action buttons -->
          <div class="flex items-center gap-2">
            <button @click="loadData" class="p-2 border border-[#353A4A] text-[#9CA3AF] bg-[#1B1E26] rounded-lg hover:bg-[#353A4A] transition-all" :disabled="isLoading">
               <Icon name="solar:refresh-circle-bold" class="w-5 h-5" :class="{'animate-spin': isLoading}" />
            </button>
            <button @click="saveData" :disabled="isSaving" class="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-[#353A4A] text-white rounded-lg font-bold transition-all transform hover:scale-105">
               {{ isSaving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
          <Icon name="svg-spinners:ring-resize" class="w-12 h-12 text-blue-500 mb-4" />
          <p class="text-[#9CA3AF]">Loading homepage settings...</p>
       </div>

       <div v-else class="space-y-8 animate-in fade-in duration-500">
          
          <!-- TAB: CONTENT (SEO Blocks & Hero) -->
          <div v-if="activeTab === 'content'" class="space-y-8">
             <!-- Hero Settings -->
             <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
               <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400"><Icon name="solar:text-field-bold" /> Hero & Headers</h3>
               <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div class="space-y-4">
                   <div>
                     <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Hero H1 Title</label>
                     <input v-model="pageData.hero_title" type="text" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 focus:border-blue-500" />
                   </div>
                   <div>
                     <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Hero Subtitle</label>
                     <textarea v-model="pageData.hero_desc" rows="4" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 focus:border-blue-500"></textarea>
                   </div>
                 </div>
                  <div class="space-y-4 bg-blue-500/5 border border-blue-500/10 rounded-xl p-6">
                     <div class="flex items-center justify-between mb-4">
                        <h4 class="text-xs font-bold text-blue-400 uppercase">Placeholder Keywords (Dynamic)</h4>
                        <button @click="seoKeywords.push('New Keyword')" class="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20 hover:bg-blue-500/20">+ Add</button>
                     </div>
                     <div class="space-y-2">
                        <div v-for="(kw, i) in seoKeywords" :key="i" class="flex gap-2">
                          <div class="flex-1">
                            <label class="block text-[10px] font-bold text-[#9CA3AF] mb-1 uppercase">Keyword {{ i + 1 }} [keyword_{{ i + 1 }}]</label>
                            <input v-model="seoKeywords[i]" type="text" class="w-full bg-[#0F1117]/50 border border-[#353A4A] rounded-lg px-3 py-2 text-sm focus:border-blue-500" />
                          </div>
                          <button @click="seoKeywords.splice(i, 1)" class="self-end p-2 text-red-500/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Icon name="solar:trash-bin-trash-bold" class="w-4 h-4" />
                          </button>
                        </div>
                     </div>
                     <p class="text-[10px] text-[#9CA3AF] mt-4 italic">* Тег [keyword_N] подставляется в SEO заголовки и теперь в контент.</p>
                  </div>
               </div>
             </section>

             <!-- SEO Text Blocks -->
             <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
               <div class="flex items-center justify-between mb-8">
                 <h3 class="text-xl font-bold flex items-center gap-2 text-green-400"><Icon name="solar:document-text-bold" /> SEO Text Content</h3>
                 <button @click="addItem(seoBlocks, {title: 'New Section', icon: 'solar:star-bold', text: '<p>Edit content...</p>'})" class="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-bold hover:bg-green-500/20">Add Section</button>
               </div>
               
               <div class="space-y-6">
                 <div v-for="(block, idx) in seoBlocks" :key="idx" class="bg-[#0F1117] border border-[#353A4A] rounded-xl p-6 relative group">
                    <div class="absolute top-4 right-4 flex gap-2">
                       <button @click="moveItem(seoBlocks, idx, -1)" class="p-1 hover:text-blue-400 bg-[#1B1E26] rounded shadow-sm"><Icon name="solar:arrow-up-linear" /></button>
                       <button @click="moveItem(seoBlocks, idx, 1)" class="p-1 hover:text-blue-400 bg-[#1B1E26] rounded shadow-sm"><Icon name="solar:arrow-down-linear" /></button>
                       <button @click="removeItem(seoBlocks, idx)" class="p-1 hover:text-red-400 bg-[#1B1E26] rounded shadow-sm"><Icon name="solar:trash-bin-trash-bold" /></button>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-8 sm:mt-0 sm:pr-24">
                       <input v-model="block.title" placeholder="Section Title" class="bg-[#1B1E26] border border-[#353A4A] rounded-lg px-3 py-2 text-sm font-bold w-full" />
                       <input v-model="block.icon" placeholder="Icon (e.g. solar:fire-bold)" class="bg-[#1B1E26] border border-[#353A4A] rounded-lg px-3 py-2 text-sm font-mono w-full" />
                    </div>
                    <textarea v-model="block.text" rows="6" class="w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg px-3 py-2 text-xs font-mono"></textarea>
                 </div>
               </div>
             </section>

          </div>

          <!-- TAB: FILTERS -->
          <div v-if="activeTab === 'filters'">
             <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
                <div class="flex items-center justify-between mb-8">
                   <h3 class="text-xl font-bold flex items-center gap-2 text-blue-400"><Icon name="solar:filters-bold" /> Top Fast Filters</h3>
                   <button @click="addItem(fastFilters, {category_id: '', name: 'Popular', icon: 'solar:bolt-bold'})" class="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-bold hover:bg-blue-500/20">Add Filter</button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div v-for="(f, idx) in fastFilters" :key="idx" class="bg-[#0F1117] border border-[#353A4A] p-4 rounded-xl flex flex-col sm:flex-row gap-3 sm:items-center">
                     <div class="flex flex-row sm:flex-col gap-2 sm:gap-1 justify-between sm:justify-start w-full sm:w-auto">
                        <div class="flex gap-2 sm:flex-col sm:gap-1">
                          <button @click="moveItem(fastFilters, idx, -1)" class="text-sm sm:text-[10px] hover:text-blue-400 bg-[#161A21] sm:bg-transparent p-1 sm:p-0 rounded"><Icon name="solar:alt-arrow-up-linear" /></button>
                          <button @click="moveItem(fastFilters, idx, 1)" class="text-sm sm:text-[10px] hover:text-blue-400 bg-[#161A21] sm:bg-transparent p-1 sm:p-0 rounded"><Icon name="solar:alt-arrow-down-linear" /></button>
                        </div>
                        <button @click="removeItem(fastFilters, idx)" class="text-red-500 hover:text-red-400 sm:hidden block"><Icon name="solar:trash-bin-trash-bold" class="w-5 h-5" /></button>
                     </div>
                     <select v-model="f.category_id" class="flex-1 w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg px-2 py-2 sm:py-1 text-sm sm:text-xs">
                        <option v-for="c in availableCategories" :key="c.id" :value="c.id">{{ c.name }}</option>
                     </select>
                     <input v-model="f.name" placeholder="Name" class="w-full sm:w-24 bg-[#1B1E26] border border-[#353A4A] rounded-lg px-2 py-2 sm:py-1 text-sm sm:text-xs" />
                     <button @click="removeItem(fastFilters, idx)" class="text-red-500 hover:text-red-400 hidden sm:block"><Icon name="solar:trash-bin-trash-bold" class="w-4 h-4" /></button>
                   </div>
                </div>
             </section>
          </div>

          <!-- TAB: SEO (Metadata & Keywords) -->
          <div v-if="activeTab === 'seo'" class="space-y-8">
             <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
               <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-purple-400"><Icon name="solar:magnifer-bold" /> Metadata & Technical SEO</h3>
               <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div class="space-y-4">
                   <div>
                     <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Meta Title</label>
                     <input v-model="pageData.seo_title" type="text" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 focus:border-purple-500" />
                   </div>
                   <div>
                     <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Meta Description</label>
                     <textarea v-model="pageData.seo_desc" rows="4" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 focus:border-purple-500"></textarea>
                   </div>
                   <div class="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10 grid grid-cols-2 gap-4">
                      <div class="flex items-center gap-2"><input type="checkbox" v-model="pageData.robots_index" /> <span class="text-xs">Index</span></div>
                      <div class="flex items-center gap-2"><input type="checkbox" v-model="pageData.robots_follow" /> <span class="text-xs">Follow</span></div>
                      <div class="flex items-center gap-2"><input type="checkbox" v-model="pageData.robots_notranslate" /> <span class="text-xs">NoTranslate</span></div>
                      <div class="flex items-center gap-2"><input type="checkbox" v-model="pageData.robots_noimageindex" /> <span class="text-xs">NoImageIndex</span></div>
                   </div>
                 </div>
                 <div class="space-y-4">
                    <div>
                      <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Primary SEO Keyword</label>
                      <input v-model="pageData.seo_keywords_primary" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">LSI Keywords</label>
                      <input v-model="pageData.seo_keywords_lsi" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Long-tail Keywords</label>
                      <input v-model="pageData.seo_keywords_longtail" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Geo Keywords (JSON)</label>
                      <input v-model="pageData.seo_keywords_geo" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3" />
                    </div>
                 </div>
               </div>
             </section>

             <!-- Open Graph -->
             <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
                <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-pink-400"><Icon name="solar:share-bold" /> Social Sharing (OG)</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div class="space-y-4">
                      <input v-model="pageData.og_title" placeholder="OG Title" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3" />
                      <textarea v-model="pageData.og_desc" placeholder="OG Description" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3"></textarea>
                   </div>
                   <div class="space-y-4">
                      <input v-model="pageData.og_image" placeholder="Image URL" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3" />
                      <div class="w-full aspect-video bg-black rounded-xl flex items-center justify-center border border-[#353A4A] overflow-hidden">
                         <img v-if="pageData.og_image" :src="pageData.og_image" class="w-full h-full object-cover" />
                         <span v-else class="text-[#353A4A]">OG Preview</span>
                      </div>
                   </div>
                </div>
             </section>
          </div>

          <!-- TAB: LOCALIZATION -->
          <div v-if="activeTab === 'localization'" class="space-y-8">
             <!-- Canonical URL -->
             <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
                <h3 class="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400"><Icon name="solar:link-bold" /> Canonical URL Override</h3>
                <p class="text-xs text-[#9CA3AF] mb-4">By default, the system automatically generates a strict Canonical URL stripped of 'www' and trailing slashes. Only fill this field if you need to point search engines to a completely different external page.</p>
                <input v-model="pageData.seo_canonical_url" placeholder="https://Brand.com/custom-path" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 text-sm focus:border-blue-500" />
             </section>

             <!-- Hreflang Tags -->
             <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
               <div class="flex items-center justify-between mb-8">
                 <h3 class="text-xl font-bold flex items-center gap-2 text-orange-400"><Icon name="solar:globus-bold" /> Hreflang Localization</h3>
                 <div class="flex items-center gap-4">
                   <div class="flex items-center gap-2 bg-[#0F1117] px-3 py-1.5 rounded-lg border border-[#353A4A]">
                      <span class="text-xs">Enabled</span>
                      <input type="checkbox" v-model="pageData.hreflang_enabled" />
                   </div>
                   <button @click="addItem(hreflangItems, {lang: 'ru', region: 'RU', url: ''})" class="px-4 py-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-lg text-xs font-bold">Add Lang</button>
                 </div>
               </div>
               <div class="space-y-3">
                 <div v-for="(item, idx) in hreflangItems" :key="idx" class="flex flex-col sm:flex-row gap-3 bg-[#0F1117] p-3 rounded-xl border border-[#353A4A]">
                    <div class="flex gap-3">
                      <input v-model="item.lang" placeholder="Lang" class="w-full sm:w-16 bg-[#1B1E26] border border-[#353A4A] rounded-lg px-3 py-2 text-sm sm:text-xs" />
                      <input v-model="item.region" placeholder="Region" class="w-full sm:w-16 bg-[#1B1E26] border border-[#353A4A] rounded-lg px-3 py-2 text-sm sm:text-xs" />
                    </div>
                    <input v-model="item.url" placeholder="Full URL override (optional)" class="flex-1 w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg px-3 py-2 text-sm sm:text-xs" />
                    <button @click="removeItem(hreflangItems, idx)" class="text-red-500 sm:self-auto self-end mt-2 sm:mt-0 bg-red-500/10 sm:bg-transparent p-2 sm:p-0 rounded-lg"><Icon name="solar:trash-bin-trash-bold" class="w-5 h-5 sm:w-4 sm:h-4" /></button>
                 </div>
                 <p v-if="!hreflangItems.length" class="text-center py-6 text-[#9CA3AF] text-xs">No localized versions defined.</p>
               </div>
             </section>

             <!-- Geo Targeting -->
             <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
                <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-red-400"><Icon name="solar:map-point-bold" /> Geo Targeting</h3>
                <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 bg-red-500/5 p-4 md:p-6 rounded-2xl border border-red-500/10">
                   <div class="flex-1 w-full">
                      <label class="block text-xs font-bold text-red-300 mb-2 uppercase">Target Regions (Codes, comma-separated)</label>
                      <input v-model="pageData.geo_target_regions" placeholder="IN, BR, RU, UZ, AZ" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3" />
                   </div>
                   <div class="flex flex-col gap-2">
                      <span class="text-xs font-bold text-red-300 uppercase">Status</span>
                      <div class="flex items-center gap-2 bg-[#0F1117] px-4 py-3 rounded-xl border border-[#353A4A]">
                         <span class="text-sm">Enabled</span>
                         <input type="checkbox" v-model="pageData.geo_target_enabled" />
                      </div>
                   </div>
                </div>
             </section>
          </div>

          <!-- TAB: STRUCTURED DATA -->
          <div v-if="activeTab === 'structured'" class="space-y-8">
             <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
                 <div class="flex items-center justify-between mb-8">
                    <h3 class="text-xl font-bold flex items-center gap-2 text-emerald-400"><Icon name="solar:code-bold" /> Automated Structured Data (JSON-LD)</h3>
                    <div class="flex items-center gap-4">
                       <input type="checkbox" v-model="pageData.jsonld_enabled" /> <span class="text-xs">Active</span>
                       <select v-model="pageData.jsonld_type" class="bg-[#0F1117] border border-[#353A4A] rounded-lg px-3 py-1 text-xs">
                          <option value="CollectionPage">CollectionPage (Catalog)</option>
                          <option value="WebSite">WebSite (General)</option>
                       </select>
                    </div>
                 </div>

                 <!-- OVERRIDE TOGGLE & EDITOR -->
                 <div v-if="pageData.jsonld_enabled" class="space-y-4">
                    <div class="flex items-center justify-between bg-[#0F1117] p-4 rounded-xl border border-[#353A4A]">
                        <div>
                            <p class="text-sm font-bold text-white">Manual Override</p>
                            <p class="text-xs text-white/50">Turn off auto-generation and write your own JSON-LD schema.</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="pageData.jsonld_override_auto" class="sr-only peer">
                            <div class="w-11 h-6 bg-[#161A21] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 border border-[#353A4A]"></div>
                        </label>
                    </div>

                    <!-- AUTO PREVIEW -->
                    <div v-if="!pageData.jsonld_override_auto" class="relative group mt-4">
                       <p class="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2"><Icon name="solar:eye-bold" /> Live Preview (Авто-генерация)</p>
                       <div class="absolute top-9 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button @click.prevent="copyAutoToManual" class="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"><Icon name="solar:copy-bold" /> Edit Copy</button>
                       </div>
                       <div class="bg-[#0B0C10] border border-[#353A4A] rounded-xl p-4 max-h-[500px] overflow-y-auto">
                          <pre class="text-xs text-emerald-400 font-mono whitespace-pre-wrap">{{ autoJsonPreview }}</pre>
                       </div>
                    </div>

                    <!-- MANUAL EDITOR -->
                    <div v-else>
                       <p class="text-xs text-white/50 mb-2">Write valid JSON or JSON array. Auto variables like [keyword_1] will still be replaced.</p>
                       <textarea v-model="pageData.json_schema" rows="20" class="w-full bg-[#0B0C10] border border-[#353A4A] rounded-xl p-4 text-xs text-emerald-400 font-mono focus:border-emerald-500/50 outline-none hover:bg-[#12151C]" placeholder="[ { &quot;@context&quot;: &quot;https://schema.org&quot;, &quot;@type&quot;: &quot;Article&quot; ... } ]"></textarea>
                    </div>
                 </div>
              </section>
           </div>
           
           <!-- TAB: BRANDING & FOOTER -->
           <div v-if="activeTab === 'branding'" class="space-y-8">
              <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
                 <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-indigo-400"><Icon name="solar:crown-bold" /> Global Branding</h3>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                       <div>
                          <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Company Name</label>
                          <input v-model="pageData.footer_company_name" type="text" placeholder="e.g. MyBrand Inc." class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 focus:border-indigo-500" />
                       </div>
                       <div>
                          <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Base Site URL</label>
                          <input v-model="pageData.footer_site_url" type="text" placeholder="https://mybrand.com" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 focus:border-indigo-500" />
                          <p class="text-[10px] text-[#9CA3AF] mt-1 italic">* Основной URL сайта. Используется для формирования канонических ссылок и JSON-LD.</p>
                       </div>
                    </div>
                    <div class="space-y-4 text-sm text-[#9CA3AF] leading-relaxed">
                       <p>Эти настройки управляют тем, как ваш бренд отображается по всему сайту. Изменение <strong>Company Name</strong> обновит футер, авторские права и SEO-метаданные.</p>
                       <p><strong>Base Site URL</strong> позволяет переопределить настройки из конфига без необходимости менять переменные окружения.</p>
                    </div>
                 </div>
              </section>

              <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
                 <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-pink-400"><Icon name="solar:share-circle-bold" /> Social Media Links</h3>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Facebook URL</label>
                       <input v-model="pageData.footer_facebook" type="text" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 focus:border-pink-500" />
                    </div>
                    <div>
                       <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Instagram URL</label>
                       <input v-model="pageData.footer_instagram" type="text" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 focus:border-pink-500" />
                    </div>
                    <div>
                       <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Twitter / X URL</label>
                       <input v-model="pageData.footer_twitter" type="text" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 focus:border-pink-500" />
                    </div>
                    <div>
                       <label class="block text-xs font-bold text-[#9CA3AF] mb-1 uppercase">Telegram URL</label>
                       <input v-model="pageData.footer_telegram" type="text" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 focus:border-pink-500" />
                    </div>
                 </div>
              </section>

              <section class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-4 md:p-8">
                 <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400"><Icon name="solar:letter-bold" /> Footer Description</h3>
                 <textarea v-model="pageData.footer_description" rows="5" class="w-full bg-[#0F1117] border border-[#353A4A] rounded-xl px-4 py-3 focus:border-blue-500"></textarea>
                 <p class="text-xs text-[#9CA3AF] mt-2 italic">Краткое описание вашей компании для футера.</p>
              </section>
           </div>

       </div>
    </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePagesApi } from '~/composables/usePagesApi'
import { useCategories } from '~/composables/useCategories'
import { usePageJsonLd } from '~/composables/usePageJsonLd'
import TheBackgroundBeams from '~/components/TheBackgroundBeams.vue'

definePageMeta({
  layout: 'admin'
})

const pagesApi = usePagesApi()
const { getCategories } = useCategories()
const { getPageSchemas } = usePageJsonLd()
const isLoading = ref(true)
const isSaving = ref(false)

// Tab state
const activeTab = ref('content')

// Section visibility state (legacy, but kept for UI compatibility if needed)
const showHero = ref(true)
const showSeo = ref(true)
const showFilters = ref(true)
const showBlocks = ref(true)

const closeAllSections = () => { showHero.value = false; showSeo.value = false; showFilters.value = false; showBlocks.value = false; }
const openAllSections = () => { showHero.value = true; showSeo.value = true; showFilters.value = true; showBlocks.value = true; }

const pageData = ref({
  title: 'Homepage',
  hero_title: '',
  hero_desc: '',
  
  // Basic SEO
  seo_title: '',
  seo_desc: '',
  seo_keywords: '',
  seo_canonical_url: '',
  seo_robots: '',

  // Advanced Keywords System
  hero_keyword_1: '',
  hero_keyword_2: '',
  hero_keyword_3: '',
  seo_keywords_primary: '',
  seo_keywords_lsi: '',
  seo_keywords_longtail: '',
  seo_keywords_geo: '',
  seo_keywords_list: [],

  // Granular Robots
  robots_index: true,
  robots_follow: true,
  robots_max_snippet: -1,
  robots_max_image_preview: 'large',
  robots_max_video_preview: -1,
  robots_notranslate: false,
  robots_noimageindex: false,

  // Localization & Geo
  hreflang_enabled: false,
  hreflang_config: null,
  geo_target_enabled: false,
  geo_target_regions: '',

  // Structured Data / JSON-LD
  jsonld_enabled: true,
  jsonld_type: 'CollectionPage',
  jsonld_override_auto: false,
  jsonld_enable_faq: false,
  jsonld_faq_json: null,
  jsonld_enable_review: false,
  jsonld_review_author: '',
  jsonld_review_rating: 5,
  jsonld_review_text: '',
  jsonld_enable_how_to: false,
  jsonld_how_to_json: null,
  jsonld_enable_breadcrumb: true,

  // Open Graph / Social
  og_title: '',
  og_desc: '',
  og_image: '',
  twitter_card: '',

  // Advanced
  json_schema: '',
  fast_filters: null,
  content: null,

  // Custom Content Sections
  show_awards: false,
  awards: null,
  info_pros: null,
  info_cons: null,

  // Dynamic Footer Settings
  footer_company_name: 'BrandName',
  footer_site_url: '',
  footer_description: '',
  footer_facebook: '',
  footer_twitter: '',
  footer_instagram: '',
  footer_telegram: ''
})

// UI-Specific Editor States
const seoBlocks = ref([])
const fastFilters = ref([])
const availableCategories = ref([])
const faqItems = ref([])
const hreflangItems = ref([])
const prosItems = ref([])
const consItems = ref([])
const awardsItems = ref([])
const howToSteps = ref([])
const seoKeywords = ref([])

// JSON-LD Live Preview State
const previewSlots = ref([])
const previewProviders = ref([])

const copyAutoToManual = () => {
    pageData.value.json_schema = autoJsonPreview.value || ''
    pageData.value.jsonld_override_auto = true
}

const autoJsonPreview = computed(() => {
    // Clone pageData to isolate modifications
    const tempPage = { ...pageData.value, jsonld_override_auto: false, json_schema: '' }
    const schemas = getPageSchemas(tempPage, previewSlots.value, previewProviders.value, availableCategories.value, [], [])
    if (!schemas || schemas.length === 0) return ''
    return JSON.stringify(schemas, null, 2)
})

const generateId = () => Math.random().toString(36).substring(2, 9)

const initializeArray = (data, field, fallback = []) => {
  if (data[field] && Array.isArray(data[field])) {
    return data[field]
  }
  return fallback
}

const loadData = async () => {
  isLoading.value = true
  try {
    const config = useRuntimeConfig()
    
    // 1. Fetch data in parallel
    const [catsRes, sRes, pRes, pageRes] = await Promise.all([
      getCategories().catch(() => null),
      $fetch(`${config.public.apiUrl}/api/slots`, { params: { limit: 20 } }).catch(() => null),
      $fetch(`${config.public.apiUrl}/api/providers`).catch(() => null),
      pagesApi.getPage('home').catch(() => null)
    ])

    // 2. Assign catalog preview data
    availableCategories.value = catsRes?.data || catsRes || []
    previewSlots.value = sRes?.data || sRes || []
    previewProviders.value = pRes?.data || pRes || []

    // 3. Assign page layout data
    const data = pageRes
    if (data) {
      Object.keys(pageData.value).forEach(key => {
        if (data[key] !== undefined && data[key] !== null) {
          pageData.value[key] = data[key]
        }
      })

      // Normalize jsonld_type for homepage. Fallback to CollectionPage if invalid.
      if (!['CollectionPage', 'WebSite'].includes(pageData.value.jsonld_type)) {
        pageData.value.jsonld_type = 'CollectionPage'
      }

      // Sync arrays to editors
      seoBlocks.value = initializeArray(pageData.value, 'content', [{
        id: 'introduction',
        title: 'Welcome to Our Catalog',
        icon: 'solar:target-outline',
        text: '<p>Welcome ...</p>'
      }])
      fastFilters.value = initializeArray(pageData.value, 'fast_filters')
      faqItems.value = initializeArray(pageData.value, 'jsonld_faq_json')
      hreflangItems.value = initializeArray(pageData.value, 'hreflang_config')
      prosItems.value = initializeArray(pageData.value, 'info_pros')
      consItems.value = initializeArray(pageData.value, 'info_cons')
      awardsItems.value = initializeArray(pageData.value, 'awards')
      howToSteps.value = initializeArray(pageData.value, 'jsonld_how_to_json')
      seoKeywords.value = initializeArray(pageData.value, 'seo_keywords_list', ['Slots', 'Casino', 'Free Play'])
    }
  } catch (error) {
    console.error('Failed to load homepage data:', error)
  } finally {
    isLoading.value = false
  }
}

const saveData = async () => {
  isSaving.value = true
  try {
    const payload = {
      ...pageData.value,
      content: seoBlocks.value,
      fast_filters: fastFilters.value,
      jsonld_faq_json: faqItems.value,
      hreflang_config: hreflangItems.value,
      info_pros: prosItems.value,
      info_cons: consItems.value,
      awards: awardsItems.value,
      jsonld_how_to_json: howToSteps.value,
      seo_keywords_list: seoKeywords.value
    }

    await pagesApi.updatePage('home', payload)
    alert('Homepage settings saved successfully!')
  } catch (error) {
    alert('Failed to save homepage data')
  } finally {
    isSaving.value = false
  }
}

// Editor Operations Helpers
const addItem = (arr, defaultObj) => arr.push({ ...defaultObj })
const removeItem = (arr, index) => confirm('Are вы уверены?') && arr.splice(index, 1)
const moveItem = (arr, index, dir) => {
  const newIdx = index + dir
  if (newIdx >= 0 && newIdx < arr.length) {
    const temp = arr[index]
    arr[index] = arr[newIdx]
    arr[newIdx] = temp
  }
}

// Special Helpers for specific editors
const generateOrganizationJsonLd = () => {
    const config = useRuntimeConfig()
    const name = pageData.value.footer_company_name || 'Current Brand'
    const siteUrl = config.public.siteUrl || 'https://Brand.com/'
    
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": name,
        "url": siteUrl,
        "logo": `${siteUrl}logo.png`
    }
    pageData.value.json_schema = JSON.stringify(schema, null, 2)
}

onMounted(loadData)
</script>
