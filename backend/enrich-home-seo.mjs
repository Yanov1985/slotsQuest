import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CORE_MATRIX = {
  "en": {
    seo_title: "SlotQuest: #1 Online Slots Catalog & Casino Reviews (2026)",
    seo_description: "Discover thousands of online slots, exclusive bonuses, expert tips, and play free demo games natively. Join the ultimate SlotQuest casino community.",
    seo_keywords_primary: "online slots, free casino games, best slot catalog",
    seo_keywords_lsi: "demo play, rtp analysis, bonus buy, megaways, spin",
    content: [
      { id: "welcome", title: "Welcome to the Ultimate Casino Catalog", icon: "solar:star-bold-duotone", text: "<p>Step into the most comprehensive universe of online slots. <strong>SlotQuest</strong> is built by enthusiasts, for enthusiasts, featuring deep analytics and native demo capabilities.</p>" },
      { id: "providers", title: "Elite Game Providers", icon: "solar:crown-bold-duotone", text: "<p>We partner with industry titans like Pragmatic Play, Hacksaw, and Nolimit City to bring you the freshest releases and explosive mechanics the moment they drop.</p>" },
      { id: "how-to-play", title: "Free Demo vs Real Money", icon: "solar:wallet-bold-duotone", text: "<p>Master the mechanics risk-free with our flawless demo mode. Test your Bonus Buy strategies before you bet real cash on verified partner platforms.</p>" },
      { id: "demo", title: "Data-Driven Advantage", icon: "solar:shield-star-bold-duotone", text: "<p>Arm yourself with live RTP data, extreme volatility warnings, and community-rated success metrics. Stop guessing and start hunting max wins strategically.</p>" }
    ]
  },
  "pt": {
    seo_title: "SlotQuest: O Melhor Catálogo de Slots e Cassino do Brasil",
    seo_description: "Jogue slots grátis, descubra onde comprar bônus e aprenda as melhores táticas. A comunidade premium de caça-níqueis para jogadores brasileiros em 2026.",
    seo_keywords_primary: "jogar slots gratis, cassino online brasil, comprar bonus",
    seo_keywords_lsi: "aposta, plataforma nova, tigrinho, fortune tiger, maxwin",
    content: [
      { id: "welcome", title: "Bem-vindo ao Melhor Catálogo de Slots", icon: "solar:star-bold-duotone", text: "<p>Entre no maior universo de slots online do Brasil. O <strong>SlotQuest</strong> traz análises profundas, táticas de jogo e o modo demo perfeito para você testar as plataformas novas.</p>" },
      { id: "providers", title: "Provedores de Elite", icon: "solar:crown-bold-duotone", text: "<p>Os maiores lançamentos da Pragmatic Play, PG Soft (Tigrinho e Fortune Ox) estão todos aqui para você dominar a arte do giro e buscar o grande maxwin.</p>" },
      { id: "how-to-play", title: "Demo Grátis vs Dinheiro Real", icon: "solar:wallet-bold-duotone", text: "<p>Treine sua estratégia para comprar bônus de graça. Teste a volatilidade sem arriscar sua banca antes de jogar com dinheiro real!</p>" },
      { id: "demo", title: "Vantagem Estratégica", icon: "solar:shield-star-bold-duotone", text: "<p>Monitore o RTP real, estude os padrões de pagamento e descubra as melhores táticas para forrar forte todos os dias.</p>" }
    ]
  },
  "tr": {
    seo_title: "SlotQuest: En İyi Bedava Slot Oyunları ve Casino Taktikleri",
    seo_description: "Binlerce bedava slot oyna, pragmatic play taktikleri öğren ve en çok kazandıran oyunları keşfet. Türkiye'nin lider casino kataloğu.",
    seo_keywords_primary: "bedava slot oyna, kumarhane, slot taktikleri",
    seo_keywords_lsi: "pragmatic play, bonus satın al, rtp analizi, bedava dönüş",
    content: [
      { id: "welcome", title: "En İyi Casino Kataloğuna Hoş Geldiniz", icon: "solar:star-bold-duotone", text: "<p>Online slotların en kapsamlı evrenine adım atın. <strong>SlotQuest</strong>, derin analizler ve bedava demo özellikleriyle oyuncular için özel olarak tasarlandı.</p>" },
      { id: "providers", title: "Elit Oyun Sağlayıcıları", icon: "solar:crown-bold-duotone", text: "<p>Pragmatic Play, Hacksaw gibi devlerle çalışarak en taze oyunları ve patlayıcı mekanikleri anında sizlere sunuyoruz.</p>" },
      { id: "how-to-play", title: "Bedava Demo ve Gerçek Para", icon: "solar:wallet-bold-duotone", text: "<p>Kusursuz demo modumuzla risk almadan stratejinizi geliştirin. Gerçek parayla oynamadan önce 'Bonus Satın Al' taktiklerinizi test edin.</p>" },
      { id: "demo", title: "Veriye Dayalı Üstünlük", icon: "solar:shield-star-bold-duotone", text: "<p>Canlı RTP verileri, yüksek volatilite uyarıları ve topluluk başarı metrikleriyle kendinizi donatın. Taktiklerinizi şansa bırakmayın.</p>" }
    ]
  },
  "ru": {
    seo_title: "SlotQuest: Лучшие Слоты, Заносы и Демо Игры Каталог 2026",
    seo_description: "Играйте в лучшие слоты бесплатно, изучайте турниры, анализируйте RTP и ловите топовые заносы. Самое крупное СНГ комьюнити игроков в казино.",
    seo_keywords_primary: "лучшие слоты, слоты демо, казино каталог",
    seo_keywords_lsi: "заносы, фриспины, покупка бонуса, прагматик, покупка бонуски",
    content: [
      { id: "welcome", title: "Добро пожаловать в Ультимативный Каталог Казино", icon: "solar:star-bold-duotone", text: "<p>Погрузитесь в самую детальную базу онлайн-слотов. <strong>SlotQuest</strong> создан энтузиастами для тех, кто жаждет глубокой аналитики и живет мощными заносами.</p>" },
      { id: "providers", title: "Элитные Провайдеры", icon: "solar:crown-bold-duotone", text: "<p>Топовые релизы от Pragmatic Play, Hacksaw Gaming и Nolimit City — всё самое сочное, с безумными механиками выплат и уникальными фриспинами.</p>" },
      { id: "how-to-play", title: "Демо Режим vs Реальные Деньги", icon: "solar:wallet-bold-duotone", text: "<p>Отрабатывай тайминги и покупку бонуски в бесплатном демо-режиме, прежде чем депать и крутить аппараты на реальные деньги.</p>" },
      { id: "demo", title: "Преимущество Данных", icon: "solar:shield-star-bold-duotone", text: "<p>Отслеживайте реальный RTP, оценивайте дисперсию и читайте честные отзывы коммьюнити. Максвины не падают случайно, к ним нужно быть готовым!</p>" }
    ]
  },
  "es": {
    seo_title: "SlotQuest: Catálogo de Tragamonedas Gratis y Casino (2026)",
    seo_description: "Juega miles de tragamonedas gratis, encuentra bonos sin depósito y reseñas de casino online. Tu guía definitiva de slots en línea.",
    seo_keywords_primary: "tragamonedas gratis, casino en linea, bonos sin deposito",
    seo_keywords_lsi: "jugar gratis, compra de bonos, rtp de slots, multiplicadores",
    content: [
      { id: "welcome", title: "Bienvenido al Catálogo Definitivo de Casino", icon: "solar:star-bold-duotone", text: "<p>Adéntrate en el universo más completo de tragamonedas online. <strong>SlotQuest</strong> está diseñado para ayudarte a triunfar con estadísticas reales.</p>" },
      { id: "providers", title: "Proveedores de Élite", icon: "solar:crown-bold-duotone", text: "<p>Contamos con todos los éxitos de Pragmatic Play, Hacksaw y otros líderes, ofreciendo mecánicas Megaways espectaculares.</p>" },
      { id: "how-to-play", title: "Modo Demo vs Dinero Real", icon: "solar:wallet-bold-duotone", text: "<p>Juega al 100% sin riesgo en nuestro modo demo inmersivo. Perfecciona tus tácticas de compra de bonos y giros gratis antes de apostar saldo real.</p>" },
      { id: "demo", title: "Datos para Ganar", icon: "solar:shield-star-bold-duotone", text: "<p>Armate con métricas RTP reales, advertencias de alta volatilidad y tendencias de premios mayores globales.</p>" }
    ]
  },
  "id": {
    seo_title: "SlotQuest: Bocoran RTP Slot Gacor & Demo Slot Gratis",
    seo_description: "Mainkan demo slot gratis terlengkap, cari pola maxwin hari ini, dan pantau RTP slot gacor terbaru. Update otomatis setiap jam.",
    seo_keywords_primary: "slot gacor, demo slot gratis, rtp slot terupdate",
    seo_keywords_lsi: "pola rtp, maxwin hari ini, pragmatic play, bonus buy",
    content: [
      { id: "welcome", title: "Pusat Database Slot Terakurat", icon: "solar:star-bold-duotone", text: "<p>Selamat datang di <strong>SlotQuest</strong>, portal nomor 1 untuk analisa slot gacor dengan simulasi demo yang persis seperti aslinya.</p>" },
      { id: "providers", title: "Provider Resmi Terbaik", icon: "solar:crown-bold-duotone", text: "<p>Dapatkan update game terbaru dari Pragmatic Play, PG Soft, dan Nolimit City sedetik setelah mereka rilis global.</p>" },
      { id: "how-to-play", title: "Demo Gratis vs Uang Asli", icon: "solar:wallet-bold-duotone", text: "<p>Test pola maxwin hari ini dengan demo slot anti-lag kami. Pelajari kapan harus gas spin dan buy spin sebelum bermain menggunakan uang asli.</p>" },
      { id: "demo", title: "Keuntungan Data Real-Time", icon: "solar:shield-star-bold-duotone", text: "<p>Gunakan metrik RTP live dan informasi volatilitas kami yang akurat agar tidak boncos saat memutar reel.</p>" }
    ]
  },
  "fr": {
    seo_title: "SlotQuest : Machines à Sous Gratuites et Critiques de Casino",
    seo_description: "Jouez aux meilleures machines à sous gratuites. Découvrez les casinos français, les tours gratuits et la volatilité des jeux.",
    seo_keywords_primary: "machines à sous gratuites, casino francais, casino en ligne",
    seo_keywords_lsi: "tours gratuits, jouer gratuitement, achat de bonus, megaways",
    content: [
      { id: "welcome", title: "Bienvenue sur le Guide de Casino Ultime", icon: "solar:star-bold-duotone", text: "<p>Plongez dans l'univers le plus complet des machines à sous. <strong>SlotQuest</strong> est conçu par des passionnés, alliant statistiques pointues et démos 100% natives.</p>" },
      { id: "providers", title: "Les Meilleurs Fournisseurs", icon: "solar:crown-bold-duotone", text: "<p>Les leaders du marché comme Pragmatic Play et Hacksaw déploient ici toutes leurs mécaniques explosives en avant-première.</p>" },
      { id: "how-to-play", title: "Mode Démo vs Argent Réel", icon: "solar:wallet-bold-duotone", text: "<p>Maîtrisez vos stratégies d'Achat de Bonus sans le moindre risque avant d'investir de l'argent réel sur des plateformes vérifiées.</p>" },
      { id: "demo", title: "L'Avantage des Données", icon: "solar:shield-star-bold-duotone", text: "<p>Découvrez les taux de redistribution (RTP) réels, la volatilité et les avis de joueurs aguerris pour multiplier vos chances de gains.</p>" }
    ]
  },
  "de": {
    seo_title: "SlotQuest: Spielautomaten Kostenlos Spielen & Casino Tipps",
    seo_description: "Spielen Sie Tausende von Online-Slots kostenlos. Entdecken Sie RTP-Daten, Bonusfunktionen und echte Expertenbewertungen aus Deutschland.",
    seo_keywords_primary: "spielautomaten kostenlos spielen, online casino deutschland",
    seo_keywords_lsi: "freispiele, bonus kaufen, rtp statistik, beste slots",
    content: [
      { id: "welcome", title: "Willkommen im Ultimaten Casino-Katalog", icon: "solar:star-bold-duotone", text: "<p>Treten Sie ein in das umfassendste Universum an Online-Slots. <strong>SlotQuest</strong> liefert tiefgründige Analysen und originalgetreue Demos.</p>" },
      { id: "providers", title: "Die Besten Provider", icon: "solar:crown-bold-duotone", text: "<p>Erleben Sie Pragmatic Play, Hacksaw und Merkur Hits. Wir bieten die absolut heißesten Spielautomaten direkt nach Release.</p>" },
      { id: "how-to-play", title: "Kostenlose Demo vs. Echtgeld", icon: "solar:wallet-bold-duotone", text: "<p>Testen Sie risikofrei jede Freispiel-Funktion. Verbessern Sie Ihr Timing und Ihre Strategie für Bonus-Käufe im kostenlosen Portal.</p>" },
      { id: "demo", title: "Volle Transparenz", icon: "solar:shield-star-bold-duotone", text: "<p>Verlassen Sie sich auf akkurate RTP-Daten und extreme Volatilitäts-Warnungen, um fundierte Entscheidungen vor dem echten Einsatz zu treffen.</p>" }
    ]
  },
  "ar": {
    seo_title: "SlotQuest: أفضل ألعاب ماكينات القمار والكازينو المجانية",
    seo_description: "اكتشف آلاف ألعاب السلوتس مجانًا، واحصل على مكافآت الكازينو، واستفد من نصائح الخبراء في الدول العربية لمضاعفة فرص ربحك.",
    seo_keywords_primary: "العاب كازينو مجانية, سلوتس اون لاين, كازينو عربي",
    seo_keywords_lsi: "دورات مجانية, العاب قمار, تحليل RTP, الكازينو المباشر",
    content: [
      { id: "welcome", title: "أهلاً بك في الدليل الشامل لألعاب الكازينو", icon: "solar:star-bold-duotone", text: "<p>انطلق في أضخم منصة لألعاب ماكينات السلوتس (القمار) عبر الإنترنت. يوفر لك <strong>SlotQuest</strong> تحليلات دقيقة وإمكانية اللعب التجريبي المجاني بالكامل.</p>" },
      { id: "providers", title: "أفضل مزودي الألعاب", icon: "solar:crown-bold-duotone", text: "<p>نحن نتعاون مع عمالقة الصناعة مثل Pragmatic Play و Hacksaw لنضع أحدث إصدارات الألعاب ذات الميزات المذهلة بين يديك فور إطلاقها.</p>" },
      { id: "how-to-play", title: "اللعب المجاني مقابل المال الحقيقي", icon: "solar:wallet-bold-duotone", text: "<p>احترف جميع الخدع والميزات دون أي مخاطرة عبر وضع الديمو المجاني. اختبر استراتيجيات شراء المكافآت قبل وضع رهانات حقيقية.</p>" },
      { id: "demo", title: "البيانات تصنع الفارق", icon: "solar:shield-star-bold-duotone", text: "<p>احصل على معلومات العائد الحقيقي للاعبين (RTP)، درجات التقلب العالية للميزات لتعرف تمامًا متى وكيف تضاعف فرصتك للربح الكبير.</p>" }
    ]
  },
  "hi": {
    seo_title: "SlotQuest: फ्री स्लॉट गेम्स और श्रेष्ठ ऑनलाइन कैसीनो जानकारी",
    seo_description: "सैकड़ों मुफ्त स्लॉट्स खेलें, RTP जांचें और नवीनतम कैसीनो बोनस प्राप्त करें। भारत का सबसे तेजी से बढ़ता स्लॉट कैटलॉग।",
    seo_keywords_primary: "फ्री स्लॉट गेम्स, ऑनलाइन कैसीनो, स्लॉट मशीन",
    seo_keywords_lsi: "बोनस खरीदें, मुफ्त स्पिन्स, आरटीपी डेटा, बेट कैसे करें",
    content: [
      { id: "welcome", title: "अल्टीमेट कैसीनो कैटलॉग में आपका स्वागत है", icon: "solar:star-bold-duotone", text: "<p>सबसे बड़ी और सटीक ऑनलाइन स्लॉट लाइब्रेरी का अनुभव लें। <strong>SlotQuest</strong> केवल खिलाड़ियों द्वारा खिलाड़ियों के लिए बनाई गई डेटा से चलने वाली वेबसाइट है।</p>" },
      { id: "providers", title: "शीर्ष गेम प्रदाता", icon: "solar:crown-bold-duotone", text: "<p>Pragmatic Play, Nolimit City जैसी कंपनियों के सबसे नवीनतम गेम्स यहाँ हैं। सभी ट्रेंडिंग मैकेनिक सबसे पहले हमारे पास उपलब्ध होते हैं।</p>" },
      { id: "how-to-play", title: "फ्री डेमो बनाम रियल मनी प्ले", icon: "solar:wallet-bold-duotone", text: "<p>असली कैश दांव लगाने से पहले अपनी रणनीतियों को जोखिम-मुक्त (मुफ्त) डेमो मोड में आज़माएं और बोनस क्रय सुविधाओं को परखें।</p>" },
      { id: "demo", title: "डेटा का सही उपयोग", icon: "solar:shield-star-bold-duotone", text: "<p>लाइव RTP डेटा, और अत्यधिक अस्थिरता की चेतावनियों के साथ गेम का विश्लेषण करें और बड़े जैकपॉट जीतें।</p>" }
    ]
  },
  "bn": {
    seo_title: "SlotQuest: সেরা অনলাইন স্লট ক্যাটালগ ও ক্যাসিনো বিশ্লেষণ",
    seo_description: "হাজার হাজার অনলাইন স্লট গেম ফ্রিতে খেলুন, সঠিক RTP জানুন এবং সেরা বোনাস নিয়ে জানুন সবার আগে।",
    seo_keywords_primary: "অনলাইন স্লট, ক্যাসিনো লাইভ, ফ্রি গেম",
    seo_keywords_lsi: "ফ্রি স্পিন, বোনাস কিনুন, রিয়েল মানি ক্যাসিনো, মেগাওয়েজ",
    content: [
      { id: "welcome", title: "চূড়ান্ত ক্যাসিনো জগতে স্বাগতম", icon: "solar:star-bold-duotone", text: "<p>স্লট গেমের সবচেয়ে বড় কালেকশনে আপনাকে স্বাগতম! <strong>SlotQuest</strong> সম্পূর্ণভাবে ডেটা-চালিত যেখানে আপনি ফ্রিতে স্লট খেলার আসল মজা পাবেন।</p>" },
      { id: "providers", title: "টপ গেম প্রোপ্রাইডারস", icon: "solar:crown-bold-duotone", text: "<p>আমরা Pragmatic Play এবং Hacksaw-এর মত শীর্ষ কোম্পানির সমস্ত এক্সক্লুসিভ গেম সর্বপ্রথম আপনাদের সামনে উপস্থাপন করি।</p>" },
      { id: "how-to-play", title: "ফ্রি ডেমো এবং বাস্তব টাকা", icon: "solar:wallet-bold-duotone", text: "<p>পকেটের টাকা খরচ করার আগে আমাদের রিয়েলিস্টিক ডেমো ভার্সনে আপনার বোনাস কেনা বা খেলার কৌশলগুলো ভালোভাবে যাচাই করুন।</p>" },
      { id: "demo", title: "ডেটা ভিত্তিক জয়", icon: "solar:shield-star-bold-duotone", text: "<p>সঠিক RTP ডেটা, হাই-ভোলটেলিটি এলার্ট এবং ব্যবহারকারীদের রিভিউ দেখে আজই আপনার জেতার সুযোগ বৃদ্ধি করুন।</p>" }
    ]
  },
  "sw": {
    seo_title: "SlotQuest: Katalogi #1 ya Slots, Kasino Mtandaoni 2026",
    seo_description: "Cheza slots bure kabisa, jifunze mbinu za ushindi na ufahamu RTP halisi kabla ya kuweka pesa zako kwenye kasino.",
    seo_keywords_primary: "michezo ya kasino, shinda pesa, slots bure",
    seo_keywords_lsi: "cheza sasa, bashiri, michezo mipya, bonasi ya bure",
    content: [
      { id: "welcome", title: "Karibu Kwenye Maktaba Kubwa Ya Kasino", icon: "solar:star-bold-duotone", text: "<p>Ingia kwenye ulimwengu mkubwa zaidi wa kasino na slots mtandaoni. <strong>SlotQuest</strong> imetengenezwa ikizingatia uchambuzi wa kina na uwezo wa kucheza demo bure.</p>" },
      { id: "providers", title: "Watengenezaji Wakubwa", icon: "solar:crown-bold-duotone", text: "<p>Tunashirikiana kwa karibu na wababe kama Pragmatic Play, Hacksaw, na Nolimit City kukuletea michezo mipya inapotoka tu.</p>" },
      { id: "how-to-play", title: "Demo Bure au Pesa Halisi?", icon: "solar:wallet-bold-duotone", text: "<p>Miliki mbinu zako bila hofu kupitia demo yetu iliyonyooka. Jaribu mbinu za kununua Bonasi kabla hujaweka hela yako halisi leo.</p>" },
      { id: "demo", title: "Shinda Kwa Kutumia Takwimu", icon: "solar:shield-star-bold-duotone", text: "<p>Jiwekee faida kwa kutumia data halisi za RTP, michanganuo ya volatility, na asilimia za ushindi kutoka kwenye jamii ya wachezaji wengine.</p>" }
    ]
  }
};

