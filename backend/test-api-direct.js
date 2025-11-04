#!/usr/bin/env node

/**
 * 🧪 ПРЯМОЙ ТЕСТ API
 */

const http = require('http');

const endpoints = [
  '/api/slots',
  '/api/slots?admin=true',
  '/api/providers',
  '/api/categories',
  '/api/themes',
  '/api/mechanics'
];

console.log('🧪 ПРЯМОЙ ТЕСТ API НА ПОРТУ 3001\n');
console.log('='.repeat(50));

function testEndpoint(path) {
  return new Promise((resolve) => {
    const req = http.get({
      hostname: 'localhost',
      port: 3001,
      path: path,
      timeout: 5000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const count = json.data?.length || Object.keys(json.data || {}).length || 'N/A';
          console.log(`✅ ${path}`);
          console.log(`   Статус: ${res.statusCode}, Записей: ${count}`);
          resolve(true);
        } catch (e) {
          console.log(`⚠️  ${path}`);
          console.log(`   Статус: ${res.statusCode}, Ответ: ${data.substring(0, 100)}`);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ ${path}`);
      console.log(`   Ошибка: ${error.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log(`⏱️  ${path}`);
      console.log(`   Таймаут`);
      req.destroy();
      resolve(false);
    });
  });
}

async function runTests() {
  let success = 0;
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    if (result) success++;
    await new Promise(r => setTimeout(r, 100));
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Успешно: ${success}/${endpoints.length}`);

  if (success === 0) {
    console.log('\n❌ BACKEND НЕ ЗАПУЩЕН или НЕ ОТВЕЧАЕТ на порту 3001');
    console.log('\n💡 Запустите backend:');
    console.log('   npm run start:dev');
  } else if (success < endpoints.length) {
    console.log('\n⚠️  НЕКОТОРЫЕ ENDPOINTS НЕ РАБОТАЮТ');
  } else {
    console.log('\n✅ ВСЕ API ENDPOINTS РАБОТАЮТ!');
  }
}

runTests();
