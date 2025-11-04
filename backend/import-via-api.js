const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

// Функция для выполнения SQL через Supabase API
async function executeSQLViaAPI(sql) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error('Отсутствуют переменные окружения SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY');
    }

    const url = `${supabaseUrl}/rest/v1/rpc/exec_sql`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey
            },
            body: JSON.stringify({
                sql: sql
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка при выполнении SQL через API:', error.message);
        throw error;
    }
}

// Функция для разбивки SQL на отдельные команды
function splitSQL(sql) {
    console.log('🔍 Анализируем SQL файл...');
    console.log(`📏 Размер файла: ${sql.length} символов`);
    
    // Удаляем комментарии и пустые строки
    const lines = sql.split('\n').filter(line => {
        const trimmed = line.trim();
        return trimmed && !trimmed.startsWith('--');
    });
    
    console.log(`📝 Строк после фильтрации: ${lines.length}`);
    
    const commands = [];
    let currentCommand = '';
    
    for (const line of lines) {
        currentCommand += line + '\n';
        
        // Если строка заканчивается на ';', это конец команды
        if (line.trim().endsWith(';')) {
            commands.push(currentCommand.trim());
            currentCommand = '';
        }
    }
    
    // Добавляем последнюю команду, если она есть
    if (currentCommand.trim()) {
        commands.push(currentCommand.trim());
    }
    
    const filteredCommands = commands.filter(cmd => cmd.length > 0);
    console.log(`📋 Найдено команд: ${filteredCommands.length}`);
    
    if (filteredCommands.length > 0) {
        console.log(`📄 Первая команда (первые 200 символов): ${filteredCommands[0].substring(0, 200)}...`);
    }
    
    return filteredCommands;
}

// Основная функция импорта
async function importData() {
    try {
        console.log('🚀 Начинаем импорт данных через Supabase API...');
        
        // Читаем SQL файл
        const sqlFilePath = path.join(__dirname, 'import-data.sql');
        if (!fs.existsSync(sqlFilePath)) {
            throw new Error(`SQL файл не найден: ${sqlFilePath}`);
        }
        
        let sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
        // Заменяем экранированные символы новой строки на реальные
        sqlContent = sqlContent.replace(/\\n/g, '\n');
        console.log('📄 SQL файл загружен');
        
        // Разбиваем SQL на отдельные команды
        const commands = splitSQL(sqlContent);
        console.log(`📝 Найдено ${commands.length} SQL команд`);
        
        let successCount = 0;
        let errorCount = 0;
        
        // Выполняем команды по одной
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            console.log(`\n⏳ Выполняем команду ${i + 1}/${commands.length}...`);
            
            try {
                await executeSQLViaAPI(command);
                successCount++;
                console.log(`✅ Команда ${i + 1} выполнена успешно`);
            } catch (error) {
                errorCount++;
                console.error(`❌ Ошибка в команде ${i + 1}:`, error.message);
                
                // Показываем первые 100 символов команды для отладки
                const preview = command.substring(0, 100) + (command.length > 100 ? '...' : '');
                console.error(`Команда: ${preview}`);
                
                // Продолжаем выполнение остальных команд
                continue;
            }
        }
        
        console.log('\n📊 Результаты импорта:');
        console.log(`✅ Успешно выполнено: ${successCount} команд`);
        console.log(`❌ Ошибок: ${errorCount} команд`);
        
        if (errorCount === 0) {
            console.log('🎉 Импорт данных завершен успешно!');
        } else {
            console.log('⚠️ Импорт завершен с ошибками. Проверьте логи выше.');
        }
        
        // Проверяем количество записей в таблицах
        console.log('\n🔍 Проверяем количество записей в таблицах...');
        
        const tables = ['providers', 'mechanics', 'themes', 'slot_categories', 'slots'];
        
        for (const table of tables) {
            try {
                const countSQL = `SELECT COUNT(*) as count FROM "${table}";`;
                const result = await executeSQLViaAPI(countSQL);
                console.log(`📋 ${table}: ${result[0]?.count || 0} записей`);
            } catch (error) {
                console.error(`❌ Ошибка при подсчете записей в ${table}:`, error.message);
            }
        }
        
    } catch (error) {
        console.error('💥 Критическая ошибка:', error.message);
        process.exit(1);
    }
}

