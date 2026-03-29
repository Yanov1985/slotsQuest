import Particles from "@tsparticles/vue3";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

export default defineNuxtPlugin((nuxtApp) => {
  // Регистрируем Particles.js ТОЛЬКО на клиенте, чтобы избежать SSR ошибок
  nuxtApp.vueApp.use(Particles, {
    init: async engine => {
      // Подгружаем легкий пресет Конфетти
      await loadConfettiPreset(engine);
    },
  });
});
