import fs from 'fs';

let fSlug = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/pages/slots/[slug].vue', 'utf8');

const tHelper = `
// We will use existing t() function if available
// Define dynamic multi-language fallbacks
const fallbackLangObj = {
  en: {
    pro1: 'High quality graphics', pro2: 'Exciting bonus rounds', pro3: 'Mobile friendly interface',
    con1: 'High volatility might not suit everyone', con2: 'Bonus game is hard to trigger',
    howTo1: 'Select your bet size', howTo2: 'Use the plus and minus buttons to adjust your total bet amount',
    howTo3: 'Spin the reels', howTo4: 'Click the prominent spin button to start the game',
    howTo5: 'Understand the payouts', howTo6: 'Check the paytable for symbol values and feature rules'
  },
  'pt-BR': {
    pro1: 'Gráficos de alta qualidade', pro2: 'Rodadas de bônus emocionantes', pro3: 'Interface amigável para celular',
    con1: 'A alta volatilidade pode não agradar a todos', con2: 'O jogo de bônus é difícil de ativar',
    howTo1: 'Selecione o tamanho da sua aposta', howTo2: 'Use os botões mais e menos para ajustar o valor total da aposta',
    howTo3: 'Gire os cilindros', howTo4: 'Clique no botão de giro para iniciar o jogo',
    howTo5: 'Entenda os pagamentos', howTo6: 'Verifique a tabela de pagamentos para valores de símbolos e regras'
  },
  ru: {
    pro1: 'Высококачественная графика', pro2: 'Захватывающие бонусные раунды', pro3: 'Удобный мобильный интерфейс',
    con1: 'Высокая волатильность подходит не всем', con2: 'Бонусную игру сложно активировать',
    howTo1: 'Выберите размер ставки', howTo2: 'Используйте кнопки плюс и минус для управления ставкой',
    howTo3: 'Вращайте барабаны', howTo4: 'Нажмите центральную кнопку спина, чтобы начать игру',
    howTo5: 'Изучите выплаты', howTo6: 'Проверьте таблицу выплат для каждого символа и правила функций'
  },
  tr: {
    pro1: 'Yüksek kaliteli grafikler', pro2: 'Heyecan verici bonus turları', pro3: 'Mobil uyumlu arayüz',
    con1: 'Yüksek oynaklık herkese uygun olmayabilir', con2: 'Bonus oyununu tetiklemek zordur',
    howTo1: 'Bahis boyutunuzu seçin', howTo2: 'Toplam bahis miktarınızı ayarlamak için artı ve eksi düğmelerini kullanın',
    howTo3: 'Makaraları döndürün', howTo4: 'Oyunu başlatmak için belirgin döndürme düğmesine tıklayın',
    howTo5: 'Ödemeleri anlayın', howTo6: 'Sembol değerleri ve özellik kuralları için ödeme tablosunu kontrol edin'
  },
  de: {
    pro1: 'Hochwertige Grafik', pro2: 'Spannende Bonusrunden', pro3: 'Mobilfreundliche Schnittstelle',
    con1: 'Hohe Volatilität ist möglicherweise nicht für jeden geeignet', con2: 'Bonusspiel ist schwer auszulösen',
    howTo1: 'Wählen Sie Ihren Einsatz', howTo2: 'Verwenden Sie die Plus- und Minustasten, um Ihren Gesamteinsatz anzupassen',
    howTo3: 'Drehen Sie die Walzen', howTo4: 'Klicken Sie auf den großen Dreh-Button, um das Spiel zu starten',
    howTo5: 'Verstehen Sie die Auszahlungen', howTo6: 'Überprüfen Sie die Auszahlungstabelle für Symbolwerte und Feature-Regeln'
  }
}
const tf = (key) => {
  const lang = fallbackLangObj[locale?.value] || fallbackLangObj.en;
  return lang[key] || fallbackLangObj.en[key];
}
`;

// Insert the t helper after useI18n
fSlug = fSlug.replace(/const { locale } = useI18n\(\)/, "const { locale } = useI18n()\n" + tHelper);

// Replace computedPros
const prosTarget = `return ['High quality graphics', 'Exciting bonus rounds', 'Mobile friendly interface']`;
const prosReplace = `return [tf('pro1'), tf('pro2'), tf('pro3')]`;
fSlug = fSlug.replace(prosTarget, prosReplace);

// Replace computedCons
const consTarget = `return ['High volatility might not suit everyone', 'Bonus game is hard to trigger']`;
const consReplace = `return [tf('con1'), tf('con2')]`;
fSlug = fSlug.replace(consTarget, consReplace);

// Replace computedHowTo
const howToTarget = `return [
    { step: 'Select your bet size', text: 'Use the plus and minus buttons to adjust your total bet amount' },
    { step: 'Spin the reels', text: 'Click the prominent spin button to start the game' },
    { step: 'Understand the payouts', text: 'Check the paytable for symbol values and feature rules' }
  ]`;
const howToReplace = `return [
    { step: tf('howTo1'), text: tf('howTo2') },
    { step: tf('howTo3'), text: tf('howTo4') },
    { step: tf('howTo5'), text: tf('howTo6') }
  ]`;
// Need to match exactly or regex it safely
fSlug = fSlug.replace(/return \[\s*{\s*step:\s*'Select your bet size'[\s\S]*?}\s*\]/m, howToReplace);

// Make sure reviews also look somewhat localized, though reviews fallback is quite complex (mock users).
// The user might be complaining about Pros, Cons, and HowTo!

fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/pages/slots/[slug].vue', fSlug);
console.log('Successfully patched [slug].vue arrays!');
