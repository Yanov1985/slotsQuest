# SlotQuest Backend API

NestJS backend API для платформы SlotQuest - сервиса для поиска и сравнения игровых автоматов.

## Описание

Backend построен на [NestJS](https://nestjs.com/) и использует Supabase в качестве базы данных.

## Установка проекта

```bash
$ npm install
```

## Настройка окружения

Создайте файл `.env` в корне папки backend:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=your_database_url
```

## Инициализация базы данных

Для инициализации базы данных с тестовыми данными используйте:

```bash
# Инициализация с минимальными тестовыми данными
$ node init-with-service-key.js
```

Основной файл с данными: `../supabase_data.sql` - содержит минимальный набор тестовых данных для разработки.

## Запуск проекта

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

API будет доступно по адресу: `http://localhost:3001/api`

## API Endpoints

### Слоты
- `GET /api/slots` - получить список всех слотов
- `GET /api/slots/:id` - получить слот по ID
- `GET /api/slots/slug/:slug` - получить слот по slug

### Провайдеры
- `GET /api/providers` - получить список всех провайдеров
- `GET /api/providers/:id` - получить провайдера по ID

## Структура данных

Проект использует следующие основные таблицы:
- `providers` - провайдеры игр
- `slot_categories` - категории слотов
- `slots` - игровые автоматы
- `casinos` - онлайн казино
- `casino_slots` - связь казино и слотов

## Тестирование

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Полезные скрипты

- `update-image-urls.js` - обновление URL изображений в базе данных
- `test-db.js` - тестирование подключения к базе данных

## Технологии

- [NestJS](https://nestjs.com/) - Node.js фреймворк
- [Supabase](https://supabase.com/) - Backend-as-a-Service
- [TypeScript](https://www.typescriptlang.org/) - типизированный JavaScript
- [PostgreSQL](https://www.postgresql.org/) - реляционная база данных

## Лицензия

MIT
