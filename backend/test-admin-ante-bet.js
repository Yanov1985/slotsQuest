const axios = require('axios');

const API_BASE = 'http://localhost:3001/api';
const SLOT_ID = 'cmeocg6s70009u5domxldnd8g'; // Book of Ra Deluxe ID

async function testAnteBetFields() {
  try {
    console.log('🧪 Тестирование полей Ante Bet через админ API...\n');

    // 1. Получаем текущие данные слота
    console.log('1️⃣ Получение текущих данных слота...');
    const getResponse = await axios.get(`${API_BASE}/slots/admin/${SLOT_ID}`);
    const currentSlot = getResponse.data.data; // Добавляем .data для правильного доступа
    
    console.log('Текущие ante bet поля:');
    console.log('- free_spins_ante_title:', currentSlot.free_spins_ante_title);
    console.log('- free_spins_ante_description:', currentSlot.free_spins_ante_description);
    console.log('- free_spins_ante_bet_value:', currentSlot.free_spins_ante_bet_value);
    console.log('- free_spins_ante_bet_effect:', currentSlot.free_spins_ante_bet_effect);
    console.log('');

    // 2. Обновляем ante bet поля
    console.log('2️⃣ Обновление ante bet полей...');
    const updateData = {
      free_spins_ante_title: '🎯 Тестовый Ante Bet заголовок',
      free_spins_ante_description: 'Тестовое описание ante bet функции для проверки синхронизации',
      free_spins_ante_bet_value: '30% дополнительно к ставке (ТЕСТ)',
      free_spins_ante_bet_effect: 'утраивает шансы получить бесплатные спины (ТЕСТ)'
    };

    const updateResponse = await axios.put(`${API_BASE}/slots/${SLOT_ID}`, updateData);
    console.log('✅ Поля успешно обновлены');
    console.log('');

    // 3. Проверяем обновленные данные через админ API
    console.log('3️⃣ Проверка обновленных данных через админ API...');
    const verifyResponse = await axios.get(`${API_BASE}/slots/admin/${SLOT_ID}`);
    const updatedSlot = verifyResponse.data.data; // Добавляем .data для правильного доступа
    
    console.log('Обновленные ante bet поля:');
    console.log('- free_spins_ante_title:', updatedSlot.free_spins_ante_title);
    console.log('- free_spins_ante_description:', updatedSlot.free_spins_ante_description);
    console.log('- free_spins_ante_bet_value:', updatedSlot.free_spins_ante_bet_value);
    console.log('- free_spins_ante_bet_effect:', updatedSlot.free_spins_ante_bet_effect);
    console.log('');

    // 4. Проверяем данные через клиентский API
    console.log('4️⃣ Проверка данных через клиентский API...');
    const clientResponse = await axios.get(`${API_BASE}/slots/book-of-ra-deluxe`);
    const clientSlot = clientResponse.data;
    
    console.log('Ante bet поля в клиентском API:');
    console.log('- free_spins_ante_title:', clientSlot.free_spins_ante_title);
    console.log('- free_spins_ante_description:', clientSlot.free_spins_ante_description);
    console.log('- free_spins_ante_bet_value:', clientSlot.free_spins_ante_bet_value);
    console.log('- free_spins_ante_bet_effect:', clientSlot.free_spins_ante_bet_effect);
    console.log('');

    // 5. Проверяем синхронизацию
    console.log('5️⃣ Проверка синхронизации между админ и клиентским API...');
    const fieldsToCheck = ['free_spins_ante_title', 'free_spins_ante_description', 'free_spins_ante_bet_value', 'free_spins_ante_bet_effect'];
    let allSynced = true;

    fieldsToCheck.forEach(field => {
      const adminValue = updatedSlot[field];
      const clientValue = clientSlot[field];
      const synced = adminValue === clientValue;
      
      console.log(`${synced ? '✅' : '❌'} ${field}: ${synced ? 'синхронизировано' : 'НЕ синхронизировано'}`);
      if (!synced) {
        console.log(`   Админ: "${adminValue}"`);
        console.log(`   Клиент: "${clientValue}"`);
        allSynced = false;
      }
    });

    console.log('');
    console.log(allSynced ? '🎉 Все ante bet поля синхронизированы!' : '⚠️ Обнаружены проблемы с синхронизацией');

  } catch (error) {
    console.log('❌ Ошибка при тестировании:', error.message);
    if (error.response) {
      console.log('Статус ответа:', error.response.status);
      console.log('Данные ответа:', error.response.data);
    }
    console.log('Полная ошибка:', error);
  }
}

testAnteBetFields();