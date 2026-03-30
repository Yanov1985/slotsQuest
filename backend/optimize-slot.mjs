const SLOT_ID = 'cmeocg6bd0001u5do1jpoas43';
const API_URL = 'http://127.0.0.1:3001/api/slots';

async function optimizeGatesOfOlympus() {
  console.log('🚀 Starting SEMrush SEO Injection for The Gates of Olympus...');

  const localizations = {
    "en": {
      "seo_title": "Gates of Olympus Slot ᐈ RTP 96.5% & Max Win 5000x | Play Free Demo",
      "seo_description": "Spin the Gates of Olympus slot by Pragmatic Play. Trigger multiplier orbs up to 500x and win up to 5,000x your bet! Play the free demo without registration.",
      "seo_h1": "Play Gates of Olympus Slot",
      "seo_keywords_primary": "gates of olympus slot, play gates of olympus, gates of olympus demo",
      "seo_keywords_lsi": "pragmatic play slots, zeus slot game, tumble feature, buy free spins",
      "seo_keywords_geo": "usa, uk, global",
      "overview_keyword_1": "Zeus slot mechanics",
      "overview_description_1": "The core of the [keyword_1] relies on the tumbling reels feature, creating chained wins on a 6x5 grid.",
      "overview_keyword_2": "Multiplier orbs",
      "overview_description_2": "Watch out for Zeus to randomly hurl [keyword_2] onto the grid, boosting your wins up to 500x."
    },
    "ru": {
      "seo_title": "Играть в Слот Gates of Olympus ᐈ RTP 96.5% (На Зевса) | Демо и Отзывы",
      "seo_description": "Запускайте легендарный игровой автомат Gates of Olympus от Pragmatic Play. Ловите множители х500 от Зевса и выигрывайте до 5000:1! Крутите демо без регистрации.",
      "seo_h1": "Игровой Автомат Gates of Olympus (Врата Олимпа)",
      "seo_keywords_primary": "gates of olympus играть, слот врата олимпа, слот дед зевс, gates of olympus демо",
      "seo_keywords_lsi": "покупка бонуски, pragmatic play аппараты, бонусы зевса",
      "seo_keywords_geo": "россия, снг, казахстан",
      "overview_keyword_1": "множители от Зевса",
      "overview_description_1": "Главная фишка игры — это [keyword_1], которые случайным образом падают на барабаны и могут увеличить выигрыш в 500 раз.",
      "overview_keyword_2": "каскадные выигрыши",
      "overview_description_2": "Благодаря механике [keyword_2], сыгравшие символы исчезают, а на их место падают новые."
    },
    "pt-BR": {
      "seo_title": "Jogo do Veio do Raio: Gates of Olympus ᐈ RTP 96.5% | Demo Grátis",
      "seo_description": "O famoso Jogo do Veio do Raio! Jogue Gates of Olympus da Pragmatic Play, acione multiplicadores de até 500x e descubra como ganhar no demo oficial.",
      "seo_h1": "Gates of Olympus (Jogo do Veio do Raio)",
      "seo_keywords_primary": "jogo do veio do raio, gates of olympus demo, jogar gates of olympus, slot do zeus",
      "seo_keywords_lsi": "comprar rodadas grátis, multiplicador deus grego, pragmatic play brasil",
      "seo_keywords_geo": "brasil, portugal",
      "overview_keyword_1": "Jogo do Veio do Raio",
      "overview_description_1": "Conhecido no Brasil como o [keyword_1], este slot oferece volatilidade altíssima e pagamentos por símbolos em qualquer lugar.",
      "overview_keyword_2": "multiplicadores 500x",
      "overview_description_2": "Fique de olho no Zeus no canto da tela, ele lança [keyword_2] que explodem seus ganhos."
    },
    "tr": {
      "seo_title": "Gates of Olympus Oyna ᐈ RTP %96.5 | Bedava Demo (Dede Oyunu)",
      "seo_description": "Efsanevi Dede oyunu Gates of Olympus slotunu bedava oyna! Pragmatic Play'den 5000x maks kazanç potansiyeli ve 500x çarpan küreleri. Taktikleri keşfet.",
      "seo_h1": "Gates of Olympus Slot Oyunu",
      "seo_keywords_primary": "gates of olympus taktik, gates of olympus oyna, dede slot, pragmatic play dede",
      "seo_keywords_lsi": "freespin satın al, çarpanlar, deneme bonusu",
      "seo_keywords_geo": "türkiye",
      "overview_keyword_1": "Dede Slot Oyunu",
      "overview_description_1": "Türkiye'de [keyword_1] olarak bilinen bu fenomen slot, herhangi bir çizgide ödeme yapan Tumble sistemiyle çalışır.",
      "overview_keyword_2": "500x çarpanları",
      "overview_description_2": "Zeus'un asasını kaldırıp ekrana fırlattığı [keyword_2] ile rekor kazançlar elde edin."
    }
  };

  try {
    // 1. Fetch current slot data first
    const slotRes = await fetch(`${API_URL}/${SLOT_ID}`);
    const slot = await slotRes.json();
    
    // Merge localizations
    const updatedLocalizations = {
      ...slot.localizations,
      ...localizations
    };

    // 2. Perform PUT request with merged data
    const updateRes = await fetch(`${API_URL}/${SLOT_ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        localizations: updatedLocalizations
      })
    });

    if (updateRes.ok) {
      console.log('✅ SEMrush Optimization successfully injected!');
    } else {
      console.error('❌ Update failed:', await updateRes.text());
    }
  } catch (error) {
    console.error('❌ Script crashed:', error);
  }
}

optimizeGatesOfOlympus();
