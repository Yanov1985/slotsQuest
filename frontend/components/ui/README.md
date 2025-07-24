# UI Components

Эта папка содержит компоненты Aceternity UI, адаптированные для Nuxt.js проекта.

## Использование

1. Скопируйте код компонента с сайта [Aceternity UI](https://ui.aceternity.com/)
2. Адаптируйте код для Vue.js/Nuxt.js:
   - Замените React хуки на Vue Composition API
   - Используйте Vue директивы вместо React props
   - Импортируйте `cn` утилиту из `~/utils/cn`

## Структура

- Каждый компонент должен быть в отдельном файле
- Используйте TypeScript для типизации
- Следуйте соглашениям именования Vue.js

## Примеры адаптации

### React → Vue
```jsx
// React
import { useState, useEffect } from 'react'

// Vue
import { ref, onMounted } from 'vue'
```

### Props
```jsx
// React
interface Props {
  title: string;
}

// Vue
interface Props {
  title: string;
}

defineProps<Props>()
```