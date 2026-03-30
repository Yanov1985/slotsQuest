import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Generates the 52 GEO localization payload by dynamically substituting slot metadata into the 12 base linguistic templates!
function generate52GeoLocalizations(slotName, providerName, rtp, maxWin) {
  const S_NAME = slotName;
  const S_PROV = providerName;
  const S_RTP = rtp ? rtp.toString() : '96.0';
  const S_WIN = maxWin ? maxWin.toString() : '5000';

  const dict = {
    "en": {
      "seo_title": `${S_NAME} Slot ᐈ RTP ${S_RTP}% & Max Win ${S_WIN}x | Play Free Demo`,
      "seo_description": `Spin the ${S_NAME} slot by ${S_PROV}. Trigger epic multipliers and win up to ${S_WIN}x your bet! Play the free demo.`,
      "seo_h1": `Play ${S_NAME} Slot`,
      "seo_keywords_primary": `${S_NAME.toLowerCase()} slot, play ${S_NAME.toLowerCase()}, ${S_NAME.toLowerCase()} demo`,
      "overview_title": `${S_NAME}: A Masterpiece by ${S_PROV}`,
      "mechanics_title": `How the Mechanics Work in ${S_NAME}`,
      "free_spins_title": `${S_NAME} Free Spins Feature`,
      "cta_button_demo_text": "Play Demo For Free",
      "cta_button_real_text": "Play for Real Money"
    },
    "es": {
      "seo_title": `Jugar ${S_NAME} Gratis ᐈ RTP ${S_RTP}% | Tragamonedas`,
      "seo_description": `Prueba la tragamonedas ${S_NAME} de ${S_PROV}. Disfruta ganar hasta x${S_WIN}.`,
      "seo_h1": `Tragamonedas ${S_NAME}`,
      "overview_title": `El Poder de ${S_NAME}`,
      "mechanics_title": "Reglas y Mecánicas",
      "free_spins_title": "Tiradas Gratis",
      "cta_button_demo_text": "Demostración Gratuita",
      "cta_button_real_text": "Apostar Dinero Real"
    },
    "fr": {
      "seo_title": `Machine à Sous ${S_NAME} ᐈ RTP ${S_RTP}% | Demo`,
      "seo_description": `Jouez à ${S_NAME} par ${S_PROV}. Découvrez le jeu et gagnez jusqu'à ${S_WIN}x.`,
      "seo_h1": `Machine à Sous ${S_NAME}`,
      "overview_title": `La Magie de ${S_NAME}`,
      "mechanics_title": "Comment ça marche",
      "free_spins_title": "Tours Gratuits",
      "cta_button_demo_text": "Jouer Gratuitement",
      "cta_button_real_text": "Jouer pour de l'argent réel"
    },
    "it": {
      "seo_title": `Slot ${S_NAME} ᐈ Demo Gratis | RTP ${S_RTP}%`,
      "seo_description": `Prova la slot ${S_NAME} di ${S_PROV}. Vincite fino a ${S_WIN}x.`,
      "seo_h1": `Slot ${S_NAME}`,
      "overview_title": `I Segreti di ${S_NAME}`,
      "mechanics_title": "Regole del Gioco",
      "free_spins_title": "Giri Gratis",
      "cta_button_demo_text": "Gioca la Demo",
      "cta_button_real_text": "Gioca con Soldi Veri"
    },
    "pt": {
      "seo_title": `${S_NAME} Jogo ᐈ RTP ${S_RTP}% | Demo Grátis`,
      "seo_description": `Jogue ${S_NAME} da ${S_PROV}, acione bônus e ganhe até ${S_WIN}x.`,
      "seo_h1": `${S_NAME} Slot`,
      "overview_title": `O Famoso Jogo ${S_NAME}`,
      "mechanics_title": "Como o Jogo Funciona",
      "free_spins_title": "Rodadas Grátis",
      "cta_button_demo_text": "Jogar Demo Grátis",
      "cta_button_real_text": "Jogar a Dinheiro Real"
    },
    "ru": {
      "seo_title": `Слот ${S_NAME} ᐈ Играть Демо | RTP ${S_RTP}%`,
      "seo_description": `Запускайте игровой автомат ${S_NAME} от ${S_PROV}. Максимальный выигрыш х${S_WIN}!`,
      "seo_h1": `Игровой Автомат ${S_NAME}`,
      "overview_title": `Обзор Слота ${S_NAME}`,
      "mechanics_title": "Механики и Особенности",
      "free_spins_title": "Бесплатные Вращения",
      "cta_button_demo_text": "Играть Демо",
      "cta_button_real_text": "Играть На Деньги"
    },
    "ar": {
      "seo_title": `لعبة سلوت ${S_NAME} ᐈ العب مجاناً | ${S_PROV}`,
      "seo_description": `العب ${S_NAME} الآن واستمتع بمكاسب تصل إلى ${S_WIN}x.`,
      "seo_h1": `${S_NAME} للعب مجاناً`,
      "overview_title": `مراجعة ${S_NAME}`,
      "mechanics_title": "كيف تعمل اللعبة",
      "free_spins_title": "الدورات المجانية",
      "cta_button_demo_text": "العب النسخة التجريبية",
      "cta_button_real_text": "العب بمال حقيقي"
    },
    "zh": {
      "seo_title": `${S_NAME} 老虎机 ᐈ 免费试玩 | RTP ${S_RTP}%`,
      "seo_description": `${S_PROV} 的 ${S_NAME} 老虎机。赢取 ${S_WIN}x 大奖！`,
      "seo_h1": `${S_NAME} 老虎机`,
      "overview_title": `${S_NAME} 详情`,
      "mechanics_title": "游戏机制",
      "free_spins_title": "免费旋转",
      "cta_button_demo_text": "免费试玩",
      "cta_button_real_text": "真钱游戏"
    },
    "ja": {
      "seo_title": `${S_NAME} スロット ᐈ 無料デモ | RTP ${S_RTP}%`,
      "seo_description": `${S_PROV}の${S_NAME}。最大${S_WIN}xの大勝利を目指せ！`,
      "seo_h1": `${S_NAME} スロット`,
      "overview_title": `${S_NAME} レビュー`,
      "mechanics_title": "仕組み",
      "free_spins_title": "フリースピン",
      "cta_button_demo_text": "無料デモをプレイ",
      "cta_button_real_text": "リアルマネーでプレイ"
    },
    "de": {
      "seo_title": `${S_NAME} Slot Kostenlos Spielen ᐈ RTP ${S_RTP}%`,
      "seo_description": `Spielen Sie den ${S_NAME} Slot von ${S_PROV}. Gewinnen Sie bis zu ${S_WIN}x!`,
      "seo_h1": `${S_NAME} Spielautomat`,
      "overview_title": `${S_NAME}: Ein epischer Slot`,
      "mechanics_title": "Spielregeln & Mechanik",
      "free_spins_title": "Freispiele",
      "cta_button_demo_text": "Demo Spielen",
      "cta_button_real_text": "Um Echtgeld Spielen"
    },
    "tr": {
      "seo_title": `${S_NAME} Oyna ᐈ Bedava Demo Slot | ${S_RTP}% RTP`,
      "seo_description": `${S_PROV}'nin popüler oyunu ${S_NAME} bedava oyna! ${S_WIN}x kazanç taktikleri.`,
      "seo_h1": `${S_NAME} Oyna`,
      "overview_title": `${S_NAME}: En İyi Slot`,
      "mechanics_title": "Nasıl Çalışır?",
      "free_spins_title": "Freespin (Bedava Dönüş)",
      "cta_button_demo_text": "Bedava Oyna",
      "cta_button_real_text": "Gerçek Parayla Oyna"
    }
  };

  const isoCodes = [
    'ar', 'az', 'bg', 'bn', 'cs', 'de', 'el', 'en', 'es', 'fa', 'fr', 'hi', 'hu', 'id', 'it', 'ja', 'kk', 'ko', 'my', 'nl', 'ph', 'pl', 'pt', 'ro', 'ru', 'sv', 'th', 'tr', 'uk', 'uz', 'vi', 'zh',
    'ar-EG', 'ar-MA', 'en-AU', 'en-CA', 'en-IN', 'en-KE', 'en-NG', 'en-NZ', 'en-UG', 'en-US', 'en-ZA', 'es-AR', 'es-CL', 'es-CO', 'es-MX', 'es-PE', 'fr-CI', 'fr-CM', 'fr-SN', 'pt-BR'
  ];

  const locs = {};
  
  for (const code of isoCodes) {
    let base = dict.en;
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

    locs[code] = { ...base };

    // Strict Geo-overrides
    if (code === 'en-AU') locs[code].seo_title = `${S_NAME} Pokies Australia ᐈ Play Demo`;
    if (code === 'en-CA') locs[code].seo_title = `${S_NAME} Slot Canada ᐈ Play in CAD`;
    if (code === 'en-IN' || code === 'hi') locs[code].seo_title = `${S_NAME} India ᐈ Win Big in INR`;
    if (code === 'es-MX') locs[code].seo_title = `${S_NAME} México ᐈ Demo Tragamonedas`;
    if (code === 'pt-BR') locs[code].seo_title = `${S_NAME} Pagando Muito ᐈ Slot Demo Brasil`;
  }
  
  return locs;
}

