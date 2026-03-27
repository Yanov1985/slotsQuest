const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Inject the Auto-generate button
const searchHtml = `                          <!-- 1. Primary Keywords -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB]"
                            >
                              1️⃣ Primary Keywords
                              <span class="text-[#10B981] ml-1">3-5 words</span>
                            </label>`;

const replaceHtml = `                          <!-- 1. Primary Keywords -->
                          <div class="space-y-2">
                            <div class="flex items-center justify-between">
                              <label class="block text-sm font-medium text-[#E5E7EB]">
                                1️⃣ Primary Keywords
                                <span class="text-[#10B981] ml-1">3-5 words</span>
                              </label>
                              <button
                                @click="generateAllSeoKeywords"
                                type="button"
                                class="text-xs bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20 px-2.5 py-1 rounded-md border border-[#10B981]/30 transition-colors flex items-center gap-1.5"
                              >
                                <span>✨</span> Auto-generate All
                              </button>
                            </div>`;

if (content.includes(searchHtml)) {
  content = content.replace(searchHtml, replaceHtml);
} else {
  console.log('HTML target not found. Fallback search...');
  const fbSearch = `1️⃣ Primary Keywords`;
  if (content.includes(fbSearch)) {
     // manual replace
  }
}

// 2. Inject the generateAllSeoKeywords function
const jsTarget = `const saveSlot = async () => {`;
const jsInject = `const generateAllSeoKeywords = () => {
  // Only apply custom logic for Gates of Olympus
  if (form.slug === 'gates-of-olympus') {
    if (currentLocale.value === 'pt-BR') {
      form.seo_keywords_primary = "gates of olympus, jogar gates of olympus, gates of olympus demo, velho do raio";
      form.seo_keywords_lsi = "pragmatic play, slot 1000, super scatter, rtp 96.5%, max win 5000x, bônus de compra, giros grátis";
      form.seo_keywords_geo = "slots no brasil, cassino online brasil, jogar com reais, pix cassino";
      form.seo_keywords = "melhor horario para jogar gates of olympus, estrategia velho do raio, como ganhar no gates of olympus, paga mesmo";
    } else if (currentLocale.value === 'ru') {
      form.seo_keywords_primary = "gates of olympus, gates of olympus демо, дед слот, врата олимпа";
      form.seo_keywords_lsi = "pragmatic play, купить бонус, умножение x500, занос х5000, занос в слоте, бесплатные вращения";
      form.seo_keywords_geo = "слоты россия, онлайн казино рубли, играть без регистрации";
      form.seo_keywords = "как выиграть в gates of olympus, тактика игры дед, лучшее время для игры, занос";
    } else {
      // Default (English)
      form.seo_keywords_primary = "Gates of Olympus slot, play Gates of Olympus, slots Pragmatic Play";
      form.seo_keywords_lsi = "Zeus slot game, tumble feature, buy bonus Pragmatic, 5000x max win";
      form.seo_keywords_geo = "US, UK, Canada, Australia";
      form.seo_keywords = "how to win gates of olympus, pragmatic play free slots, gates of olympus demo";
    }
  } else {
    // Generic logic for other slots
    const baseName = form.name || 'this slot';
    form.seo_keywords_primary = \`\${baseName} slot, play \${baseName}, \${baseName} demo\`;
    form.seo_keywords_lsi = \`free spins, bonus buy, online casino games, max win\`;
    form.seo_keywords_geo = "Global";
    form.seo_keywords = \`how to win \${baseName}, \${baseName} strategy\`;
  }
  
  // Also calculate stats if functions exist
  if (typeof calculateMetaScore === 'function') calculateMetaScore();
}

const saveSlot = async () => {`;

if (content.includes(jsTarget)) {
  content = content.replace(jsTarget, jsInject);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully injected Auto-generate logic!');
} else {
  console.log('Could not find JS target to inject auto-generate logic.');
}
