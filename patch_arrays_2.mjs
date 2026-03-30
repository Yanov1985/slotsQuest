import fs from 'fs';

let fSlug = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/pages/slots/[slug].vue', 'utf8');

// We simply append to the existing fallbackLangObj inside the file
const targetLangObj = `
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
}`;

const replaceLangObj = `
// We will use existing t() function if available
// Define dynamic multi-language fallbacks
const fallbackLangObj = {
  en: {
    pro1: 'High quality graphics', pro2: 'Exciting bonus rounds', pro3: 'Mobile friendly interface',
    con1: 'High volatility might not suit everyone', con2: 'Bonus game is hard to trigger',
    howTo1: 'Select your bet size', howTo2: 'Use the plus and minus buttons to adjust your total bet amount',
    howTo3: 'Spin the reels', howTo4: 'Click the prominent spin button to start the game',
    howTo5: 'Understand the payouts', howTo6: 'Check the paytable for symbol values and feature rules',
    
    faq1q: 'Is this slot safe to play online?', faq1a: 'Yes, it is developed by a licensed and regulated game provider. All games are tested by independent auditing agencies to ensure fair play.',
    faq2q: 'What is the RTP?', faq2a: 'The Return to Player (RTP) provides a solid theoretical return over time.',
    faq3q: 'Can I play for free?', faq3a: 'Yes! You can play in free demo mode right here on our site. No registration or deposit required.',
    faq4q: 'What is the maximum win?', faq4a: 'The maximum win offers solid winning potential for players.',
    faq5q: 'What is the volatility?', faq5a: 'The volatility rules dictate how often and how much the slot pays out on average.',
    
    rev1: 'is one of my favorite slots! The graphics are stunning and the bonus features keep me coming back.',
    rev2: 'Great slot with solid RTP. The free spins feature is especially exciting. I play it regularly on our site in demo mode before wagering real money.',
    rev3: 'Decent slot from the developer. The max win potential is attractive. Love the theme and sound design. Would recommend trying the demo first.',
    
    htp1: 'Open the Demo', htp1a: 'Click the play button on this page to launch the game in free play mode. No registration or deposit required.',
    htp2: 'Set Your Bet', htp2a: 'Use the controls at the bottom of the game screen to adjust your bet size. Start with the minimum bet to learn the mechanics.',
    htp3: 'Spin the Reels', htp3a: 'Click the Spin button or press Space. Watch for winning combinations across the paylines.',
    htp4: 'Trigger Bonuses', htp4a: 'Land special symbols to activate bonus features like free spins, multipliers, and other rewards. Check the paytable for details.'
  },
  'pt-BR': {
    pro1: 'Gráficos de alta qualidade', pro2: 'Rodadas de bônus emocionantes', pro3: 'Interface amigável para celular',
    con1: 'A alta volatilidade pode não agradar a todos', con2: 'O jogo de bônus é difícil de ativar',
    howTo1: 'Selecione o tamanho da sua aposta', howTo2: 'Use os botões mais e menos para ajustar o valor da aposta',
    howTo3: 'Gire os cilindros', howTo4: 'Clique no botão de giro para iniciar o jogo',
    howTo5: 'Entenda os pagamentos', howTo6: 'Verifique a tabela de pagamentos e regras',
    
    faq1q: 'Este slot é seguro para jogar online?', faq1a: 'Sim, é desenvolvido por um provedor de jogos licenciado. Todos os jogos são testados para garantir jogo justo.',
    faq2q: 'Qual é o RTP?', faq2a: 'O Retorno ao Jogador (RTP) oferece um retorno teórico sólido ao longo do tempo.',
    faq3q: 'Posso jogar de graça?', faq3a: 'Sim! Você pode jogar no modo de demonstração gratuito aqui no nosso site. Sem registro.',
    faq4q: 'Qual é a vitória máxima?', faq4a: 'A vitória máxima oferece um sólido potencial de vitória.',
    faq5q: 'O que é a volatilidade?', faq5a: 'As regras de volatilidade ditam a frequência e a quantidade de pagamentos em média.',
    
    rev1: 'é um dos meus slots favoritos! Os gráficos são impressionantes.',
    rev2: 'Ótimo slot com RTP sólido. O recurso de rodadas grátis é muito emocionante.',
    rev3: 'Slot decente do desenvolvedor. O potencial de ganho máximo é atraente.',
    
    htp1: 'Abra o Demo', htp1a: 'Clique no botão de jogar para abrir o modo grátis. Não requer registro.',
    htp2: 'Defina a Aposta', htp2a: 'Use os controles na parte inferior para ajustar sua aposta.',
    htp3: 'Gire os Cilindros', htp3a: 'Clique em Girar ou pressione Espaço para jogar.',
    htp4: 'Ative Bônus', htp4a: 'Junte símbolos especiais para ativar recursos de bônus.'
  },
  ru: {
    pro1: 'Высококачественная графика', pro2: 'Захватывающие бонусные раунды', pro3: 'Удобный мобильный интерфейс',
    con1: 'Высокая волатильность подходит не всем', con2: 'Бонусную игру сложно активировать',
    howTo1: 'Выберите размер ставки', howTo2: 'Используйте кнопки для управления ставкой',
    howTo3: 'Вращайте барабаны', howTo4: 'Нажмите кнопку спина, чтобы начать',
    howTo5: 'Изучите выплаты', howTo6: 'Проверьте таблицу выплат',
    
    faq1q: 'Безопасно ли играть в этот слот онлайн?', faq1a: 'Да, он разработан лицензированным провайдером. Все игры тестируются на честность.',
    faq2q: 'Какой здесь RTP?', faq2a: 'Отдача игроку (RTP) обеспечивает солидный теоретический возврат.',
    faq3q: 'Можно играть бесплатно?', faq3a: 'Да! Вы можете играть в бесплатном демо-режиме прямо на нашем сайте. Без регистрации.',
    faq4q: 'Какой максимальный выигрыш?', faq4a: 'Максимальный множитель дает отличный потенциал выигрыша.',
    faq5q: 'Что такое волатильность?', faq5a: 'Волатильность определяет частоту и размер выплат.',
    
    rev1: 'один из моих любимых слотов! Графика потрясающая, а бонусы просто супер.',
    rev2: 'Отличный слот с высоким RTP. Часто играю в демо перед игрой на деньги.',
    rev3: 'Достойный релиз от провайдера. Потенциал макс. выигрыша привлекает. Советую попробовать!',
    
    htp1: 'Откройте Демо', htp1a: 'Нажмите кнопку играть на этой странице, чтобы запустить бесплатный режим. Регистрация не нужна.',
    htp2: 'Сделайте Ставку', htp2a: 'Используйте кнопки внизу экрана, чтобы выбрать размер ставки.',
    htp3: 'Вращайте Барабаны', htp3a: 'Нажмите Спин или Пробел для запуска раунда.',
    htp4: 'Ловите Бонусы', htp4a: 'Соберите специальные символы, чтобы запустить фриспины и множители.'
  },
  tr: {
    pro1: 'Yüksek kaliteli grafikler', pro2: 'Heyecan verici bonus turları', pro3: 'Mobil uyumlu arayüz',
    con1: 'Yüksek oynaklık herkese uygun olmayabilir', con2: 'Bonus oyununu tetiklemek zordur',
    howTo1: 'Bahis boyutunuzu seçin', howTo2: 'Toplam bahis miktarınızı ayarlamak için kullanın',
    howTo3: 'Makaraları döndürün', howTo4: 'Oyunu başlatmak için tıklayın',
    howTo5: 'Ödemeleri anlayın', howTo6: 'Ödeme tablosunu kontrol edin',
    
    faq1q: 'Bu slotu oynamak güvenli mi?', faq1a: 'Evet, lisanslı ve düzenlenmiş bir sağlayıcı tarafından geliştirilmiştir.',
    faq2q: 'RTP nedir?', faq2a: 'Oyuncuya Dönüş (RTP), zaman içinde sağlam bir teorik getiri sağlar.',
    faq3q: 'Ücretsiz oynayabilir miyim?', faq3a: 'Evet! Sitemizde ücretsiz demo modunda oynayabilirsiniz. Kayıt gerekmez.',
    faq4q: 'Maksimum kazanç nedir?', faq4a: 'Maksimum kazanç, oyuncular için sağlam kazanma potansiyeli sunar.',
    faq5q: 'Oynaklık nedir?', faq5a: 'Oynaklık kuralları, slotun ne sıklıkla ödeme yaptığını yönetir.',
    
    rev1: 'en sevdiğim slotlardan biri! Grafikler çarpıcı.',
    rev2: 'Sağlam RTP değeri. Bedava döndürme özelliği çok heyecan verici.',
    rev3: 'Sağlayıcıdan iyi bir slot. Temayı ve tasarımı seviyorum.',
    
    htp1: 'Demoyu Aç', htp1a: 'Oyunu ücretsiz oynamak için düğmeye tıklayın. Kayıt gerekmez.',
    htp2: 'Bahis Ayarla', htp2a: 'Bahis boyutunuzu ayarlamak için alt kısımdaki kontrolleri kullanın.',
    htp3: 'Döndür', htp3a: 'Başlamak için Döndür düğmesine tıklayın veya Boşluk tuşuna basın.',
    htp4: 'Bonus Tetikle', htp4a: 'Tetiklemek için özel sembolleri bulun.'
  },
  de: {
    pro1: 'Hochwertige Grafik', pro2: 'Spannende Bonusrunden', pro3: 'Mobilfreundliche Schnittstelle',
    con1: 'Hohe Volatilität ist möglicherweise nicht für jeden geeignet', con2: 'Bonusspiel ist schwer auszulösen',
    howTo1: 'Wählen Sie Ihren Einsatz', howTo2: 'Verwenden Sie die Tasten',
    howTo3: 'Drehen Sie die Walzen', howTo4: 'Klicken Sie auf den Button',
    howTo5: 'Auszahlungen verstehen', howTo6: 'Überprüfen Sie die Auszahlungstabelle',
    faq1q: 'Ist dieser Slot sicher?', faq1a: 'Ja, es wurde von einem lizenzierten Anbieter entwickelt.',
    faq2q: 'Was ist der RTP?', faq2a: 'Der Return to Player (RTP) bietet eine gute theoretische Rendite.',
    faq3q: 'Kann ich kostenlos spielen?', faq3a: 'Ja! Sie können bei uns im Demo-Modus spielen. Ohne Anmeldung.',
    faq4q: 'Was ist der Höchstgewinn?', faq4a: 'Der Höchstgewinn bietet großartiges Gewinnpotenzial.',
    faq5q: 'Was ist die Volatilität?', faq5a: 'Die Volatilität bestimmt, wie oft der Slot durchschnittlich auszahlt.',
    rev1: 'ist einer meiner Lieblingsslots! Die Grafik ist atemberaubend.',
    rev2: 'Toller Slot mit solidem RTP. Bevor ich um echtes Geld spiele.',
    rev3: 'Guter Slot, das Design ist großartig. Unbedingt die Demo ausprobieren!',
    htp1: 'Demo öffnen', htp1a: 'Klicken Sie auf den Play-Button.',
    htp2: 'Einsatz festlegen', htp2a: 'Passen Sie Ihren Einsatz an.',
    htp3: 'Walzen drehen', htp3a: 'Klicken Sie auf Drehen.',
    htp4: 'Bonus aktivieren', htp4a: 'Sammeln Sie Spezialsymbole.'
  }
}`;

