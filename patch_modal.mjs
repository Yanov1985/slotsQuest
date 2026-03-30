import fs from 'fs';

let fModal = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue', 'utf8');

// 1. Inject the new translation fields into the translations object
const injectTranslations = () => {
  fModal = fModal.replace(
    /expertVerdict: 'Expert Verdict',/g,
    `expertVerdict: 'Expert Verdict',
    devFallback: 'the developer',
    isA: 'is a',
    volSlot: '-volatility slot with an RTP of',
    andMaxWin: 'and a maximum win of',
    aboveRTP: 'The above-average RTP makes it a solid choice for long sessions.',
    belowRTP: 'It delivers a balanced gaming experience suitable for most players.',
    overallRate: 'Overall, we rate it',
    forIts: '/5 for its',
    highPot: 'thrilling high-reward potential.',
    balPot: 'balanced gameplay and consistent payouts.',`
  );

  fModal = fModal.replace(
    /expertVerdict: 'Veredito do Especialista',/g,
    `expertVerdict: 'Veredito do Especialista',
    devFallback: 'o desenvolvedor',
    isA: 'é um slot de',
    volSlot: 'volatilidade com um RTP de',
    andMaxWin: 'e um ganho máximo de',
    aboveRTP: 'O RTP acima da média o torna uma escolha sólida para sessões longas.',
    belowRTP: 'Oferece uma experiência de jogo equilibrada, adequada para a maioria dos jogadores.',
    overallRate: 'No geral, avaliamos',
    forIts: '/5 por seu',
    highPot: 'alto potencial de recompensa emocionante.',
    balPot: 'jogabilidade equilibrada e pagamentos consistentes.',`
  );

  fModal = fModal.replace(
    /expertVerdict: 'Вердикт эксперта',/g,
    `expertVerdict: 'Вердикт эксперта',
    devFallback: 'разработчиком',
    isA: 'это слот с',
    volSlot: 'волатильностью и RTP',
    andMaxWin: 'а также максимальным выигрышем',
    aboveRTP: 'РТП выше среднего делает его отличным выбором для долгих сессий.',
    belowRTP: 'Он обеспечивает сбалансированный игровой процесс, подходящий для большинства игроков.',
    overallRate: 'В целом мы оцениваем его на',
    forIts: '/5 за его',
    highPot: 'захватывающий потенциал высоких выплат.',
    balPot: 'сбалансированный геймплей и стабильные выплаты.',`
  );
  
  fModal = fModal.replace(
    /expertVerdict: 'Uzman Görüşü',/g,
    `expertVerdict: 'Uzman Görüşü',
    devFallback: 'geliştirici',
    isA: 'bir',
    volSlot: 'oynaklık slotudur; RTP oranı',
    andMaxWin: 've maksimum kazancı',
    aboveRTP: 'Ortalamanın üzerindeki RTP, onu uzun seanslar için sağlam bir seçim haline getirir.',
    belowRTP: 'Çoğu oyuncu için uygun dengeli bir oyun deneyimi sunar.',
    overallRate: 'Genel olarak, ona',
    forIts: '/5 veriyoruz; nedeni',
    highPot: 'heyecan verici yüksek ödül potansiyeli.',
    balPot: 'dengeli oynanış ve tutarlı ödemeler.',`
  );

  fModal = fModal.replace(
    /expertVerdict: 'Expertenurteil',/g,
    `expertVerdict: 'Expertenurteil',
    devFallback: 'der Entwickler',
    isA: 'ist ein',
    volSlot: '-Volatilitäts-Slot mit einem RTP von',
    andMaxWin: 'und einem maximalen Gewinn von',
    aboveRTP: 'Der überdurchschnittliche RTP macht es zu einer soliden Wahl für lange Sitzungen.',
    belowRTP: 'Es bietet ein ausgewogenes Spielerlebnis, das für die meisten Spieler geeignet ist.',
    overallRate: 'Insgesamt bewerten wir es mit',
    forIts: '/5 für sein',
    highPot: 'aufregendes Potenzial für hohe Belohnungen.',
    balPot: 'ausgewogenes Gameplay und beständige Auszahlungen.',`
  );
};

injectTranslations();

// 2. Replace the HTML fallback text
const targetHTML = `              <p v-else>
                {{ slotData.name }} by {{ slotData.providers?.name || 'the developer' }} is a {{ getVolatilityText(slotData.volatility).toLowerCase() }}-volatility slot with an RTP of {{ slotData.rtp || '96.0' }}% and a maximum win of {{ formatMaxWin(slotData.max_win) }}x.
                {{ slotData.rtp >= 96.5 ? 'The above-average RTP makes it a solid choice for long sessions.' : 'It delivers a balanced gaming experience suitable for most players.' }}
                Overall, we rate it {{ slotData.rating || 4.5 }}/5 for its {{ slotData.volatility?.toLowerCase() === 'high' ? 'thrilling high-reward potential' : 'balanced gameplay and consistent payouts' }}.
              </p>`;

const newHTML = `              <p v-else>
                {{ slotData.name }} ({{ slotData.providers?.name || t('devFallback') }}) {{ t('isA') }} {{ getVolatilityText(slotData.volatility).toLowerCase() }} {{ t('volSlot') }} {{ slotData.rtp || '96.0' }}% {{ t('andMaxWin') }} {{ formatMaxWin(slotData.max_win) }}x.
                {{ slotData.rtp >= 96.5 ? t('aboveRTP') : t('belowRTP') }}
                {{ t('overallRate') }} {{ slotData.rating || 4.5 }} {{ t('forIts') }} {{ slotData.volatility?.toLowerCase() === 'high' ? t('highPot') : t('balPot') }}
              </p>`;

fModal = fModal.split(targetHTML.replace(/\r\n/g, '\n')).join(newHTML);
fModal = fModal.split(targetHTML).join(newHTML);

fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue', fModal);
console.log('Successfully patched SlotInfoModal.vue fallback text!');
