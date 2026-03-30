import fs from 'fs';

const filesToPatch = [
  {
    path: 'd:/www/Projects/2025/SlotQuest/frontend/pages/slots/[slug].vue',
    dictName: 'fallbackLangObj',
    fnName: 'tf'
  },
  {
    path: 'd:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotHero.vue',
    dictName: 'translations',
    fnName: 't'
  },
  {
    path: 'd:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue',
    dictName: 'translations',
    fnName: 't'
  },
  {
    path: 'd:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotCharacteristics.vue',
    dictName: 'translations',
    fnName: 't'
  }
];

const injectSpanishDictionaries = () => {
  // 1. SlotHero
  let fHero = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotHero.vue', 'utf8');
  if (!fHero.includes('es: { plays:')) {
    fHero = fHero.replace(/tr: { plays: 'oynama'[^}]+}/, `$&,
  es: { plays: 'jugadas', rate: 'Calificar', submit: 'Enviar', cancel: 'Cancelar', voteCounted: '¡Voto registrado!', playFreeDemo: 'Jugar Demo Gratis', playForReal: 'Jugar con Dinero Real', demo: 'DEMO', real: 'REAL', reviews: 'reseñas' }`);
  }
  // Replace t helper logic
  fHero = fHero.replace(/const t = \(key\) => {[\s\S]*?return[\s\S]*?}/m, `const t = (key) => {
  const loc = locale?.value || 'en';
  const baseLoc = loc.split('-')[0];
  const lang = translations[loc] || translations[baseLoc] || translations.en;
  return lang[key] || translations.en[key] || key;
}`);
  fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotHero.vue', fHero);

  // 2. SlotCharacteristics
  let fChar = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotCharacteristics.vue', 'utf8');
  if (!fChar.includes('es: { char:')) {
    fChar = fChar.replace(/tr: { char: 'Özellikler'[^}]+}/, `$&,
  es: { char: 'Características', return: 'Retorno', highRate: 'Tasa alta', risk: 'Riesgo', medRisk: 'Riesgo medio', volatility: 'Volatilidad', maxWin: 'Ganancia Máx.', potential: 'Potencial', reelsLines: 'Rodillos / Líneas', grid: 'Cuadrícula', mechanics: 'Mecánicas', features: 'Funciones', bonus: 'Bono', themes: 'Temas', genres: 'Géneros', release: 'Lanzamiento', newTitle: 'Nuevo' }`);
  }
  // Replace t helper
  fChar = fChar.replace(/const t = \(key\) => {[\s\S]*?return[\s\S]*?}/m, `const t = (key) => {
  const loc = locale?.value || 'en';
  const baseLoc = loc.split('-')[0];
  const lang = translations[loc] || translations[baseLoc] || translations.en;
  return lang[key] || translations.en[key] || key;
}`);
  fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotCharacteristics.vue', fChar);

  // 3. SlotInfoModal
  let fModal = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue', 'utf8');
  if (!fModal.includes('es: {')) {
    fModal = fModal.replace(/ru: {[\s\S]*?playDemoNow: 'Играть Демо'\s*},/, `$&
  es: {
    expertVerdict: 'Veredicto del Experto',
    devFallback: 'el desarrollador',
    isA: 'es una tragamonedas de',
    volSlot: 'volatilidad con un RTP de',
    andMaxWin: 'y una ganancia máxima de',
    aboveRTP: 'El RTP por encima de la media lo convierte en una opción sólida.',
    belowRTP: 'Ofrece una experiencia de juego equilibrada.',
    overallRate: 'En general, lo calificamos con',
    forIts: '/5 por su',
    highPot: 'emocionante potencial de altas recompensas.',
    balPot: 'jugabilidad equilibrada y pagos consistentes.',
    prosCons: 'Pros y Contras',
    pros: 'Pros',
    cons: 'Contras',
    faq: 'Preguntas Frecuentes',
    reviewAnalysis: 'Análisis y Reseña',
    howToPlay: 'Cómo Jugar',
    similarSlots: 'Tragamonedas Similares',
    freePlayDemo: 'Juego Gratis (Demo)',
    demoDesc: 'Puedes probar fácilmente este slot en línea en nuestro catálogo sin pagar dinero real.',
    playDemoNow: 'Jugar Demo Ahora'
  },`);
  }
  // No need to replace t helper for Modal cause it's not defined there? Wait, it was never defined! It relies on global or I didn't inject one?
  // Actually, I injected it? Oh wait, I didn't inject t() into SlotInfoModal.vue! 
  // Let me inject it into Modal if it doesn't have it!
  if (!fModal.includes('const t = (key) =>')) {
    fModal = fModal.replace(/const translations = {/g, `const t = (key) => {
  const loc = locale?.value || 'en';
  const baseLoc = loc.split('-')[0];
  const lang = translations[loc] || translations[baseLoc] || translations.en;
  return lang[key] || translations.en[key] || key;
}
const translations = {`);
  } else {
     fModal = fModal.replace(/const t = \(key\) => {[\s\S]*?return[\s\S]*?}/m, `const t = (key) => {
  const loc = locale?.value || 'en';
  const baseLoc = loc.split('-')[0];
  const lang = translations[loc] || translations[baseLoc] || translations.en;
  return lang[key] || translations.en[key] || key;
}`);
  }
  fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue', fModal);

  // 4. [slug].vue arrays
  let fSlug = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/pages/slots/[slug].vue', 'utf8');
  if (!fSlug.includes('es: {')) {
    fSlug = fSlug.replace(/de: {[\s\S]*?htp4a: 'Sammeln Sie Spezialsymbole.'\s*}/, `$&,
  es: {
    pro1: 'Gráficos de alta calidad', pro2: 'Emocionantes rondas de bonificación', pro3: 'Interfaz amigable para móviles',
    con1: 'La alta volatilidad puede no ser para todos', con2: 'El juego de bonificación es difícil de activar',
    howTo1: 'Elige tu apuesta', howTo2: 'Usa los botones para ajustar tu apuesta total',
    howTo3: 'Gira los rodillos', howTo4: 'Haz clic en el botón de girar para iniciar',
    howTo5: 'Entiende los pagos', howTo6: 'Revisa la tabla de pagos para ver las reglas',
    faq1q: '¿Es seguro?', faq1a: 'Sí, está desarrollado por un proveedor con licencia.',
    faq2q: '¿Cuál es el RTP?', faq2a: 'El RTP ofrece un retorno teórico sólido.',
    faq3q: '¿Puedo jugar gratis?', faq3a: '¡Sí! Puedes jugar en modo demo en nuestro sitio. Sin registro.',
    faq4q: '¿Cuál es la ganancia máxima?', faq4a: 'La ganancia máxima ofrece un gran potencial.',
    faq5q: '¿Qué es la volatilidad?', faq5a: 'La volatilidad indica la frecuencia de los pagos.',
    rev1: '¡es uno de mis slots favoritos! Los gráficos son impresionantes.',
    rev2: 'Gran tragamonedas con buen RTP. Muy recomendable jugar el demo primero.',
    rev3: 'Un lanzamiento decente del proveedor. Todo se ve muy bien.',
    htp1: 'Abre el Demo', htp1a: 'Haz clic en el botón de jugar en esta página. No requiere registro.',
    htp2: 'Ajusta la Apuesta', htp2a: 'Utiliza los controles inferiores para establecer tu límite.',
    htp3: 'Gira', htp3a: 'Presiona Iniciar o Espacio.',
    htp4: 'Activa Bonos', htp4a: 'Obtén símbolos especiales para ganar premios mayores.'
  }`);
  }
  // fix helper tf()
  fSlug = fSlug.replace(/const tf = \(key\) => {[\s\S]*?return[\s\S]*?}/m, `const tf = (key) => {
  const loc = locale?.value || 'en';
  const baseLoc = loc.split('-')[0];
  const lang = fallbackLangObj[loc] || fallbackLangObj[baseLoc] || fallbackLangObj.en;
  return lang[key] || fallbackLangObj.en[key] || key;
}`);
  fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/pages/slots/[slug].vue', fSlug);
}

injectSpanishDictionaries();
console.log('Successfully added Spanish dictionary and base-locale routing support!');
