import fs from 'fs';

// Helper to inject translation object
const injectI18n = (content, translationsObj) => {
  if (content.includes('const translations = {')) return content; // already injected
  const scriptSetupString = '<script setup>';
  const injectStr = `
const { locale } = useI18n()
const translations = ${JSON.stringify(translationsObj, null, 2)};
translations['en-IN'] = translations.en;
const t = (key) => {
  const lang = translations[locale?.value] || translations.en;
  return lang[key] || translations.en[key] || key;
}
`;
  return content.replace(scriptSetupString, scriptSetupString + injectStr);
};

// 1. Patch SlotHero.vue
let fHero = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotHero.vue', 'utf8');
const heroTrans = {
  en: { plays: 'plays', rate: 'Rate', submit: 'Submit', cancel: 'Cancel', voteCounted: 'Vote counted!', playFreeDemo: 'Play Free Demo', playForReal: 'Play for Real Money', demo: 'DEMO', real: 'REAL', reviews: 'reviews' },
  'pt-BR': { plays: 'jogadas', rate: 'Avaliar', submit: 'Enviar', cancel: 'Cancelar', voteCounted: 'Voto computado!', playFreeDemo: 'Jogar Grátis', playForReal: 'Jogar com Dinheiro Real', demo: 'DEMO', real: 'REAL', reviews: 'avaliações' },
  ru: { plays: 'игр', rate: 'Оценить', submit: 'Отправить', cancel: 'Отмена', voteCounted: 'Голос учтен!', playFreeDemo: 'Играть Бесплатно', playForReal: 'Играть на Деньги', demo: 'ДЕМО', real: 'ДЕНЬГИ', reviews: 'отзывов' },
  tr: { plays: 'oynama', rate: 'Değerlendir', submit: 'Gönder', cancel: 'İptal', voteCounted: 'Oy kaydedildi!', playFreeDemo: 'Ücretsiz Oyna', playForReal: 'Gerçek Parayla Oyna', demo: 'DEMO', real: 'GERÇEK', reviews: 'inceleme' }
};
fHero = injectI18n(fHero, heroTrans);

// Direct replacements in template
fHero = fHero.replace(/{{ formatNumber\(slot\.reviews_count \|\| 100\) }} reviews\)/, "{{ formatNumber(slot.reviews_count || 100) }} {{ t('reviews') }})");
fHero = fHero.replace(/{{ formatNumber\(slot\.play_count\) }} plays/, "{{ formatNumber(slot.play_count) }} {{ t('plays') }}");
fHero = fHero.replace(/Icon name="solar:star-fall-bold" class="w-4 h-4 text-yellow-400" \/> Rate/, 'Icon name="solar:star-fall-bold" class="w-4 h-4 text-yellow-400" /> {{ t(\'rate\') }}');
fHero = fHero.replace(/{{ ratingSubmitting \? '\.\.\.' : 'Submit' }}/, "{{ ratingSubmitting ? '...' : t('submit') }}");
fHero = fHero.replace(/>Cancel</, ">{{ t('cancel') }}<");
fHero = fHero.replace(/✔ Vote counted!/g, "✔ {{ t('voteCounted') }}");
fHero = fHero.replace(/>Play Free Demo</, ">{{ t('playFreeDemo') }}<");
fHero = fHero.replace(/>Play for Real Money</, ">{{ t('playForReal') }}<");
fHero = fHero.replace(/>DEMO</, ">{{ t('demo') }}<");
fHero = fHero.replace(/>REAL</, ">{{ t('real') }}<");

// Fix the shortDescription fallback
let regexDesc = /const shortDescriptionHtml = computed\(\(\) => getShortDescription\(props\.slot, true\)\)/;
let replaceDesc = "const shortDescriptionHtml = computed(() => props.slot.seo_description || props.slot.description || getShortDescription(props.slot, true))";
fHero = fHero.replace(regexDesc, replaceDesc);

fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotHero.vue', fHero);

