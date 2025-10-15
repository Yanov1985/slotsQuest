// Простой тест для проверки наличия поля hero_keyword в API ответе

const testHeroKeyword = async () => {
  try {
    console.log('🔍 Проверяем API endpoint: http://localhost:3001/api/slots\n');
    
    const response = await fetch('http://localhost:3001/api/slots');
    const result = await response.json();
    
    const slots = result.data || result;
    
    if (!slots || slots.length === 0) {
      console.log('❌ Слотов не найдено в ответе API');
      return;
    }
    
    console.log(`✅ Найдено слотов: ${slots.length}\n`);
    
    // Проверим первый слот
    const firstSlot = slots[0];
    console.log('📋 Проверяем первый слот:');
    console.log(`   ID: ${firstSlot.id}`);
    console.log(`   Name: ${firstSlot.name}`);
    console.log(`   Slug: ${firstSlot.slug}`);
    
    // Проверяем наличие hero_keyword
    if ('hero_keyword' in firstSlot) {
      console.log(`   ✅ hero_keyword: "${firstSlot.hero_keyword || '(пусто)'}"`);
      console.log('\n🎉 Поле hero_keyword ПРИСУТСТВУЕТ в API ответе!');
    } else {
      console.log('   ❌ hero_keyword: ОТСУТСТВУЕТ');
      console.log('\n⚠️  Поле hero_keyword НЕ НАЙДЕНО в API ответе!');
      console.log('📝 Необходимо перезапустить бэкенд сервер.');
    }
    
    // Покажем все доступные поля
    console.log('\n📊 Все доступные поля в объекте слота:');
    const fields = Object.keys(firstSlot).sort();
    fields.forEach(field => {
      const value = firstSlot[field];
      const type = Array.isArray(value) ? 'array' : typeof value;
      console.log(`   - ${field} (${type})`);
    });
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
    console.log('\n💡 Убедитесь что бэкенд сервер запущен на http://localhost:3001');
  }
};

testHeroKeyword();

