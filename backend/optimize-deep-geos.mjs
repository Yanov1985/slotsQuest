// backend/optimize-deep-geos.mjs
const SLOT_ID = 'cmeocg6bd0001u5do1jpoas43';
const API_URL = 'http://127.0.0.1:3001/api/slots';

async function runDeepLocalization() {
  console.log('🚀 Running Ultimate Deep-Text GEO Localization (18 GEOs)...');

  // BASE LANGUAGE DICTIONARIES
  const dict = {
    "en": {
      "seo_title": "Gates of Olympus Slot ᐈ RTP 96.5% & Max Win 5000x | Play Free Demo",
      "seo_description": "Spin the Gates of Olympus slot by Pragmatic Play. Trigger multiplier orbs up to 500x and win up to 5,000x your bet! Play the free demo.",
      "seo_h1": "Play Gates of Olympus Slot",
      "seo_keywords_primary": "gates of olympus slot, play gates of olympus, gates of olympus demo",
      "seo_keywords_lsi": "pragmatic play slots, zeus slot game, tumble feature",
      "overview_title": "Gates of Olympus: An Epic Greek Mythology Slot",
      "overview_keyword_1": "Zeus slot mechanics",
      "overview_description_1": "The core of the game relies on the tumbling reels feature, creating chained wins on a 6x5 grid.",
      "overview_keyword_2": "Multiplier orbs",
      "overview_description_2": "Watch out for Zeus to randomly hurl multiplier orbs onto the grid, boosting your wins up to 500x.",
      "mechanics_title": "How the Mechanics Work",
      "mechanics_intro": "A unique 'Pay Anywhere' system means you just need 8 matching symbols anywhere on the screen.",
      "mechanics_cascade_title": "Tumble Feature",
      "mechanics_cascade_description": "Winning symbols disappear, allowing new ones to fall into place and create consecutive wins.",
      "mechanics_multipliers_title": "Divine Multipliers",
      "mechanics_multipliers_description": "Zeus randomly adds winged orbs worth 2x to 500x to your current tumble sequence.",
      "free_spins_title": "Gates of Olympus Free Spins",
      "free_spins_intro": "Land 4 or more scatter symbols to unlock the legendary free spins round.",
      "free_spins_4_scatter": "4 Scatters",
      "free_spins_4_scatter_desc": "Awards 15 Free Spins and a 3x total bet payout.",
      "faq_title": "Frequently Asked Questions",
      "faq_q1_question": "What is the max win on Gates of Olympus?",
      "faq_q1_answer": "You can win up to 5,000x your initial bet on a single spin.",
      "faq_q2_question": "Can I play Gates of Olympus for free?",
      "faq_q2_answer": "Yes, you can try the official demo version right here without any registration.",
      "faq_q3_question": "How do you trigger the bonus round?",
      "faq_q3_answer": "You need 4 Zeus Scatter symbols anywhere on the grid, or you can purchase it using the Buy Feature.",
      "cta_title": "Ready to Face Zeus?",
      "cta_subtitle: ": "Experience the ultimate Pragmatic Play adventure",
      "cta_button_demo_text": "Play Demo For Free",
      "cta_button_real_text": "Play for Real Money"
    },
    "pt-BR": {
      "seo_title": "Jogo do Veio do Raio: Gates of Olympus ᐈ RTP 96.5% | Demo",
      "seo_description": "O famoso Jogo do Veio do Raio! Jogue Gates of Olympus da Pragmatic Play, acione multiplicadores de até 500x e ganhe muito.",
      "seo_h1": "Gates of Olympus (Jogo do Veio do Raio)",
      "seo_keywords_primary": "jogo do veio do raio, gates of olympus demo, jogar gates of olympus",
      "seo_keywords_lsi": "comprar rodadas grátis, multiplicador deus grego",
      "overview_title": "O Poderoso Jogo do Veio do Raio",
      "overview_keyword_1": "Rodadas Grátis",
      "overview_description_1": "A mecânica principal do slot usa o sistema de cascata, explodindo símbolos ganhadores na grade 6x5.",
      "overview_keyword_2": "Multiplicadores de Ouro",
      "overview_description_2": "Cuidado com o Zeus! Ele joga multiplicadores de até 500x a qualquer momento na tela.",
      "mechanics_title": "Como o Jogo Funciona",
      "mechanics_intro": "Com o sistema de pagamento em qualquer lugar, basta achar 8 símbolos iguais para ganhar.",
      "mechanics_cascade_title": "Efeito Cascata (Tumble)",
      "mechanics_cascade_description": "Os símbolos premiados somem e novos caem do céu, criando combos de vitórias seguidas.",
      "mechanics_multipliers_title": "Raios de Multiplicação",
      "mechanics_multipliers_description": "Esferas coloridas podem pousar com valores de 2x até incríveis 500x.",
      "free_spins_title": "Rodadas Grátis do Jogo do Veio",
      "free_spins_intro": "Junte 4 ou mais Scatters do Zeus para entrar no bônus lendário.",
      "free_spins_4_scatter": "4 Scatters",
      "free_spins_4_scatter_desc": "Garante 15 Rodadas Grátis e pagamento de 3x o valor da aposta.",
      "faq_title": "Perguntas Frequentes",
      "faq_q1_question": "Qual é o ganho máximo no Jogo do Veio do Raio?",
      "faq_q1_answer": "Sua aposta pode ser multiplicada em até 5.000x em um único rodada.",
      "faq_q2_question": "Posso jogar Gates of Olympus de graça?",
      "faq_q2_answer": "Sim! Temos a versão demo original para você testar sem gastar nada.",
      "faq_q3_question": "Como liberar o bônus rapidamente?",
      "faq_q3_answer": "Você pode aguardar os 4 símbolos Scatter caírem ou fazer a compra direta do bônus pagando 100x sua aposta.",
      "cta_title": "Pronto para desafiar o Zeus?",
      "cta_subtitle: ": "A aventura máxima da Pragmatic Play aguarda",
      "cta_button_demo_text": "Jogar Demo Grátis",
      "cta_button_real_text": "Jogar a Dinheiro Real (Pix)"
    },
    "tr": {
      "seo_title": "Gates of Olympus Oyna ᐈ Bedava Demo (Dede Slot)",
      "seo_description": "Efsanevi Dede (Zeus) oyunu Gates of Olympus'u bedava oyna! 500x çarpan taktiklerini keşfet ve 5000x kazan.",
      "seo_h1": "Gates of Olympus (Dede Slot Oyunu)",
      "seo_keywords_primary": "gates of olympus taktik, gates of olympus oyna, dede slot",
      "seo_keywords_lsi": "freespin satın al, çarpanlar, deneme bonusu",
      "overview_title": "Gates of Olympus: Dede Efsanesi",
      "overview_keyword_1": "Dede Oyun Mekanikleri",
      "overview_description_1": "Oyun, düşen semboller özelliği sayesinde ardışık kazanç kombinasyonları sağlayan 6x5 sistemine dayanır.",
      "overview_keyword_2": "500x Çarpanlar",
      "overview_description_2": "Dede (Zeus) rastgele asasını kaldırıp 500x'e kadar çarpan küreleri fırlatabilir.",
      "mechanics_title": "Mekanikler Nasıl Çalışır?",
      "mechanics_intro": "Her yerde öde sistemiyle, ekranda herhangi bir yerde 8 aynı sembolü bulmanız kazanç için yeterlidir.",
      "mechanics_cascade_title": "Tumble (Takla) Özelliği",
      "mechanics_cascade_description": "Kazanan semboller patlar ve yenileri yukarıdan düşerek art arda kazanç şansı yaratır.",
      "mechanics_multipliers_title": "İlahi Çarpanlar",
      "mechanics_multipliers_description": "Altın, yeşil veya mavi küreler 2x ile 500x arasında kazanç katlıyıcı getirir.",
      "free_spins_title": "Freespin (Bedava Dönüş)",
      "free_spins_intro": "Ekranda 4 Zeus Scatter yüzü bulursanız efsanevi bonus turuna girersiniz.",
      "free_spins_4_scatter": "4 Zeus (Scatter)",
      "free_spins_4_scatter_desc": "Ekrana düşerse 15 Freespin verir ve toplam bahsinizin 3 katını öder.",
      "faq_title": "Sıkça Sorulan Sorular",
      "faq_q1_question": "Dede slot oyununda en fazla ne kadar kazanılır?",
      "faq_q1_answer": "Tek bir dönüşte maksimum kazanç sınırınız bahsinizin tam 5.000 katıdır.",
      "faq_q2_question": "Bedava oynayabilir miyim?",
      "faq_q2_answer": "Evet, sitemiz üzerinden hiçbir kayıt olmadan Limitsiz bedava test edebilirsiniz.",
      "faq_q3_question": "Freespin nasıl tetiklenir?",
      "faq_q3_answer": "Normal dönüşlerde 4 Scatter bekleyebilir ya da bahis miktarınızın 100 katını ödeyerek anında satın alabilirsiniz.",
      "cta_title": "Dede ile yüzleşmeye hazır mısın?",
      "cta_subtitle: ": "Pragmatic Play'in en çok kazandıran slotunu dene",
      "cta_button_demo_text": "Bedava Demo Oyna",
      "cta_button_real_text": "Gerçek Parayla Oyna"
    },
    "ru": {
      "seo_title": "Слот Gates of Olympus ᐈ Играть Демо (Дед Зевс) | Отзывы",
      "seo_description": "Запускайте игровой автомат Врата Олимпа. Ловите множители х500 от Зевса и выигрывайте х5000! Крутите демо.",
      "seo_h1": "Игровой Автомат Gates of Olympus (Дед Зевс)",
      "seo_keywords_primary": "gates of olympus играть, слот дед зевс, врата олимпа",
      "seo_keywords_lsi": "покупка бонуски, заносы, прагматик плей",
      "overview_title": "Легендарный Слот Врата Олимпа",
      "overview_keyword_1": "Каскадная механика",
      "overview_description_1": "Игра работает на классической сетке 6x5, где символы играют независимо от линий выплат.",
      "overview_keyword_2": "Множители Зевса",
      "overview_description_2": "Главная фишка — случайные сферы множителей, которые Дед бросает на барабаны (вплоть до сумасшедших x500).",
      "mechanics_title": "Механики и Особенности",
      "mechanics_intro": "Собирайте как минимум 8 одинаковых символов в любом месте на экране, чтобы получить выплату.",
      "mechanics_cascade_title": "Функция Лавины (Tumble)",
      "mechanics_cascade_description": "Сыгравшие камни взрываются, а на их место падают новые, что позволяет умножать выигрыш бесконечно.",
      "mechanics_multipliers_title": "Множители выигрыша",
      "mechanics_multipliers_description": "Крылатые золотые короны умножают конечный выигрыш всей лавины на значения от x2 до x500.",
      "free_spins_title": "Бесплатные Вращения (Бонуска)",
      "free_spins_intro": "Поймайте от четырех Скаттеров с лицом Зевса для активации главных заносов.",
      "free_spins_4_scatter": "4 Скаттера",
      "free_spins_4_scatter_desc": "Приносят 15 Фриспинов и мгновенную выплату 3х от вашей ставки.",
      "faq_title": "Вопросы и Ответы (FAQ)",
      "faq_q1_question": "Какой максимальный выигрыш (Max Win)?",
      "faq_q1_answer": "Лимит выигрыша (Max Win) в Gates of Olympus жестко ограничен и составляет x5000 от ставки.",
      "faq_q2_question": "Можно ли играть бесплатно на рубли?",
      "faq_q2_answer": "Демо версия абсолютно бесплатна и начисляет бесконечные виртуальные кредиты (фантики).",
      "faq_q3_question": "Как купить бонуску?",
      "faq_q3_answer": "В левой части экрана нажмите «Купить фриспины». Это обойдется ровно в 100 ваших базовых ставок.",
      "cta_title": "Готовы сорвать куш?",
      "cta_subtitle: ": "Двери на Олимп открыты",
      "cta_button_demo_text": "Играть Демо",
      "cta_button_real_text": "Играть На Деньги"
    },
    "es": {
      "seo_title": "Jugar Gates of Olympus Gratis ᐈ RTP 96.5% | Tragamonedas",
      "seo_description": "Prueba la tragamonedas Gates of Olympus. Disfruta de la caída de símbolos y multiplicadores gigantes x500.",
      "seo_h1": "Tragamonedas Gates of Olympus",
      "seo_keywords_primary": "jugar gates of olympus gratis, tragamonedas gates of olympus",
      "seo_keywords_lsi": "tragamonedas de zeus, comprar giros gratis",
      "overview_title": "El Olimpo de los Premios y Multiplicadores",
      "overview_keyword_1": "Caída de Símbolos",
      "overview_description_1": "Las ganancias provienen del sistema de caída continua, encadenando victorias múltiples sin parar.",
      "overview_keyword_2": "Orbes Multiplicadores",
      "overview_description_2": "Observa a Zeus levantar su brazo: los multiplicadores de x2 a x500 pueden aterrizar en cualquier giro.",
      "mechanics_title": "Reglas y Mecánicas",
      "mechanics_intro": "No hay líneas de pago fijas. Sólo necesitas 8 o más símbolos iguales en la pantalla.",
      "mechanics_cascade_title": "Efecto Cascada",
      "mechanics_cascade_description": "Los símbolos que pagan desaparecen rápidamente, permitiendo que nuevos bloques caigan.",
      "mechanics_multipliers_title": "Multiplicadores Divinos",
      "mechanics_multipliers_description": "Cualquier combinación ganadora se multiplica si hay una o más orbes en la pantalla al final.",
      "free_spins_title": "Tiradas Gratis (Free Spins)",
      "free_spins_intro": "Junta 4 Scatters para acceder al monte de las grandes recompensas.",
      "free_spins_4_scatter": "4 Scatters",
      "free_spins_4_scatter_desc": "Otorga 15 Giros Gratis y un pago automático de x3.",
      "faq_title": "Preguntas Frecuentes",
      "faq_q1_question": "Cuál es la ganancia máxima posible?",
      "faq_q1_answer": "La ganancia tope (Max Win) está establecida en 5.000 multiplicando tu apuesta inicial.",
      "faq_q2_question": "Cómo jugar Gates of Olympus demo?",
      "faq_q2_answer": "Gira la ruleta virtual en nuestra plataforma sin descargas ni registros previos.",
      "faq_q3_question": "Existen trucos para ganar?",
      "faq_q3_answer": "Los sorteos usan RNG (Random Number Generator). Céntrate en administrar bien tu salto con las opciones de Apuesta Ante.",
      "cta_title": "¿Listo para el Olimpo?",
      "cta_subtitle: ": "Pragmatic Play te lanza el desafío definitivo",
      "cta_button_demo_text": "Demostración Gratuita",
      "cta_button_real_text": "Apostar Dinero Real"
    },
    // ID (Indonesia) - Very specific culture
    "id": {
      "seo_title": "Bocoran Slot Gacor Gates of Olympus ᐈ Pola Zeus Hari Ini",
      "seo_description": "Mainkan demo slot gacor Gates of Olympus (Kakek Zeus). Cek pola Zeus hari ini dan dapatkan petir x500 maxwin!",
      "seo_h1": "Slot Gacor Gates of Olympus (Kakek Zeus)",
      "seo_keywords_primary": "slot gacor gates of olympus, pola zeus hari ini, slot kakek zeus",
      "seo_keywords_lsi": "bocoran admin jarwo, demo slot rupiah",
      "overview_title": "Kakek Zeus: Penguasa Slot Gacor",
      "overview_keyword_1": "Pola Slot",
      "overview_description_1": "Game ini sangat bergantung pada pola pecahan simbol yang gacor dan mudah menang.",
      "overview_keyword_2": "Petir Zeus",
      "overview_description_2": "Kakek Zeus bisa membuang Petir Merah x500 kapan saja untuk memberikan Maxwin Sensational.",
      "mechanics_title": "Aturan Bermain (Bocoran)",
      "mechanics_intro": "Dapatkan minimal 8 simbol pecahan gambar yang sama agar bayaran bisa ter akumulasi.",
      "mechanics_cascade_title": "Fitur Runtuhan (Tumble)",
      "mechanics_cascade_description": "Simbol meledak terus menerus, memberikan pola kemenangan beruntun tanpa spin ulang.",
      "mechanics_multipliers_title": "Perkalian Petir",
      "mechanics_multipliers_description": "Zeus menurunkan batu perkalian mulai dari x2 hingga x500 secara acak.",
      "free_spins_title": "Fitur Scatter Free Spin",
      "free_spins_intro": "Kamu butuh minimal 4 muka Kakek Zeus untuk jebol ke babak bonus.",
      "free_spins_4_scatter": "4 Muka Zeus",
      "free_spins_4_scatter_desc": "Membuka 15 Freespin gratis dengan tambahan nilai kelipatan yang tidak hilang.",
      "faq_title": "Tanya Jawab Slot Gacor",
      "faq_q1_question": "Berapa Maxwin di Kakek Zeus?",
      "faq_q1_answer": "Maxwin terbesar adalah 5.000x dari taruhan awal yang kamu bet.",
      "faq_q2_question": "Apa itu RTP Kakek Zeus?",
      "faq_q2_answer": "RTP live nya mencapai 96.5% dengan Volatilitas yang amat sangat TINGGI.",
      "faq_q3_question": "Kapan jam gacor main Gates Of Olympus?",
      "faq_q3_answer": "Pola jam gacor sering berubah, gunakan demo slot ini untuk mencari pola tarikan petir hari ini.",
      "cta_title": "Siap Disambar Petir Merah?",
      "cta_subtitle: ": "Mainkan Kakek Zeus sekarang juga",
      "cta_button_demo_text": "Main Slot Demo",
      "cta_button_real_text": "Main Uang Asli Rupiah"
    },
    // IN (India Hindi)
    "hi": {
      "seo_title": "गेट्स ऑफ ओलंपस स्लॉट ᐈ मुफ़्त डेमो खेलें | Pragmatic Play",
      "seo_description": "भारत में गेट्स ऑफ ओलंपस (Gates of Olympus) स्लॉट मुफ़्त में खेलें। 500x ज़ीउस गुणक और 5000x जीतने के तरीके।",
      "seo_h1": "गेट्स ऑफ ओलंपस स्लॉट गेम",
      "seo_keywords_primary": "gates of olympus slot hindi, gates of olympus demo",
      "seo_keywords_lsi": "pragmatic slots games india",
      "overview_title": "गेट्स ऑफ ओलंपस: ज़ीउस का राज",
      "overview_keyword_1": "ज़ीउस स्लॉट",
      "overview_description_1": "यह 6x5 ग्रिड पर टम्बलिंग सुविधा का उपयोग करता है जिससे लगातार जीत होती है।",
      "overview_keyword_2": "मल्टीप्लायर (गुणक)",
      "overview_description_2": "ज़ीउस स्क्रीन पर 500x तक का गुणक फेंक सकता है जिससे आपकी जीत आसमान छू सकती है।",
      "mechanics_title": "कैसे खेलें?",
      "mechanics_intro": "चूंकि यह 'पे एनीवेयर' है, जीतने के लिए आपको कहीं भी 8 समान प्रतीक चाहिए।",
      "mechanics_cascade_title": "टम्बलिंग सुविधा",
      "mechanics_cascade_description": "जीतने वाले प्रतीक हट जाते हैं और ऊपर से नए प्रतीक गिरते हैं।",
      "mechanics_multipliers_title": "ज़ीउस गुणक",
      "mechanics_multipliers_description": "जादूई गेंदें आपकी जीत को 2 गुना से 500 गुना तक बढ़ा सकती हैं।",
      "free_spins_title": "मुफ्त स्पिन (Free Spins)",
      "free_spins_intro": "बोनस राउंड को खोलने के लिए स्क्रीन पर 4 ज़ीउस (Scatter) लाएं।",
      "free_spins_4_scatter": "4 स्कैटर (Scatter)",
      "free_spins_4_scatter_desc": "आपको 15 मुफ्त स्पिन और कुल बेट का 3 गुना मिलता है।",
      "faq_title": "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
      "faq_q1_question": "मैक्स विन (Max Win) क्या है?",
      "faq_q1_answer": "आप अपनी बेट का 5000x तक जीत सकते हैं।",
      "faq_q2_question": "क्या मैं भारतीय रुपये (INR) में खेल सकता हूँ?",
      "faq_q2_answer": "हाँ, ऑरिजिनल कैसीनो रुपये (INR) में डिपॉजिट स्वीकार करते हैं।",
      "faq_q3_question": "क्या यह मोबाइल पर उपलब्ध है?",
      "faq_q3_answer": "हाँ, यह स्मार्टफोन पर बहुत तेज़ और बढ़िया चलता है।",
      "cta_title": "जीतने के लिए तैयार हैं?",
      "cta_subtitle: ": "ज़ीउस से भिड़ने का समय आ गया है",
      "cta_button_demo_text": "मुफ़्त डेमो खेलें",
      "cta_button_real_text": "असली पैसे से खेलें"
    }
  };

  // We map the missing languages to base dictionaries, replacing localization specifics
  const mappedGeos = {
    'en': dict.en,
    'en-CA': { ...dict.en, seo_title: "Gates of Olympus Slot Canada ᐈ Payouts & Demo" },
    'en-UG': { ...dict.en, seo_title: "Gates of Olympus Uganda ᐈ Win 5000x | Play Demo" },
    'en-IN': { ...dict.en, seo_title: "Gates of Olympus India ᐈ Play Demo in INR" },
    'pt-BR': dict['pt-BR'],
    'es': dict.es,
    'es-CL': { ...dict.es, seo_title: "Tragamonedas Gates of Olympus Chile ᐈ Demo Gratis", cta_button_real_text: "Jugar con Pesos Chilenos" },
    'es-AR': { ...dict.es, seo_title: "Tragamonedas Gates of Olympus Argentina ᐈ Demo Gratis", cta_button_real_text: "Jugar con Pesos Argentinos" },
    'es-CO': { ...dict.es, seo_title: "Tragamonedas Gates of Olympus Colombia ᐈ Demo Gratis", cta_button_real_text: "Jugar con Pesos Colombianos" },
    'de': dict.de,
    'tr': dict.tr,
    'ru': dict.ru,
    'hi': dict.hi,
    'id': dict.id,
    'uz': { ...dict.ru, seo_title: "Gates of Olympus O'zbekiston ᐈ O'ynash Demo", cta_button_real_text: "Haqiqiy Pul Bilan O'ynang" }, // Fallback logic
    'az': { ...dict.tr, seo_title: "Gates of Olympus Azerbaycan ᐈ Oyna Demo", cta_button_real_text: "Real Pul ilə Oyna" }, // Fallback logic
    'bn': { ...dict.en, seo_title: "Gates of Olympus Bangladesh ᐈ Play Demo Casino" }, // Fallback logic
    'fr-SN': { ...dict.en, // Extremely basic fallback to English for Africa if French is not fully coded
      seo_title: "Gates of Olympus Senegal ᐈ Machine à Sous",
      seo_description: "Jouez à Gates of Olympus au Sénégal. Accédez aux spins gratuits et gagnez grand avec Pragmatic Play.",
      cta_button_demo_text: "Jouer Demo", cta_button_real_text: "Jouer Pour De L'argent Vrai"
    }
  };

  try {
    const slotRes = await fetch(`${API_URL}/admin/${SLOT_ID}`);
    if (!slotRes.ok) throw new Error('Slot fetch failed');
    const responseData = await slotRes.json();
    const slot = responseData.data;
    
    // Merge the deeply localized mapped keys
    const updatedLocalizations = {
      ...slot.localizations,
      ...mappedGeos
    };

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
      console.log(`✅ 18 GEOs DEEP LOCALIZATION SUCCESSFULLY INJECTED! Total GEOs: ${updatedGeoRegions.length}`);
    } else {
      console.error('❌ Update failed:', await updateRes.text());
    }
  } catch (error) {
    console.error('❌ Script crashed:', error);
  }
}

runDeepLocalization();
