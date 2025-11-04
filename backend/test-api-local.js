#!/usr/bin/env node

/**
 * 🧪 ТЕСТ API С ЛОКАЛЬНОЙ БАЗОЙ ДАННЫХ
 *
 * Проверяет, что backend API работает с локальной SQLite базой
 */

const http = require('http');

console.log('🧪 ТЕСТИРОВАНИЕ API С ЛОКАЛЬНОЙ БАЗОЙ');
console.log('='.repeat(60));

// Список endpoints для тестирования
const endpoints = [
  { path: '/api/slots', name: 'Все слоты' },
  { path: '/api/slots?admin=true', name: 'Слоты для админки' },
  { path: '/api/providers', name: 'Провайдеры' },
  { path: '/api/categories', name: 'Категории' },
  { path: '/api/themes', name: 'Темы' },
  { path: '/api/mechanics', name: 'Механики' }
];

let successCount = 0;
let errorCount = 0;

function testEndpoint(endpoint) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: endpoint.path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            const count = json.data?.length || Object.keys(json.data || {}).length;
            console.log(`✅ ${endpoint.name}: ${count} записей (${res.statusCode})`);
            successCount++;
          } catch (e) {
            console.log(`✅ ${endpoint.name}: ответ получен (${res.statusCode})`);
            successCount++;
          }
        } else {
          console.log(`❌ ${endpoint.name}: ошибка ${res.statusCode}`);
          errorCount++;
        }
        resolve();
      });
    });

    req.on('error', (error) => {
      console.log(`❌ ${endpoint.name}: ${error.message}`);
      errorCount++;
      resolve();
    });

    req.setTimeout(3000, () => {
      req.destroy();
      console.log(`⏱️  ${endpoint.name}: таймаут`);
      errorCount++;
      resolve();
    });

    req.end();
  });
}

async function runTests() {
  console.log('\n📡 Проверка доступности backend на http://localhost:3001...\n');

  // Ждем 3 секунды, чтобы backend успел запуститься
  await new Promise(resolve => setTimeout(resolve, 3000));

  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ:');
  console.log(`✅ Успешно: ${successCount}`);
  console.log(`❌ Ошибок: ${errorCount}`);

  if (errorCount > 0) {
    console.log('\n⚠️  ВНИМАНИЕ: Некоторые endpoints не работают!');
    console.log('💡 Возможные причины:');
    console.log('   1. Backend сервер еще не запустился (подождите 10-20 секунд)');
    console.log('   2. Ошибка в коде backend');
    console.log('   3. Проблема с подключением к базе данных');
    console.log('\n📝 Рекомендации:');
    console.log('   1. Проверьте логи backend в терминале');
    console.log('   2. Убедитесь, что файл dev.db существует');
    console.log('   3. Перезапустите backend: npm run start:dev');
  } else {
    console.log('\n🎉 ВСЕ API ENDPOINTS РАБОТАЮТ!');
    console.log('✅ Backend успешно подключен к локальной базе данных');
    console.log('\n💡 Следующие шаги:');
    console.log('   1. Запустите frontend: cd ../frontend && npm run dev');
    console.log('   2. Откройте админку: http://localhost:3000/admin');
    console.log('   3. Проверьте данные в приложении');
  }

  console.log('='.repeat(60));
}

runTests();