function multiplexLanguage(baseMatrix) {
  const geoOutput = {};
  
  const enArray = ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-IE', 'en-NZ', 'en-ZA', 'en-IN', 'en-NG'];
  enArray.forEach(k => geoOutput[k] = baseMatrix['en']);
  
  geoOutput['pt'] = baseMatrix['pt'];
  geoOutput['pt-BR'] = baseMatrix['pt'];
  geoOutput['pt-PT'] = baseMatrix['pt'];
  
  const esArray = ['es', 'es-ES', 'es-MX', 'es-AR', 'es-CL', 'es-CO', 'es-PE', 'es-VE'];
  esArray.forEach(k => geoOutput[k] = baseMatrix['es']);
  
  const frArray = ['fr', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH', 'fr-CI', 'fr-SN'];
  frArray.forEach(k => geoOutput[k] = baseMatrix['fr']);
  
  geoOutput['ar'] = baseMatrix['ar'];
  geoOutput['ar-SA'] = baseMatrix['ar'];
  geoOutput['ar-AE'] = baseMatrix['ar'];
  geoOutput['ar-EG'] = baseMatrix['ar'];
  geoOutput['ar-MA'] = baseMatrix['ar'];
  
  geoOutput['de'] = baseMatrix['de'];
  geoOutput['de-DE'] = baseMatrix['de'];
  geoOutput['de-AT'] = baseMatrix['de'];
  geoOutput['de-CH'] = baseMatrix['de'];
  
  geoOutput['ru'] = baseMatrix['ru'];
  geoOutput['tr'] = baseMatrix['tr'];
  geoOutput['id'] = baseMatrix['id'];
  geoOutput['hi'] = baseMatrix['hi'];
  geoOutput['bn'] = baseMatrix['bn'];
  geoOutput['sw'] = baseMatrix['sw'];
  
  geoOutput['it'] = baseMatrix['en'];
  geoOutput['pl'] = baseMatrix['en'];

  return geoOutput;
}

async function start() {
  console.log("🤖 [FALLBACK MODE] Launching Static Native Matrix Generator...");
  
  let homePage = await prisma.pages.findUnique({ where: { slug: 'home' } });
  if (!homePage) {
     console.log('📝 Creating "home" page record...');
     homePage = await prisma.pages.create({
         data: {
             slug: 'home',
             title: 'Homepage',
             hero_title: 'SlotQuest Catalog',
             hero_desc: 'The best online slots simulator'
         }
     });
  }

  let existingRaw = homePage.localizations || {};
  let existingJson = typeof existingRaw === 'string' ? JSON.parse(existingRaw) : existingRaw;

  console.log("   🧬 Multiplexing 12 core languages into 52 GEO locales from static AI matrix...");
  const finalGeoMatrix = multiplexLanguage(CORE_MATRIX);
  
  for (let localeKey in finalGeoMatrix) {
      if (!finalGeoMatrix[localeKey]) continue;
      existingJson[localeKey] = {
          ...existingJson[localeKey],
          ...finalGeoMatrix[localeKey]
      };
  }

  console.log("   💾 Injecting Deep Homepage JSON into PostgreSQL...");
  await prisma.pages.update({
      where: { slug: 'home' },
      data: { localizations: existingJson }
  });
  
  console.log("\\n🚀🚀 MASSIVE HOMEPAGE SEO ENRICHMENT COMPLETE! 🚀🚀");
}

start().catch(console.error);
