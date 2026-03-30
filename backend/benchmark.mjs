async function measureRequest() {
  const start = performance.now();
  const res = await fetch('http://localhost:3001/api/slots');
  await res.json();
  const end = performance.now();
  return { time: Math.round(end - start), status: res.status };
}

async function runBenchmark() {
  console.log('🚀 Бенчмарк API Каталога (БД vs In-Memory Cache)...\n');
  
  console.log('--- ЗАПРОС №1 (Прямое обращение в Supabase) ---');
  let result = await measureRequest();
  console.log(`⏱ Время ответа: ${result.time} миллисекунд | Статус: ${result.status}\n`);

  console.log('--- ЗАПРОСЫ №2-5 (Чтение из Оперативной памяти сервера) ---');
  for (let i = 2; i <= 5; i++) {
    result = await measureRequest();
    console.log(`⚡️ Запрос №${i} | ⏱ Время ответа: ${result.time} миллисекунд`);
  }

  console.log('\n--- Проверка защиты от DDoS (ThrottlerGuard) ---');
  let blockedTime = null;
  for (let i = 1; i <= 150; i++) { // Throttler limits to 100/min
    const res = await fetch('http://localhost:3001/api/slots');
    if (res.status === 429) {
      console.log(`🛡 Имитация атаки: Блокировка сработала на ${i}-м спам-запросе (Статус 429 Too Many Requests!)`);
      break;
    }
  }
}

runBenchmark();
