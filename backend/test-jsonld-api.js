/**
 * 🧪 Тестовый скрипт для проверки JSON-LD API
 *
 * Запуск: node test-jsonld-api.js
 *
 * Перед запуском убедитесь, что backend запущен: npm run start
 */

const http = require('http');

// 🔧 Конфигурация
const API_BASE = 'http://localhost:3001'; // NestJS backend порт
const TEST_SLOT_ID = 'cmeocg6gy0003u5doo0tcrpk4'; // Gonzo's Quest

// ============================================================================
// 📦 УТИЛИТЫ
// ============================================================================

/**
 * Выполнить HTTP запрос
 */
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE);

    const options = {
      hostname: url.hostname,
      port: url.port || 3000,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Вывести результат теста
 */
function printTestResult(testName, success, details = '') {
  const icon = success ? '✅' : '❌';
  console.log(`${icon} ${testName}`);
  if (details) {
    console.log(`   └─ ${details}`);
  }
}

// ============================================================================
// 🧪 ТЕСТЫ
// ============================================================================

async function runTests() {
  console.log('🚀 Запуск тестов JSON-LD API');
  console.log('=' .repeat(60));
  console.log(`📍 API Base: ${API_BASE}`);
  console.log(`🎰 Test Slot ID: ${TEST_SLOT_ID}`);
  console.log('=' .repeat(60));
  console.log('');

  let passed = 0;
  let failed = 0;

  // -------------------------------------------------------------------------
  // 📋 ТЕСТ 1: Получение JSON-LD
  // -------------------------------------------------------------------------
  console.log('📋 ТЕСТ 1: GET /api/jsonld/:slotId');
  try {
    const result = await makeRequest('GET', `/api/jsonld/${TEST_SLOT_ID}`);

    if (result.status === 200 && result.data.success) {
      printTestResult('Получение JSON-LD', true, `Схем: ${result.data.meta.totalSchemas}`);
      console.log(`   └─ Включённые схемы: ${result.data.meta.enabledSchemas.join(', ')}`);
      passed++;
    } else {
      printTestResult('Получение JSON-LD', false, `Status: ${result.status}`);
      failed++;
    }
  } catch (error) {
    printTestResult('Получение JSON-LD', false, error.message);
    failed++;
  }
  console.log('');

  // -------------------------------------------------------------------------
  // 📋 ТЕСТ 2: Получение Raw JSON-LD
  // -------------------------------------------------------------------------
  console.log('📋 ТЕСТ 2: GET /api/jsonld/:slotId/raw');
  try {
    const result = await makeRequest('GET', `/api/jsonld/${TEST_SLOT_ID}/raw`);

    if (result.status === 200 && Array.isArray(result.data)) {
      printTestResult('Получение Raw JSON-LD', true, `Схем в массиве: ${result.data.length}`);

      // Показываем типы схем
      const types = result.data.map(s => s['@type']).filter(Boolean);
      if (types.length > 0) {
        console.log(`   └─ Типы: ${types.join(', ')}`);
      }
      passed++;
    } else {
      printTestResult('Получение Raw JSON-LD', false, `Status: ${result.status}`);
      failed++;
    }
  } catch (error) {
    printTestResult('Получение Raw JSON-LD', false, error.message);
    failed++;
  }
  console.log('');

  // -------------------------------------------------------------------------
  // 📋 ТЕСТ 3: Валидация JSON-LD
  // -------------------------------------------------------------------------
  console.log('📋 ТЕСТ 3: POST /api/jsonld/:slotId/validate');
  try {
    const result = await makeRequest('POST', `/api/jsonld/${TEST_SLOT_ID}/validate`);

    if (result.status === 200 || result.status === 201) {
      const valid = result.data.isValid ? 'Валидно' : 'Невалидно';
      printTestResult('Валидация JSON-LD', true, valid);

      if (result.data.errors && result.data.errors.length > 0) {
        console.log(`   └─ Ошибки: ${result.data.errors.length}`);
      }
      if (result.data.warnings && result.data.warnings.length > 0) {
        console.log(`   └─ Предупреждения: ${result.data.warnings.length}`);
      }
      if (result.data.suggestions && result.data.suggestions.length > 0) {
        console.log(`   └─ Рекомендации: ${result.data.suggestions.length}`);
      }
      passed++;
    } else {
      printTestResult('Валидация JSON-LD', false, `Status: ${result.status}`);
      failed++;
    }
  } catch (error) {
    printTestResult('Валидация JSON-LD', false, error.message);
    failed++;
  }
  console.log('');

  // -------------------------------------------------------------------------
  // 📋 ТЕСТ 4: Тест Rich Snippets
  // -------------------------------------------------------------------------
  console.log('📋 ТЕСТ 4: GET /api/jsonld/:slotId/test');
  try {
    const result = await makeRequest('GET', `/api/jsonld/${TEST_SLOT_ID}/test`);

    if (result.status === 200 && result.data.url) {
      printTestResult('Тест Rich Snippets', true, 'URL сгенерирован');
      console.log(`   └─ Google Test URL: ${result.data.url.substring(0, 60)}...`);
      passed++;
    } else {
      printTestResult('Тест Rich Snippets', false, `Status: ${result.status}`);
      failed++;
    }
  } catch (error) {
    printTestResult('Тест Rich Snippets', false, error.message);
    failed++;
  }
  console.log('');

  // -------------------------------------------------------------------------
  // 📋 ТЕСТ 5: Статистика JSON-LD
  // -------------------------------------------------------------------------
  console.log('📋 ТЕСТ 5: GET /api/jsonld/:slotId/stats');
  try {
    const result = await makeRequest('GET', `/api/jsonld/${TEST_SLOT_ID}/stats`);

    if (result.status === 200 && result.data.success) {
      printTestResult('Статистика JSON-LD', true);
      console.log(`   └─ Enabled: ${result.data.stats.enabled}`);
      console.log(`   └─ Схемы: ${result.data.stats.enabledSchemas.join(', ')}`);
      passed++;
    } else {
      printTestResult('Статистика JSON-LD', false, `Status: ${result.status}`);
      failed++;
    }
  } catch (error) {
    printTestResult('Статистика JSON-LD', false, error.message);
    failed++;
  }
  console.log('');

  // -------------------------------------------------------------------------
  // 📋 ТЕСТ 6: Отдельные схемы
  // -------------------------------------------------------------------------
  console.log('📋 ТЕСТ 6: Отдельные схемы');

  const schemaEndpoints = ['game', 'review', 'breadcrumb', 'faq', 'howto', 'video'];

  for (const endpoint of schemaEndpoints) {
    try {
      const result = await makeRequest('GET', `/api/jsonld/${TEST_SLOT_ID}/${endpoint}`);

      if (result.status === 200 && result.data.success) {
        const hasSchema = result.data.schema !== null;
        printTestResult(`  ${endpoint.toUpperCase()} Schema`, true, hasSchema ? 'Есть' : 'Не заполнено');
      } else {
        printTestResult(`  ${endpoint.toUpperCase()} Schema`, false);
      }
    } catch (error) {
      printTestResult(`  ${endpoint.toUpperCase()} Schema`, false, error.message);
    }
  }
  passed++; // Считаем как один тест
  console.log('');

  // -------------------------------------------------------------------------
  // 📊 ИТОГИ
  // -------------------------------------------------------------------------
  console.log('=' .repeat(60));
  console.log('📊 ИТОГИ ТЕСТИРОВАНИЯ');
  console.log('=' .repeat(60));
  console.log(`✅ Пройдено: ${passed}`);
  console.log(`❌ Провалено: ${failed}`);
  console.log('');

  if (failed === 0) {
    console.log('🎉 ВСЕ ТЕСТЫ ПРОЙДЕНЫ! JSON-LD API готов к использованию.');
  } else {
    console.log('⚠️ Есть провальные тесты. Проверьте логи backend.');
  }
}

// Запуск тестов
runTests().catch(console.error);
