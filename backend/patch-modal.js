const fs = require('fs');
const path = require('path');

const modalPath = path.resolve(__dirname, '../frontend/components/slots/SlotInfoModal.vue');
let content = fs.readFileSync(modalPath, 'utf8');

// 1. Add the translations dictionary block right after <script setup> inside the file
const translationBlock = `
const { locale } = useI18n()

// Local Translations for Modal Headers
const translations = {
  en: {
    expertVerdict: 'Expert Verdict',
    prosCons: 'Pros & Cons',
    pros: 'Pros',
    cons: 'Cons',
    faq: 'Frequently Asked Questions',
    reviewAnalysis: 'Review & Analysis',
    howToPlay: 'How to Play',
    similarSlots: 'Similar Slots You May Like',
    freePlayDemo: 'Free Play or Demo'
  },
  'pt-BR': {
    expertVerdict: 'Veredito do Especialista',
    prosCons: 'Prós e Contras',
    pros: 'Prós',
    cons: 'Contras',
    faq: 'Perguntas Frequentes',
    reviewAnalysis: 'Análise e Avaliação',
    howToPlay: 'Como Jogar',
    similarSlots: 'Slots Semelhantes',
    freePlayDemo: 'Jogo Grátis ou Demo'
  },
  ru: {
    expertVerdict: 'Вердикт эксперта',
    prosCons: 'Плюсы и минусы',
    pros: 'Плюсы',
    cons: 'Минусы',
    faq: 'Часто задаваемые вопросы',
    reviewAnalysis: 'Обзор и аналитика',
    howToPlay: 'Как играть в',
    similarSlots: 'Похожие слоты',
    freePlayDemo: 'Бесплатная игра (Демо)'
  },
  tr: {
    expertVerdict: 'Uzman Görüşü',
    prosCons: 'Artılar ve Eksiler',
    pros: 'Artılar',
    cons: 'Eksiler',
    faq: 'Sıkça Sorulan Sorular',
    reviewAnalysis: 'İnceleme ve Analiz',
    howToPlay: 'Nasıl Oynanır:',
    similarSlots: 'Beğenebileceğiniz Benzer Slotlar',
    freePlayDemo: 'Ücretsiz Oyna veya Demo'
  },
  de: {
    expertVerdict: 'Expertenurteil',
    prosCons: 'Vor- und Nachteile',
    pros: 'Vorteile',
    cons: 'Nachteile',
    faq: 'Häufig gestellte Fragen',
    reviewAnalysis: 'Überprüfung & Analyse',
    howToPlay: 'Spielanleitung',
    similarSlots: 'Ähnliche Slots, die Ihnen gefallen könnten',
    freePlayDemo: 'Kostenloses Spiel oder Demo'
  }
}
translations['en-IN'] = translations.en

const t = (key) => {
  const lang = translations[locale?.value] || translations.en
  return lang[key] || translations.en[key] || key
}
`;

// Insert the translations right after: import { getVolatilityText, formatMaxWin } from '~/utils/slotFormatters'
content = content.replace(
  /import \{ getVolatilityText, formatMaxWin \} from '~\/utils\/slotFormatters'/,
  "import { getVolatilityText, formatMaxWin } from '~/utils/slotFormatters'\n" + translationBlock
);

// We must also ensure useI18n is imported if not already there, but nuxt auto-imports useI18n

// 2. Perform string replacements in the template

// Expert Verdict
content = content.replace(/Expert Verdict\s*<\/h3>/g, "{{ t('expertVerdict') }}\n            </h3>");

// Pros & Cons
content = content.replace(/Pros & Cons\s*<\/h3>/g, "{{ t('prosCons') }}\n            </h3>");

// Pros (Header inside pros box)
content = content.replace(/ \/> Pros\s*<\/h3>/g, " /> {{ t('pros') }}\n                </h3>");

// Cons (Header inside cons box)
content = content.replace(/ \/> Cons\s*<\/h3>/g, " /> {{ t('cons') }}\n                </h3>");

// FAQ
content = content.replace(/Frequently Asked Questions\s*<\/h2>/g, "{{ t('faq') }}\n            </h2>");

// Review & Analysis
content = content.replace(/\{\{ slotData\.name \}\} Review & Analysis\s*<\/h2>/g, "{{ slotData.name }} {{ t('reviewAnalysis') }}\n            </h2>");

// How to Play
content = content.replace(/How to Play \{\{ slotData\.name \}\}\s*<\/h2>/g, "{{ t('howToPlay') }} {{ slotData.name }}\n            </h2>");

// Similar Slots
content = content.replace(/Similar Slots You May Like\s*<\/h2>/g, "{{ t('similarSlots') }}\n            </h2>");

// Free Play or Demo
content = content.replace(/Free Play or Demo\s*<\/h2>/g, "{{ t('freePlayDemo') }}\n            </h2>");

fs.writeFileSync(modalPath, content, 'utf8');

console.log("Successfully patched SlotInfoModal.vue with i18n logic!");
