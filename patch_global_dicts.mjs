import fs from 'fs';

const injectDictionaries = () => {
  // 1. SlotHero
  let fHero = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotHero.vue', 'utf8');
  if (!fHero.includes('fr: { plays:')) {
    fHero = fHero.replace(/es: { plays: 'jugadas'[^}]+}/, `$&,
  fr: { plays: 'parties', rate: 'Évaluer', submit: 'Envoyer', cancel: 'Annuler', voteCounted: 'Vote enregistré!', playFreeDemo: 'Jouer Démo', playForReal: 'Argent Réel', demo: 'DÉMO', real: 'RÉEL', reviews: 'avis' },
  it: { plays: 'giocate', rate: 'Valuta', submit: 'Invia', cancel: 'Annulla', voteCounted: 'Voto registrato!', playFreeDemo: 'Demo Gratuita', playForReal: 'Soldi Veri', demo: 'DEMO', real: 'REALE', reviews: 'recensioni' },
  pl: { plays: 'gier', rate: 'Oceń', submit: 'Wyślij', cancel: 'Anuluj', voteCounted: 'Głos zapisany!', playFreeDemo: 'Zagraj za darmo', playForReal: 'Prawdziwe Pieniądze', demo: 'DEMO', real: 'REAL', reviews: 'opinii' },
  hi: { plays: 'खेल', rate: 'रेट करें', submit: 'सबमिट', cancel: 'रद्द करें', voteCounted: 'वोट दर्ज!', playFreeDemo: 'मुफ्त डेमो खेलें', playForReal: 'असली पैसे से खेलें', demo: 'डेमो', real: 'असली', reviews: 'समीक्षा' }`);
    fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotHero.vue', fHero);
  }

  // 2. SlotCharacteristics
  let fChar = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotCharacteristics.vue', 'utf8');
  if (!fChar.includes('fr: { char:')) {
    fChar = fChar.replace(/es: { char: 'Características'[^}]+}/, `$&,
  fr: { char: 'Caractéristiques', return: 'Retour', highRate: 'Élevé', risk: 'Risque', medRisk: 'Risque moyen', volatility: 'Volatilité', maxWin: 'Gain Max', potential: 'Potentiel', reelsLines: 'Rouleaux / Lignes', grid: 'Grille', mechanics: 'Mécaniques', features: 'Fonctions', bonus: 'Bonus', themes: 'Thèmes', genres: 'Genres', release: 'Sortie', newTitle: 'Nouveau' },
  it: { char: 'Caratteristiche', return: 'Ritorno', highRate: 'Alto', risk: 'Rischio', medRisk: 'Medio', volatility: 'Volatilità', maxWin: 'Vincita Max', potential: 'Potenziale', reelsLines: 'Rulli / Linee', grid: 'Griglia', mechanics: 'Meccaniche', features: 'Funzioni', bonus: 'Bonus', themes: 'Temi', genres: 'Generi', release: 'Uscita', newTitle: 'Nuovo' },
  pl: { char: 'Charakterystyka', return: 'Zwrot', highRate: 'Wysoki', risk: 'Ryzyko', medRisk: 'Ryzyko średnie', volatility: 'Zmienność', maxWin: 'Max Wygrana', potential: 'Potencjał', reelsLines: 'Bębny / Linie', grid: 'Siatka', mechanics: 'Mechanika', features: 'Funkcje', bonus: 'Bonus', themes: 'Motywy', genres: 'Gatunki', release: 'Premiera', newTitle: 'Nowość' },
  hi: { char: 'विशेषताएं', return: 'वापसी', highRate: 'उच्च', risk: 'जोखिम', medRisk: 'मध्यम', volatility: 'अस्थिरता', maxWin: 'अधिकतम जीत', potential: 'क्षमता', reelsLines: 'रील्स / लाइन्स', grid: 'ग्रिड', mechanics: 'मैकेनिक्स', features: 'फीचर्स', bonus: 'बोनस', themes: 'थीम्स', genres: 'शैलियां', release: 'रिलीज़', newTitle: 'नया' }`);
    fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotCharacteristics.vue', fChar);
  }

  // 3. SlotInfoModal
  let fModal = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue', 'utf8');
  if (!fModal.includes('fr: {')) {
    // Regex matching the end of the 'es' object precisely
    fModal = fModal.replace(/es: {[\s\S]*?playDemoNow: 'Jugar Demo Ahora'\s*},/, `$&
  fr: {
    expertVerdict: 'Verdict de l\\'Expert', devFallback: 'le développeur', isA: 'est une machine à sous à', volSlot: 'volatilité avec un RTP de', andMaxWin: 'et un gain max de', aboveRTP: 'Le RTP le rend excellent pour les longues sessions.', belowRTP: 'Il offre une expérience équilibrée.', overallRate: 'Nous le notons', forIts: '/5 pour son', highPot: 'potentiel de gains élevés.', balPot: 'gameplay équilibré.', prosCons: 'Avantages et Inconvénients', pros: 'Avantages', cons: 'Inconvénients', faq: 'Questions Fréquentes', reviewAnalysis: 'Avis et Analyse', howToPlay: 'Comment Jouer', similarSlots: 'Slots Similaires', freePlayDemo: 'Démo Gratuite', demoDesc: 'Essayez ce jeu gratuitement sans argent réel.', playDemoNow: 'Jouer la Démo'
  },
  it: {
    expertVerdict: 'Verdetto dell\\'Esperto', devFallback: 'lo sviluppatore', isA: 'è una slot ad', volSlot: 'volatilità con un RTP del', andMaxWin: 'e una vincita massima di', aboveRTP: 'L\\'RTP la rende un\\'ottima scelta per lunghe sessioni.', belowRTP: 'Offre un\\'esperienza equilibrata.', overallRate: 'Valutiamo', forIts: '/5 per il suo', highPot: 'emozionante potenziale.', balPot: 'gameplay equilibrato.', prosCons: 'Pro e Contro', pros: 'Pro', cons: 'Contro', faq: 'Domande Frequenti', reviewAnalysis: 'Recensione', howToPlay: 'Come Giocare', similarSlots: 'Slot Simili', freePlayDemo: 'Prova Gratuita', demoDesc: 'Prova questa slot facilmente e gratis.', playDemoNow: 'Gioca la Demo'
  },
  pl: {
    expertVerdict: 'Werdykt Eksperta', devFallback: 'deweloper', isA: 'to automat o', volSlot: 'zmienności z RTP w wysokości', andMaxWin: 'i maksymalną wygraną', aboveRTP: 'RTP czyni to solidnym wyborem na długie gry.', belowRTP: 'Dostarcza zrównoważone doświadczenie.', overallRate: 'Oceniamy go na', forIts: '/5 za jego', highPot: 'ekscytujący potencjał.', balPot: 'zrównoważoną rozgrywkę.', prosCons: 'Plusy i Minusy', pros: 'Zalety', cons: 'Wady', faq: 'Częste Pytania', reviewAnalysis: 'Recenzje i Analiza', howToPlay: 'Jak Grać', similarSlots: 'Podobne Gry', freePlayDemo: 'Darmowe Demo', demoDesc: 'Możesz wypróbować tę grę za darmo.', playDemoNow: 'Zagraj w Demo'
  },
  hi: {
    expertVerdict: 'विशेषज्ञ का निर्णय', devFallback: 'डेवलपर', isA: 'एक', volSlot: 'अस्थिरता वाला स्लॉट है जिसका RTP', andMaxWin: 'और अधिकतम जीत', aboveRTP: 'औसत से अधिक RTP इसे एक ठोस विकल्प बनाता है।', belowRTP: 'यह एक संतुलित अनुभव प्रदान करता है।', overallRate: 'हम इसे', forIts: '/5 रेट करते हैं इसके', highPot: 'रोमांचक जीत की क्षमता के लिए।', balPot: 'संतुलित गेमप्ले के लिए।', prosCons: 'पक्ष और विपक्ष', pros: 'फायदे', cons: 'नुकसान', faq: 'अक्सर पूछे जाने वाले प्रश्न', reviewAnalysis: 'समीक्षा', howToPlay: 'कैसे खेलें', similarSlots: 'समान स्लॉट', freePlayDemo: 'मुफ्त डेमो', demoDesc: 'आप इस स्लॉट को बिना पैसे के आज़मा सकते हैं।', playDemoNow: 'डेमो खेलें'
  },`);
    fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue', fModal);
  }

  // 4. [slug].vue arrays
  let fSlug = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/pages/slots/[slug].vue', 'utf8');
  if (!fSlug.includes('fr: {')) {
    fSlug = fSlug.replace(/es: {[\s\S]*?htp4a: 'Obtén símbolos especiales para ganar premios mayores.'\s*}/, `$&,
  fr: {
    pro1: 'Graphismes de haute qualité', pro2: 'Tours de bonus passionnants', pro3: 'Interface adaptée aux mobiles',
    con1: 'La forte volatilité peut ne pas convenir à tous', con2: 'Le jeu bonus est difficile à déclencher',
    howTo1: 'Choisissez la mise', howTo2: 'Ajustez votre mise', howTo3: 'Tournez les rouleaux', howTo4: 'Cliquez sur Jouer', howTo5: 'Comprenez les paiements', howTo6: 'Vérifiez la table des gains',
    faq1q: 'Est-ce sûr de jouer ?', faq1a: 'Oui, c\\'est développé par un fournisseur licencié.', faq2q: 'Quel est le RTP ?', faq2a: 'Le RTP offre un bon retour théorique.', faq3q: 'Puis-je jouer gratuitement ?', faq3a: 'Oui, en mode démo sur notre site.', faq4q: 'Gain maximum ?', faq4a: 'Le potentiel de gain est très attractif.', faq5q: 'Volatilité ?', faq5a: 'La volatilité indique la fréquence des gains.',
    rev1: 'est un de mes favoris ! Graphismes superbes.', rev2: 'Très bonne machine, je joue souvent en démo.', rev3: 'Belle réalisation du développeur.',
    htp1: 'Ouvrir la Démo', htp1a: 'Cliquez sur jouer.', htp2: 'Régler la mise', htp2a: 'Utilisez les contrôles.', htp3: 'Tourner', htp3a: 'Cliquez sur Tourner.', htp4: 'Bonus', htp4a: 'Attendez les symboles spéciaux.'
  },
  it: {
    pro1: 'Grafica di alta qualità', pro2: 'Giri bonus emozionanti', pro3: 'Interfaccia compatibile per smartphone',
    con1: 'L\\'alta volatilità non è per tutti', con2: 'Il gioco bonus è difficile da attivare',
    howTo1: 'Scegli la puntata', howTo2: 'Regola la tua scommessa', howTo3: 'Gira i rulli', howTo4: 'Clicca su Gioca', howTo5: 'Capisci i pagamenti', howTo6: 'Controlla la tabella dei pagamenti',
    faq1q: 'È sicuro giocare?', faq1a: 'Sì, è sviluppato da fornitori con licenza.', faq2q: 'Qual è l\\'RTP?', faq2a: 'L\\'RTP offre rendimenti teorici solidi.', faq3q: 'Posso giocare gratis?', faq3a: 'Sì, usa la nostra modalità demo.', faq4q: 'Vincita massima?', faq4a: 'Ottimo potenziale di vincita.', faq5q: 'Volatilità?', faq5a: 'La volatilità indica la frequenza dei pagamenti.',
    rev1: 'è la mia slot preferita! Grafica fantastica.', rev2: 'Buona slot, ci gioco sempre in demo.', rev3: 'Slot molto divertente e potenziale alto.',
    htp1: 'Apri la Demo', htp1a: 'Clicca su gioca.', htp2: 'Punta', htp2a: 'Imposta i coin.', htp3: 'Gira', htp3a: 'Clicca sul tasto per girare.', htp4: 'Bonus', htp4a: 'Trova i simboli giusti.'
  },
  pl: {
    pro1: 'Wysoka jakość grafiki', pro2: 'Ekscytujące rundy bonusowe', pro3: 'Interfejs dla urządzeń mobilnych',
    con1: 'Wysoka zmienność może nie odpowiadać każdememu', con2: 'Trudno trafić w bonus',
    howTo1: 'Wybierz zakład', howTo2: 'Użyj przycisków, aby dostosować zakład', howTo3: 'Zakręć', howTo4: 'Kliknij przycisk, aby rozpocząć grę', howTo5: 'Zrozum wypłaty', howTo6: 'Sprawdź zasady gry',
    faq1q: 'Czy to bezpieczne?', faq1a: 'Tak, dostawca jest w pełni licencjonowany.', faq2q: 'Jaki jest RTP?', faq2a: 'RTP oferuje niezły teoretyczny zwrot.', faq3q: 'Zagram za darmo?', faq3a: 'Tak, zagraj w demo bez rejestracji.', faq4q: 'Maksymalna wygrana?', faq4a: 'Masz wielkie szanse na duże pomnożenie.', faq5q: 'Co to jest zmienność?', faq5a: 'Oznacza, jak rzadko padają wielkie wygrane.',
    rev1: 'jest jedną z moich ulubionych! Piękna grafika.', rev2: 'Super świetne demo do przetestowania.', rev3: 'Dostawca zrobił genialną maszynę. Oceniam wysoko.',
    htp1: 'Otwórz Demo', htp1a: 'Kliknij graj na tej stronie.', htp2: 'Ustaw Zakład', htp2a: 'Dostosuj wartość na dole.', htp3: 'Zakręć', htp3a: 'Naciśnij spację.', htp4: 'Uruchom Bonus', htp4a: 'Złap symbole Scatter.'
  },
  hi: {
    pro1: 'उच्च गुणवत्ता वाले ग्राफिक्स', pro2: 'शानदार बोनस', pro3: 'मोबाइल के अनुकूल इंटरफ़ेस',
    con1: 'उच्च अस्थिरता सभी के लिए नहीं हो सकती है', con2: 'बोनस गेम मुश्किल है',
    howTo1: 'अपना दांव चुनें', howTo2: 'दांव सेट करने के लिए बटन का उपयोग करें', howTo3: 'रीलों को स्पिन करें', howTo4: 'खेलने के लिए स्पिन पर क्लिक करें', howTo5: 'भुगतान को समझें', howTo6: 'पे-टेबल देखें',
    faq1q: 'क्या यह सुरक्षित है?', faq1a: 'हां, यह एक लाइसेंस प्राप्त प्रदाता से है।', faq2q: 'RTP क्या है?', faq2a: 'RTP एक ठोस सैद्धांतिक वापसी प्रदान करता है।', faq3q: 'क्या मैं मुफ्त में खेल सकता हूँ?', faq3a: 'हाँ, बिना पंजीकरण के डेमो खेलें।', faq4q: 'अधिकतम जीत क्या है?', faq4a: 'अधिकतम जीत शानदार है।', faq5q: 'अस्थिरता क्या है?', faq5a: 'अस्थिरता लाभ की आवृत्ति को परिभाषित करती है।',
    rev1: 'मेरे पसंदीदा स्लॉट्स में से एक है! एनिमेशन बहुत बढ़िया है।', rev2: 'बहुत अच्छा खेल, पैसे लगाने से पहले डेमो खेलें।', rev3: 'बहुत रोमांचक स्लॉट और अच्छा ग्राफिक्स।',
    htp1: 'डेमो खोलें', htp1a: 'खेलने के लिए क्लिक करें।', htp2: 'शर्त तय करें', htp2a: 'अपनी शर्त सेट करें।', htp3: 'स्पिन', htp3a: 'घुमाएं।', htp4: 'बोनस', htp4a: 'विशेष प्रतीकों को पकड़ें।'
  }`);
    fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/pages/slots/[slug].vue', fSlug);
  }
};

injectDictionaries();
console.log('Successfully injected French, Italian, Polish, and Hindi dictionaries!');
