// Перехватываем запрос на сохранение
console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 ИНСТРУКЦИЯ ПО ОТЛАДКЕ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Открой консоль браузера (F12)

2. Вставь этот код В КОНСОЛЬ БРАУЗЕРА перед сохранением:

const originalFetch = window.fetch;
window.fetch = function(...args) {
  if (args[0].includes('/api/slots/')) {
    console.log('🔍 ПЕРЕХВАТ ЗАПРОСА:', args);
    if (args[1] && args[1].body) {
      const body = JSON.parse(args[1].body);
      console.log('📦 ДАННЫЕ ДЛЯ СОХРАНЕНИЯ:', {
        overview_keyword_1: body.overview_keyword_1,
        overview_keyword_2: body.overview_keyword_2,
        overview_keyword_3: body.overview_keyword_3,
        overview_description_1_preview: body.overview_description_1?.substring(0, 150)
      });

      // Проверка маркеров
      if (body.overview_description_1) {
        const hasK1 = body.overview_description_1.includes('[keyword_1]');
        const hasK2 = body.overview_description_1.includes('[keyword_2]');
        const hasK3 = body.overview_description_1.includes('[keyword_3]');
        console.log('🔍 МАРКЕРЫ В ЗАПРОСЕ:', {
          '[keyword_1]': hasK1 ? '✅' : '❌',
          '[keyword_2]': hasK2 ? '✅' : '❌',
          '[keyword_3]': hasK3 ? '✅' : '❌'
        });
      }
    }
  }
  return originalFetch.apply(this, args);
};

console.log('✅ Перехватчик установлен! Теперь нажми "Сохранить"');

3. Нажми "Сохранить" в админке

4. Посмотри что выводится в консоли

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`)
