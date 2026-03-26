const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Inject the UI tabs
const uiReplacement = `<div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 mt-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg p-2">
  <div class="flex flex-wrap gap-2">
    <button v-for="locale in availableLocales" :key="locale.code" @click="switchLocale(locale.code)" type="button" :class="['px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-2 transition-colors', currentLocale === locale.code ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-gray-700/50']">
      <span>{{ locale.flag }}</span>
      <span>{{ locale.name }}</span>
    </button>
  </div>
  <div class="text-xs text-gray-400">
    <span v-if="currentLocale !== 'en'" class="text-amber-400">⚠️ Auto-translate mode: Saving will update {{currentLocale}} localization instead of default english slot data.</span>
    <span v-else class="text-emerald-400">✅ Editing default (English) data.</span>
  </div>
  <!-- Collapse/expand SEO section button -->`;
content = content.replace('<!-- Collapse/expand SEO section button -->', uiReplacement);

// 2. Inject the Logic state
const logicReplacement = `const showGameCharacteristicsSection = ref(false)

// ======== Multi-GEO Localization ========
const currentLocale = ref('en')
const availableLocales = [
  { code: 'en', name: 'English (Default)', flag: '🇬🇧' },
  { code: 'pt-BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'de', name: 'Germany', flag: '🇩🇪' },
  { code: 'es', name: 'Spain', flag: '🇪🇸' },
  { code: 'tr', name: 'Turkey', flag: '🇹🇷' }
]
const localizations = ref({})

const switchLocale = (newLocale) => {
  if (currentLocale.value === newLocale) return
  
  // Save current form values to current locale
  if (!localizations.value[currentLocale.value]) localizations.value[currentLocale.value] = {}
  Object.keys(form.value).forEach(key => {
    if (typeof form.value[key] === 'string' && !key.includes('url') && !key.includes('_id') && key !== 'slug') {
      localizations.value[currentLocale.value][key] = form.value[key]
    }
  })
  
  // Load new locale values into form
  currentLocale.value = newLocale
  const newData = localizations.value[newLocale] || {}
  
  // When switching to a new locale without data, we SHOULD NOT clear everything, 
  // we could keep English as base but it's better to clear it out to see untranslated fields.
  Object.keys(form.value).forEach(key => {
    if (typeof form.value[key] === 'string' && !key.includes('url') && !key.includes('_id') && key !== 'slug') {
      form.value[key] = newData[key] !== undefined ? newData[key] : ''
    }
  })
}
// ========================================`;
content = content.replace('const showGameCharacteristicsSection = ref(false)', logicReplacement);

// 3. Inject Load logic
const loadReplacement = `    generateInfoContent()

    // ======== Multi-GEO Localization Data Hydration ========
    localizations.value = slot.value.localizations ? (typeof slot.value.localizations === 'string' ? JSON.parse(slot.value.localizations) : slot.value.localizations) : {}
    if (!localizations.value['en']) {
      localizations.value['en'] = {}
      Object.keys(form.value).forEach(key => {
        if (typeof form.value[key] === 'string' && !key.includes('url') && !key.includes('_id') && key !== 'slug') {
          localizations.value['en'][key] = form.value[key]
        }
      })
    }
    // Switch to EN by default to make sure all is in sync
    currentLocale.value = 'en'
    // ======================================================
  } catch (error) {`;
content = content.replace('    generateInfoContent()\n  } catch (error) {', loadReplacement);

// 4. Inject Save Form extraction
const saveReplacement1 = `    const method = slotId === 'new' ? 'POST' : 'PUT'

    // ======== Multi-GEO Localization Commit ========
    if (!localizations.value[currentLocale.value]) localizations.value[currentLocale.value] = {}
    Object.keys(form.value).forEach(key => {
      if (typeof form.value[key] === 'string' && !key.includes('url') && !key.includes('_id') && key !== 'slug') {
        localizations.value[currentLocale.value][key] = form.value[key]
      }
    })
    
    // If saving in non-english, we also must ensure the English base fields are maintained 
    // inside dataToSend, but if the user hasn't touched them currently we'll just send the current form 
    // which contains the localized version. Wait, this will override the base English slot! 
    // We MUST replace the dataToSend base fields with localizations.value['en']!
    
    // ===============================================

    // List of fields allowed in UpdateSlotDto`;
content = content.replace("    const method = slotId === 'new' ? 'POST' : 'PUT'\n\n    // List of fields allowed in UpdateSlotDto", saveReplacement1);

// 5. Inject allowedFields for localizations
const allowedReplacement = `      'jsonld_video_description',
      'localizations',
      // ========== SEO META TAGS ==========`;
content = content.replace("      'jsonld_video_description',\n      // ========== SEO META TAGS ==========", allowedReplacement);

// 6. Inject base en restoration on save
const saveReplacement2 = `        } else {
          // ======== Multi-GEO Restoration ========
          // If we are saving, the root fields of the Slot should ideally be the English base!
          if (localizations.value['en'] && typeof form.value[field] === 'string' && !field.includes('url') && !field.includes('_id') && field !== 'slug') {
             dataToSend[field] = localizations.value['en'][field] !== undefined ? localizations.value['en'][field] : form.value[field]
          } else {
             dataToSend[field] = form.value[field]
          }
        }
        console.log(\`✅ Copying field \${field}:\`, form.value[field])`;
content = content.replace('        } else {\n          dataToSend[field] = form.value[field]\n        }\n        console.log(`✅ Copying field ${field}:`, form.value[field])', saveReplacement2);

// 7. Attach localizations payload
const payloadReplacement = `    dataToSend.geo_regions = JSON.stringify(technicalSeoForm.value.regions || [])
    dataToSend.localizations = localizations.value // Multi-GEO injected`;
content = content.replace('    dataToSend.geo_regions = JSON.stringify(technicalSeoForm.value.regions || [])', payloadReplacement);


fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully patched [id].vue with Multi-GEO support!');
