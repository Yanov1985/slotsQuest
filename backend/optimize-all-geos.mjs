const SLOT_ID = 'cmeocg6bd0001u5do1jpoas43';
const API_URL = 'http://127.0.0.1:3001/api/slots';

async function optimizeAll18Geos() {
  console.log('🌍 Pushing Elite SEMrush SEO Payload for 18 GEOs...');

  const localizations = {
    "en": {
      "seo_title": "Gates of Olympus Slot ᐈ RTP 96.5% & Max Win 5000x | Play Free Demo",
      "seo_description": "Spin the Gates of Olympus slot by Pragmatic Play. Trigger multiplier orbs up to 500x and win up to 5,000x your bet! Play the free demo without registration.",
      "seo_h1": "Play Gates of Olympus Slot",
      "seo_keywords_primary": "gates of olympus slot, play gates of olympus, gates of olympus demo",
      "seo_keywords_lsi": "pragmatic play slots, zeus slot game, tumble feature",
      "overview_keyword_1": "Zeus slot mechanics",
      "seo_keywords_geo": "global, uk, english"
    },
    "pt-BR": {
      "seo_title": "Jogo do Veio do Raio: Gates of Olympus ᐈ RTP 96.5% | Demo Grátis",
      "seo_description": "O famoso Jogo do Veio do Raio! Jogue Gates of Olympus da Pragmatic Play, acione multiplicadores de até 500x e descubra como ganhar no demo oficial.",
      "seo_h1": "Gates of Olympus (Jogo do Veio do Raio)",
      "seo_keywords_primary": "jogo do veio do raio, gates of olympus demo, jogar gates of olympus",
      "seo_keywords_lsi": "comprar rodadas grátis, multiplicador deus grego",
      "overview_keyword_1": "Jogo do Veio do Raio",
      "seo_keywords_geo": "brasil, pt-br"
    },
    "tr": {
      "seo_title": "Gates of Olympus Oyna ᐈ RTP %96.5 | Bedava Demo (Dede Oyunu)",
      "seo_description": "Efsanevi Dede oyunu Gates of Olympus slotunu bedava oyna! Pragmatic Play'den 5000x maks kazanç potansiyeli ve 500x çarpan küreleri. Taktikleri keşfet.",
      "seo_h1": "Gates of Olympus Slot Oyunu",
      "seo_keywords_primary": "gates of olympus taktik, gates of olympus oyna, dede slot",
      "seo_keywords_lsi": "freespin satın al, çarpanlar, deneme bonusu",
      "overview_keyword_1": "Dede Slot Oyunu",
      "seo_keywords_geo": "türkiye, tr"
    },
    "de": {
      "seo_title": "Gates of Olympus Slot Kostenlos Spielen ᐈ RTP 96.5% | Demo",
      "seo_description": "Spielen Sie die Gates of Olympus Demo kostenlos. Entdecken Sie Multiplikatoren bis zu 500x im beliebten Zeus-Slot von Pragmatic Play.",
      "seo_h1": "Gates of Olympus Spielautomat",
      "seo_keywords_primary": "gates of olympus kostenlos spielen, gates of olympus echtgeld, zeus slot",
      "seo_keywords_lsi": "pragmatic play spielautomaten, freispiele kaufen",
      "overview_keyword_1": "Zeus Spielautomat",
      "seo_keywords_geo": "deutschland, de"
    },
    "es": {
      "seo_title": "Jugar Gates of Olympus Gratis ᐈ RTP 96.5% | Slot Demo",
      "seo_description": "Prueba la tragamonedas Gates of Olympus de Pragmatic Play. Disfruta de la caída de símbolos y multiplicadores gigantes x500 en la versión demo oficial.",
      "seo_h1": "Tragamonedas Gates of Olympus",
      "seo_keywords_primary": "jugar gates of olympus gratis, tragamonedas gates of olympus, demo gates of olympus",
      "seo_keywords_lsi": "tragamonedas de zeus, comprar giros gratis",
      "overview_keyword_1": "Tragamonedas de Zeus",
      "seo_keywords_geo": "españa, es"
    },
    "ru": {
      "seo_title": "Играть в Слот Gates of Olympus ᐈ RTP 96.5% (На Зевса) | Демо",
      "seo_description": "Запускайте игровой автомат Gates of Olympus. Ловите множители х500 от Зевса и выигрывайте х5000! Крутите демо без регистрации.",
      "seo_h1": "Игровой Автомат Gates of Olympus",
      "seo_keywords_primary": "gates of olympus играть, слот дед зевс, врата олимпа слот",
      "seo_keywords_lsi": "покупка бонуски, pragmatic play аппараты",
      "overview_keyword_1": "множители от Зевса",
      "seo_keywords_geo": "россия, ru"
    },
    "hi": {
      "seo_title": "गेट्स ऑफ ओलंपस स्लॉट ᐈ मुफ़्त डेमो खेलें | Pragmatic Play",
      "seo_description": "भारत में गेट्स ऑफ ओलंपस (Gates of Olympus) स्लॉट मुफ़्त में खेलें। 500x ज़ीउस गुणक और 5000x जीतने के तरीके।",
      "seo_h1": "गेट्स ऑफ ओलंपस स्लॉट गेम",
      "seo_keywords_primary": "gates of olympus slot hindi, gates of olympus demo, gates of olympus game",
      "seo_keywords_lsi": "casino games in hindi, pragmatic play slots",
      "overview_keyword_1": "ज़ीउस 슬롯",
      "seo_keywords_geo": "india, hindi"
    },
    "uz": {
      "seo_title": "Gates of Olympus Slot O'ynash ᐈ RTP 96.5% | Bepul Demo",
      "seo_description": "Gates of Olympus slotini bepul o'ynang. Pragmatic Play tomonidan yaratilgan Zeus o'yinida 5000x yutuqni qo'lga kiriting.",
      "seo_h1": "Gates of Olympus Sloti",
      "seo_keywords_primary": "gates of olympus o'ynash, gates of olympus demo, gates of olympus skachat",
      "seo_keywords_lsi": "pul yutish kazino, o'zbekiston kazino o'yinlari",
      "overview_keyword_1": "yutuqni qanday yutish",
      "seo_keywords_geo": "uzbekistan, uz"
    },
    "az": {
      "seo_title": "Gates of Olympus Oyna ᐈ RTP 96.5% | Pulsuz Demo Slot",
      "seo_description": "Gates of Olympus slot maşınını pulsuz sınaqdan keçirin. Zevs oyununda 500x çarpanları tutaraq böyük qazanın.",
      "seo_h1": "Gates of Olympus Slot Oyunu",
      "seo_keywords_primary": "gates of olympus oyna, gates of olympus azerbaycan, pulsuz slot",
      "seo_keywords_lsi": "pragmatic play az, zeus kazino",
      "overview_keyword_1": "kazino slotları",
      "seo_keywords_geo": "azerbaycan, az"
    },
    "es-CL": {
      "seo_title": "Tragamonedas Gates of Olympus Chile ᐈ Juega Gratis Demo",
      "seo_description": "Juega Gates of Olympus en Chile y disfruta de multiplicadores x500 en pesos chilenos. Demostración oficial de Pragmatic Play.",
      "seo_h1": "Gates of Olympus Casino Chile",
      "seo_keywords_primary": "gates of olympus chile, casino online chile, tragamonedas gratis",
      "seo_keywords_lsi": "juegos de casino chile, bono sin deposito chile",
      "overview_keyword_1": "mejores tragamonedas chile",
      "seo_keywords_geo": "chile, cl"
    },
    "es-AR": {
      "seo_title": "Gates of Olympus Argentina ᐈ RTP 96.5% | Tragamonedas Demo",
      "seo_description": "Jugá la versión demo gratis de Gates of Olympus en Argentina. Trucos para activar multiplicadores de Zeus de hasta x500.",
      "seo_h1": "Jugar Gates of Olympus en Argentina",
      "seo_keywords_primary": "gates of olympus argentina, casino online arg, tragamonedas zeus arg",
      "seo_keywords_lsi": "jugar con pesos argentinos, pragmatic play argentina",
      "overview_keyword_1": "multiplicador divino zéus",
      "seo_keywords_geo": "argentina, ar"
    },
    "en-CA": {
      "seo_title": "Gates of Olympus Slot Canada ᐈ Play Demo | RTP 96.5%",
      "seo_description": "Play Gates of Olympus slot free demo in Canada. Discover Zeus mechanics, 5000x Max Win and CAD casino bonuses.",
      "seo_h1": "Play Gates of Olympus in Canada",
      "seo_keywords_primary": "gates of olympus canada, play gates of olympus cad, zeus slot canada",
      "seo_keywords_lsi": "pragmatic slots canada, tumble wins canada",
      "overview_keyword_1": "Zeus slot canada",
      "seo_keywords_geo": "canada, ca"
    },
    "es-CO": {
      "seo_title": "Descubre Gates of Olympus Slot Colombia ᐈ Demo Gratis",
      "seo_description": "Mejor tragamonedas en Colombia: Gates of Olympus. Aprende a ganar, aprovecha el RTP de 96.5% y giros gratis en pesos.",
      "seo_h1": "Gates of Olympus Tragaperras Colombia",
      "seo_keywords_primary": "gates of olympus colombia, casino colombia online, juego zeus colombia",
      "seo_keywords_lsi": "tragaperras colombianas, bono de bienvenida sin deposito co",
      "overview_keyword_1": "estrategias tragaperras",
      "seo_keywords_geo": "colombia, co"
    },
    "id": {
      "seo_title": "Bocoran Slot Gacor Gates of Olympus ᐈ Pola Zeus Hari Ini",
      "seo_description": "Mainkan demo slot gacor Gates of Olympus (Kakek Zeus). Cek pola Zeus hari ini dan dapatkan petir x500 maxwin sensational!",
      "seo_h1": "Slot Gacor Gates of Olympus (Kakek Zeus)",
      "seo_keywords_primary": "slot gacor gates of olympus, pola zeus hari ini, slot kakek zeus",
      "seo_keywords_lsi": "bocoran admin jarwo, demo slot rupiah, petir merah x500",
      "overview_keyword_1": "Pola Slot Gacor",
      "seo_keywords_geo": "indonesia, id"
    },
    "bn": {
      "seo_title": "Gates of Olympus Casino Slot ᐈ Play Demo in BD (Bangladesh)",
      "seo_description": "Find the best Gates of Olympus strategies for Bangladesh players. Play the demo and hit the 500x Zeus multiplier lightning.",
      "seo_h1": "Gates of Olympus Slot Bangladesh",
      "seo_keywords_primary": "gates of olympus bd, gates of olympus casino bet bd, pragmatic play bangladesh",
      "seo_keywords_lsi": "baji live slot, zeus bet, max win slot",
      "overview_keyword_1": "Zeus Slot BD",
      "seo_keywords_geo": "bangladesh, bd"
    },
    "fr-SN": {
      "seo_title": "Machine à Sous Gates of Olympus ᐈ Jouer au Sénégal",
      "seo_description": "Jouez gratuitement à la machine à sous Gates of Olympus au Sénégal. Acquérez des tours gratuits et gagnez grand avec Pragmatic Play.",
      "seo_h1": "Gates of Olympus Sénégal",
      "seo_keywords_primary": "gates of olympus senegal, casino en ligne dakar, jeux zeus senegal",
      "seo_keywords_lsi": "pragmatic play senegal, gagner argent",
      "overview_keyword_1": "tours gratuits",
      "seo_keywords_geo": "senegal, sn"
    },
    "en-UG": {
      "seo_title": "Gates of Olympus Slot Demo Uganda ᐈ Win 5000x Max",
      "seo_description": "Play Gates of Olympus in Uganda. Unlock incredible multipliers in the famous Pragmatic Play casino game.",
      "seo_h1": "Gates of Olympus Uganda Game",
      "seo_keywords_primary": "gates of olympus uganda, slot game uganda, zeus casino ug",
      "seo_keywords_lsi": "pragmatic slots ug, free spins bet uganda",
      "overview_keyword_1": "Zeus multipliers uganda",
      "seo_keywords_geo": "uganda, ug"
    },
    "en-IN": {
      "seo_title": "Gates of Olympus Slot Game India ᐈ Win Big | RTP 96.5%",
      "seo_description": "Play Gates of Olympus in India. Learn the fastest winning tricks, trigger 500x Zeus multipliers, and enjoy Pragmatic Play's hit.",
      "seo_h1": "Gates of Olympus Slot Game India",
      "seo_keywords_primary": "gates of olympus slot game india, gates of olympus tricks, gates of olympus demo inr",
      "seo_keywords_lsi": "best casino games india, zeus slot multiplier, pragmatic play ruins rupees",
      "overview_keyword_1": "best slot tricks india",
      "seo_keywords_geo": "india, in"
    }
  };

  try {
    const slotRes = await fetch(`${API_URL}/${SLOT_ID}`);
    const slot = await slotRes.json();
    
    // We update localizations mapping precisely what user gave
    const updatedLocalizations = {
      ...slot.localizations,
      ...localizations
    };

    // Make sure geo_regions array includes ALL keys so UI generates them properly!
    const updatedGeoRegions = Object.keys(updatedLocalizations);

    const updateRes = await fetch(`${API_URL}/${SLOT_ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        localizations: updatedLocalizations,
        geo_regions: JSON.stringify(updatedGeoRegions)
      })
    });

    if (updateRes.ok) {
      console.log('✅ ALL 18 GEOs Successfully Pushed to Database!');
    } else {
      console.error('❌ Update failed:', await updateRes.text());
    }
  } catch (error) {
    console.error('❌ Script crashed:', error);
  }
}

optimizeAll18Geos();