// 2. Patch SlotCharacteristics.vue
let fChar = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotCharacteristics.vue', 'utf8');
const charTrans = {
  en: { char: 'Characteristics', return: 'Return', highRate: 'High rate', risk: 'Risk', medRisk: 'Medium risk', volatility: 'Volatility', maxWin: 'Max win', potential: 'Potential', reelsLines: 'Reels / Lines', grid: 'Grid', mechanics: 'Mechanics', features: 'Features', bonus: 'Bonus', themes: 'Themes', genres: 'Genres', release: 'Release Date', newTitle: 'New Title' },
  'pt-BR': { char: 'Características', return: 'Retorno', highRate: 'Taxa alta', risk: 'Risco', medRisk: 'Risco médio', volatility: 'Volatilidade', maxWin: 'Ganho Máx.', potential: 'Potencial', reelsLines: 'Cilindros / Linhas', grid: 'Grade', mechanics: 'Mecânicas', features: 'Recursos', bonus: 'Bônus', themes: 'Temas', genres: 'Gêneros', release: 'Data de Lançamento', newTitle: 'Novo' },
  ru: { char: 'Характеристики', return: 'Отдача', highRate: 'Высокая', risk: 'Риск', medRisk: 'Средний риск', volatility: 'Волатильность', maxWin: 'Макс. выигрыш', potential: 'Потенциал', reelsLines: 'Барабаны / Линии', grid: 'Сетка', mechanics: 'Механики', features: 'Функции', bonus: 'Бонус', themes: 'Темы', genres: 'Жанры', release: 'Релиз', newTitle: 'Новинка' },
  tr: { char: 'Özellikler', return: 'Getiri', highRate: 'Yüksek Oran', risk: 'Risk', medRisk: 'Orta risk', volatility: 'Oynaklık', maxWin: 'Maks. Kazanç', potential: 'Potansiyel', reelsLines: 'Makaralar / Çizgiler', grid: 'Izgara', mechanics: 'Mekanikler', features: 'Özellikler', bonus: 'Bonus', themes: 'Temalar', genres: 'Türler', release: 'Yayın Tarihi', newTitle: 'Yeni' }
};
fChar = injectI18n(fChar, charTrans);

// Replace raw text in Characteristics
fChar = fChar.replace(/Characteristics\n\s*<\/h2>/, "{{ t('char') }}\n      </h2>");
fChar = fChar.replace(/RTP<\/dt>/, "{{ 'RTP' }}</dt>"); 
fChar = fChar.replace(/Return\n\s*<\/dd>/, "{{ t('return') }}\n              </dd>");
fChar = fChar.replace(/>High rate</, ">{{ t('highRate') }}<");
fChar = fChar.replace(/Volatility<\/dt>/, "{{ t('volatility') }}</dt>");
fChar = fChar.replace(/>Risk</, ">{{ t('risk') }}<");
fChar = fChar.replace(/>Medium risk</, ">{{ t('medRisk') }}<");
fChar = fChar.replace(/Max win<\/dt>/, "{{ t('maxWin') }}</dt>");
fChar = fChar.replace(/>Potential\n\s*<\/dd>/, ">{{ t('potential') }}\n              </dd>");
fChar = fChar.replace(/Reels \/ Lines<\/dt>/, "{{ t('reelsLines') }}</dt>");
fChar = fChar.replace(/>Grid</, ">{{ t('grid') }}<");
fChar = fChar.replace(/Mechanics<\/dt>/, "{{ t('mechanics') }}</dt>");
fChar = fChar.replace(/>Features</, ">{{ t('features') }}<");
fChar = fChar.replace(/>Themes<\/dt>/, ">{{ t('themes') }}</dt>");
fChar = fChar.replace(/>Genres</, ">{{ t('genres') }}<");
fChar = fChar.replace(/Release Date<\/dt>/, "{{ t('release') }}</dt>");
fChar = fChar.replace(/>New title</ig, ">{{ t('newTitle') }}<");

fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotCharacteristics.vue', fChar);

// 3. Patch slots/[slug].vue (Fixing the Core Mechanics english strings I added earlier)
let fSlug = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/pages/slots/[slug].vue', 'utf8');
fSlug = fSlug.replace(/Core Mechanics/, "{{ (t && typeof t === 'function') ? t('coreMechanics') : 'Core Mechanics' }}");
// Note: We'll just define coreMechanics in translations object if it exists. Or we can just leave it inline if translations objects grow too big.
if (fSlug.includes("const translations = {")) {
  fSlug = fSlug.replace(/reviewAnalysis: 'Review \& Analysis',/, "reviewAnalysis: 'Review & Analysis', coreMechanics: 'Core Mechanics', overview: 'Overview',");
  fSlug = fSlug.replace(/reviewAnalysis: 'Análise e Avaliação',/, "reviewAnalysis: 'Análise e Avaliação', coreMechanics: 'Mecânicas Principais', overview: 'Visão Geral',");
  fSlug = fSlug.replace(/reviewAnalysis: 'Обзор и аналитика',/, "reviewAnalysis: 'Обзор и аналитика', coreMechanics: 'Ключевые механики', overview: 'Обзор',");
  fSlug = fSlug.replace(/reviewAnalysis: 'İnceleme ve Analiz',/, "reviewAnalysis: 'İnceleme ve Analiz', coreMechanics: 'Temel Mekanik', overview: 'Genel Bakış',");
}
fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/pages/slots/[slug].vue', fSlug);

console.log('Successfully patched all Vue UI components for translations!');