// Метод 2: Импорт через SQL API (резервный)
async function importViaSQLAPI() {
    console.log('\n=== Попытка импорта через SQL API ===');
    
    try {
        // Читаем SQL файл
        let sqlContent = fs.readFileSync(path.join(__dirname, 'import-data.sql'), 'utf8');
        
        // Заменяем экранированные символы новой строки на реальные
        sqlContent = sqlContent.replace(/\\n/g, '\n');
        
        // Разбиваем на отдельные команды
        const sqlCommands = sqlContent
            .split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd && !cmd.startsWith('--') && cmd.length > 10);
        
        console.log(`Найдено SQL команд: ${sqlCommands.length}`);
        
        if (sqlCommands.length === 0) {
            console.log('SQL команды не найдены');
            return false;
        }
        
        let successCount = 0;
        
        for (const [index, command] of sqlCommands.entries()) {
            try {
                console.log(`Выполняется команда ${index + 1}/${sqlCommands.length}...`);
                
                const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
                        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY
                    },
                    body: JSON.stringify({ sql: command })
                });
                
                if (response.ok) {
                    successCount++;
                } else {
                    const error = await response.text();
                    console.log(`Ошибка в команде ${index + 1}: ${error}`);
                }
            } catch (error) {
                console.log(`Ошибка выполнения команды ${index + 1}: ${error.message}`);
            }
        }
        
        console.log(`Успешно выполнено SQL команд: ${successCount}/${sqlCommands.length}`);
        return successCount > 0;
        
    } catch (error) {
        console.error('Ошибка SQL API:', error.message);
        return false;
    }
}

// Альтернативный метод через прямой REST API
async function importViaRestAPI() {
    try {
        console.log('🔄 Пробуем альтернативный метод через REST API...');
        
        const supabaseUrl = process.env.SUPABASE_URL;
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        
        // Загружаем данные из JSON файлов
        const dataDir = path.join(__dirname, 'studio-data');
        
        const providers = JSON.parse(fs.readFileSync(path.join(dataDir, 'providers.json'), 'utf8'));
        const mechanics = JSON.parse(fs.readFileSync(path.join(dataDir, 'mechanics.json'), 'utf8'));
        const themes = JSON.parse(fs.readFileSync(path.join(dataDir, 'themes.json'), 'utf8'));
        const categories = JSON.parse(fs.readFileSync(path.join(dataDir, 'slot_categories.json'), 'utf8'));
        const slots = JSON.parse(fs.readFileSync(path.join(dataDir, 'slots.json'), 'utf8'));
        
        console.log('📊 Данные загружены:');
        console.log(`- Провайдеры: ${providers.length}`);
        console.log(`- Механики: ${mechanics.length}`);
        console.log(`- Темы: ${themes.length}`);
        console.log(`- Категории: ${categories.length}`);
        console.log(`- Слоты: ${slots.length}`);
        
        // Функция для вставки данных через REST API
        async function insertData(table, data, batchSize = 100) {
            const url = `${supabaseUrl}/rest/v1/${table}`;
            
            for (let i = 0; i < data.length; i += batchSize) {
                const batch = data.slice(i, i + batchSize);
                
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${serviceRoleKey}`,
                            'apikey': serviceRoleKey,
                            'Prefer': 'return=minimal'
                        },
                        body: JSON.stringify(batch)
                    });
                    
                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`HTTP ${response.status}: ${errorText}`);
                    }
                    
                    console.log(`✅ ${table}: вставлено ${batch.length} записей (${i + 1}-${Math.min(i + batchSize, data.length)})`);
                } catch (error) {
                    console.error(`❌ Ошибка при вставке в ${table}:`, error.message);
                    throw error;
                }
            }
        }
        
        // Вставляем данные в правильном порядке
        console.log('\n📥 Начинаем вставку данных...');
        
        await insertData('providers', providers);
        await insertData('mechanics', mechanics);
        await insertData('themes', themes);
        await insertData('slot_categories', categories);
        await insertData('slots', slots);
        
        console.log('🎉 Импорт через REST API завершен успешно!');
        
    } catch (error) {
        console.error('💥 Ошибка при импорте через REST API:', error.message);
        throw error;
    }
}

// Запускаем импорт
async function main() {
    console.log('🎯 Автоматический импорт данных в Supabase');
    console.log('==========================================\n');
    
    try {
        // Сначала пробуем через REST API (более надежный метод)
        await importViaRestAPI();
    } catch (error) {
        console.log('\n🔄 REST API не сработал, пробуем SQL API...');
        try {
            await importData();
        } catch (sqlError) {
            console.error('\n💥 Оба метода импорта не сработали!');
            console.error('REST API ошибка:', error.message);
            console.error('SQL API ошибка:', sqlError.message);
            
            console.log('\n💡 Рекомендации:');
            console.log('1. Проверьте переменные окружения SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY');
            console.log('2. Убедитесь, что Supabase проект активен');
            console.log('3. Проверьте права доступа для Service Role Key');
            
            process.exit(1);
        }
    }
}

if (require.main === module) {
    main();
}

module.exports = { importData, importViaRestAPI, importViaSQLAPI };