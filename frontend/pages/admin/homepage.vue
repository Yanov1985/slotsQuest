<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white font-sans relative">

    <!-- Навигация -->
    <nav class="bg-[#161A21]/80 backdrop-blur-sm border-b border-[#353A4A] sticky top-0 z-50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">

          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex flex-shrink-0 items-center justify-center border border-blue-500/20">
              <Icon name="solar:home-angle-bold-duotone" class="w-6 h-6 text-blue-400" />
            </div>
            <div class="text-left">
              <h1 class="text-xl font-semibold text-[#E5E7EB] font-display">Homepage Settings</h1>
              <p class="text-sm text-[#9CA3AF]">Manage layout, SEO, and content blocks</p>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <div class="flex flex-wrap items-center gap-2 hidden sm:flex">
              <button
                @click="closeAllSections"
                class="px-3 py-2 text-xs border border-[#353A4A] text-[#9CA3AF] bg-[#1B1E26] rounded-lg hover:bg-[#353A4A] hover:border-[#EF4444]/40 hover:text-[#E5E7EB] font-medium transition-all duration-200"
                title="Close all sections"
              >
                <Icon name="solar:alt-arrow-up-line-duotone" class="w-4 h-4 mr-1 inline-block" /> Close all
              </button>
              <button
                @click="openAllSections"
                class="px-3 py-2 text-xs border border-[#353A4A] text-[#9CA3AF] bg-[#1B1E26] rounded-lg hover:bg-[#353A4A] hover:border-[#10B981]/40 hover:text-[#E5E7EB] font-medium transition-all duration-200"
                title="Open all sections"
              >
                <Icon name="solar:alt-arrow-down-line-duotone" class="w-4 h-4 mr-1 inline-block" /> Open all
              </button>
            </div>

            <button
              @click="loadData"
              class="px-4 py-2 border border-[#353A4A] text-[#9CA3AF] bg-[#1B1E26] rounded-lg hover:bg-[#353A4A] hover:border-[#63F3AB]/40 hover:text-[#E5E7EB] font-medium transition-all duration-200"
              :disabled="isLoading"
            >
              <Icon name="solar:refresh-circle-bold" class="w-4 h-4 mr-1 inline-block" :class="{'animate-spin': isLoading}" /> Reset
            </button>
            <button
              @click="saveData"
              :disabled="isSaving"
              class="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-[#353A4A] disabled:to-[#353A4A] text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100"
            >
              <Icon v-if="isSaving" name="svg-spinners:180-ring" class="w-4 h-4 mr-1 inline-block" />
              <Icon v-else name="solar:diskette-bold" class="w-4 h-4 mr-1 inline-block" />
              {{ isSaving ? 'Saving...' : 'Save' }}
            </button>
            <NuxtLink
              to="/"
              target="_blank"
              class="px-4 py-2 bg-gradient-to-r from-[#63F3AB] to-[#51C58B] hover:from-[#51C58B] hover:to-[#63F3AB] text-black rounded-lg font-semibold transition-all duration-200 transform sm:hover:scale-105 flex items-center justify-center"
            >
              <Icon name="solar:link-square-bold" class="w-4 h-4 mr-1 inline-block" />
              Preview
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <form @submit.prevent="saveData" class="w-full space-y-6 sm:space-y-8">

        <!-- ================= HERO SECTION ================= -->
        <div class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-[#353A4A] relative overflow-hidden transition-all duration-300">
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center shadow-xl">
                  <Icon name="solar:text-field-bold" class="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 class="text-2xl font-semibold text-[#E5E7EB] font-display">Hero Section</h2>
                  <div class="h-1 w-28 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-2"></div>
                </div>
              </div>
              <button type="button" @click="showHero = !showHero" class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200">
                <Icon name="solar:alt-arrow-down-line-duotone" class="w-5 h-5 transform transition-transform duration-200" :class="{ 'rotate-180': showHero }" />
              </button>
            </div>

            <div v-show="showHero" class="space-y-8">
               <div class="group bg-[#161A21] border border-[#353A4A] hover:border-blue-500/30 rounded-xl p-6 transition-all duration-300">
                 <div class="space-y-4">
                   <div>
                     <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2">
                       <Icon name="solar:text-square-bold" class="w-4 h-4 text-blue-400" /> Hero Title (H1)
                     </label>
                     <input v-model="pageData.hero_title" type="text" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-bold" placeholder="e.g. Free Play Online Slots" />
                   </div>
                   <div>
                     <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2">
                       <Icon name="solar:document-text-bold" class="w-4 h-4 text-blue-400" /> Hero Subtitle
                     </label>
                     <textarea v-model="pageData.hero_desc" rows="3" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none font-medium" placeholder="e.g. Play 1000+ slots risk-free..."></textarea>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <!-- ================= GLOBAL SEO (META & OPEN GRAPH) ================= -->
        <div class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-[#353A4A] relative overflow-hidden transition-all duration-300">
          <div class="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-400 rounded-2xl flex items-center justify-center shadow-xl">
                  <Icon name="solar:global-bold" class="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 class="text-2xl font-semibold text-[#E5E7EB] font-display">Global SEO</h2>
                  <div class="h-1 w-28 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full mt-2"></div>
                </div>
              </div>
              <button type="button" @click="showSeo = !showSeo" class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200">
                <Icon name="solar:alt-arrow-down-line-duotone" class="w-5 h-5 transform transition-transform duration-200" :class="{ 'rotate-180': showSeo }" />
              </button>
            </div>

            <div v-show="showSeo" class="space-y-6">
               <!-- Basic SEO -->
               <div class="group bg-[#161A21] border border-[#353A4A] hover:border-purple-500/30 rounded-xl p-6 transition-all duration-300">
                 <h3 class="text-lg font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
                   <Icon name="solar:magnifer-bold" class="w-5 h-5 text-purple-400" /> Basic Metadata
                 </h3>
                 <div class="space-y-4">
                   <div>
                     <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2">Meta Title</label>
                     <input v-model="pageData.seo_title" type="text" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-bold" />
                   </div>
                   <div>
                     <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2">Meta Description</label>
                     <textarea v-model="pageData.seo_desc" rows="3" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"></textarea>
                   </div>
                   <div>
                     <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2">Meta Keywords <span class="text-[#9CA3AF] text-xs font-normal">(comma separated)</span></label>
                     <input v-model="pageData.seo_keywords" type="text" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all" />
                   </div>
                 </div>
               </div>

               <!-- Open Graph -->
               <div class="group bg-[#161A21] border border-[#353A4A] hover:border-pink-500/30 rounded-xl p-6 transition-all duration-300">
                 <h3 class="text-lg font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
                   <Icon name="solar:share-bold" class="w-5 h-5 text-pink-400" /> Open Graph & Social
                 </h3>
                 <div class="space-y-4">
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2">OG Title</label>
                       <input v-model="pageData.og_title" type="text" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all" />
                     </div>
                     <div>
                       <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2">Twitter Card Size</label>
                       <select v-model="pageData.twitter_card" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all">
                         <option value="">Default (summary)</option>
                         <option value="summary">Summary</option>
                         <option value="summary_large_image">Large Image</option>
                       </select>
                     </div>
                   </div>
                   <div>
                     <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2">OG Description</label>
                     <textarea v-model="pageData.og_desc" rows="2" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all resize-none"></textarea>
                   </div>
                   <div>
                     <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2">OG Image URL</label>
                     <input v-model="pageData.og_image" type="url" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all" placeholder="https://..." />
                   </div>
                 </div>
               </div>

               <!-- Technical & JSON-LD -->
               <div class="group bg-[#161A21] border border-[#353A4A] hover:border-emerald-500/30 rounded-xl p-6 transition-all duration-300">
                 <h3 class="text-lg font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
                   <Icon name="solar:server-square-bold" class="w-5 h-5 text-emerald-400" /> Technical & Schema
                 </h3>
                 <div class="space-y-4">
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2">Canonical URL</label>
                       <input v-model="pageData.seo_canonical_url" type="url" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" />
                     </div>
                     <div>
                       <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2">Robots Directives</label>
                       <input v-model="pageData.seo_robots" type="text" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="index, follow" />
                     </div>
                   </div>
                   <div>
                     <label class="flex items-center justify-between text-sm font-medium text-[#E5E7EB] mb-2">
                        <span>JSON-LD Schema (Organization / WebPage)</span>
                        <button type="button" @click="generateOrganizationJsonLd" class="text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded">Auto-generate Organization Schema</button>
                     </label>
                     <textarea v-model="pageData.json_schema" rows="6" class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-y font-mono text-sm" placeholder='{ "@context": "https://schema.org", ... }'></textarea>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <!-- ================= TOP FAST FILTERS ================= -->
        <div class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-[#353A4A] relative overflow-hidden transition-all duration-300 mb-8">
          <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-400 rounded-2xl flex items-center justify-center shadow-xl">
                  <Icon name="solar:filters-bold" class="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 class="text-2xl font-semibold text-[#E5E7EB] font-display">Top Fast Filters</h2>
                  <div class="h-1 w-28 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full mt-2"></div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" @click="addFastFilter" class="hidden sm:flex px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-bold rounded-lg border border-blue-500/30 transition-all items-center gap-2">
                  <Icon name="solar:add-circle-bold" class="w-5 h-5" /> Add Filter
                </button>
                <button type="button" @click="showFilters = !showFilters" class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200">
                  <Icon name="solar:alt-arrow-down-line-duotone" class="w-5 h-5 transform transition-transform duration-200" :class="{ 'rotate-180': showFilters }" />
                </button>
              </div>
            </div>

            <div v-show="showFilters" class="space-y-4">
              <template v-if="fastFilters && fastFilters.length > 0">
                <div v-for="(filter, index) in fastFilters" :key="index" class="group bg-[#161A21] border border-[#353A4A] hover:border-blue-500/30 rounded-xl p-4 transition-all duration-300 relative flex flex-col md:flex-row gap-4 items-start md:items-center">

                  <div class="absolute top-2 right-2 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20">
                    <button type="button" @click="moveFastFilterUp(index)" :disabled="index === 0" class="p-1.5 bg-[#1B1E26] border border-[#353A4A] text-[#A0AABE] hover:text-[#00EDFF] rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><Icon name="solar:alt-arrow-up-linear" class="w-4 h-4" /></button>
                    <button type="button" @click="moveFastFilterDown(index)" :disabled="index === fastFilters.length - 1" class="p-1.5 bg-[#1B1E26] border border-[#353A4A] text-[#A0AABE] hover:text-[#00EDFF] rounded-md disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><Icon name="solar:alt-arrow-down-linear" class="w-4 h-4" /></button>
                    <div class="w-px h-5 bg-[#353A4A] mx-0.5 self-center"></div>
                    <button type="button" @click="removeFastFilter(index)" class="p-1.5 bg-[#1B1E26] border border-[#353A4A] text-[#A0AABE] hover:text-[#EF4444] rounded-md transition-colors"><Icon name="solar:trash-bin-trash-bold" class="w-4 h-4" /></button>
                  </div>

                  <div class="w-full md:w-1/3">
                    <label class="block text-xs font-bold text-[#E5E7EB] mb-1 uppercase tracking-wider">Target Category</label>
                    <select v-model="filter.category_id" class="w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-all font-semibold">
                       <option value="" disabled>Select Category</option>
                       <option v-for="cat in availableCategories" :key="cat.id" :value="cat.id">{{ cat.name }} ({{ cat.slug }})</option>
                    </select>
                  </div>

                  <div class="w-full md:w-1/3">
                    <label class="block text-xs font-bold text-[#E5E7EB] mb-1 uppercase tracking-wider">Display Name</label>
                    <input v-model="filter.name" type="text" placeholder="e.g. Popular" class="w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-all" />
                  </div>

                  <div class="w-full md:w-1/3">
                    <label class="block text-xs font-bold text-[#E5E7EB] mb-1 uppercase tracking-wider">
                      Icon Name <Icon v-if="filter.icon" :name="filter.icon" class="w-3.5 h-3.5 text-blue-400 ml-1" />
                    </label>
                    <input v-model="filter.icon" type="text" placeholder="e.g. solar:fire-line-duotone" class="w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg px-3 py-2 text-[#00EDFF] text-sm focus:outline-none focus:border-blue-500 transition-all font-mono" />
                  </div>

                </div>
              </template>
              <div v-else class="flex flex-col items-center justify-center py-8 border border-dashed border-[#353A4A] rounded-xl bg-[#0B0E14]/50">
                <span class="text-[#A0AABE] text-sm mb-3">No fast filters configured.</span>
                <button type="button" @click="addFastFilter" class="px-4 py-1.5 bg-blue-500/10 text-blue-400 font-bold rounded-lg border border-blue-500/30 hover:bg-blue-500/20 transition-all text-sm">Add First Filter</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= SEO CONTENT BLOCKS ================= -->
        <div class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-[#353A4A] relative overflow-hidden transition-all duration-300">
          <div class="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-xl">
                  <Icon name="solar:document-text-bold" class="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 class="text-2xl font-semibold text-[#E5E7EB] font-display">Everything About Online Slots (SEO)</h2>
                  <div class="h-1 w-28 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mt-2"></div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" @click="addBlock" class="hidden sm:flex px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 font-bold rounded-lg border border-green-500/30 transition-all items-center gap-2">
                  <Icon name="solar:add-circle-bold" class="w-5 h-5" /> Add Block
                </button>
                <button type="button" @click="showBlocks = !showBlocks" class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200">
                  <Icon name="solar:alt-arrow-down-line-duotone" class="w-5 h-5 transform transition-transform duration-200" :class="{ 'rotate-180': showBlocks }" />
                </button>
              </div>
            </div>

            <div v-show="showBlocks" class="space-y-6">
              <template v-if="seoBlocks && seoBlocks.length > 0">
                <div v-for="(block, index) in seoBlocks" :key="index" class="group bg-[#161A21] border border-[#353A4A] hover:border-green-500/30 rounded-xl p-6 transition-all duration-300 relative">

                  <div class="absolute top-3 right-3 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20">
                    <button type="button" @click="moveBlockUp(index)" :disabled="index === 0" class="p-2 bg-[#1B1E26] border border-[#353A4A] text-[#A0AABE] hover:text-[#00EDFF] hover:border-[#00EDFF]/50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><Icon name="solar:alt-arrow-up-linear" class="w-4 h-4" /></button>
                    <button type="button" @click="moveBlockDown(index)" :disabled="index === seoBlocks.length - 1" class="p-2 bg-[#1B1E26] border border-[#353A4A] text-[#A0AABE] hover:text-[#00EDFF] hover:border-[#00EDFF]/50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><Icon name="solar:alt-arrow-down-linear" class="w-4 h-4" /></button>
                    <div class="w-px h-6 bg-[#353A4A] mx-1 self-center"></div>
                    <button type="button" @click="removeBlock(index)" class="p-2 bg-[#1B1E26] border border-[#353A4A] text-[#A0AABE] hover:text-[#EF4444] hover:bg-[#EF4444]/10 hover:border-[#EF4444]/50 rounded-lg transition-colors"><Icon name="solar:trash-bin-trash-bold" class="w-4 h-4" /></button>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4 sm:pr-32">
                    <div>
                      <label class="flex items-center gap-2 text-xs font-bold text-[#E5E7EB] mb-2 uppercase tracking-wider">Section Title</label>
                      <input v-model="block.title" type="text" class="w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all font-bold" />
                    </div>
                    <div>
                      <label class="flex items-center gap-2 text-xs font-bold text-[#E5E7EB] mb-2 uppercase tracking-wider">
                        Icon Name <Icon v-if="block.icon" :name="block.icon" class="w-4 h-4 text-green-400 ml-auto" />
                      </label>
                      <input v-model="block.icon" type="text" class="w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg px-4 py-2.5 text-[#00EDFF] text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all font-mono" />
                    </div>
                  </div>

                  <div>
                    <label class="flex items-center gap-2 text-xs font-bold text-[#E5E7EB] mb-2 uppercase tracking-wider">HTML Content</label>
                    <textarea v-model="block.text" rows="5" class="w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg px-4 py-3 text-[#A0AABE] text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-y font-mono"></textarea>
                  </div>
                </div>
              </template>
              <div v-else class="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-[#353A4A] rounded-2xl bg-[#0B0E14]/50">
                <Icon name="solar:magic-stick-3-bold-duotone" class="w-16 h-16 text-[#353A4A] mb-4" />
                <h3 class="text-white text-lg font-bold mb-2">No SEO blocks added yet</h3>
                <button type="button" @click="addBlock" class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] mt-4">Create First Block</button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePagesApi } from '~/composables/usePagesApi'
import { useCategories } from '~/composables/useCategories'

definePageMeta({
  layout: 'admin'
})

const pagesApi = usePagesApi()
const { getCategories } = useCategories()
const isLoading = ref(true)
const isSaving = ref(false)

// Section visibility state
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
  seo_title: '',
  seo_desc: '',
  seo_keywords: '',
  seo_canonical_url: '',
  seo_robots: '',
  og_title: '',
  og_desc: '',
  og_image: '',
  twitter_card: '',
  json_schema: '',
  fast_filters: null,
  content: null
})

const seoBlocks = ref([])
const fastFilters = ref([])
const availableCategories = ref([])

const generateId = () => Math.random().toString(36).substring(2, 9)

const loadData = async () => {
  isLoading.value = true
  try {
    const catsRes = await getCategories()
    availableCategories.value = catsRes?.data || catsRes || []

    const data = await pagesApi.getPage('home')
    if (data) {
      Object.keys(pageData.value).forEach(key => {
        if (key !== 'content' && data[key] !== undefined && data[key] !== null) {
          pageData.value[key] = data[key]
        }
      })

      if (data.content && Array.isArray(data.content)) {
        seoBlocks.value = data.content
      } else {
        seoBlocks.value = [{
          id: 'introduction',
          title: 'Welcome to SlotQuest',
          icon: 'solar:target-outline',
          text: '<p>Welcome to <strong>SlotQuest</strong>, your ultimate destination for discovering the best online slots in 2025.</p>'
        }]
      }

      if (data.fast_filters && Array.isArray(data.fast_filters)) {
        fastFilters.value = data.fast_filters
      } else {
        fastFilters.value = []
      }
    }
  } catch (error) {
    alert('Failed to load homepage data')
  } finally {
    isLoading.value = false
  }
}

const saveData = async () => {
  isSaving.value = true
  try {
    const blocksToSave = seoBlocks.value.map(block => ({
      ...block,
      id: block.id || block.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || generateId()
    }))

    const payload = {
      ...pageData.value,
      content: blocksToSave,
      fast_filters: fastFilters.value
    }

    await pagesApi.updatePage('home', payload)

    setTimeout(() => {
      isSaving.value = false
    }, 500)

    // Show success feedback globally
    alert('Homepage settings saved successfully!')

  } catch (error) {
    alert('Failed to save homepage data')
    isSaving.value = false
  }
}

const generateOrganizationJsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SlotQuest",
    "url": "https://slotquest.com/",
    "logo": "https://slotquest.com/logo.png",
    "description": pageData.value.seo_desc || "Discover the best online slots and trusted casino reviews."
  }
  pageData.value.json_schema = JSON.stringify(schema, null, 2)
}

// Block Array Operations
const addBlock = () => {
  seoBlocks.value.push({
    id: generateId(),
    title: 'New Section',
    icon: 'solar:document-text-bold',
    text: '<p>Content goes here...</p>'
  })
}

const removeBlock = (index) => {
  if (confirm('Are you sure?')) {
    seoBlocks.value.splice(index, 1)
  }
}

const moveBlockUp = (index) => {
  if (index > 0) {
    const temp = seoBlocks.value[index]
    seoBlocks.value[index] = seoBlocks.value[index - 1]
    seoBlocks.value[index - 1] = temp
  }
}

const moveBlockDown = (index) => {
  if (index < seoBlocks.value.length - 1) {
    const temp = seoBlocks.value[index]
    seoBlocks.value[index] = seoBlocks.value[index + 1]
    seoBlocks.value[index + 1] = temp
  }
}

// Fast Filters Array Operations
const addFastFilter = () => {
  fastFilters.value.push({ category_id: '', name: 'New Filter', icon: 'solar:star-fall-line-duotone' })
}

const removeFastFilter = (index) => {
  fastFilters.value.splice(index, 1)
}

const moveFastFilterUp = (index) => {
  if (index > 0) {
    const temp = fastFilters.value[index]
    fastFilters.value[index] = fastFilters.value[index - 1]
    fastFilters.value[index - 1] = temp
  }
}

const moveFastFilterDown = (index) => {
  if (index < fastFilters.value.length - 1) {
    const temp = fastFilters.value[index]
    fastFilters.value[index] = fastFilters.value[index + 1]
    fastFilters.value[index + 1] = temp
  }
}

onMounted(() => {
  loadData()
})
</script>
