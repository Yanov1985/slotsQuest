# 🎯 Hero Keywords System - Система из 3 ключевых слов

## 📋 Описание функциональности

Реализована **мощная система из 3 ключевых слов** для полного контроля над Hero секцией:

1. **`hero_keyword`** - Заголовок Hero секции (отображается вместо названия слота)
2. **`hero_keyword_2`** - Первая переменная в тексте описания
3. **`hero_keyword_3`** - Вторая переменная в тексте описания

Это как система шаблонов в Tinder - ты можешь настраивать каждый элемент профиля!

## 🔧 Что было сделано

### 1. **База данных** ✅

- Добавлено поле `hero_keyword` (VARCHAR 100) - для заголовка
- Добавлено поле `hero_keyword_2` (VARCHAR 200) - для первой переменной
- Добавлено поле `hero_keyword_3` (VARCHAR 200) - для второй переменной
- Обновлена Prisma схема с подробными комментариями

### 2. **Backend (NestJS)** ✅

- Обновлен `CreateSlotDto` - добавлены все 3 поля
- Обновлен `UpdateSlotDto` - добавлены все 3 поля
- Все поля доступны для создания и редактирования через API

### 3. **Frontend - Админка** ✅

- Создан красивый блок с 3 полями ввода
- Добавлена инструкция по использованию плейсхолдеров
- Динамический пример показывает результат в реальном времени
- Цветовое кодирование:
  - 🟢 Зелёный - hero_keyword и hero_keyword_2
  - 🟣 Фиолетовый - hero_keyword_3
- Добавлено в список `allowedFields` для сохранения

### 4. **Frontend - Клиентская часть** ✅

- **Функция `getSlotNameWithKeyword()`** - возвращает hero_keyword для заголовка
- **Функция `replaceKeywordsInText()`** - заменяет [keyword_2] и [keyword_3] в тексте
- **Hero секция** - использует hero_keyword как заголовок
- **Описание** - автоматически заменяет переменные на значения

## 💡 Как использовать

### **В админке:**

#### **Шаг 1: Заполняем 3 ключевых слова**

```
1️⃣ hero_keyword: "Premium Casino Experience"
2️⃣ hero_keyword_2: "Gates of Olympus"
3️⃣ hero_keyword_3: "Gates of Olympus 1,000"
```

#### **Шаг 2: Пишем описание с плейсхолдерами**

```
We have dozens of Ancient Greek mythology online slots, but the superstar in
this theme category is [keyword_2]. It shares the top position with its sibling,
[keyword_3]. This is a powerful game that feeds from the endless energy of Zeus.
```

### **На клиентской стороне получится:**

**Заголовок Hero:**

```
"Premium Casino Experience"
```

**Описание:**

```
We have dozens of Ancient Greek mythology online slots, but the superstar in
this theme category is Gates of Olympus. It shares the top position with its
sibling, Gates of Olympus 1,000. This is a powerful game that feeds from the
endless energy of Zeus.
```

## 🎨 Примеры использования

### **Пример 1: Классический слот**

**Админка:**

```
hero_keyword: "Ancient Egypt Adventure"
hero_keyword_2: "Book of Dead"
hero_keyword_3: "Book of Dead Deluxe"

Description:
"Explore the mysteries of [keyword_2] and discover treasures in [keyword_3]!
Rich Wilde awaits your arrival in the tombs of pharaohs."
```

**Клиент видит:**

```
Заголовок: "Ancient Egypt Adventure"

Описание: "Explore the mysteries of Book of Dead and discover treasures in
Book of Dead Deluxe! Rich Wilde awaits your arrival in the tombs of pharaohs."
```

### **Пример 2: Современный слот**

**Админка:**

```
hero_keyword: "Cluster Pays Innovation"
hero_keyword_2: "Reactoonz"
hero_keyword_3: "Reactoonz 2"

Description:
"[keyword_2] revolutionized cluster pays mechanics! Now [keyword_3] takes it
to the next level with even more features and bigger wins!"
```

**Клиент видит:**

```
Заголовок: "Cluster Pays Innovation"

Описание: "Reactoonz revolutionized cluster pays mechanics! Now Reactoonz 2
takes it to the next level with even more features and bigger wins!"
```

### **Пример 3: Джекпот слот**

**Админка:**

```
hero_keyword: "Progressive Jackpot Legend"
hero_keyword_2: "Mega Moolah"
hero_keyword_3: "Mega Moolah Isis"

Description:
"[keyword_2] has paid out millions! Join the hunt with [keyword_3] for your
chance at life-changing wealth. The progressive jackpot waits for no one!"
```

**Клиент видит:**

```
Заголовок: "Progressive Jackpot Legend"

Описание: "Mega Moolah has paid out millions! Join the hunt with Mega Moolah Isis
for your chance at life-changing wealth. The progressive jackpot waits for no one!"
```

## 📝 Синтаксис плейсхолдеров

### **Доступные переменные:**

| Плейсхолдер   | Заменяется на           | Пример                   |
| ------------- | ----------------------- | ------------------------ |
| `[keyword_2]` | Значение hero_keyword_2 | "Gates of Olympus"       |
| `[keyword_3]` | Значение hero_keyword_3 | "Gates of Olympus 1,000" |

### **Правила использования:**

✅ **Правильно:**

```
"We love [keyword_2] and [keyword_3]!"
"[keyword_2] is better than [keyword_3]"
"Play [keyword_2] for free or try [keyword_3] for real money!"
```

❌ **Неправильно:**

```
"We love [ keyword_2 ]" - пробелы внутри скобок
"We love [KEYWORD_2]" - заглавные буквы
"We love {keyword_2}" - фигурные скобки вместо квадратных
```

