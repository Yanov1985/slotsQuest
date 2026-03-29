const http = require('http');

async function measureTime(url, name) {
  const start = performance.now();
  
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const end = performance.now();
        const duration = (end - start).toFixed(2);
        console.log(`[${name}] ${url}`);
        console.log(`⏱ Время ответа бэкенда: ${duration} ms (Размер: ${(data.length / 1024).toFixed(2)} KB)`);
        
        // Попробуем распарсить JSON, чтобы убедиться, что всё ок
        try {
            JSON.parse(data);
            console.log(`✅ JSON валиден.\n`);
        } catch {
            console.log(`❌ Ошибка JSON ответа!\n`);
        }
        resolve(duration);
      });
    }).on('error', (err) => {
      console.log(`❌ Ошибка запроса ${url}: ${err.message}`);
      resolve(0);
    });
  });
}

async function runBenchmark() {
  console.log('--- ТЕСТ СКОРОСТИ API (СЕЙЧАС ПОДКЛЮЧЕНО К SUPABASE) ---\n');
  
  // 1. Тест каталога (запрашивает много слотов)
  await measureTime('http://localhost:3001/api/slots?page=1&limit=20', 'Каталог (Первая страница)');
  
  // 2. Тест конкретного слота (возможно делает JOIN запросы к связям)
  // Возьмем slug первого попавшегося популярного, если он есть, иначе просто ID
  // Для надежности запросим список и выцепим первый slug
  const startList = performance.now();
  http.get('http://localhost:3001/api/slots?limit=1', (res) => {
     let data = '';
     res.on('data', chunk => data += chunk);
     res.on('end', async () => {
         const listEnd = performance.now();
         const slots = JSON.parse(data);
         if(slots.data && slots.data.length > 0) {
            const slug = slots.data[0].slug;
            await measureTime(`http://localhost:3001/api/slots/by-slug/${slug}`, `Страница Слота (${slug})`);
         }
     });
  });
}

runBenchmark();
