const http = require('http');

http.get('http://localhost:3000/slots/gates-of-olympus', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        // 1. JSON-LD Extraction
        console.log('\n=========================================');
        console.log('🤖 ЧТО ВИДИТ GOOGLE BOT (JSON-LD SCRIPTS)');
        console.log('=========================================\n');
        let jsonCount = 0;

        // В Nuxt данные могут быть внутри разных тегов, ищем скрипт application/ld+json
        const regex = /<script type="application\/ld\+json"(?:[^>]*)>(.*?)<\/script>/gs;
        let match;
        while ((match = regex.exec(data)) !== null) {
            jsonCount++;
            try {
                const parsed = JSON.parse(match[1]);
                console.log(`\n--- 📄 JSON-LD Schema #${jsonCount} ---`);
                console.log(JSON.stringify(parsed, null, 2));
            } catch (e) {
                console.log(`\n--- ⚠️ Ошибка парсинга Schema #${jsonCount} ---`);
                console.log(match[1].substring(0, 200) + '...');
            }
        }

        if (jsonCount === 0) {
            console.log('❌ JSON-LD схемы не найдены в HTML коде.');
        }

        // 2. SEO Meta Extraction
        console.log('\n=========================================');
        console.log('📑 SEO META TAGS & HEADINGS');
        console.log('=========================================\n');

        const titleMatch = data.match(/<title[^>]*>(.*?)<\/title>/);
        console.log('🔹 Титл страницы (Title):', titleMatch ? titleMatch[1] : 'Не найден');

        const descMatch = data.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i) ||
            data.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"[^>]*>/i);
        console.log('🔹 Описание (Meta Description):', descMatch ? descMatch[1] : 'Не найдено');

        console.log('\n🔹 Иерархия заголовков (H1, H2, H3):');
        const hTags = [...data.matchAll(/<(h[1-3])[^>]*>(.*?)<\/\1>/gs)];
        hTags.forEach(m => {
            // Очищаем от вложенных тегов (svg, span и т.д.)
            const cleanText = m[2].replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' ');
            if (cleanText) {
                console.log(`   [${m[1].toUpperCase()}] ${cleanText}`);
            }
        });

        console.log('\n=========================================');
    });
}).on('error', (err) => {
    console.error('Ошибка HTTP запроса:', err.message);
});
