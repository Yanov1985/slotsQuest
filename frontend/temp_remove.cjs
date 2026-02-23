const fs = require('fs');
const path = require('path');

const vuePath = path.join(__dirname, 'pages', 'slots', '[slug].vue');
let content = fs.readFileSync(vuePath, 'utf8');

// 1. We replace useHead
// useHead starts at "watchEffect(() => {" line 3072 and ends around 3483 with "})"
// Actually, it's safer to just do a regex replace or indexOf replace

const removeBlock = (startStr, endStr) => {
    const startIdx = content.indexOf(startStr);
    if (startIdx === -1) {
        console.log('Could not find start: ' + startStr.substring(0, 50));
        return;
    }
    const endIdx = content.indexOf(endStr, startIdx);
    if (endIdx === -1) {
        console.log('Could not find end: ' + endStr.substring(0, 50));
        return;
    }
    const toRemove = content.substring(startIdx, endIdx + endStr.length);
    content = content.replace(toRemove, '');
    console.log('Removed block starting with: ' + startStr.substring(0, 50));
};

// Remove formatArticleDate
removeBlock(
    "const formatArticleDate = (dateString)",
    "  }\r\n}\r\n"
);

// Remove generateSeoSchemas
removeBlock(
    "// 🎯 JSON-LD Schemas for Enhanced Info Modal",
    "    return schemas\r\n  })\r\n"
);

// Remove `let structuredData` check + useHead watchEffect
// The watchEffect is:
removeBlock(
    "  // 🎯 Инициализация useHead внутри watchEffect\r\n  watchEffect(() => {\r\n    if (slot.value && !loading.value && !error.value) {",
    "      link: [{ rel: 'canonical', href: 'https://slotquest.com/slots' }],\r\n    })\r\n  }\r\n})\r\n"
);
// Wait, the end string might not be exactly that because of formatting.
// Let's use simpler end strings.

// Remove getAwardEffectColors
removeBlock(
    "const getAwardEffectColors = (gradient) => {",
    "    [30, 41, 59],\r\n  ]\r\n}\r\n"
);

// Remove getEffectColorsFor
removeBlock(
    "const getEffectColorsFor = (theme) => {",
    "    [30, 41, 59],\r\n  ]\r\n}\r\n"
);

// Remove Award methods
removeBlock(
    "// Методы для работы с наградами в публичном шаблоне",
    "  return colorMap[colorScheme] || colorMap.amber\r\n}\r\n"
);

// Remove getSlotIcon
removeBlock(
    "const getSlotIcon = (name) => {",
    "  return '🎰'\r\n}\r\n"
);

// Remove getImageFormat
removeBlock(
    "/**\r\n * 🎯 SEO: Определение формата изображения по URL",
    "  return 'image/jpeg'\r\n}\r\n"
);

// Remove getVolatilityText
removeBlock(
    "const getVolatilityText = (volatility) => {",
    "  return volatility\r\n}\r\n"
);

// Remove getMaxWin
removeBlock(
    "const getMaxWin = (slot) => {",
    "  return slot.max_win || 'x1,000'\r\n}\r\n"
);

// Remove formatReleaseDate
removeBlock(
    "const formatReleaseDate = (dateString) => {",
    "    return null\r\n  }\r\n}\r\n"
);

// Remove descriptions (getSlotDescription, getShortDescription, getDetailedDescription)
removeBlock(
    "const getSlotDescription = (slot) => {",
    "  return `This slot features high-quality graphics, well-thought-out mechanics, and an excellent balance between win frequency and payout size. The RTP is ${slot.rtp || '96'}%, making the game attractive to most players.`\r\n}\r\n"
);

// Remove name cleaners
removeBlock(
    "/**\r\n * Функция для получения чистого названия слота",
    "  return slot.hero_keyword || 'Slot Review'\r\n}\r\n"
);

