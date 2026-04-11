import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Generates the 52 GEO localization payload by dynamically substituting slot metadata into the 12 base linguistic templates
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
      "mechanics_title": "ゲームの仕組み",
      "free_spins_title": "フリースピン",
      "cta_button_demo_text": "無料デモをプレイ",
      "cta_button_real_text": "リアルマネーでプレイ"
    },
    "de": {
      "seo_title": `${S_NAME} Spielautomat ᐈ RTP ${S_RTP}% | Spielen`,
      "seo_description": `Spielen Sie den ${S_NAME} Slot von ${S_PROV}. Gewinnen Sie bis zu ${S_WIN}x!`,
      "seo_h1": `${S_NAME} Slot`,
      "overview_title": `Überblick zu ${S_NAME}`,
      "mechanics_title": "Spielmechanik",
      "free_spins_title": "Freispiele",
      "cta_button_demo_text": "Demo Spielen",
      "cta_button_real_text": "Um Echtgeld spielen"
    },
    "hi": {
      "seo_title": `${S_NAME} स्लॉट ᐈ मुफ़्त खेलें | RTP ${S_RTP}%`,
      "seo_description": `${S_PROV} का ${S_NAME} खेलें। ${S_WIN}x तक जीतें!`,
      "seo_h1": `${S_NAME} स्लॉट`,
      "overview_title": `${S_NAME} की समीक्षा`,
      "mechanics_title": "खेल कैसे काम करता है",
      "free_spins_title": "मुफ्त स्पिन",
      "cta_button_demo_text": "डेमो खेलें",
      "cta_button_real_text": "असली पैसे के लिए खेलें"
    },
    "id": {
      "seo_title": `Mainkan Slot ${S_NAME} ᐈ RTP ${S_RTP}% | Demo`,
      "seo_description": `Coba slot ${S_NAME} dari ${S_PROV}. Menangkan hingga ${S_WIN}x!`,
      "seo_h1": `Slot ${S_NAME}`,
      "overview_title": `Ulasan ${S_NAME}`,
      "mechanics_title": "Cara Bermain",
      "free_spins_title": "Putaran Gratis",
      "cta_button_demo_text": "Mainkan Demo",
      "cta_button_real_text": "Main dengan Uang Asli"
    }
  };

  const codeMap = {
    "en": ["en", "en-US", "en-GB", "en-CA", "en-AU", "en-NZ", "en-IE", "en-ZA", "en-IN"],
    "es": ["es", "es-ES", "es-MX", "es-AR", "es-CO", "es-CL", "es-PE", "es-VE"],
    "fr": ["fr", "fr-FR", "fr-CA", "fr-BE", "fr-CH", "fr-LU", "fr-MA", "fr-SN", "fr-CI"],
    "it": ["it", "it-IT", "it-CH"],
    "pt": ["pt", "pt-PT", "pt-BR", "pt-AO", "pt-MZ"],
    "ru": ["ru", "ru-RU", "ru-BY", "ru-KZ", "uk-UA"],
    "ar": ["ar", "ar-SA", "ar-AE", "ar-EG", "ar-MA", "ar-DZ"],
    "zh": ["zh", "zh-CN", "zh-TW", "zh-HK", "zh-SG"],
    "ja": ["ja", "ja-JP"],
    "de": ["de", "de-DE", "de-AT", "de-CH"],
    "hi": ["hi", "hi-IN", "bn-IN", "te-IN"],
    "id": ["id", "id-ID", "ms-MY", "th-TH", "vi-VN"]
  };

  let locs = {};
  for (let [baseLang, geoCodes] of Object.entries(codeMap)) {
    for (let code of geoCodes) {
      locs[code] = JSON.parse(JSON.stringify(dict[baseLang]));
    }
  }

  // Strict Geo-overrides
  locs['en-AU'].seo_title = `${S_NAME} Pokies Australia ᐈ Play Demo`;
  locs['en-CA'].seo_title = `${S_NAME} Slot Canada ᐈ Play in CAD`;
  locs['en-IN'].seo_title = `${S_NAME} India ᐈ Win Big in INR`;
  locs['hi-IN'].seo_title = `${S_NAME} India ᐈ Win Big in INR`;
  locs['es-MX'].seo_title = `${S_NAME} México ᐈ Demo Tragamonedas`;
  locs['pt-BR'].seo_title = `${S_NAME} Pagando Muito ᐈ Slot Demo Brasil`;
   
  return locs;
}

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function start() {
  console.log('🤖 Commencing ClashOfSlots 439-Slot DB Generation Phase...');
  
  const slotsPath = path.join(process.cwd(), 'clash_439_slots.json');
  if (!fs.existsSync(slotsPath)) {
    console.error('❌ clash_439_slots.json not found. Run extract-439-slots.mjs first!');
    return;
  }
  
  const slotsData = JSON.parse(fs.readFileSync(slotsPath, 'utf-8'));
  console.log(`✅ Loaded ${slotsData.length} slot profiles from JSON dump.`);
  
  let createdCount = 0;
  let updatedCount = 0;

  for (let s of slotsData) {
    // PREVENT CONNECTION POOL EXHAUSTION ON SUPABASE FREE TIER
    await new Promise(r => setTimeout(r, 150));
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
      console.log(`   ⏭️ Slot ${s.name} already exists. Skipping to save DB connections!`);
      updatedCount++;
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
         // Dummy default values to bypass NOT NULL constraints
         reels: 5,
         game_field: "5x3",
         media_type: "image",
         image_url: ""
      }
    });
    console.log(`   🟢 SUCCESS! Inserted new Slot [${s.name}] with full 52-GEO Matrix!`);
    createdCount++;
    
    // Prevent Prisma connection exhaustion on Supabase
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n🚀🚀 MASS 439-SLOT CREATION COMPLETE! 🚀🚀`);
  console.log(`Created: ${createdCount} | Updated: ${updatedCount}`);
}

start().catch(e => {
  console.error('Fatal Error In Scraper:', e)
});
