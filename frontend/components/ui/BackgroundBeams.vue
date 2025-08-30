<template>
  <div class="background-beams-container">
    <!-- SVG Background Beams эффект -->
    <div class="beams-wrapper">
      <!-- Основной градиентный фон -->
      <div class="gradient-background"></div>

      <!-- Множественные анимированные лучи -->
      <div
        v-for="(beam, index) in beams"
        :key="`beam-${index}`"
        class="beam-ray"
        :class="`beam-${index + 1}`"
        :style="getBeamStyle(beam, index)"
      ></div>

      <!-- Дополнительные световые эффекты -->
      <div class="light-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="orb orb-4"></div>
        <div class="orb orb-5"></div>
        <div class="orb orb-6"></div>
        <div class="orb orb-7"></div>
        <div class="orb orb-8"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props для настройки эффекта
const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  intensity: {
    type: Number,
    default: 0.6,
  },
  speed: {
    type: Number,
    default: 1,
  },
})

// Цвета нашей админки
const colors = [
  '#FF6E48', // оранжевый
  '#00EDFF', // голубой
  '#63F3AB', // зеленый
  '#CD0F8B', // розовый
]

// Генерируем конфигурацию для лучей (больше лучей и интенсивности)
const beams = computed(() => {
  return Array.from({ length: 16 }, (_, i) => ({
    angle: i * 22.5 + Math.random() * 40 - 20, // Больше углов и вариации
    width: Math.random() * 400 + 300, // Увеличиваем ширину лучей
    height: Math.random() * 5 + 2, // Делаем лучи толще
    color: colors[i % colors.length],
    opacity: Math.random() * 0.5 + 0.4, // Увеличиваем базовую яркость
    duration: (Math.random() * 6 + 8) / props.speed, // Делаем быстрее
    delay: Math.random() * 3, // Меньше задержки между лучами
    startX: Math.random() * 120 - 10, // Позволяем лучам выходить за границы
    startY: Math.random() * 120 - 10,
  }))
})

// Функция для генерации стилей луча
const getBeamStyle = (beam, index) => {
  return {
    '--beam-angle': `${beam.angle}deg`,
    '--beam-width': `${beam.width}%`,
    '--beam-height': `${beam.height}px`,
    '--beam-color': beam.color,
    '--beam-opacity': beam.opacity * props.intensity,
    '--beam-duration': `${beam.duration}s`,
    '--beam-delay': `${beam.delay}s`,
    '--beam-start-x': `${beam.startX}%`,
    '--beam-start-y': `${beam.startY}%`,
    top: `${beam.startY}%`,
    left: `${beam.startX}%`,
  }
}
</script>

<style scoped>
/* Background Beams эффект в стиле Aceternity UI */
.background-beams-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.beams-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Основной градиентный фон */
.gradient-background {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse 100% 60% at 50% 0%,
      rgba(255, 110, 72, 0.35),
      transparent 60%
    ),
    radial-gradient(
      ellipse 100% 60% at 50% 100%,
      rgba(0, 237, 255, 0.25),
      transparent 60%
    ),
    radial-gradient(
      ellipse 80% 50% at 0% 50%,
      rgba(99, 243, 171, 0.2),
      transparent 60%
    ),
    radial-gradient(
      ellipse 80% 50% at 100% 50%,
      rgba(205, 15, 139, 0.25),
      transparent 60%
    ),
    radial-gradient(
      ellipse 60% 80% at 25% 25%,
      rgba(255, 110, 72, 0.15),
      transparent 40%
    ),
    radial-gradient(
      ellipse 60% 80% at 75% 75%,
      rgba(0, 237, 255, 0.15),
      transparent 40%
    );
  animation: gradientShift 5s ease-in-out infinite alternate;
}

/* Стили для лучей */
.beam-ray {
  position: absolute;
  width: var(--beam-width);
  height: var(--beam-height);
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--beam-color) 20%,
    var(--beam-color) 80%,
    transparent 100%
  );
  opacity: var(--beam-opacity);
  transform: rotate(var(--beam-angle));
  transform-origin: left center;
  filter: blur(0.5px);
  animation: beamFlow var(--beam-duration) ease-in-out infinite;
  animation-delay: var(--beam-delay);
  will-change: opacity, transform;
}

/* Световые орбы */
.light-orbs {
  position: absolute;
  inset: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(1px);
  animation: orbFloat 6s ease-in-out infinite;
}

.orb-1 {
  width: 25px;
  height: 25px;
  background: radial-gradient(circle, rgba(255, 110, 72, 0.8), transparent 70%);
  top: 15%;
  left: 8%;
  animation-delay: 0s;
}

.orb-2 {
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(0, 237, 255, 0.7), transparent 70%);
  top: 65%;
  right: 15%;
  animation-delay: 1.5s;
}

.orb-3 {
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, rgba(99, 243, 171, 0.6), transparent 70%);
  bottom: 25%;
  left: 55%;
  animation-delay: 3s;
}

.orb-4 {
  width: 18px;
  height: 18px;
  background: radial-gradient(circle, rgba(205, 15, 139, 0.7), transparent 70%);
  top: 40%;
  left: 25%;
  animation-delay: 4.5s;
}

.orb-5 {
  width: 22px;
  height: 22px;
  background: radial-gradient(circle, rgba(255, 110, 72, 0.6), transparent 70%);
  top: 80%;
  right: 40%;
  animation-delay: 2s;
}

.orb-6 {
  width: 16px;
  height: 16px;
  background: radial-gradient(circle, rgba(0, 237, 255, 0.8), transparent 70%);
  top: 10%;
  right: 30%;
  animation-delay: 6s;
}

.orb-7 {
  width: 28px;
  height: 28px;
  background: radial-gradient(circle, rgba(99, 243, 171, 0.5), transparent 70%);
  bottom: 60%;
  left: 80%;
  animation-delay: 3.5s;
}

.orb-8 {
  width: 24px;
  height: 24px;
  background: radial-gradient(circle, rgba(205, 15, 139, 0.6), transparent 70%);
  bottom: 15%;
  right: 70%;
  animation-delay: 5.5s;
}

/* Анимации */
@keyframes gradientShift {
  0% {
    opacity: 0.6;
    transform: scale(1) rotate(0deg);
  }
  33% {
    opacity: 0.9;
    transform: scale(1.03) rotate(2deg);
  }
  66% {
    opacity: 0.8;
    transform: scale(1.01) rotate(-1deg);
  }
  100% {
    opacity: 0.7;
    transform: scale(1.02) rotate(1deg);
  }
}

@keyframes beamFlow {
  0% {
    opacity: 0;
    transform: rotate(var(--beam-angle)) translateX(-200px) scale(0.5);
    filter: blur(2px);
  }
  20% {
    opacity: var(--beam-opacity);
    filter: blur(0.5px);
  }
  80% {
    opacity: var(--beam-opacity);
    filter: blur(0.5px);
  }
  100% {
    opacity: 0;
    transform: rotate(var(--beam-angle)) translateX(200px) scale(1.2);
    filter: blur(2px);
  }
}

@keyframes orbFloat {
  0% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-15px) translateX(10px) scale(1.15);
    opacity: 1;
  }
  50% {
    transform: translateY(-25px) translateX(-5px) scale(1.2);
    opacity: 0.9;
  }
  75% {
    transform: translateY(-10px) translateX(-15px) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.7;
  }
}

/* Оптимизация производительности */
.beam-ray,
.orb,
.gradient-background {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Адаптивность */
@media (max-width: 768px) {
  .beam-ray {
    filter: blur(1px);
  }

  .orb {
    filter: blur(2px);
  }
}
</style>
