const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

const htmlTarget = `                            <label
                              class="block text-sm font-medium text-[#E5E7EB]"
                            >
                              1️⃣ Primary Keywords
                              <span class="text-[#10B981] ml-1">3-5 words</span>
                            </label>`;

const htmlReplacement = `                            <div class="flex items-center justify-between">
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

const jsTarget = `const generateSeoDescription = () => {
  form.value.seo_description = generateAutoDescription()
}`;

const jsReplacement = `const generateSeoDescription = () => {
  form.value.seo_description = generateAutoDescription()
}

const generateAllSeoKeywords = () => {
  const isOlympus = form.value.slug === 'gates-of-olympus'
  const loc = currentLocale.value

  if (loc === 'pt-BR') {
    if (isOlympus) {
      form.value.seo_keywords_primary = 'gates of olympus, jogar gates of olympus, gates of olympus demo, velho do raio'
      form.value.seo_keywords_lsi = 'pragmatic play, slot 1000, super scatter, rtp 96.5%, max win 5000x, bônus de compra, giros grátis'
      form.value.seo_keywords_geo = 'slots no brasil, cassino online brasil, jogar com reais, pix cassino'
      form.value.seo_keywords_longtail = 'como jogar gates of olympus, melhor horario para jogar gates of olympus, gates of olympus ganhar dinheiro, qual o rtp do gates of olympus'
    } else {
      const name = form.value.name || 'Slot'
      const n = name.toLowerCase()
      form.value.seo_keywords_primary = \`\${n}, jogar \${n}, \${n} demo\`
      form.value.seo_keywords_lsi = 'cassino, rtp alto, giros grátis, slot bônus'
      form.value.seo_keywords_geo = 'cassino online brasil, apostas online, pix cassino'
      form.value.seo_keywords_longtail = \`como jogar \${n}, onde jogar \${n} grátis\`
    }
  } else if (loc === 'ru') {
    if (isOlympus) {
      form.value.seo_keywords_primary = 'gates of olympus, врата олимпа, gates of olympus демо, играть gates of olympus'
      form.value.seo_keywords_lsi = 'pragmatic play, слот зевс, купить бонус, заносы, rtp 96.5%, множители x500, фриспины'
      form.value.seo_keywords_geo = 'онлайн казино рубли, слоты без регистрации, казино крипта'
      form.value.seo_keywords_longtail = 'как выиграть в gates of olympus, тактика gates of olympus, gates of olympus максимальный выигрыш, поймать х500 зевс'
    } else {
      const name = form.value.name || 'Slot'
      const n = name.toLowerCase()
      form.value.seo_keywords_primary = \`\${n}, \${n} слот, играть \${n}, \${n} демо\`
      form.value.seo_keywords_lsi = 'казино, rtp, фриспины, бонусы, множитель'
      form.value.seo_keywords_geo = 'онлайн казино рубли, крипто казино'
      form.value.seo_keywords_longtail = \`как играть в \${n}, \${n} на реальные деньги\`
    }
  } else {
    // Default en
    if (isOlympus) {
      form.value.seo_keywords_primary = 'gates of olympus, gates of olympus slot, play gates of olympus, gates of olympus demo'
      form.value.seo_keywords_lsi = 'pragmatic play, zeus slot, multiplier symbols, freespin feature, tumble feature, max win 5000x'
      form.value.seo_keywords_geo = 'us online casinos, play slots for real money, sweepstakes casinos us'
      form.value.seo_keywords_longtail = 'how to win on gates of olympus, gates of olympus slot review, gates of olympus rtp and volatility, how to trigger free spins gates of olympus'
    } else {
      const name = form.value.name || 'Slot'
      const n = name.toLowerCase()
      form.value.seo_keywords_primary = \`\${n}, \${n} slot, play \${n}, \${n} demo\`
      form.value.seo_keywords_lsi = 'online slot, high rtp, free spins, casino game'
      form.value.seo_keywords_geo = 'online casino us, real money slots'
      form.value.seo_keywords_longtail = \`how to win on \${n}, \${n} slot review\`
    }
  }
}`;

let patched = false;

if (content.includes(htmlTarget)) {
  content = content.replace(htmlTarget, htmlReplacement);
  patched = true;
} else {
  console.log('HTML target not found!');
}

if (content.includes(jsTarget)) {
  content = content.replace(jsTarget, jsReplacement);
  patched = true;
} else {
  console.log('JS target not found!');
}

if (patched) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully added auto-generate button and keyword functions!');
}
