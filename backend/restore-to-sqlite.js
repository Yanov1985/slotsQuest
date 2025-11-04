const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Создаем временную схему для SQLite
const sqliteSchema = `
generator client {
  provider = "prisma-client-js"
  output   = "./generated/client-sqlite"
}

datasource db {
  provider = "sqlite"
  url      = "file:./temp-restore.db"
}

model providers {
  id             String   @id @default(uuid())
  name           String   @unique
  slug           String   @unique
  description    String?
  logo_url       String?
  website_url    String?
  founded_year   Int?
  country        String?
  is_active      Boolean  @default(true)
  created_at     DateTime @default(now())
  updated_at     DateTime @updatedAt
  is_recommended Boolean  @default(false)
  slots          slots[]
}

model mechanics {
  id            String          @id @default(uuid())
  name          String          @unique
  slug          String          @unique
  description   String?
  created_at    DateTime        @default(now())
  updated_at    DateTime        @updatedAt
  slot_mechanics slot_mechanics[]
}

model themes {
  id         String   @id @default(uuid())
  name       String   @unique
  slug       String   @unique
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  slots      slots[]
}

model slot_categories {
  id         String   @id @default(uuid())
  name       String   @unique
  slug       String   @unique
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  slots      slots[]
}

model slots {
  id                String          @id @default(uuid())
  name              String
  slug              String          @unique
  provider_id       String
  category_id       String
  theme_id          String?
  rtp               Float?
  volatility        String?
  min_bet           Float?
  max_bet           Float?
  max_win           Float?
  paylines          Int?
  reels             Int?
  rows              Int?
  has_free_spins    Boolean         @default(false)
  has_bonus_game    Boolean         @default(false)
  has_wild          Boolean         @default(false)
  has_scatter       Boolean         @default(false)
  has_multiplier    Boolean         @default(false)
  description       String?
  image_url         String?
  demo_url          String?
  is_active         Boolean         @default(true)
  created_at        DateTime        @default(now())
  updated_at        DateTime        @updatedAt
  provider          providers       @relation(fields: [provider_id], references: [id])
  category          slot_categories @relation(fields: [category_id], references: [id])
  theme             themes?         @relation(fields: [theme_id], references: [id])
  slot_mechanics    slot_mechanics[]
}

model slot_mechanics {
  id          String    @id @default(uuid())
  slot_id     String
  mechanic_id String
  created_at  DateTime  @default(now())
  slot        slots     @relation(fields: [slot_id], references: [id], onDelete: Cascade)
  mechanic    mechanics @relation(fields: [mechanic_id], references: [id], onDelete: Cascade)

  @@unique([slot_id, mechanic_id])
}
`;