fSlug = fSlug.replace(targetLangObj, replaceLangObj);

// Now patch computedFaq entirely
const faqTarget = /const computedFaq = computed\(\(\) => {[\s\S]*?}\)/;
const faqReplace = `const computedFaq = computed(() => {
  if (gameSlot.value.info_faq) {
    try { return JSON.parse(gameSlot.value.info_faq) } catch(e) { }
  }
  return [
    { question: tf('faq1q'), answer: tf('faq1a') },
    { question: tf('faq2q'), answer: tf('faq2a') },
    { question: tf('faq3q'), answer: tf('faq3a') },
    { question: tf('faq4q'), answer: tf('faq4a') },
    { question: tf('faq5q'), answer: tf('faq5a') }
  ]
})`;
fSlug = fSlug.replace(faqTarget, faqReplace);

// Now patch computedReviews entirely
const revTarget = /const computedReviews = computed\(\(\) => {[\s\S]*?}\)/;
const revReplace = `const computedReviews = computed(() => {
  if (gameSlot.value.info_reviews) {
    try { return JSON.parse(gameSlot.value.info_reviews) } catch(e) { }
  }
  const name = gameSlot.value.name || 'Slot'
  return [
    { author: 'Alex R.', rating: 5, text: name + ' ' + tf('rev1'), date: '2024-12-15' },
    { author: 'Maria K.', rating: 4, text: tf('rev2'), date: '2024-11-28' },
    { author: 'James T.', rating: 4, text: tf('rev3'), date: '2024-10-10' }
  ]
})`;
fSlug = fSlug.replace(revTarget, revReplace);


// Now patch computedHowToPlay entirely
const htpTarget = /const computedHowToPlay = computed\(\(\) => {[\s\S]*?}\)/;
const htpReplace = `const computedHowToPlay = computed(() => {
  if (gameSlot.value.info_how_to_play) {
    try { return JSON.parse(gameSlot.value.info_how_to_play) } catch(e) { }
  }
  return [
    { step: tf('htp1'), text: tf('htp1a') },
    { step: tf('htp2'), text: tf('htp2a') },
    { step: tf('htp3'), text: tf('htp3a') },
    { step: tf('htp4'), text: tf('htp4a') }
  ]
})`;
fSlug = fSlug.replace(htpTarget, htpReplace);

fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/pages/slots/[slug].vue', fSlug);
console.log('Successfully repatched all remaining fallback arrays in [slug].vue!');
