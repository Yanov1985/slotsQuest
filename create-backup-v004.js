const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Получаем текущую дату для имени файла
const now = new Date();
const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS

const backupDir = path.join(__dirname, 'backups', 'db');
const backupFile = path.join(backupDir, `database_backup_v004_${dateStr}_${timeStr}.sql`);

// Создаем директорию для бекапов если её нет
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

console.log(`Создаю резервную копию базы данных v004...`);
console.log(`Файл: ${backupFile}`);

try {
  // Переходим в директорию бекенда для доступа к .env
  const backendDir = path.join(__dirname, 'backend');
  
  // Проверяем существование backend директории
  if (!fs.existsSync(backendDir)) {
    throw new Error('Директория backend не найдена');
  }
  
  // Читаем .env файл для получения DATABASE_URL
  const envPath = path.join(backendDir, '.env');
  if (!fs.existsSync(envPath)) {
    throw new Error('.env файл не найден в директории backend');
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const databaseUrlMatch = envContent.match(/DATABASE_URL\s*=\s*"([^"]+)"/);
  
  if (!databaseUrlMatch) {
    throw new Error('DATABASE_URL не найден в .env файле');
  }
  
  const databaseUrl = databaseUrlMatch[1];
  console.log('Найден DATABASE_URL в .env файле');
  
  // Парсим URL для получения параметров подключения
  const url = new URL(databaseUrl);
  const host = url.hostname;
  const port = url.port || '5432';
  const database = url.pathname.slice(1); // убираем первый слеш
  const username = url.username;
  const password = url.password;
  
  console.log(`Подключаюсь к базе данных: ${host}:${port}/${database}`);
  
  // Создаем команду pg_dump
  const pgDumpCommand = `pg_dump --host=${host} --port=${port} --username=${username} --dbname=${database} --no-password --verbose --clean --no-owner --no-privileges --format=plain --file="${backupFile}"`;
  
  // Устанавливаем переменную окружения для пароля
  const env = { ...process.env, PGPASSWORD: password };
  
  console.log('Выполняю pg_dump...');
  
  // Выполняем команду
  execSync(pgDumpCommand, { 
    env: env,
    stdio: 'inherit',
    cwd: backendDir
  });
  
  // Проверяем, что файл создан
  if (fs.existsSync(backupFile)) {
    const stats = fs.statSync(backupFile);
    console.log(`✅ Резервная копия успешно создана: ${backupFile}`);
    console.log(`📁 Размер файла: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`🕒 Время создания: ${now.toLocaleString('ru-RU')}`);
  } else {
    throw new Error('Файл резервной копии не был создан');
  }
  
} catch (error) {
  console.error('❌ Ошибка при создании резервной копии:', error.message);
  
  // Если pg_dump не найден, пробуем альтернативный метод
  if (error.message.includes('pg_dump') || error.message.includes('not found')) {
    console.log('\n🔄 pg_dump не найден, пробую альтернативный метод через Node.js...');
    
    (async () => {
      try {
        // Создаем простой SQL дамп через прямое подключение
        const { Client } = require('./backend/node_modules/pg');
        
        // Читаем .env файл снова
        const backendDir = path.join(__dirname, 'backend');
        const envPath = path.join(backendDir, '.env');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const databaseUrlMatch = envContent.match(/DATABASE_URL\s*=\s*"([^"]+)"/);
        
        if (!databaseUrlMatch) {
          throw new Error('DATABASE_URL не найден в .env файле');
        }
        
        const client = new Client({
          connectionString: databaseUrlMatch[1]
        });
        
        await client.connect();
        console.log('Подключен к базе данных через pg клиент');
        
        // Получаем список всех таблиц
        const tablesResult = await client.query(`
          SELECT tablename 
          FROM pg_tables 
          WHERE schemaname = 'public'
          ORDER BY tablename
        `);
        
        let sqlDump = `-- Резервная копия базы данных SlotQuest v004\n`;
        sqlDump += `-- Создано: ${now.toISOString()}\n\n`;
        sqlDump += `SET foreign_key_checks = 0;\n\n`;
        
        // Для каждой таблицы создаем дамп данных
        for (const table of tablesResult.rows) {
          const tableName = table.tablename;
          console.log(`Экспортирую таблицу: ${tableName}`);
          
          // Получаем данные таблицы
          const dataResult = await client.query(`SELECT * FROM "${tableName}"`);
          
          if (dataResult.rows.length > 0) {
            sqlDump += `-- Таблица: ${tableName}\n`;
            sqlDump += `DELETE FROM "${tableName}";\n`;
            
            // Получаем информацию о колонках
            const columnsResult = await client.query(`
              SELECT column_name, data_type 
              FROM information_schema.columns 
              WHERE table_name = $1 AND table_schema = 'public'
              ORDER BY ordinal_position
            `, [tableName]);
            
            const columns = columnsResult.rows.map(col => col.column_name);
            
            for (const row of dataResult.rows) {
              const values = columns.map(col => {
                const value = row[col];
                if (value === null) return 'NULL';
                if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
                if (value instanceof Date) return `'${value.toISOString()}'`;
                if (typeof value === 'boolean') return value ? 'true' : 'false';
                return value;
              });
              
              sqlDump += `INSERT INTO "${tableName}" (${columns.map(col => `"${col}"`).join(', ')}) VALUES (${values.join(', ')});\n`;
            }
            
            sqlDump += '\n';
          }
        }
        
        sqlDump += `SET foreign_key_checks = 1;\n`;
        
        // Сохраняем файл
        fs.writeFileSync(backupFile, sqlDump);
        
        await client.end();
        
        const stats = fs.statSync(backupFile);
        console.log(`✅ Резервная копия успешно создана через Node.js: ${backupFile}`);
        console.log(`📁 Размер файла: ${(stats.size / 1024).toFixed(2)} KB`);
        console.log(`🕒 Время создания: ${now.toLocaleString('ru-RU')}`);
        
      } catch (nodeError) {
        console.error('❌ Ошибка при создании резервной копии через Node.js:', nodeError.message);
        process.exit(1);
      }
    })();
  } else {
    process.exit(1);
  }
}