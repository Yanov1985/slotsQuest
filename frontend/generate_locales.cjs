const fs = require('fs')
const path = require('path')

const translations = {
  "en": {
    "nav": { "catalog": "Catalog", "hero_desc": "Find your favorite slot game" },
    "filters": { "popular": "Popular", "newest": "Newest", "a_z": "A - Z", "all_slots": "All Slots" },
    "empty_state": { "title": "No slots found", "desc": "Try changing your filters or search terms" },
    "error_state": { "title": "Error Loading Catalog", "btn": "Try Again" },
    "buttons": { "play_for_free": "Play for free", "play_for_money": "Play for money", "back_to_catalog": "Back to Catalog" }
  },
  "ru": {
    "nav": { "catalog": "Каталог", "hero_desc": "Найдите свой любимый слот" },
    "filters": { "popular": "Популярные", "newest": "Новые", "a_z": "А - Я", "all_slots": "Все слоты" },
    "empty_state": { "title": "Слоты не найдены", "desc": "Попробуйте изменить фильтры или условия поиска" },
    "error_state": { "title": "Ошибка загрузки каталога", "btn": "Попробовать снова" },
    "buttons": { "play_for_free": "Играть бесплатно", "play_for_money": "Играть на деньги", "back_to_catalog": "Назад в Каталог" }
  },
  "pt-BR": {
    "nav": { "catalog": "Catálogo", "hero_desc": "Encontre o seu slot favorito" },
    "filters": { "popular": "Populares", "newest": "Mais novos", "a_z": "A - Z", "all_slots": "Todos os Slots" },
    "empty_state": { "title": "Nenhum slot encontrado", "desc": "Tente alterar seus filtros ou termos de pesquisa" },
    "error_state": { "title": "Erro ao carregar o catálogo", "btn": "Tentar novamente" },
    "buttons": { "play_for_free": "Jogar grátis", "play_for_money": "Jogar a dinheiro", "back_to_catalog": "Voltar ao Catálogo" }
  },
  "es-CL": {
    "nav": { "catalog": "Catálogo", "hero_desc": "Encuentra tu tragamonedas favorita" },
    "filters": { "popular": "Populares", "newest": "Más nuevos", "a_z": "A - Z", "all_slots": "Todas las Tragamonedas" },
    "empty_state": { "title": "No se encontraron tragamonedas", "desc": "Intenta cambiar tus filtros o términos de búsqueda" },
    "error_state": { "title": "Error al cargar el catálogo", "btn": "Intentar de nuevo" },
    "buttons": { "play_for_free": "Jugar gratis", "play_for_money": "Jugar por dinero", "back_to_catalog": "Volver al Catálogo" }
  },
  "es-AR": {
    "nav": { "catalog": "Catálogo", "hero_desc": "Encuentra tu tragamonedas favorita" },
    "filters": { "popular": "Populares", "newest": "Más nuevos", "a_z": "A - Z", "all_slots": "Todas las Tragamonedas" },
    "empty_state": { "title": "No se encontraron tragamonedas", "desc": "Intenta cambiar tus filtros o términos de búsqueda" },
    "error_state": { "title": "Error al cargar el catálogo", "btn": "Intentar de nuevo" },
    "buttons": { "play_for_free": "Jugar gratis", "play_for_money": "Jugar por dinero", "back_to_catalog": "Volver al Catálogo" }
  },
  "es-CO": {
    "nav": { "catalog": "Catálogo", "hero_desc": "Encuentra tu tragamonedas favorita" },
    "filters": { "popular": "Populares", "newest": "Más nuevos", "a_z": "A - Z", "all_slots": "Todas las Tragamonedas" },
    "empty_state": { "title": "No se encontraron tragamonedas", "desc": "Intenta cambiar tus filtros o términos de búsqueda" },
    "error_state": { "title": "Error al cargar el catálogo", "btn": "Intentar de nuevo" },
    "buttons": { "play_for_free": "Jugar gratis", "play_for_money": "Jugar por dinero", "back_to_catalog": "Volver al Catálogo" }
  },
  "ca": {
    "nav": { "catalog": "Catalog", "hero_desc": "Find your favorite slot game" },
    "filters": { "popular": "Popular", "newest": "Newest", "a_z": "A - Z", "all_slots": "All Slots" },
    "empty_state": { "title": "No slots found", "desc": "Try changing your filters or search terms" },
    "error_state": { "title": "Error Loading Catalog", "btn": "Try Again" },
    "buttons": { "play_for_free": "Play for free", "play_for_money": "Play for money", "back_to_catalog": "Back to Catalog" }
  },
  "hi-IN": {
    "nav": { "catalog": "कैटलॉग", "hero_desc": "अपना पसंदीदा स्लॉट गेम खोजें" },
    "filters": { "popular": "लोकप्रिय", "newest": "नवीनतम", "a_z": "A - Z", "all_slots": "सभी स्लॉट" },
    "empty_state": { "title": "कोई स्लॉट नहीं मिला", "desc": "अपने फ़िल्टर या खोज शब्द बदलने का प्रयास करें" },
    "error_state": { "title": "कैटलॉग लोड करने में त्रुटि", "btn": "पुनः प्रयास करें" },
    "buttons": { "play_for_free": "मुफ्त में खेलें", "play_for_money": "पैसे के लिए खेलें", "back_to_catalog": "कैटलॉग पर वापस जाएँ" }
  },
  "tr": {
    "nav": { "catalog": "Katalog", "hero_desc": "Favori slot oyununuzu bulun" },
    "filters": { "popular": "Popüler", "newest": "En Yeni", "a_z": "A - Z", "all_slots": "Tüm Slotlar" },
    "empty_state": { "title": "Slot bulunamadı", "desc": "Filtrelerinizi veya arama kelimelerinizi değiştirmeyi deneyin" },
    "error_state": { "title": "Katalog Yüklenirken Hata", "btn": "Tekrar Dene" },
    "buttons": { "play_for_free": "Ücretsiz Oyna", "play_for_money": "Paralı Oyna", "back_to_catalog": "Kataloğa Geri Dön" }
  },
  "uz": {
    "nav": { "catalog": "Katalog", "hero_desc": "Sevimli slot o'yiningizni toping" },
    "filters": { "popular": "Ommabop", "newest": "Eng yangi", "a_z": "A - Z", "all_slots": "Barcha Slotlar" },
    "empty_state": { "title": "Slotlar topilmadi", "desc": "Filtrlarni yoki qidiruv so'zlarini o'zgartirib ko'ring" },
    "error_state": { "title": "Katalogni yuklashda xato", "btn": "Qayta urinib ko'ring" },
    "buttons": { "play_for_free": "Bepul o'ynash", "play_for_money": "Pulga o'ynash", "back_to_catalog": "Katalogga qaytish" }
  },
  "az": {
    "nav": { "catalog": "Kataloq", "hero_desc": "Sevmli slot oyununuzu tapın" },
    "filters": { "popular": "Populyar", "newest": "Ən yeni", "a_z": "A - Z", "all_slots": "Bütün Slotlar" },
    "empty_state": { "title": "Slot tapılmadı", "desc": "Filtrləri və ya axtarış sözlərini dəyişdirməyə çalışın" },
    "error_state": { "title": "Kataloq yüklənərkən xəta", "btn": "Yenidən cəhd et" },
    "buttons": { "play_for_free": "Pulsuz oyna", "play_for_money": "Məbləğlə oyna", "back_to_catalog": "Kataloqa qayıt" }
  },
  "id": {
    "nav": { "catalog": "Katalog", "hero_desc": "Temukan game slot favorit Anda" },
    "filters": { "popular": "Populer", "newest": "Terbaru", "a_z": "A - Z", "all_slots": "Semua Slot" },
    "empty_state": { "title": "Tidak ada slot yang ditemukan", "desc": "Coba ubah filter atau kata pencarian Anda" },
    "error_state": { "title": "Kesalahan Memuat Katalog", "btn": "Coba Lagi" },
    "buttons": { "play_for_free": "Main gratis", "play_for_money": "Main dengan uang", "back_to_catalog": "Kembali ke Katalog" }
  },
  "bn": {
    "nav": { "catalog": "ক্যাটালগ", "hero_desc": "আপনার প্রিয় স্লট গেম খুঁজুন" },
    "filters": { "popular": "জনপ্রিয়", "newest": "নতুন", "a_z": "A - Z", "all_slots": "সব স্লট" },
    "empty_state": { "title": "কোনো স্লট পাওয়া যায়নি", "desc": "আপনার ফিল্টার বা সার্চ টার্ম পরিবর্তন করার চেষ্টা করুন" },
    "error_state": { "title": "ক্যাটালগ লোড করতে ত্রুটি", "btn": "আবার চেষ্টা করুন" },
    "buttons": { "play_for_free": "বিনামূল্যে খেলুন", "play_for_money": "টাকা দিয়ে খেলুন", "back_to_catalog": "ক্যাটালগে ফিরে যান" }
  }
}

fs.mkdirSync(path.join(__dirname, 'locales'), { recursive: true });
for (const [lang, dict] of Object.entries(translations)) {
  fs.writeFileSync(path.join(__dirname, 'locales', `${lang}.json`), JSON.stringify(dict, null, 2));
}
console.log('Successfully generated ' + Object.keys(translations).length + ' translation dictionaries.');
