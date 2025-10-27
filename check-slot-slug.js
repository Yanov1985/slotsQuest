const BASE_URL = 'http://localhost:3001/api';

async function checkSlotSlug() {
  try {
    console.log('🔍 Проверяем slug тестового слота...');
    
    // Получаем слот по ID через админ API
    const adminResponse = await fetch(`${BASE_URL}/slots/admin/cmeocg6s70009u5domxldnd8g`);
    const adminResult = await adminResponse.json();
    
    if (adminResult.data) {
      console.log('📋 Информация о слоте:');
      console.log('- ID:', adminResult.data.id);
      console.log('- Name:', adminResult.data.name);
      console.log('- Slug:', adminResult.data.slug);
      
      // Теперь попробуем получить слот по правильному slug
      if (adminResult.data.slug) {
        console.log('\n🔄 Проверяем клиентский API с правильным slug...');
        const clientResponse = await fetch(`${BASE_URL}/slots/${adminResult.data.slug}`);
        const clientResult = await clientResponse.json();
        
        console.log('📦 Ответ клиентского API:');
        console.log(JSON.stringify(clientResult, null, 2));
        
        if (clientResult && !clientResult.statusCode) {
          console.log('\n🎯 Проверка ante_bet полей в клиентском API:');
          console.log('- ante_bet_title:', clientResult.ante_bet_title);
          console.log('- ante_bet_description:', clientResult.ante_bet_description);
          console.log('- ante_bet_warning:', clientResult.ante_bet_warning);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
}

checkSlotSlug();