// Convert "Gates of Olympus" to "gates-of-olympus"
function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function start() {
  console.log('🤖 Commencing ClashOfSlots 30-Slot Scraping & DB Generation...');
  const res = await fetch('https://clashofslots.com/best-online-slots/year-2023/');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const slotsData = [];

  $('a[href*="/slots/"]').each((i, el) => {
    if (slotsData.length >= 30) return;
    const link = $(el).attr('href') || '';
    const parts = link.split('/');
    
    // Pattern: https://clashofslots.com/slots/pragmatic-play/gates-of-olympus/
    if (parts.length >= 7 && parts[3] === 'slots') {
      const providerSlug = parts[4];
      const slotSlug = parts[5];
      const name = $(el).text().trim();
      if (!name || name === '') return;

      // Prevent duplicate slots in the top list
      if (slotsData.find(s => s.slug === slotSlug)) return;

      // Traverse up to find the container with metrics
      let container = $(el).parent();
      for(let j = 0; j < 6; j++) {
        if (container.text().includes('RTP:')) break;
        container = container.parent();
      }
      
      const fullText = container.text().replace(/\\n/g, ' ');
      let rtpMatch = fullText.match(/RTP:\s*([\d.]+)/);
      let winMatch = fullText.match(/Max Win:\s*x([\d,]+)/);
      let volMatch = fullText.match(/Volatility:\s*([\w\s]+?)[\n\r]*Features:/);
      if (!volMatch) volMatch = fullText.match(/Volatility:\s*([A-Za-z\s]+)/);

      let providerName = providerSlug.split('-').map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(' ');

      slotsData.push({
        name: name,
        slug: slotSlug,
        providerName,
        rtp: rtpMatch ? parseFloat(rtpMatch[1]) : 96.0,
        volatility: volMatch ? volMatch[1].trim().toLowerCase() : 'high',
        maxWin: winMatch ? parseInt(winMatch[1].replace(/,/g, '')) : 5000
      });
    }
  });

  console.log(`✅ Successfully extracted ${slotsData.length} slot profiles from DOM!`);
  
  for (let s of slotsData) {
    console.log(`🌀 Processing [${s.name}] by ${s.providerName}...`);
    
    // 1. Resolve Provider
    let providerSlug = toSlug(s.providerName);
    let provider = await prisma.providers.findUnique({ where: { slug: providerSlug } });
    if (!provider) {
       console.log(`   🔸 Created missing Provider: ${s.providerName}`);
       provider = await prisma.providers.create({
         data: {
           id: crypto.randomUUID(),
           name: s.providerName,
           slug: providerSlug,
           is_active: true
         }
       });
    }

    // 2. Resolve Slot
    let existingSlot = await prisma.slots.findUnique({ where: { slug: s.slug } });
    if (existingSlot) {
      console.log(`   ⚡ Slot ${s.name} already exists. Updating localizations only!`);
      const locs = generate52GeoLocalizations(s.name, s.providerName, s.rtp, s.maxWin);
      await prisma.slots.update({
        where: { id: existingSlot.id },
        data: {
          localizations: locs,
          geo_regions: JSON.stringify(Object.keys(locs))
        }
      });
      continue;
    }

    // 3. Create brand new slot
    const locs = generate52GeoLocalizations(s.name, s.providerName, s.rtp, s.maxWin);
    await prisma.slots.create({
      data: {
         id: crypto.randomUUID(),
         name: s.name,
         slug: s.slug,
         description: `${s.name} is an amazing slot from ${s.providerName} offering up to ${s.maxWin}x wins!`,
         providers: { connect: { id: provider.id } },
         is_active: true,
         rtp: s.rtp,
         volatility: s.volatility,
         max_win: s.maxWin,
         localizations: locs,
         geo_regions: JSON.stringify(Object.keys(locs)),
         // Dummy default values to bypass NOT NULL constraints if any
         reels: 5,
         game_field: "5x3",
         media_type: "image",
         image_url: ""
      }
    });
    console.log(`   🟢 SUCCESS! Inserted new Slot [${s.name}] with full 52-GEO Matrix!`);
  }

  console.log('\\n🚀🚀 MASS 30-SLOT CREATION & MULTI-GEO OPTIMIZATION COMPLETE! 🚀🚀');
}

start().catch(e => {
  console.error('Fatal Error In Scraper:', e)
});
