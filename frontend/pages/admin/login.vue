<template>
  <div class="min-h-screen bg-gradient-to-br from-[#05070D] via-[#111827] to-[#1F2937] text-white font-sans relative overflow-hidden">
    <!-- Декоративные мягкие градиентные слои, чтобы фон выглядел глубже -->
    <div class="pointer-events-none absolute -top-36 -left-28 h-96 w-96 rounded-full bg-[#FF6E48]/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-44 -right-28 h-[32rem] w-[32rem] rounded-full bg-[#00EDFF]/15 blur-3xl"></div>

    <div class="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div class="mx-auto w-full max-w-5xl">
        <div class="overflow-hidden rounded-3xl border border-[#3B4254] bg-[#121722]/75 backdrop-blur-xl shadow-2xl shadow-black/35">
          <!-- Адаптивный контейнер: на мобильных 1 колонка, на больших экранах 2 колонки -->
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <!-- Левая презентационная колонка скрыта на мобильных для компактности -->
            <aside class="hidden lg:flex flex-col justify-between p-8 xl:p-10 border-r border-[#353A4A] bg-gradient-to-b from-[#171D2B]/80 to-[#131927]/70">
              <div>
                <div class="inline-flex items-center gap-2 rounded-full border border-[#FF6E48]/40 bg-[#FF6E48]/10 px-4 py-2 text-sm text-[#FFD4C8]">
                  <Icon name="heroicons:shield-check" class="w-4 h-4 text-[#FF6E48]" />
                  Защищенная зона администратора
                </div>
                <h2 class="mt-6 text-3xl font-bold leading-tight">
                  SlotQuest Admin
                </h2>
                <p class="mt-3 text-[#AAB2C5] leading-relaxed">
                  Управляйте контентом, провайдерами и настройками платформы в одном месте.
                </p>
              </div>

              <div class="space-y-3 text-sm">
                <div class="flex items-start gap-3 rounded-xl border border-[#353A4A] bg-[#101520]/65 px-4 py-3">
                  <Icon name="heroicons:lock-closed" class="w-5 h-5 text-[#FF6E48] mt-0.5" />
                  <p class="text-[#D7DCE8]">Вход доступен только супер-администратору.</p>
                </div>
                <div class="flex items-start gap-3 rounded-xl border border-[#353A4A] bg-[#101520]/65 px-4 py-3">
                  <Icon name="heroicons:bolt" class="w-5 h-5 text-[#FF6E48] mt-0.5" />
                  <p class="text-[#D7DCE8]">После авторизации вы автоматически попадете в панель управления.</p>
                </div>
              </div>
            </aside>

            <!-- Правая колонка: форма входа, полностью адаптивная -->
            <section class="p-6 sm:p-8 lg:p-10">
              <div class="mx-auto w-full max-w-md lg:max-w-none">
                <div class="text-center lg:text-left mb-8">
                  <div class="w-14 h-14 rounded-xl bg-[#FF6E48]/20 border border-[#FF6E48]/40 mx-auto lg:mx-0 flex items-center justify-center mb-4">
                    <Icon name="heroicons:lock-closed" class="w-7 h-7 text-[#FF6E48]" />
                  </div>
                  <h1 class="text-2xl sm:text-3xl font-bold">Вход в админ-панель</h1>
                  <p class="text-[#9CA3AF] mt-2">Доступ только для супер-администратора</p>
                </div>

                <!-- Форма авторизации -->
                <form class="space-y-5" @submit.prevent="onSubmit">
                  <!-- Поле логина -->
                  <div>
                    <label for="login" class="block text-sm text-[#E5E7EB] mb-2">Логин</label>
                    <div class="relative">
                      <Icon name="heroicons:user" class="w-5 h-5 text-[#78839B] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        id="login"
                        v-model.trim="form.login"
                        type="text"
                        autocomplete="username"
                        class="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0F1117] border border-[#353A4A] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors"
                        placeholder="Введите логин"
                        required
                      >
                    </div>
                  </div>

                  <!-- Поле пароля -->
                  <div>
                    <label for="password" class="block text-sm text-[#E5E7EB] mb-2">Пароль</label>
                    <div class="relative">
                      <Icon name="heroicons:key" class="w-5 h-5 text-[#78839B] absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        id="password"
                        v-model="form.password"
                        type="password"
                        autocomplete="current-password"
                        class="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0F1117] border border-[#353A4A] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors"
                        placeholder="Введите пароль"
                        required
                      >
                    </div>
                  </div>

                  <!-- Ошибки авторизации -->
                  <p v-if="errorMessage" class="text-sm text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg px-3 py-2">
                    {{ errorMessage }}
                  </p>

                  <!-- Кнопка входа -->
                  <button
                    type="submit"
                    :disabled="loading"
                    class="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#CD5A3C] hover:to-[#FF6E48] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {{ loading ? 'Проверка...' : 'Войти' }}
                  </button>
                </form>
              </div>
            </section>
          </div>
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
const onSubmit = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    await login(form.login, form.password)
    // После входа всегда отправляем на главный дашборд админки.
    await navigateTo('/admin')
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