## 🎯 Где отображаются ключевые слова

### **1. hero_keyword - Заголовок**

**Мобильная версия:**

```html
<strong>Premium Casino Experience</strong> от Pragmatic Play — описание...
```

**Десктопная версия:**

```html
<strong>Premium Casino Experience</strong> - описание...
```

### **2. hero_keyword_2 и hero_keyword_3 - В описании**

```html
<p>We love Gates of Olympus and Gates of Olympus 1,000!</p>
```

### **3. Schema.org разметка**

```json
{
  "headline": "Premium Casino Experience 2025",
  "description": "We love Gates of Olympus and Gates of Olympus 1,000!",
  "genre": "Premium Casino Experience"
}
```

## 🔍 Технические детали

### **Новые функции в frontend/pages/slots/[slug].vue:**

```javascript
// Возвращает ТОЛЬКО ключевое слово для заголовка
const getSlotNameWithKeyword = (slot) => {
  if (!slot) return "Slot Review";
  return slot.hero_keyword || "Slot Review";
};

// Заменяет [keyword_2] и [keyword_3] в тексте
const replaceKeywordsInText = (text, slot) => {
  if (!text || !slot) return text;

  let result = text;

  if (slot.hero_keyword_2) {
    result = result.replace(/\[keyword_2\]/g, slot.hero_keyword_2);
  }

  if (slot.hero_keyword_3) {
    result = result.replace(/\[keyword_3\]/g, slot.hero_keyword_3);
  }

  return result;
};
```

### **Файлы которые были изменены:**

**Backend:**

- `backend/prisma/schema.prisma` - добавлены 3 поля
- `backend/src/slots/dto/create-slot.dto.ts` - добавлены 3 поля
- `backend/src/slots/dto/update-slot.dto.ts` - добавлены 3 поля

**Frontend:**

- `frontend/pages/admin/slots/[id].vue` - форма с 3 полями (строки 581-721, 8499-8501, 9314-9316)
- `frontend/pages/slots/[slug].vue` - функции замены (строки 5884-5900, 5797)

## 🎓 Метафора для понимания

Представь **конструктор профиля в Tinder**:

**Элемент 1 - Заголовок профиля:**

- Можешь написать: "Adventure Seeker" вместо просто имени

**Элемент 2-3 - Интересы:**

- Можешь указать: "Люблю [хобби_1] и [хобби_2]"
- Результат: "Люблю путешествия и фотографию"

Так же и в SlotQuest:

- **hero_keyword** = Заголовок профиля
- **hero_keyword_2, hero_keyword_3** = Твои интересы/особенности

Полная кастомизация каждого элемента! 🎯

## ✅ Тестирование

### **Тест 1: Базовый функционал**

1. Открой админку слота
2. Заполни все 3 ключевых слова
3. В описании используй `[keyword_2]` и `[keyword_3]`
4. Сохрани
5. Открой клиентскую страницу
6. Проверь что:
   - Заголовок = hero_keyword
   - В описании `[keyword_2]` заменился на hero_keyword_2
   - В описании `[keyword_3]` заменился на hero_keyword_3

### **Тест 2: Пустые значения**

1. Оставь hero_keyword_2 пустым
2. В описании используй `[keyword_2]`
3. Результат: `[keyword_2]` останется как есть (не заменится)

### **Тест 3: Множественное использование**

1. hero_keyword_2 = "Gates of Olympus"
2. Описание: "[keyword_2] and [keyword_2] again!"
3. Результат: "Gates of Olympus and Gates of Olympus again!"

## 🐛 Решение проблем

### **Проблема: Переменные не заменяются**

**Возможные причины:**

1. Неправильный синтаксис плейсхолдера (проверь пробелы, регистр)
2. Поле hero_keyword_2 или hero_keyword_3 пустое
3. Кэш браузера - сделай жёсткое обновление `Ctrl + Shift + R`

### **Проблема: Не вижу поля в админке**

**Решение:**

1. Перезапусти фронтенд сервер
2. Очисти кэш браузера
3. Проверь что файл frontend/pages/admin/slots/[id].vue обновлён

### **Проблема: Ошибка при сохранении**

**Решение:**

1. Перезапусти бэкенд сервер
2. Проверь что миграция применена: `npx prisma studio`
3. Проверь DTO файлы на бэкенде

## 🚀 Продвинутые примеры

### **Пример 1: SEO-оптимизация**

```
hero_keyword: "Play Slots Online Free 2025"
hero_keyword_2: "Book of Ra Deluxe"
hero_keyword_3: "Lucky Lady's Charm"

Description:
"Looking for the best online slots? Try [keyword_2] and [keyword_3]!
Play for free or win real money. No download required!"
```

### **Пример 2: Сравнение слотов**

```
hero_keyword: "Battle of the Slots"
hero_keyword_2: "Gonzo's Quest"
hero_keyword_3: "Gonzo's Quest Megaways"

Description:
"Which is better: classic [keyword_2] or modern [keyword_3]?
Both offer amazing adventures, but Megaways brings up to 117,649 ways to win!"
```

### **Пример 3: Storytelling**

```
hero_keyword: "Epic Viking Adventure"
hero_keyword_2: "Vikings Go Wild"
hero_keyword_3: "Vikings Go Berzerk"

Description:
"Begin your journey with [keyword_2], then continue the saga in [keyword_3]!
The Vikings are calling you to join their raids across the frozen seas!"
```

---

**Дата создания:** 13 октября 2025
**Версия:** 3.0
**Статус:** ✅ Завершено и протестировано
**Возможности:** 1 заголовок + 2 переменные в тексте


