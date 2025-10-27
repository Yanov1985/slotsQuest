const BASE_URL = 'http://localhost:3001/api';

async function testFullWorkflow() {
  console.log('🚀 Тестирование полного цикла: админ-панель -> фронтенд');
  console.log('=' .repeat(60));

  try {
    // 1. Получаем список слотов
    console.log('1. Получение списка слотов...');
    const slotsResponse = await fetch(`${BASE_URL}/slots`);
    const slotsData = await slotsResponse.json();
    const slots = slotsData.data;
    
    if (!slots || slots.length === 0) {
      throw new Error('Нет доступных слотов для тестирования');
    }

    const testSlot = slots[0];
    console.log(`   ✅ Найден слот для тестирования: ${testSlot.name} (ID: ${testSlot.id})`);

    // 2. Обновляем ante_bet поля
    console.log('2️⃣ Обновление ante_bet полей...');
    const updateData = {
      ante_bet_title: '🎯 Тестовый Ante Bet заголовок',
      ante_bet_description: 'Тестовое описание ante bet функции для проверки синхронизации',
      ante_bet_warning: '⚠️ Тестовое предупреждение об ante bet'
    };

    const updateResponse = await fetch(`${BASE_URL}/slots/${testSlot.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    console.log('   ✅ Поля успешно обновлены через админ API');

    // 3. Проверяем обновление через админ API
    console.log('\n3. Проверка обновления через админ API...');
    const adminCheckResponse = await fetch(`${BASE_URL}/slots/admin/${testSlot.id}`);
    const adminSlot = await adminCheckResponse.json();

    console.log('   Проверка полей:');
    console.log(`   - ante_bet_title: ${adminSlot.ante_bet_title === updateData.ante_bet_title ? '✅' : '❌'} "${adminSlot.ante_bet_title}"`);
    console.log(`   - ante_bet_description: ${adminSlot.ante_bet_description === updateData.ante_bet_description ? '✅' : '❌'} "${adminSlot.ante_bet_description}"`);
    console.log(`   - ante_bet_warning: ${adminSlot.ante_bet_warning === updateData.ante_bet_warning ? '✅' : '❌'} "${adminSlot.ante_bet_warning}"`);

    // 4. Проверяем синхронизацию с клиентским API
    console.log('\n4. Проверка синхронизации с клиентским API...');
    const clientSlotResponse = await fetch(`${BASE_URL}/slots/${testSlot.id}`);
    const clientSlot = await clientSlotResponse.json();

    console.log('   Проверка синхронизации:');
    console.log(`   - ante_bet_title: ${clientSlot.ante_bet_title === updateData.ante_bet_title ? '✅' : '❌'} "${clientSlot.ante_bet_title}"`);
    console.log(`   - ante_bet_description: ${clientSlot.ante_bet_description === updateData.ante_bet_description ? '✅' : '❌'} "${clientSlot.ante_bet_description}"`);
    console.log(`   - ante_bet_warning: ${clientSlot.ante_bet_warning === updateData.ante_bet_warning ? '✅' : '❌'} "${clientSlot.ante_bet_warning}"`);

    // 5. Проверяем отображение на фронтенде (симуляция)
    console.log('\n5. Проверка готовности для отображения на фронтенде...');
    
    // Проверяем, что поля не пустые и корректно заполнены
    const frontendChecks = {
      title: clientSlot.ante_bet_title && clientSlot.ante_bet_title.trim() !== '',
      description: clientSlot.ante_bet_description && clientSlot.ante_bet_description.trim() !== '',
      warning: clientSlot.ante_bet_warning && clientSlot.ante_bet_warning.trim() !== ''
    };

    console.log('   Готовность для фронтенда:');
    console.log(`   - Заголовок готов: ${frontendChecks.title ? '✅' : '❌'}`);
    console.log(`   - Описание готово: ${frontendChecks.description ? '✅' : '❌'}`);
    console.log(`   - Предупреждение готово: ${frontendChecks.warning ? '✅' : '❌'}`);

    // 6. Итоговый результат
    console.log('\n' + '=' .repeat(60));
    const allChecksPass = 
      adminSlot.ante_bet_title === updateData.ante_bet_title &&
      adminSlot.ante_bet_description === updateData.ante_bet_description &&
      adminSlot.ante_bet_warning === updateData.ante_bet_warning &&
      clientSlot.ante_bet_title === updateData.ante_bet_title &&
      clientSlot.ante_bet_description === updateData.ante_bet_description &&
      clientSlot.ante_bet_warning === updateData.ante_bet_warning &&
      frontendChecks.title && frontendChecks.description && frontendChecks.warning;

    if (allChecksPass) {
      console.log('🎉 ПОЛНЫЙ ЦИКЛ РАБОТАЕТ КОРРЕКТНО!');
      console.log('✅ Админ-панель -> API -> Клиентский API -> Фронтенд');
      console.log('\nТеперь можно:');
      console.log('1. Редактировать ante bet поля в админ-панели');
      console.log('2. Видеть изменения на клиентской странице слота');
      console.log(`3. Проверить на странице: http://localhost:3000/slots/${testSlot.slug || testSlot.id}`);
    } else {
      console.log('❌ ОБНАРУЖЕНЫ ПРОБЛЕМЫ В ЦИКЛЕ');
      console.log('Проверьте логи выше для деталей');
    }

  } catch (error) {
    console.error('❌ Ошибка при тестировании полного цикла:', error.message);
    console.error('Детали ошибки:', error);
  }
}

// Запуск теста
testFullWorkflow();