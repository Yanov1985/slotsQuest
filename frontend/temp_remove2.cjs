const fs = require('fs');
const path = require('path');

const vuePath = path.join(__dirname, 'pages', 'slots', '[slug].vue');
let content = fs.readFileSync(vuePath, 'utf8');
let lines = content.split('\n');

const markers = [
    // JSON-LD Schemas -> ends at 2962 (~70 lines)
    { startMatches: 'const generateSeoSchemas = computed(() => {', endMatches: 'return schemas', isBlockEnd: true },
    { startMatches: 'const formatArticleDate = (dateString)', endMatches: '    return dateString' },

    // watchEffect for SEO
    { startMatches: 'watchEffect(() => {', containsRequiredStart: 'const jsonLdScript = getJsonLdScriptSync(slot.value', endMatches: 'rel: \'canonical\'', endHasNextLine: '})' },

    // Awards and colors
    { startMatches: 'const getAwardEffectColors = (gradient) => {', endMatches: '[30, 41, 59],' },
    { startMatches: 'const getEffectColorsFor = (theme) => {', endMatches: '[30, 41, 59],' },
    { startMatches: 'const getAwardPublicClasses = (colorScheme)', endMatches: 'return colorMap[colorScheme]' },
    { startMatches: 'const getAwardBgClasses = (colorScheme)', endMatches: 'return colorMap[colorScheme]' },
    { startMatches: 'const getAwardIconClasses = (colorScheme)', endMatches: 'return colorMap[colorScheme]' },
    { startMatches: 'const getAwardTextClasses = (colorScheme)', endMatches: 'return colorMap[colorScheme]' },
    { startMatches: 'const getSlotIcon = (name) => {', endMatches: 'return \'🎰\'' },
    { startMatches: 'const getImageFormat = (url) => {', endMatches: 'return \'image/jpeg\'' },
    { startMatches: 'const getVolatilityText = (volatility)', endMatches: 'return volatility' },
    { startMatches: 'const getMaxWin = (slot)', endMatches: 'return slot.max_win || \'x1,000\'' },
    { startMatches: 'const formatReleaseDate = (dateString)', endMatches: 'return null' },
    { startMatches: 'const getSlotDescription = (slot)', endMatches: 'excellent winning opportunities.`' },
    { startMatches: 'const getShortDescription = (slot', endMatches: 'excellent winning opportunities and exciting gameplay.`' },
    { startMatches: 'const getDetailedDescription = (slot)', endMatches: 'attractive to most players.`' },
    { startMatches: 'const getCleanSlotName = (slot)', endMatches: 'return cleanName.trim()' },
    { startMatches: 'const getSlotNameWithKeyword = (slot)', endMatches: 'return slot.hero_keyword || \'Slot Review\'' },
    { startMatches: 'const processCtaSubtitle = (subtitle', endMatches: 'return subtitle' },
    { startMatches: 'const processConclusionRatingTitle = (title', endMatches: 'return title' },
    { startMatches: 'const processPopularityTitle = (title', endMatches: 'return title' },
    { startMatches: 'const processProfExpertQuote = (quote', endMatches: 'return quote' },
    { startMatches: 'const processProfRecommendation = (text', endMatches: 'return text' },
    { startMatches: 'const processConclusionText1 = (text', endMatches: 'return text' },
    { startMatches: 'const processConclusionVerdict = (text', endMatches: 'return text' },
    { startMatches: 'const replaceKeywordsInText = (text', endMatches: 'return result' },
    { startMatches: 'const getSlotThemes = (slot)', endMatches: 'return []' },
    { startMatches: 'const getSlotBonuses = (slot)', endMatches: 'return slot.slot_bonuses' },
    { startMatches: 'const getSlotThemesFromDB = (slot)', endMatches: '.filter(Boolean)' },
    { startMatches: 'const generateRobotsContent = (slot)', endMatches: 'return directives.join(\', \')' },
    { startMatches: 'const generateHreflangLinks = (slot)', endMatches: 'return links' },
    { startMatches: 'const formatMaxWin = (maxWin)', endMatches: 'return String(num)' },
    { startMatches: 'const formatPaylines = (paylines)', endMatches: 'return String(num)' },
    { startMatches: 'const formatNumber = (num)', endMatches: 'return n.toLocaleString' },
    { startMatches: 'const generateSEODescription = (slot)', endMatches: 'return description' },
    { startMatches: 'const generateOptimizedKeywords = (slot)', endMatches: 'return keywords.join(\', \')' },
    { startMatches: 'const getStructuredData = (slot) => {', endMatches: 'return JSON.stringify(allSchemas)' },
];

