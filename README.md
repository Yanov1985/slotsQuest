# SlotQuest

Платформа для поиска и сравнения игровых автоматов онлайн казино.

## Описание проекта

SlotQuest - это современная веб-платформа, которая помогает игрокам находить и сравнивать игровые автоматы от различных провайдеров. Проект состоит из backend API на NestJS и frontend на Nuxt.js.

## Структура проекта

```
SlotQuest/
├── backend/                    # NestJS API сервер
│   ├── src/                   # Исходный код API
│   ├── prisma/                # Схема и миграции базы данных
│   ├── providers_and_categories.sql # SQL файл с провайдерами и категориями
│   ├── add-slots.js           # Скрипт добавления тестовых слотов
│   └── export-current-data.js # Скрипт экспорта базы данных
├── frontend/                  # Nuxt.js веб-приложение
├── current_database_backup.sql # Резервная копия базы данных
└── README.md                  # Этот файл
```

## Текущее состояние проекта

✅ **Завершено:**
- Настроена база данных PostgreSQL с Prisma ORM
- Добавлены провайдеры слотов (NetEnt, Microgaming, Pragmatic Play, Play'n GO, Evolution Gaming)
- Добавлены категории слотов (Video Slots, Classic Slots, Jackpot Slots, Megaways, Live Casino)
- Добавлены 29 тем для слотов (Adventure, Ancient Egypt, Animals, и др.)
- Добавлены тестовые слоты: Starburst, Mega Moolah, Sweet Bonanza
- API `/api/slots` возвращает данные слотов
- Фронтенд корректно отображает слоты
- Создана резервная копия базы данных

## Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com/Yanov1985/slotsQuest.git
cd SlotQuest
```

### 2. Настройка Backend

```bash
cd backend
npm install
```

Создайте файл `.env` в папке backend:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/slotquest"
DIRECT_URL="postgresql://username:password@localhost:5432/slotquest"
```

Инициализируйте базу данных:

```bash
# Применить миграции Prisma
npx prisma migrate deploy

# Добавить провайдеров и категории
psql -U username -d slotquest -f providers_and_categories.sql

# Добавить тестовые слоты
node add-slots.js
```

Запустите backend:

```bash
npm run start:dev
```

API будет доступно по адресу: `http://localhost:3001/api`

### 3. Настройка Frontend

```bash
cd frontend
npm install
npm run dev
```

Фронтенд будет доступен по адресу: `http://localhost:3000`

## Восстановление из резервной копии

Для восстановления базы данных из резервной копии:

```bash
# Восстановить данные из резервной копии
psql -U username -d slotquest -f current_database_backup.sql
```

## API Endpoints

- `GET /api/slots` - Получить список всех слотов
- `GET /api/providers` - Получить список провайдеров
- `GET /api/categories` - Получить список категорий
- `GET /api/themes` - Получить список тем

## Технологии

**Backend:**
- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript

**Frontend:**
- Nuxt.js 3
- Vue.js 3
- Tailwind CSS
- TypeScript

### 3. Настройка Frontend

```bash
cd ../frontend
npm install
```

Создайте файл `.env` в папке frontend:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Запустите frontend:

```bash
npm run dev
```

Веб-приложение будет доступно по адресу: `http://localhost:3000`

## База данных

### Основной файл данных

- **`supabase_data.sql`** - единственный SQL файл с минимальными тестовыми данными
  - Содержит структуру таблиц
  - Базовые данные для разработки
  - Легко расширяется новыми данными

### Структура таблиц

- `providers` - провайдеры игр (NetEnt, Microgaming, и др.)
- `slot_categories` - категории слотов (Video Slots, Jackpot Slots, и др.)
- `slots` - игровые автоматы
- `casinos` - онлайн казино
- `casino_slots` - связь между казино и слотами

## API Endpoints

### Слоты
- `GET /api/slots` - список всех слотов
- `GET /api/slots/:id` - слот по ID
- `GET /api/slots/slug/:slug` - слот по slug

### Провайдеры
- `GET /api/providers` - список всех провайдеров
- `GET /api/providers/:id` - провайдер по ID

## Технологии

### Backend
- [NestJS](https://nestjs.com/) - Node.js фреймворк
- [Supabase](https://supabase.com/) - Backend-as-a-Service
- [TypeScript](https://www.typescriptlang.org/) - типизированный JavaScript
- [PostgreSQL](https://www.postgresql.org/) - база данных

### Frontend
- [Nuxt.js](https://nuxt.com/) - Vue.js фреймворк
- [Vue 3](https://vuejs.org/) - прогрессивный JavaScript фреймворк
- [TypeScript](https://www.typescriptlang.org/) - типизированный JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - CSS фреймворк

## Разработка

### Добавление новых данных

Для добавления новых тестовых данных:

1. Отредактируйте файл `supabase_data.sql`
2. Запустите инициализацию: `node backend/init-with-service-key.js`
3. Или используйте скрипт обновления: `node backend/update-image-urls.js`

### Полезные команды

```bash
# Тестирование подключения к БД
node backend/test-db.js

# Обновление URL изображений
node backend/update-image-urls.js

# Запуск тестов backend
cd backend && npm run test

# Запуск тестов frontend
cd frontend && npm run test
```

## Деплой

### Backend
- Настройте переменные окружения на сервере
- Запустите: `npm run start:prod`

### Frontend
- Соберите проект: `npm run build`
- Запустите: `npm run preview`

## Лицензия

MIT

## Контакты

Для вопросов и предложений создавайте issues в репозитории.