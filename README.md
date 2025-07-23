# SlotQuest

Платформа для поиска и сравнения игровых автоматов онлайн казино.

## Описание проекта

SlotQuest - это современная веб-платформа, которая помогает игрокам находить и сравнивать игровые автоматы от различных провайдеров. Проект состоит из backend API на NestJS и frontend на Nuxt.js.

## Структура проекта

```
SlotQuest/
├── backend/          # NestJS API сервер
├── frontend/         # Nuxt.js веб-приложение
├── supabase_data.sql # Основной файл с тестовыми данными
└── README.md         # Этот файл
```

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
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=your_database_url
```

Инициализируйте базу данных:

```bash
node init-with-service-key.js
```

Запустите backend:

```bash
npm run start:dev
```

API будет доступно по адресу: `http://localhost:3001/api`

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