// Загрузка данных из JSON файлов
function loadJsonData(filename) {
  try {
    const filePath = path.join(__dirname, 'studio-data', filename);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Файл ${filename} не найден`);
      return [];
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`📁 Загружено ${data.length} записей из ${filename}`);
    return data;
  } catch (error) {
    console.error(`❌ Ошибка загрузки ${filename}:`, error.message);
    return [];
  }
}

// Создание временной схемы
function createTempSchema() {
  const schemaPath = path.join(__dirname, 'schema-temp.prisma');
  fs.writeFileSync(schemaPath, sqliteSchema);
  console.log('📝 Создана временная схема SQLite');
  return schemaPath;
}

// Генерация Prisma клиента для SQLite
async function generateSQLiteClient() {
  const { exec } = require('child_process');
  const util = require('util');
  const execAsync = util.promisify(exec);
  
  try {
    console.log('🔄 Генерация Prisma клиента для SQLite...');
    await execAsync('npx prisma generate --schema=schema-temp.prisma', { cwd: __dirname });
    console.log('✅ Prisma клиент для SQLite сгенерирован');
  } catch (error) {
    console.error('❌ Ошибка генерации клиента:', error.message);
    throw error;
  }
}

// Восстановление данных в SQLite
async function restoreToSQLite() {
  // Импортируем сгенерированный клиент
  const { PrismaClient: SQLitePrismaClient } = require('./generated/client-sqlite');
  const prisma = new SQLitePrismaClient();
  
  try {
    await prisma.$connect();
    console.log('✅ Подключение к SQLite успешно');
    
    // Загружаем данные
    const providersData = loadJsonData('providers.json');
    const mechanicsData = loadJsonData('mechanics.json');
    const themesData = loadJsonData('themes.json');
    const categoriesData = loadJsonData('slot_categories.json');
    const slotsData = loadJsonData('slots.json');
    
    // Восстанавливаем данные
    console.log('\n🔄 Восстановление данных в SQLite...');
    
    // 1. Провайдеры
    if (providersData.length > 0) {
      for (const provider of providersData) {
        try {
          await prisma.providers.create({ data: provider });
        } catch (error) {
          if (!error.message.includes('Unique constraint')) {
            console.log(`⚠️  Ошибка создания провайдера ${provider.name}:`, error.message);
          }
        }
      }
      console.log(`✅ Провайдеры: ${providersData.length} записей`);
    }
    
    // 2. Механики
    if (mechanicsData.length > 0) {
      for (const mechanic of mechanicsData) {
        try {
          await prisma.mechanics.create({ data: mechanic });
        } catch (error) {
          if (!error.message.includes('Unique constraint')) {
            console.log(`⚠️  Ошибка создания механики ${mechanic.name}:`, error.message);
          }
        }
      }
      console.log(`✅ Механики: ${mechanicsData.length} записей`);
    }
    
    // 3. Темы
    if (themesData.length > 0) {
      for (const theme of themesData) {
        try {
          await prisma.themes.create({ data: theme });
        } catch (error) {
          if (!error.message.includes('Unique constraint')) {
            console.log(`⚠️  Ошибка создания темы ${theme.name}:`, error.message);
          }
        }
      }
      console.log(`✅ Темы: ${themesData.length} записей`);
    }
    
    // 4. Категории
    if (categoriesData.length > 0) {
      for (const category of categoriesData) {
        try {
          await prisma.slot_categories.create({ data: category });
        } catch (error) {
          if (!error.message.includes('Unique constraint')) {
            console.log(`⚠️  Ошибка создания категории ${category.name}:`, error.message);
          }
        }
      }
      console.log(`✅ Категории: ${categoriesData.length} записей`);
    }
    
    // 5. Слоты
    if (slotsData.length > 0) {
      for (const slot of slotsData) {
        try {
          await prisma.slots.create({ data: slot });
        } catch (error) {
          if (!error.message.includes('Unique constraint')) {
            console.log(`⚠️  Ошибка создания слота ${slot.name}:`, error.message);
          }
        }
      }
      console.log(`✅ Слоты: ${slotsData.length} записей`);
    }
    
    // Проверяем результат
    const counts = {
      providers: await prisma.providers.count(),
      mechanics: await prisma.mechanics.count(),
      themes: await prisma.themes.count(),
      slot_categories: await prisma.slot_categories.count(),
      slots: await prisma.slots.count()
    };
    
    console.log('\n📊 Результат восстановления в SQLite:');
    for (const [table, count] of Object.entries(counts)) {
      console.log(`   ${table}: ${count} записей`);
    }
    
    console.log('\n✅ Данные успешно восстановлены в SQLite!');
    console.log('📁 База данных сохранена в: temp-restore.db');
    
    return counts;
    
  } finally {
    await prisma.$disconnect();
  }
}

// Экспорт данных из SQLite в SQL формат
async function exportToSQL() {
  const { exec } = require('child_process');
  const util = require('util');
  const execAsync = util.promisify(exec);
  
  try {
    console.log('\n🔄 Экспорт данных из SQLite в SQL формат...');
    
    // Используем sqlite3 для экспорта
    const dbPath = path.join(__dirname, 'temp-restore.db');
    const outputPath = path.join(__dirname, 'restored-data.sql');
    
    const command = `sqlite3 "${dbPath}" .dump > "${outputPath}"`;
    await execAsync(command);
    
    console.log(`✅ Данные экспортированы в: ${outputPath}`);
    
  } catch (error) {
    console.log('⚠️  Не удалось экспортировать через sqlite3, создаю альтернативный экспорт...');
    
    // Альтернативный способ - создаем SQL вручную
    const { PrismaClient: SQLitePrismaClient } = require('./generated/client-sqlite');
    const prisma = new SQLitePrismaClient();
    
    try {
      await prisma.$connect();
      
      let sql = '-- Восстановленные данные из SQLite\\n\\n';
      
      // Экспортируем провайдеров
      const providers = await prisma.providers.findMany();
      if (providers.length > 0) {
        sql += 'INSERT INTO providers (id, name, slug, description, logo_url, website_url, founded_year, country, is_active, created_at, updated_at, is_recommended) VALUES\\n';
        const providerValues = providers.map(p => 
          `('${p.id}', '${p.name.replace(/'/g, "''")}', '${p.slug}', ${p.description ? `'${p.description.replace(/'/g, "''")}'` : 'NULL'}, ${p.logo_url ? `'${p.logo_url}'` : 'NULL'}, ${p.website_url ? `'${p.website_url}'` : 'NULL'}, ${p.founded_year || 'NULL'}, ${p.country ? `'${p.country}'` : 'NULL'}, ${p.is_active}, '${p.created_at.toISOString()}', '${p.updated_at.toISOString()}', ${p.is_recommended})`
        ).join(',\\n');
        sql += providerValues + ';\\n\\n';
      }
      
      const outputPath = path.join(__dirname, 'restored-data-manual.sql');
      fs.writeFileSync(outputPath, sql);
      console.log(`✅ Альтернативный экспорт создан: ${outputPath}`);
      
    } finally {
      await prisma.$disconnect();
    }
  }
}

// Основная функция
async function main() {
  console.log('🚀 Восстановление данных через SQLite');
  console.log('='.repeat(50));
  
  try {
    // 1. Создаем временную схему
    createTempSchema();
    
    // 2. Генерируем клиент
    await generateSQLiteClient();
    
    // 3. Восстанавливаем данные
    const counts = await restoreToSQLite();
    
    // 4. Экспортируем данные
    await exportToSQL();
    
    console.log('\\n🎉 Процесс завершен успешно!');
    console.log('Теперь у вас есть:');
    console.log('1. SQLite база с данными: temp-restore.db');
    console.log('2. SQL файл для импорта: restored-data.sql');
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);