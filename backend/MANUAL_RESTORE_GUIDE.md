# 🛠️ Ручное восстановление базы данных через Supabase Dashboard

## 🎯 Когда использовать этот метод

Если автоматические скрипты не работают из-за проблем с подключением, можно восстановить базу данных вручную через веб-интерфейс Supabase. Это как ремонт автомобиля вручную, когда автосервис не работает! 🔧

## 📋 Пошаговая инструкция

### Шаг 1: Подготовка данных

1. **Открой файл бекапа** `backups/db/database_backup_v002.sql`
2. **Скопируй нужные секции** (мы будем вставлять их по частям)

### Шаг 2: Заходим в Supabase SQL Editor

1. Открой [Supabase Dashboard](https://supabase.com/dashboard)
2. Выбери свой проект
3. Перейди в **SQL Editor** (иконка базы данных слева)
4. Нажми **New query**

### Шаг 3: Создаем структуру таблиц

Вставь и выполни этот SQL код для создания всех таблиц:

```sql
-- Включаем расширения
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Удаляем старые таблицы (если есть)
DROP TABLE IF EXISTS slot_mechanics CASCADE;
DROP TABLE IF EXISTS slot_bonuses CASCADE;
DROP TABLE IF EXISTS slot_features CASCADE;
DROP TABLE IF EXISTS slots CASCADE;
DROP TABLE IF EXISTS mechanics CASCADE;
DROP TABLE IF EXISTS bonuses CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS themes CASCADE;
DROP TABLE IF EXISTS slot_categories CASCADE;
DROP TABLE IF EXISTS providers CASCADE;

-- Создаем таблицу провайдеров
CREATE TABLE providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    founded_year INTEGER,
    country VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    is_recommended BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Создаем таблицу категорий
CREATE TABLE slot_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Создаем таблицу тем
CREATE TABLE themes (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT,
    icon TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Создаем индексы для быстрого поиска
CREATE INDEX idx_providers_slug ON providers(slug);
CREATE INDEX idx_categories_slug ON slot_categories(slug);
CREATE INDEX idx_themes_slug ON themes(slug);
```

### Шаг 4: Загружаем провайдеров

**4.1.** Создай новый запрос в SQL Editor

**4.2.** Скопируй из бекапа секцию с провайдерами (начинается с `DELETE FROM providers;`)

**4.3.** Найди в файле `database_backup_v002.sql` строки от:

```sql
DELETE FROM providers;
```

до строки:

```sql
-- Категории
```

**4.4.** Скопируй ВСЕ строки `INSERT INTO providers` и выполни их

### Шаг 5: Загружаем категории

**5.1.** Создай новый запрос

**5.2.** Найди в бекапе секцию:

```sql
DELETE FROM slot_categories;
```

до строки:

```sql
-- Темы
```

**5.3.** Скопируй и выполни все `INSERT INTO slot_categories`

### Шаг 6: Загружаем темы

**6.1.** Создай новый запрос

**6.2.** Найди секцию:

```sql
DELETE FROM themes;
```

до строки:

```sql
-- Слоты
```

**6.3.** Скопируй и выполни все `INSERT INTO themes`

### Шаг 7: Проверяем результат

Выполни этот запрос для проверки:

```sql
-- Проверяем количество данных
SELECT
    'Провайдеры' as таблица,
    COUNT(*) as количество
FROM providers

UNION ALL

SELECT
    'Категории' as таблица,
    COUNT(*) as количество
FROM slot_categories

UNION ALL

SELECT
    'Темы' as таблица,
    COUNT(*) as количество
FROM themes;
```

**Ожидаемый результат:**

- Провайдеры: ~100
- Категории: ~35
- Темы: ~200+

## 🎯 Что делать дальше

После успешной загрузки данных:

1. **Вернись в терминал** и выполни:

   ```bash
   npx prisma db pull
   npx prisma generate
   ```

2. **Запусти проверку**:

   ```bash
   node check-connection.js
   ```

3. **Если все ОК, запусти приложение**:
   ```bash
   npm run start:dev
   ```

## 🚨 Если возникают ошибки

### Ошибка: "duplicate key value"

**Решение:** Очисти таблицы перед загрузкой:

```sql
DELETE FROM themes;
DELETE FROM slot_categories;
DELETE FROM providers;
```

### Ошибка: "permission denied"

**Решение:**

1. Убедись, что используешь **service_role** ключ
2. Проверь права доступа в Supabase Dashboard → Settings → API

### Ошибка: "function uuid_generate_v4() does not exist"

**Решение:** Выполни сначала:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## 💡 Полезные SQL команды для отладки

```sql
-- Посмотреть структуру таблицы
\d providers

-- Посмотреть первые 5 записей
SELECT * FROM providers LIMIT 5;

-- Удалить все данные из таблицы
TRUNCATE providers CASCADE;

-- Посмотреть размер таблиц
SELECT schemaname,tablename,attname,n_distinct,correlation
FROM pg_stats
WHERE tablename = 'providers';
```

---

**🎉 Удачи с ручным восстановлением! Этот метод работает в 99% случаев!** 💪

