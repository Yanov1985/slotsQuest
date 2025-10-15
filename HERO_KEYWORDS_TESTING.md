# 🧪 Тестирование Hero Keywords - Инструкция

## ✅ Что уже готово:

1. **База данных обновлена** - поля `hero_keyword_2` и `hero_keyword_3` добавлены
2. **Бэкенд настроен** - API возвращает все hero_keyword поля
3. **Фронтенд обновлён** - теперь использует правильный API endpoint `/api/slots/:slug`
4. **Тестовое описание добавлено** - с плейсхолдерами `[keyword_2]` и `[keyword_3]`

## 🎯 Как протестировать:

### Шаг 1: Открой страницу слота в браузере

```
http://localhost:3000/slots/gates-of-olympus-review
```

### Шаг 2: Открой консоль браузера (F12)

Ты должен увидеть логи:
```
🔄 Загрузка слота по slug: gates-of-olympus-review
✅ Слот загружен: {
  name: "Gates of Olympus Slot Review",
  hero_keyword: "Ключевое слово",
  hero_keyword_2: "Ключевое слово_2",
  hero_keyword_3: "Ключевое слово_3",
  description: "We have dozens of Ancient Greek mythology online slots, but the superstar in this theme category is [keyword_2]. It shares the top position with its sibling, [keyword_3]..."
}

🔄 Замена ключевых слов в тексте: {
  originalText: "We have dozens of Ancient Greek mythology online slots, but the superstar in this theme category is [keyword_2]. It shares the top position with its sibling, [keyword_3]. This is a powerful game that feeds from the endless energy of Zeus. And when the king of the gods is in the mood, players can land up to x500 multipliers, which can significantly boost even the smallest payout.",
  hero_keyword_2: "Ключевое слово_2",
  hero_keyword_3: "Ключевое слово_3"
}

✅ Заменили [keyword_2] на: Ключевое слово_2
✅ Заменили [keyword_3] на: Ключевое слово_3

📝 Результат замены: "We have dozens of Ancient Greek mythology online slots, but the superstar in this theme category is Ключевое слово_2. It shares the top position with its sibling, Ключевое слово_3. This is a powerful game that feeds from the endless energy of Zeus. And when the king of the gods is in the mood, players can land up to x500 multipliers, which can significantly boost even the smallest payout."
```

### Шаг 3: Проверь отображение на странице

В Hero секции ты должен увидеть:

**Заголовок:**
```
Ключевое слово
```

**Описание (должны быть замены):**
```
We have dozens of Ancient Greek mythology online slots, but the superstar in this theme category is Ключевое слово_2. It shares the top position with its sibling, Ключевое слово_3. This is a powerful game that feeds from the endless energy of Zeus. And when the king of the gods is in the mood, players can land up to x500 multipliers, which can significantly boost even the smallest payout.
```

### Шаг 4: Обнови значения в админке

1. Открой: `http://localhost:3000/admin/slots`
2. Выбери слот "Gates of Olympus"
3. Найди раздел **"Ключевые слова для Hero секции (3 переменные)"**
4. Измени значения:
   - **Ключевое слово 1**: `Premium Slot Review`
   - **Переменная [keyword_2]**: `Gates of Olympus`
   - **Переменная [keyword_3]**: `Gates of Olympus 1,000`
5. Сохрани изменения

### Шаг 5: Обнови описание слота

В поле **"Описание"** измени текст на:
```
We have dozens of Ancient Greek mythology online slots, but the superstar in this theme category is [keyword_2]. It shares the top position with its sibling, [keyword_3]. This is a powerful game that feeds from the endless energy of Zeus. And when the king of the gods is in the mood, players can land up to x500 multipliers, which can significantly boost even the smallest payout.
```

⚠️ **Важно:** Убедись, что в тексте есть `[keyword_2]` и `[keyword_3]` именно в таком формате!

### Шаг 6: Проверь результат на клиентской части

1. Перезагрузи страницу слота: `http://localhost:3000/slots/gates-of-olympus-review`
2. Теперь ты должен увидеть:
   - **Заголовок**: `Premium Slot Review`
   - **Описание**: `We have dozens of Ancient Greek mythology online slots, but the superstar in this theme category is Gates of Olympus. It shares the top position with its sibling, Gates of Olympus 1,000...`

## 🔍 Если что-то не работает:

### Проблема: Изменения не отображаются

**Решение:**
1. Очисти кэш браузера (Ctrl+Shift+Delete)
2. Перезагрузи страницу с зажатым Ctrl+F5
3. Проверь консоль браузера на наличие логов

### Проблема: В консоли нет логов

**Решение:**
1. Убедись, что сервер запущен: `npm run dev`
2. Проверь, что открыта правильная страница
3. Открой консоль браузера (F12) → вкладка Console

### Проблема: Плейсхолдеры не заменяются

**Решение:**
1. Убедись, что в описании используются правильные плейсхолдеры: `[keyword_2]` и `[keyword_3]`
2. Проверь, что значения `hero_keyword_2` и `hero_keyword_3` заполнены в админке
3. Проверь консоль браузера - там должны быть логи замены

## 📝 Примеры использования

### Пример 1: Название слота в описании
```
Описание: "Discover the magic of [keyword_2], one of the most popular slots!"
hero_keyword_2: "Book of Ra"

Результат: "Discover the magic of Book of Ra, one of the most popular slots!"
```

### Пример 2: Сравнение двух версий
```
Описание: "Choose between [keyword_2] and [keyword_3] for the best gaming experience!"
hero_keyword_2: "Mega Moolah"
hero_keyword_3: "Mega Moolah Progressive"

Результат: "Choose between Mega Moolah and Mega Moolah Progressive for the best gaming experience!"
```

### Пример 3: Полное использование всех трёх ключевых слов

**В админке:**
- hero_keyword: `Exclusive Slot Review`
- hero_keyword_2: `Starburst`
- hero_keyword_3: `Starburst XXXtreme`

**Описание:**
```
[keyword_2] is a classic slot that has stood the test of time. The new version, [keyword_3], takes the excitement to the next level with enhanced graphics and bigger wins!
```

**Результат на странице:**
- **Заголовок Hero**: `Exclusive Slot Review`
- **Описание**: `Starburst is a classic slot that has stood the test of time. The new version, Starburst XXXtreme, takes the excitement to the next level with enhanced graphics and bigger wins!`

## 🎓 Понимание системы (как преподаватель объясняет школьникам)

Представь, что ты пишешь письмо шаблон для интернет-магазина:

1. **hero_keyword** - это как заголовок письма: "Специальное предложение"
2. **[keyword_2]** - это как переменная для названия товара: вместо "Товар А" ты пишешь `[keyword_2]`
3. **[keyword_3]** - это как переменная для дополнительной информации: вместо "версия Premium" ты пишешь `[keyword_3]`

Когда клиент открывает письмо, система автоматически заменяет:
- `[keyword_2]` → `iPhone 15`
- `[keyword_3]` → `iPhone 15 Pro Max`

И клиент видит: "Купите iPhone 15 или iPhone 15 Pro Max со скидкой!"

Точно так же работает наша система Hero Keywords для слотов! 🎰

## ✅ Всё готово!

Теперь ты можешь использовать эту систему для любого слота:
1. Заполни три hero_keyword поля в админке
2. Используй плейсхолдеры `[keyword_2]` и `[keyword_3]` в описании
3. На клиентской части они автоматически заменятся на твои значения!

**Приятного тестирования! 🚀**



