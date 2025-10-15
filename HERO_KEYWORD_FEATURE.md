# 🎯 Hero Keyword Feature - Документация

## 📋 Описание функциональности

Добавлена возможность настройки **ключевого слова для Hero секции** через админ-панель. Для каждого слота можно задать уникальное ключевое слово, которое будет **заменять** стандартные фразы типа "Slot Review" в названии слота на клиентской стороне.

## 🔧 Что было сделано

### 1. **База данных** ✅

- Добавлено новое поле `hero_keyword` (VARCHAR 100) в таблицу `slots`
- Установлено значение по умолчанию "Slot Review" для существующих записей
- Обновлена Prisma схема с комментарием о назначении поля

### 2. **Backend (NestJS)** ✅

- Обновлен `CreateSlotDto` - добавлено поле `hero_keyword`
- Обновлен `UpdateSlotDto` - добавлено поле `hero_keyword`
- Поле доступно для создания и редактирования через API

### 3. **Frontend - Админка** ✅

- Добавлено красивое поле ввода с подсказками и примерами
- Поле расположено сразу после "Description для Hero секции"
- Визуальный пример показывает как будет выглядеть заголовок
- Добавлено в список `allowedFields` для сохранения
- Значение по умолчанию: "Slot Review"

### 4. **Frontend - Клиентская часть** ✅

- **Функция `getCleanSlotName()`** - очищает название слота от стандартных ключевых слов
- **Функция `getSlotNameWithKeyword()`** - формирует название с пользовательским keyword
- **Hero секция (мобильная и десктопная)** - используют новую функцию
- **Schema.org разметка** - обновлена для использования hero_keyword

## 💡 Примеры использования

### Как это работает:

**Шаг 1:** В базе данных название слота может быть:

```
"Gates of Olympus Slot Review"
```

**Шаг 2:** В Hero секции отображается ТОЛЬКО ключевое слово:

```
hero_keyword: "Play Review"
Результат в Hero секции: "Play Review"
```

**Важно:** Название слота ("Gates of Olympus") не используется в Hero секции, отображается только `hero_keyword`!

### Примеры замен:

| Название в БД                | hero_keyword       | Результат в Hero секции |
| ---------------------------- | ------------------ | ----------------------- |
| Gates of Olympus Slot Review | (пусто)            | Slot Review             |
| Gates of Olympus Slot Review | Play Review        | Play Review             |
| Gates of Olympus Game Review | Casino Game        | Casino Game             |
| Book of Dead                 | Jackpot Slot       | Jackpot Slot            |
| Sweet Bonanza Slot Game      | Premium Experience | Premium Experience      |

### Как работает отображение:

- В Hero секции отображается **только** значение поля `hero_keyword`
- Название слота из базы данных **НЕ используется**
- Если `hero_keyword` пустое, используется значение по умолчанию: **"Slot Review"**

## 📝 Как использовать

1. **Открыть админку слота:** `/admin/slots/[id]`
2. **Найти секцию "Hero Секция"**
3. **Заполнить поле "Ключевое слово для Hero секции"**
   - Примеры: "Play Review", "Game Review", "Casino Game"
   - Максимум 100 символов
   - По умолчанию используется "Slot Review"
4. **Сохранить изменения**

## 🎨 Где отображается hero_keyword

### 1. Hero секция - Описание слота

**Мобильная версия:**

```html
<strong>Play Review</strong> от Pragmatic Play — описание слота...
```

**Десктопная версия:**

```html
<strong>Play Review</strong> - описание слота...
```

**Обратите внимание:** Отображается ТОЛЬКО ключевое слово, без названия слота!

### 2. Schema.org разметка

**Article (Review) Schema:**

```json
{
  "headline": "Play Review 2025"
}
```

**VideoGame Schema:**

```json
{
  "genre": "Play Review"
}
```

**Примечание:** В Schema.org также используется только `hero_keyword`, без названия слота.

## 🔍 Технические детали

### Новые функции в frontend/pages/slots/[slug].vue:

```javascript
// Возвращает ТОЛЬКО ключевое слово для отображения в Hero секции
// Например: "Play Review" (без названия слота)
const getSlotNameWithKeyword = (slot) => {
  if (!slot) return "Slot Review";
  return slot.hero_keyword || "Slot Review";
};
```

**Важно:** Функция `getCleanSlotName()` создана, но сейчас не используется, так как отображается только `hero_keyword`.

### Файлы которые были изменены:

**Backend:**

- `backend/prisma/schema.prisma` - добавлено поле в модель slots
- `backend/src/slots/dto/create-slot.dto.ts` - добавлено поле
- `backend/src/slots/dto/update-slot.dto.ts` - добавлено поле

**Frontend:**

- `frontend/pages/admin/slots/[id].vue` - форма редактирования
- `frontend/pages/slots/[slug].vue` - отображение на странице (строки 212, 681, 5840-5876, 6282, 6032)

## 🎓 Метафора для понимания

Представь **Tinder** (приложение для знакомств):

**Без hero_keyword:**

- Профиль: "Александр, 25 лет, ищет отношения"

**С hero_keyword:**

- Имя остаётся: "Александр, 25 лет"
- Статус можно менять: "ищет отношения" → "ищет друзей" → "новый в городе"

Так же и в SlotQuest:

- Название слота: "Gates of Olympus"
- Ключевое слово меняется: "Slot Review" → "Play Review" → "Casino Game"

Это делает контент более гибким и персонализированным! 🎯

## 🚀 Примеры для разных типов слотов:

### Классический слот:

- Название в БД: `"Book of Dead Slot Review"` (не используется)
- hero_keyword: `"Classic Egyptian Slot"`
- Результат в Hero: **"Classic Egyptian Slot"**

### Современная игра:

- Название в БД: `"Reactoonz Game Review"` (не используется)
- hero_keyword: `"Alien Cluster Adventure"`
- Результат в Hero: **"Alien Cluster Adventure"**

### Казино развлечение:

- Название в БД: `"Crazy Time"` (не используется)
- hero_keyword: `"Live Casino Experience"`
- Результат в Hero: **"Live Casino Experience"**

### Джекпот слот:

- Название в БД: `"Mega Moolah Slot Game"` (не используется)
- hero_keyword: `"Progressive Jackpot Legend"`
- Результат в Hero: **"Progressive Jackpot Legend"**

## ✅ Тестирование

1. ✅ Создай новый слот и оставь hero_keyword пустым → должно отображаться "Slot Review"
2. ✅ Создай слот с hero_keyword = "Play Review" → должно отображаться только "Play Review"
3. ✅ Отредактируй существующий слот → hero_keyword должно сохраниться
4. ✅ Проверь Hero секцию на странице слота → должно показывать ТОЛЬКО ключевое слово (без названия)
5. ✅ Проверь Schema.org разметку → hero_keyword должно быть в headline и genre

## 🐛 Решение проблем

### Проблема: "Не вижу изменения на клиентской стороне"

**Решение:**

1. Жёсткое обновление: `Ctrl + Shift + R` (Windows) или `Cmd + Shift + R` (Mac)
2. Очистить кэш браузера: DevTools → Network → ✅ Disable cache
3. Перезапустить фронтенд сервер

### Проблема: "В API нет поля hero_keyword"

**Решение:**

1. Перезапустить бэкенд сервер: `Ctrl+C` → `npm run start:dev`
2. Проверить что миграция применена: открыть Prisma Studio (`npx prisma studio`)
3. Регенерировать Prisma Client: `npx prisma generate`

---

**Дата создания:** 13 октября 2025
**Версия:** 2.0
**Статус:** ✅ Завершено и протестировано