let toDelete = new Set();
let i = 0;

while (i < lines.length) {
    let matched = false;
    for (const marker of markers) {
        if (lines[i].includes(marker.startMatches)) {
            // Check containsRequiredStart if defined
            if (marker.containsRequiredStart) {
                let foundRequired = false;
                for (let look = i; look < i + 50 && look < lines.length; look++) {
                    if (lines[look].includes(marker.containsRequiredStart)) {
                        foundRequired = true;
                        break;
                    }
                }
                if (!foundRequired) continue;
            }

            console.log('Found block starting at line ' + (i + 1) + ': ' + marker.startMatches);
            matched = true;
            let start = i;
            let end = i;
            // find the end
            while (end < lines.length) {
                if (lines[end].includes(marker.endMatches)) {
                    // It can be ending block. Let's find the closing brace that might be 1 or 2 lines after.
                    let lookaheadEnd = end;
                    while (lookaheadEnd < end + 5 && lookaheadEnd < lines.length) {
                        if (lines[lookaheadEnd].trim() === '}' || lines[lookaheadEnd].trim() === '})') {
                            end = lookaheadEnd;
                        }
                        lookaheadEnd++;
                    }
                    if (marker.endHasNextLine) {
                        for (let check = end; check < end + 10; check++) {
                            if (lines[check] && lines[check].includes(marker.endHasNextLine)) {
                                end = check;
                                break;
                            }
                        }
                    } else if (marker.isBlockEnd) {
                        while (lines[end].trim() !== '})') end++;
                    } else {
                        while (lines[end].trim() !== '}') end++;
                    }
                    break;
                }
                end++;
            }
            if (end < lines.length) {
                console.log('  -> ends at line ' + (end + 1));
                for (let k = start; k <= end; k++) {
                    toDelete.add(k);
                }
                // delete associated JSDoc comments preceding it
                let lookback = start - 1;
                while (lookback >= 0 && (lines[lookback].trim().startsWith('//') || lines[lookback].trim().startsWith('*') || lines[lookback].trim() === '/**')) {
                    toDelete.add(lookback);
                    lookback--;
                }
                i = end; // Skip processed
            } else {
                console.log('  -> ERROR could not find end for ' + marker.startMatches);
            }
        }
    }
    i++;
}

let newLines = [];
for (let j = 0; j < lines.length; j++) {
    if (!toDelete.has(j)) {
        newLines.push(lines[j]);
    }
}

let newContent = newLines.join('\n');

// Inject imports
const importUseSlotSEO = `import { useSlotSEO } from '~/composables/useSlotSEO'
import {
  formatArticleDate,
  getEffectColorsFor,
  getAwardEffectColors,
  getAwardPublicClasses,
  getAwardBgClasses,
  getAwardIconClasses,
  getAwardTextClasses,
  getSlotIcon,
  getImageFormat,
  getVolatilityText,
  getMaxWin,
  formatReleaseDate,
  getSlotDescription,
  getShortDescription,
  getDetailedDescription,
  getCleanSlotName,
  getSlotNameWithKeyword,
  processCtaSubtitle,
  processConclusionRatingTitle,
  processPopularityTitle,
  processProfExpertQuote,
  processProfRecommendation,
  processConclusionText1,
  processConclusionVerdict,
  replaceKeywordsInText,
  getSlotThemes,
  getSlotBonuses,
  getSlotThemesFromDB,
  formatMaxWin,
  formatPaylines,
  formatNumber
} from '~/utils/slotFormatters'
`;

if (newContent.indexOf('useSlotSEO') === -1) {
    newContent = newContent.replace("import { ref, computed, onMounted, watchEffect } from 'vue'", "import { ref, computed, onMounted, watchEffect } from 'vue'\n" + importUseSlotSEO);
}

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
if (newContent.indexOf('useSlotSEO({') === -1) {
    newContent = newContent.replace("const loadSlot = async () => {", initSeoStr + "const loadSlot = async () => {");
}

fs.writeFileSync(vuePath, newContent, 'utf8');
console.log('Cleanup script executed successfully.');
