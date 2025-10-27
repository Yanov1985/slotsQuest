async function testAdminFreeSpinsUpdate() {
  try {
    console.log('🧪 Тестируем обновление free_spins полей через админ API...');

    // Сначала получаем список слотов
    const slotsResponse = await fetch('http://localhost:3001/api/slots?admin=true');
    const slotsData = await slotsResponse.json();
    
    if (!slotsData.data || slotsData.data.length === 0) {
      console.log('❌ Нет слотов в базе данных');
      return;
    }

    const firstSlot = slotsData.data[0];
    console.log('🎯 Используем слот:', firstSlot.name, '(ID:', firstSlot.id + ')');

    const testData = {
      free_spins_title: 'Тестовый заголовок бесплатных спинов',
      free_spins_intro: 'Тестовое описание активации бесплатных спинов',
      free_spins_instant_title: 'Тестовые мгновенные выплаты',
      free_spins_4_scatter: 'Тест: 4 скаттера = 10 спинов',
      free_spins_5_scatter: 'Тест: 5 скаттеров = 15 спинов',
      free_spins_6_scatter: 'Тест: 6 скаттеров = 20 спинов',
      free_spins_features_title: 'Тестовые особенности',
      free_spins_feature_1: 'Тестовая особенность 1',
      free_spins_feature_2: 'Тестовая особенность 2',
      free_spins_feature_3: 'Тестовая особенность 3',
      free_spins_feature_4: 'Тестовая особенность 4'
    };

    // Обновляем слот через админ API
    const updateResponse = await fetch(`http://localhost:3001/api/slots/${firstSlot.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    console.log('✅ Данные успешно отправлены через админ API');
    console.log('📊 Статус ответа:', updateResponse.status);

    // Проверяем, что данные сохранились через admin endpoint
    const getResponse = await fetch(`http://localhost:3001/api/slots/admin/${firstSlot.id}`);
    const getResult = await getResponse.json();
    const slot = getResult.data || getResult;

    console.log('\n🔍 Проверяем сохраненные данные:');
    console.log('free_spins_title:', slot.free_spins_title);
    console.log('free_spins_intro:', slot.free_spins_intro);
    console.log('free_spins_feature_1:', slot.free_spins_feature_1);
    console.log('free_spins_feature_2:', slot.free_spins_feature_2);

    // Проверяем соответствие
    const fieldsToCheck = Object.keys(testData);
    let allFieldsMatch = true;

    console.log('\n📋 Результаты проверки полей:');
    fieldsToCheck.forEach(field => {
      const matches = slot[field] === testData[field];
      console.log(`${field}: ${matches ? '✅' : '❌'} (${matches ? 'совпадает' : 'не совпадает'})`);
      if (!matches) {
        console.log(`  Ожидалось: "${testData[field]}"`);
        console.log(`  Получено: "${slot[field]}"`);
        allFieldsMatch = false;
      }
    });

    console.log(`\n🎯 Общий результат: ${allFieldsMatch ? '✅ ВСЕ ПОЛЯ РАБОТАЮТ КОРРЕКТНО' : '❌ ЕСТЬ ПРОБЛЕМЫ С ПОЛЯМИ'}`);

  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
  }
}

testAdminFreeSpinsUpdate();