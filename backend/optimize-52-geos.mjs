import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const SLOT_ID = 'cmeocg6bd0001u5do1jpoas43';

async function optimize52Geos() {
  console.log('🚀 Initiating Enterprise 52-GEO Smart Injection...');
  const slot = await prisma.slots.findUnique({ where: { id: SLOT_ID } });
  if (!slot) return console.error('Slot not found');

  const locs = slot.localizations || {};
  const allKeys = Object.keys(locs);
  console.log(`📡 Detected ${allKeys.length} active GEO markers in DB.`);

  // Base Dictionaries
  const dict = {
    "en": {
      "seo_title": "Gates of Olympus Slot ᐈ RTP 96.5% & Max Win 5000x | Play Free Demo",
      "seo_description": "Spin the Gates of Olympus slot by Pragmatic Play. Trigger multiplier orbs up to 500x and win up to 5,000x your bet! Play the free demo.",
      "seo_h1": "Play Gates of Olympus Slot",
      "seo_keywords_primary": "gates of olympus slot, play gates of olympus, gates of olympus demo",
      "seo_keywords_lsi": "pragmatic play slots, zeus slot game, tumble feature",
      "overview_title": "Gates of Olympus: An Epic Greek Mythology Slot",
      "overview_description_1": "The core of the game relies on the tumbling reels feature, creating chained wins on a 6x5 grid.",
      "mechanics_title": "How the Mechanics Work",
      "free_spins_title": "Gates of Olympus Free Spins",
      "cta_button_demo_text": "Play Demo For Free",
      "cta_button_real_text": "Play for Real Money"
    },
    "es": {
      "seo_title": "Jugar Gates of Olympus Gratis ᐈ RTP 96.5% | Tragamonedas",
      "seo_description": "Prueba la tragamonedas Gates of Olympus. Disfruta de la caída de símbolos y multiplicadores gigantes x500.",
      "seo_h1": "Tragamonedas Gates of Olympus",
      "overview_title": "El Olimpo de los Premios",
      "overview_description_1": "Las ganancias provienen del sistema de caída continua.",
      "mechanics_title": "Reglas y Mecánicas",
      "free_spins_title": "Tiradas Gratis",
      "cta_button_demo_text": "Demostración Gratuita",
      "cta_button_real_text": "Apostar Dinero Real"
    },
    "fr": {
      "seo_title": "Machine à Sous Gates of Olympus ᐈ RTP 96.5% | Demo Gratuit",
      "seo_description": "Jouez à Gates of Olympus de Pragmatic Play. Découvrez les multiplicateurs de Zeus x500 et gagnez grand.",
      "seo_h1": "Machine à Sous Gates of Olympus",
      "overview_title": "Le Royaume de Zeus",
      "overview_description_1": "Le jeu utilise un mécanisme de avalanche sur une grille 6x5.",
      "mechanics_title": "Comment ça marche",
      "free_spins_title": "Tours Gratuits (Free Spins)",
      "cta_button_demo_text": "Jouer Gratuitement",
      "cta_button_real_text": "Jouer pour de l'argent réel"
    },
    "it": {
      "seo_title": "Slot Gates of Olympus ᐈ Demo Gratis | RTP 96.5%",
      "seo_description": "Prova la slot Gates of Olympus di Pragmatic Play. Moltiplicatori fino a 500x e vincite a cascata.",
      "seo_h1": "Slot Gates of Olympus",
      "overview_title": "Il Potere di Zeus",
      "overview_description_1": "Olimpo offre pagamenti a cascata senza linee fisse.",
      "mechanics_title": "Regole del Gioco",
      "free_spins_title": "Giri Gratis",
      "cta_button_demo_text": "Gioca la Demo",
      "cta_button_real_text": "Gioca con Soldi Veri"
    },
    "pt": {
      "seo_title": "Jogo do Veio do Raio: Gates of Olympus ᐈ RTP 96.5% | Demo",
      "seo_description": "Jogue Gates of Olympus da Pragmatic Play, acione multiplicadores de até 500x e ganhe muito.",
      "seo_h1": "Gates of Olympus (Jogo do Veio do Raio)",
      "overview_title": "O Poderoso Jogo do Veio do Raio",
      "overview_description_1": "A mecânica principal usa multiplicadores explosivos.",
      "mechanics_title": "Como o Jogo Funciona",
      "free_spins_title": "Rodadas Grátis do Jogo do Veio",
      "cta_button_demo_text": "Jogar Demo Grátis",
      "cta_button_real_text": "Jogar a Dinheiro Real"
    },
    "ru": {
      "seo_title": "Слот Gates of Olympus ᐈ Играть Демо (Дед Зевс)",
      "seo_description": "Запускайте игровой автомат Врата Олимпа. Ловите множители х500 от Зевса и выигрывайте х5000!",
      "seo_h1": "Игровой Автомат Gates of Olympus",
      "overview_title": "Легендарный Слот Врата Олимпа",
      "overview_description_1": "Игра работает на сетке 6x5 с падением символов.",
      "mechanics_title": "Механики и Особенности",
      "free_spins_title": "Бесплатные Вращения",
      "cta_button_demo_text": "Играть Демо",
      "cta_button_real_text": "Играть На Деньги"
    },
    "ar": {
      "seo_title": "لعبة سلوت Gates of Olympus ᐈ العب مجاناً | Pragmatic Play",
      "seo_description": "العب Gates of Olympus الآن واستمتع بمضاعفات زيوس التي تصل إلى 500x.",
      "seo_h1": "Gates of Olympus للعب مجاناً",
      "overview_title": "بوابات أوليمبوس: أسطورة زيوس",
      "overview_description_1": "نظام الدفع في أي مكان مع بكرات متساقطة.",
      "mechanics_title": "كيف تعمل اللعبة",
      "free_spins_title": "الدورات المجانية",
      "cta_button_demo_text": "العب النسخة التجريبية",
      "cta_button_real_text": "العب بمال حقيقي"
    },
    "zh": {
      "seo_title": "奥林匹斯之门 (Gates of Olympus) 老虎机 ᐈ 免费试玩",
      "seo_description": "Pragmatic Play 奥林匹斯之门老虎机。最高 500x 乘数，赢取 5000x 大奖！",
      "seo_h1": "奥林匹斯之门老虎机",
      "overview_title": "史诗般的希腊神话老虎机",
      "overview_description_1": "独特消除玩法，全屏支付。",
      "mechanics_title": "游戏机制",
      "free_spins_title": "免费旋转",
      "cta_button_demo_text": "免费试玩",
      "cta_button_real_text": "真钱游戏"
    },
    "ja": {
      "seo_title": "ゲーツ・オブ・オリンパス (Gates of Olympus) スロット ᐈ 無料デモ",
      "seo_description": "Pragmatic Playのゲーツ・オブ・オリンパス。最大500xのマルチプライヤーで大勝利を狙え！",
      "seo_h1": "ゲーツ・オブ・オリンパス スロット",
      "overview_title": "ゼウスの壮大な力",
      "overview_description_1": "カスケード機能で連続勝利を狙おう。",
      "mechanics_title": "仕組み",
      "free_spins_title": "フリースピン",
      "cta_button_demo_text": "無料デモをプレイ",
      "cta_button_real_text": "リアルマネーでプレイ"
    },
    "de": {
      "seo_title": "Gates of Olympus Slot Kostenlos Spielen ᐈ RTP 96.5%",
      "seo_description": "Entdecken Sie Multiplikatoren bis zu 500x im beliebten Zeus-Slot von Pragmatic Play.",
      "seo_h1": "Gates of Olympus Spielautomat",
      "overview_title": "Gates of Olympus: Ein epischer Slot",
      "overview_description_1": "Das Spiel verwendet kaskadierende Walzen auf einem 6x5 Grid.",
      "mechanics_title": "Spielregeln & Mechanik",
      "free_spins_title": "Freispiele",
      "cta_button_demo_text": "Demo Spielen",
      "cta_button_real_text": "Um Echtgeld Spielen"
    },
    "tr": {
      "seo_title": "Gates of Olympus Oyna ᐈ Bedava Demo (Dede Slot)",
      "seo_description": "Efsanevi Dede (Zeus) oyunu Gates of Olympus'u bedava oyna! 500x çarpan taktikleri.",
      "seo_h1": "Gates of Olympus (Dede Slot)",
      "overview_title": "Gates of Olympus: Dede Efsanesi",
      "overview_description_1": "Oyun 6x5 sistemine dayanır.",
      "mechanics_title": "Nasıl Çalışır?",
      "free_spins_title": "Freespin (Bedava Dönüş)",
      "cta_button_demo_text": "Bedava Oyna",
      "cta_button_real_text": "Gerçek Parayla Oyna"
    }
  };

  const updatedLocs = { ...locs };

  // Smart Multiplexer Routing
  for (const code of allKeys) {
    let base = dict.en; // fallback
    
    if (code.startsWith('es')) base = dict.es;
    else if (code.startsWith('fr')) base = dict.fr;
    else if (code.startsWith('it')) base = dict.it;
    else if (code.startsWith('ar')) base = dict.ar;
    else if (code.startsWith('zh')) base = dict.zh;
    else if (code.startsWith('ja')) base = dict.ja;
    else if (code.startsWith('de')) base = dict.de;
    else if (code.startsWith('tr') || code === 'az') base = dict.tr;
    else if (code.startsWith('rt') || code === 'pt') base = dict.pt;
    else if (['ru', 'uk', 'kk', 'bg', 'uz'].includes(code)) base = dict.ru;

    // Apply smart substitution over the existing localized data
    updatedLocs[code] = {
      ...(locs[code] || {}), // preserve any manual overrides
      seo_title: base.seo_title,
      seo_description: base.seo_description,
      seo_h1: base.seo_h1,
      overview_title: base.overview_title,
      overview_description_1: base.overview_description_1,
      mechanics_title: base.mechanics_title,
      free_spins_title: base.free_spins_title,
      cta_button_demo_text: base.cta_button_demo_text,
      cta_button_real_text: base.cta_button_real_text
    };

    // Geo Specific Overrides!
    if (code === 'en-AU') updatedLocs[code].seo_title = "Gates of Olympus Pokies Australia ᐈ Play Demo";
    if (code === 'en-CA') updatedLocs[code].seo_title = "Gates of Olympus Canada ᐈ Play Demo in CAD";
    if (code === 'en-IN' || code === 'hi') updatedLocs[code].seo_title = "Gates of Olympus India ᐈ Win Big in INR";
    if (code === 'es-MX') updatedLocs[code].seo_title = "Gates of Olympus México ᐈ Demo Tragamonedas";
    if (code === 'fr-CI') updatedLocs[code].seo_title = "Gates of Olympus Côte d'Ivoire ᐈ Jouer Demo";
  }

  // Enforce geo_regions to EXACTLY match all localizations so the UI tabs work flawlessly
  await prisma.slots.update({
    where: { id: SLOT_ID },
    data: {
      localizations: updatedLocs,
      geo_regions: JSON.stringify(Object.keys(updatedLocs))
    }
  });

  console.log(`✅ 52 GEO ENTERPRISE OPTIMIZATION COMPLETE! Saved mapped data for ${allKeys.length} regions.`);
}

optimize52Geos().catch(console.error);