// Remove process methods
removeBlock(
    "/**\r\n * 🎯 Обработка CTA Subtitle с заменой ключевого слова",
    "  // Если плейсхолдера нет, возвращаем text как есть\r\n  return text\r\n}\r\n"
);

// Remove replaceKeywordsInText
removeBlock(
    "/**\r\n * 🎯 SEO-ОПТИМИЗИРОВАННАЯ замена плейсхолдеров",
    "  return result\r\n}\r\n"
);

// Remove getSlotThemes, getSlotBonuses, getSlotThemesFromDB
removeBlock(
    "const getSlotThemes = (slot) => {",
    "    .filter(Boolean) // Убираем null/undefined\r\n}\r\n"
);

// Remove generateRobotsContent
removeBlock(
    "/**\r\n * 🤖 Генерация robots content из динамических полей слота",
    "  return directives.join(', ')\r\n}\r\n"
);

// Remove generateHreflangLinks
removeBlock(
    "/**\r\n * 🌍 Генерация hreflang ссылок",
    "  return links\r\n}\r\n"
);

// Remove formatMaxWin, formatPaylines, formatNumber
removeBlock(
    "/**\r\n * 🎰 Форматирование Max Win",
    "  return n.toLocaleString('en-US')\r\n}\r\n"
);

// Remove generateSEODescription
removeBlock(
    "const generateSEODescription = (slot) => {",
    "  return description\r\n}\r\n"
);

// Remove generateOptimizedKeywords
removeBlock(
    "/**\r\n * 🎯 SEO: Генерация оптимизированных",
    "  return keywords.join(', ')\r\n}\r\n"
);

// Remove getStructuredData
removeBlock(
    "// Функция для генерации структурированных данных Schema.org\r\nconst getStructuredData = (slot) => {",
    "  return JSON.stringify(allSchemas)\r\n}\r\n"
);

// Insert the useSlotSEO usage at the top of loadSlot or inside script setup.
// Wait, we need to add the import to the top
const importUseSlotSEO = `import { useSlotSEO } from '~/composables/useSlotSEO'\nimport {\n  formatArticleDate,\n  getEffectColorsFor,\n  getAwardEffectColors,\n  getAwardPublicClasses,\n  getAwardBgClasses,\n  getAwardIconClasses,\n  getAwardTextClasses,\n  getSlotIcon,\n  getImageFormat,\n  getVolatilityText,\n  getMaxWin,\n  formatReleaseDate,\n  getSlotDescription,\n  getShortDescription,\n  getDetailedDescription,\n  getCleanSlotName,\n  getSlotNameWithKeyword,\n  processCtaSubtitle,\n  processConclusionRatingTitle,\n  processPopularityTitle,\n  processProfExpertQuote,\n  processProfRecommendation,\n  processConclusionText1,\n  processConclusionVerdict,\n  replaceKeywordsInText,\n  getSlotThemes,\n  getSlotBonuses,\n  getSlotThemesFromDB,\n  formatMaxWin,\n  formatPaylines,\n  formatNumber\n} from '~/utils/slotFormatters'\n`;

if (content.indexOf('useSlotSEO') === -1) {
    content = content.replace("import { ref, computed, onMounted, watchEffect } from 'vue'", "import { ref, computed, onMounted } from 'vue'\n" + importUseSlotSEO);
}

// And call useSlotSEO in the setup script. Let's find a good place.
const initSeoStr = `
// 🎯 Initialize SEO
useSlotSEO({
  slot,
  parsedGeoRegions,
  computedFaq,
  computedHowToPlay,
  computedReviews,
  similarSlots,
  loading,
  error
})

`;
if (content.indexOf('useSlotSEO({') === -1) {
    // Insert just before "const loadSlot = async () => {"
    content = content.replace("const loadSlot = async () => {", initSeoStr + "const loadSlot = async () => {");
}

fs.writeFileSync(vuePath, content, 'utf8');
console.log('Cleanup script executed successfully.');
