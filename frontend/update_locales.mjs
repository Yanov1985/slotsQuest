import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const extraTranslations = {
  "en": {
    "nav": { "home": "Home" },
    "footer": {
      "description_default": "The ultimate catalog for slot enthusiasts. Explore thousands of games, analyze mechanics, and find your next favorite slot with our advanced data-driven platform.",
      "nav_title": "Navigation",
      "legal_title": "Legal & Support",
      "compliance_title": "Compliance",
      "warning_18": "Strictly for adults 18 and older. Gambling can be addictive.",
      "info_only": "is an informational site. We do not offer real money gambling. Please check local laws before visiting external links.",
      "rights_reserved": "All rights reserved. Built for enthusiasts.",
      "secure_platform": "Secure Platform",
      "verified_data": "Verified Data"
    },
    "slug": {
      "back_to": "Back to",
      "slot_not_found": "Slot Not Found",
      "go_to_catalog": "Go to Catalog",
      "awards_and_achievements": "Awards and Achievements",
      "overview": "Overview",
      "core_mechanics": "Core Mechanics"
    }
  },
  "ru": {
    "nav": { "home": "Главная" },
    "footer": {
      "description_default": "Ультимативный каталог для любителей слотов. Исследуйте тысячи игр, анализируйте механики и найдите свой любимый слот с помощью нашей передовой платформы.",
      "nav_title": "Навигация",
      "legal_title": "Юридическая информация",
      "compliance_title": "Соответствие",
      "warning_18": "Строго для лиц старше 18 лет. Азартные игры могут вызывать зависимость.",
      "info_only": "информационный сайт. Мы не предлагаем азартные игры на реальные деньги. Проверяйте местные законы.",
      "rights_reserved": "Все права защищены. Создано для энтузиастов.",
      "secure_platform": "Безопасная платформа",
      "verified_data": "Проверенные данные"
    },
    "slug": {
      "back_to": "Вернуться в",
      "slot_not_found": "Слот не найден",
      "go_to_catalog": "Перейти в каталог",
      "awards_and_achievements": "Награды и достижения",
      "overview": "Обзор",
      "core_mechanics": "Основные механики"
    }
  },
  "pt-BR": {
    "nav": { "home": "Início" },
    "footer": {
      "description_default": "O catálogo definitivo para entusiastas de slots. Explore milhares de jogos, analise mecânicas e encontre seu próximo slot favorito.",
      "nav_title": "Navegação",
      "legal_title": "Legal e Suporte",
      "compliance_title": "Conformidade",
      "warning_18": "Estritamente para maiores de 18 anos. O jogo pode viciar.",
      "info_only": "é um site informativo. Não oferecemos apostas com dinheiro real.",
      "rights_reserved": "Todos os direitos reservados.",
      "secure_platform": "Plataforma Segura",
      "verified_data": "Dados Verificados"
    },
    "slug": {
      "back_to": "Voltar para",
      "slot_not_found": "Slot não encontrado",
      "go_to_catalog": "Ir para o Catálogo",
      "awards_and_achievements": "Prêmios e Conquistas",
      "overview": "Visão Geral",
      "core_mechanics": "Mecânicas Principais"
    }
  },
  "es-CL": {
    "nav": { "home": "Inicio" },
    "footer": {
      "description_default": "El catálogo definitivo para entusiastas de las tragamonedas. Explora miles de juegos.",
      "nav_title": "Navegación",
      "legal_title": "Legal y Soporte",
      "compliance_title": "Cumplimiento",
      "warning_18": "Estrictamente para mayores de 18 años. El juego puede ser adictivo.",
      "info_only": "es un sitio informativo. No ofrecemos apuestas con dinero real.",
      "rights_reserved": "Todos los derechos reservados.",
      "secure_platform": "Plataforma Segura",
      "verified_data": "Datos Verificados"
    },
    "slug": {
      "back_to": "Volver a",
      "slot_not_found": "Tragamonedas no encontrada",
      "go_to_catalog": "Ir al Catálogo",
      "awards_and_achievements": "Premios y Logros",
      "overview": "Descripción General",
      "core_mechanics": "Mecánicas Principales"
    }
  },
  "es-AR": {
    "nav": { "home": "Inicio" },
    "footer": {
      "description_default": "El catálogo definitivo para entusiastas de las tragamonedas. Explora miles de juegos.",
      "nav_title": "Navegación",
      "legal_title": "Legal y Soporte",
      "compliance_title": "Cumplimiento",
      "warning_18": "Estrictamente para mayores de 18 años. El juego puede ser adictivo.",
      "info_only": "es un sitio informativo. No ofrecemos apuestas con dinero real.",
      "rights_reserved": "Todos los derechos reservados.",
      "secure_platform": "Plataforma Segura",
      "verified_data": "Datos Verificados"
    },
    "slug": {
      "back_to": "Volver a",
      "slot_not_found": "Tragamonedas no encontrada",
      "go_to_catalog": "Ir al Catálogo",
      "awards_and_achievements": "Premios y Logros",
      "overview": "Descripción General",
      "core_mechanics": "Mecánicas Principales"
    }
  },
  "es-CO": {
    "nav": { "home": "Inicio" },
    "footer": {
      "description_default": "El catálogo definitivo para entusiastas de las tragamonedas. Explora miles de juegos.",
      "nav_title": "Navegación",
      "legal_title": "Legal y Soporte",
      "compliance_title": "Cumplimiento",
      "warning_18": "Estrictamente para mayores de 18 años. El juego puede ser adictivo.",
      "info_only": "es un sitio informativo. No ofrecemos apuestas con dinero real.",
      "rights_reserved": "Todos los derechos reservados.",
      "secure_platform": "Plataforma Segura",
      "verified_data": "Datos Verificados"
    },
    "slug": {
      "back_to": "Volver a",
      "slot_not_found": "Tragamonedas no encontrada",
      "go_to_catalog": "Ir al Catálogo",
      "awards_and_achievements": "Premios y Logros",
      "overview": "Descripción General",
      "core_mechanics": "Mecánicas Principales"
    }
  },
  "ca": {
    "nav": { "home": "Home" },
    "footer": {
      "description_default": "El catàleg definitiu d'entusiastes.",
      "nav_title": "Navegació",
      "legal_title": "Legal i Suport",
      "compliance_title": "Compliment",
      "warning_18": "Només per a majors de 18 anys.",
      "info_only": "és un lloc informatiu.",
      "rights_reserved": "Tots els drets reservats.",
      "secure_platform": "Plataforma Segura",
      "verified_data": "Dades Verificades"
    },
    "slug": {
      "back_to": "Tornar a",
      "slot_not_found": "Slot No Trobat",
      "go_to_catalog": "Anar al Catàleg",
      "awards_and_achievements": "Premis i Assoliments",
      "overview": "Visió General",
      "core_mechanics": "Mecàniques Principals"
    }
  },
  "hi-IN": {
    "nav": { "home": "घर" },
    "footer": {
      "description_default": "स्लॉट उत्साही लोगों के लिए बेहतरीन कैटलॉग।",
      "nav_title": "नेविगेशन",
      "legal_title": "कानूनी और समर्थन",
      "compliance_title": "अनुपालन",
      "warning_18": "केवल 18 वर्ष और उससे अधिक उम्र के वयस्कों के लिए।",
      "info_only": "एक सूचनात्मक साइट है। हम असली पैसे के खेल की पेशकश नहीं करते हैं।",
      "rights_reserved": "सर्वाधिकार सुरक्षित।",
      "secure_platform": "सुरक्षित प्लेटफॉर्म",
      "verified_data": "सत्यापित डेटा"
    },
    "slug": {
      "back_to": "वापस जाएं",
      "slot_not_found": "स्लॉट नहीं मिला",
      "go_to_catalog": "कैटलॉग पर जाएं",
      "awards_and_achievements": "पुरस्कार और उपलब्धियां",
      "overview": "अवलोकन",
      "core_mechanics": "मुख्य यांत्रिकी"
    }
  },
  "tr": {
    "nav": { "home": "Ana Sayfa" },
    "footer": {
      "description_default": "Slot meraklıları için en iyi katalog. Binlerce oyunu keşfedin.",
      "nav_title": "Navigasyon",
      "legal_title": "Yasal ve Destek",
      "compliance_title": "Uyumluluk",
      "warning_18": "Sadece 18 yaş ve üzeri yetişkinler içindir.",
      "info_only": "bilgilendirici bir sitedir. Gerçek parayla kumar oynamıyoruz.",
      "rights_reserved": "Tüm hakları saklıdır.",
      "secure_platform": "Güvenli Platform",
      "verified_data": "Doğrulanmış Veriler"
    },
    "slug": {
      "back_to": "Geri Dön",
      "slot_not_found": "Slot Bulunamadı",
      "go_to_catalog": "Kataloğa Git",
      "awards_and_achievements": "Ödüller ve Başarılar",
      "overview": "Genel Bakış",
      "core_mechanics": "Temel Mekanikler"
    }
  },
  "uz": {
    "nav": { "home": "Bosh sahifa" },
    "footer": {
      "description_default": "Slot ishqibozlari uchun yakuniy katalog.",
      "nav_title": "Navigatsiya",
      "legal_title": "Huquqiy",
      "compliance_title": "Muvofiqlik",
      "warning_18": "Faqat 18 yoshdan oshganlar uchun.",
      "info_only": "axborot sayti. Biz qimor o'yinlarini taklif qilmaymiz.",
      "rights_reserved": "Barcha huquqlar himoyalangan.",
      "secure_platform": "Xavfsiz platforma",
      "verified_data": "Tasdiqlangan ma'lumotlar"
    },
    "slug": {
      "back_to": "Qaytish",
      "slot_not_found": "Slot topilmadi",
      "go_to_catalog": "Katalogga o'tish",
      "awards_and_achievements": "Mukofotlar va yutuqlar",
      "overview": "Umumiy ko'rinish",
      "core_mechanics": "Asosiy mexanika"
    }
  },
  "az": {
    "nav": { "home": "Ana səhifə" },
    "footer": {
      "description_default": "Slot həvəskarları üçün son kataloq.",
      "nav_title": "Naviqasiya",
      "legal_title": "Hüquqi",
      "compliance_title": "Uyğunluq",
      "warning_18": "Yalnız 18 yaşdan yuxarı böyüklər üçündür.",
      "info_only": "məlumat saytıdır. Qumar təklif etmirik.",
      "rights_reserved": "Bütün hüquqlar qorunur.",
      "secure_platform": "Təhlükəsiz Platforma",
      "verified_data": "Təsdiqlənmiş Məlumat"
    },
    "slug": {
      "back_to": "Qayıt",
      "slot_not_found": "Slot Tapılmadı",
      "go_to_catalog": "Kataloqa get",
      "awards_and_achievements": "Mükafatlar və Nailiyyətlər",
      "overview": "Baxış",
      "core_mechanics": "Əsas Mexanika"
    }
  },
  "id": {
    "nav": { "home": "Beranda" },
    "footer": {
      "description_default": "Katalog terlengkap untuk penggemar slot.",
      "nav_title": "Navigasi",
      "legal_title": "Hukum & Dukungan",
      "compliance_title": "Kepatuhan",
      "warning_18": "Hanya untuk usia 18 ke atas.",
      "info_only": "adalah situs informasi. Kami tidak menawarkan perjudian uang sungguhan.",
      "rights_reserved": "Hak cipta dilindungi undang-undang.",
      "secure_platform": "Platform Aman",
      "verified_data": "Data Terverifikasi"
    },
    "slug": {
      "back_to": "Kembali ke",
      "slot_not_found": "Slot Tidak Ditemukan",
      "go_to_catalog": "Pergi ke Katalog",
      "awards_and_achievements": "Penghargaan dan Prestasi",
      "overview": "Gambaran Umum",
      "core_mechanics": "Mekanika Utama"
    }
  },
  "bn": {
    "nav": { "home": "হোম" },
    "footer": {
      "description_default": "স্লট উত্সাহীদের জন্য চূড়ান্ত ক্যাটালগ।",
      "nav_title": "নেভিগেশন",
      "legal_title": "আইনি সমর্থন",
      "compliance_title": "সম্মতি",
      "warning_18": "শুধুমাত্র 18 বছর বা তার বেশি বয়সের জন্য।",
      "info_only": "একটি তথ্যমূলক সাইট।",
      "rights_reserved": "সর্বস্বত্ব সংরক্ষিত।",
      "secure_platform": "নিরাপদ প্ল্যাটফর্ম",
      "verified_data": "যাচাইকৃত ডেটা"
    },
    "slug": {
      "back_to": "ফিরে যান",
      "slot_not_found": "স্লট পাওয়া যায়নি",
      "go_to_catalog": "ক্যাটালগে যান",
      "awards_and_achievements": "পুরষ্কার এবং অর্জন",
      "overview": "ওভারভিউ",
      "core_mechanics": "মূল মেকানিক্স"
    }
  }
}

const localesDir = path.join(__dirname, 'locales')

for (const [lang, extra] of Object.entries(extraTranslations)) {
  const filePath = path.join(localesDir, `${lang}.json`)
  if (fs.existsSync(filePath)) {
    const original = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    
    // Deep merge for nav (because 'nav' already exists with other keys)
    original.nav = { ...original.nav, ...extra.nav }
    original.footer = extra.footer
    original.slug = extra.slug
    
    fs.writeFileSync(filePath, JSON.stringify(original, null, 2))
    console.log(`Updated ${lang}.json`)
  }
}
console.log('✅ All translations injected successfully.')
