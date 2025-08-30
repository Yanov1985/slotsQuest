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

// Генерируем конфигурацию для лучей
const beams = computed(() => {
  return Array.from({ length: 8 }, (_, i) => ({
    angle: i * 45 + Math.random() * 30 - 15, // Распределяем по кругу с вариацией
    width: Math.random() * 300 + 200,
    height: Math.random() * 3 + 1,
    color: colors[i % colors.length],
    opacity: Math.random() * 0.3 + 0.2,
    duration: (Math.random() * 8 + 12) / props.speed,
    delay: Math.random() * 5,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
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
      ellipse 80% 50% at 50% 0%,
      rgba(255, 110, 72, 0.2),
      transparent 50%
    ),
    radial-gradient(
      ellipse 80% 50% at 50% 100%,
      rgba(0, 237, 255, 0.15),
      transparent 50%
    ),
    radial-gradient(
      ellipse 60% 40% at 0% 50%,
      rgba(99, 243, 171, 0.1),
      transparent 50%
    ),
    radial-gradient(
      ellipse 60% 40% at 100% 50%,
      rgba(205, 15, 139, 0.15),
      transparent 50%
    );
  animation: gradientShift 8s ease-in-out infinite alternate;
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
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(255, 110, 72, 0.6), transparent 70%);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 15px;
  height: 15px;
  background: radial-gradient(circle, rgba(0, 237, 255, 0.5), transparent 70%);
  top: 70%;
  right: 20%;
  animation-delay: 2s;
}

.orb-3 {
  width: 25px;
  height: 25px;
  background: radial-gradient(circle, rgba(99, 243, 171, 0.4), transparent 70%);
  bottom: 30%;
  left: 60%;
  animation-delay: 4s;
}

/* Анимации */
@keyframes gradientShift {
  0% {
    opacity: 0.4;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.02) rotate(1deg);
  }
  100% {
    opacity: 0.5;
    transform: scale(1.01) rotate(-1deg);
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
  0%,
  100% {
    transform: translateY(0px) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) scale(1.1);
    opacity: 0.9;
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
