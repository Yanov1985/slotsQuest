<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white font-sans">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="max-w-md mx-auto">
        <div class="bg-[#161A21]/70 border border-[#353A4A] rounded-2xl p-8 backdrop-blur-sm">
          <div class="text-center mb-8">
            <div class="w-14 h-14 rounded-xl bg-[#FF6E48]/20 border border-[#FF6E48]/40 mx-auto flex items-center justify-center mb-4">
              <Icon name="heroicons:lock-closed" class="w-7 h-7 text-[#FF6E48]" />
            </div>
            <h1 class="text-2xl font-bold">Вход в админ-панель</h1>
            <p class="text-[#9CA3AF] mt-2">Доступ только для супер-администратора</p>
          </div>

          <form class="space-y-5" @submit.prevent="onSubmit">
            <div>
              <label for="login" class="block text-sm text-[#E5E7EB] mb-2">Логин</label>
              <input
                id="login"
                v-model.trim="form.login"
                type="text"
                autocomplete="username"
                class="w-full px-4 py-3 rounded-xl bg-[#0F1117] border border-[#353A4A] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48]"
                placeholder="Введите логин"
                required
              >
            </div>

            <div>
              <label for="password" class="block text-sm text-[#E5E7EB] mb-2">Пароль</label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                autocomplete="current-password"
                class="w-full px-4 py-3 rounded-xl bg-[#0F1117] border border-[#353A4A] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48]"
                placeholder="Введите пароль"
                required
              >
            </div>

            <p v-if="errorMessage" class="text-sm text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg px-3 py-2">
              {{ errorMessage }}
            </p>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#CD5A3C] hover:to-[#FF6E48] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {{ loading ? 'Проверка...' : 'Войти' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Состояние формы авторизации.
const form = reactive({
  login: '',
  password: ''
})

// Служебные флаги интерфейса.
const loading = ref(false)
const errorMessage = ref('')

// Работаем с auth-композаблом, который хранит токен и пользователя.
const { login } = useAdminAuth()
const route = useRoute()

const onSubmit = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    await login(form.login, form.password)

    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/admin'
    await navigateTo(redirect)
  } catch (error) {
    const status =
      error?.statusCode ||
      error?.status ||
      error?.response?.status

    if (status === 401) {
      errorMessage.value = 'Неверный логин или пароль. Проверьте данные и попробуйте снова.'
    } else {
      errorMessage.value = 'Сервер авторизации временно недоступен. Обновите страницу и попробуйте снова.'
    }
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Admin Login'
})
</script>

