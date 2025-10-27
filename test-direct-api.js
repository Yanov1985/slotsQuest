const BASE_URL = 'http://localhost:3001/api';

async function testDirectAPI() {
  try {
    console.log('🔍 Прямая проверка API...');
    
    // Получаем слот через админ API
    const response = await fetch(`${BASE_URL}/slots/admin/cmeocg6s70009u5domxldnd8g`);
    const result = await response.json();
    
    console.log('📦 Полный ответ API:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.data) {
      console.log('\n🎯 Проверка ante_bet полей:');
      console.log('- ante_bet_title:', result.data.ante_bet_title);
      console.log('- ante_bet_description:', result.data.ante_bet_description);
      console.log('- ante_bet_warning:', result.data.ante_bet_warning);
    }
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
}

testDirectAPI();