const fetch = require('node-fetch');
require('dotenv').config();

async function testConnection() {
    console.log('🔍 Тестируем подключение к Supabase...');
    console.log('URL:', process.env.SUPABASE_URL);
    
    try {
        // Простой запрос к API
        const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
                'apikey': process.env.SUPABASE_ANON_KEY
            }
        });
        
        console.log('Статус ответа:', response.status);
        console.log('Заголовки ответа:', response.headers.raw());
        
        if (response.ok) {
            console.log('✅ Подключение к Supabase успешно!');
        } else {
            console.log('❌ Ошибка подключения:', response.statusText);
        }
        
    } catch (error) {
        console.error('❌ Ошибка сети:', error.message);
        
        // Дополнительная диагностика
        if (error.code === 'ENOTFOUND') {
            console.log('💡 Возможные причины:');
            console.log('   - Проблемы с DNS');
            console.log('   - Неправильный URL Supabase');
            console.log('   - Проблемы с интернет-соединением');
            console.log('   - Supabase проект приостановлен или удален');
        }
    }
}

testConnection();