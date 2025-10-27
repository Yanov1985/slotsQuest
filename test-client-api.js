const BASE_URL = 'http://localhost:3001/api';

async function testClientAPI() {
  try {
    console.log('🔍 Проверка клиентского API...');
    
    // Получаем слот через клиентский API по slug
    const response = await fetch(`${BASE_URL}/slots/test-slot-1`);
    const result = await response.json();
    
    console.log('📦 Полный ответ клиентского API:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.data) {
      console.log('\n🎯 Проверка ante_bet полей в клиентском API:');
      console.log('- ante_bet_title:', result.data.ante_bet_title);
      console.log('- ante_bet_description:', result.data.ante_bet_description);
      console.log('- ante_bet_warning:', result.data.ante_bet_warning);
    }
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
}

testClientAPI();