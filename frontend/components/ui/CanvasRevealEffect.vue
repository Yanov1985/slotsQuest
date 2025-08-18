<template>
  <div :class="containerClassName" ref="containerRef">
    <canvas
      ref="canvasRef"
      class="block w-full h-full"
      :style="{
        display: 'block',
        width: '100%',
        height: '100%',
        mixBlendMode: blendMode,
      }"
    ></canvas>
    <div v-if="showGradient" class="absolute inset-0" style="pointer-events: none; background: linear-gradient(to top, rgba(3, 7, 18, 1), rgba(3, 7, 18, 0.16) 84%);"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'

type RGB = [number, number, number]

const props = withDefaults(defineProps<{
  animationSpeed?: number
  opacities?: number[]
  colors?: RGB[]
  containerClassName?: string
  dotSize?: number
  showGradient?: boolean
  blendMode?: string
  intensity?: number
  waveAmplitude?: number
}>(), {
  animationSpeed: 0.4,
  opacities: () => [0.04, 0.04, 0.06, 0.06, 0.08, 0.12, 0.14, 0.18, 0.24, 0.32],
  colors: () => [[255, 255, 255]],
  containerClassName: '',
  dotSize: 3,
  showGradient: true,
  blendMode: 'normal',
  intensity: 1.0,
  waveAmplitude: 0.6,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

let rafId = 0
let resizeObserver: ResizeObserver | null = null
let startTime = 0
let isAnimating = false

const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  : false

function map(val: number, min1: number, max1: number, min2: number, max2: number) {
  return min2 + (val - min1) * (max2 - min2) / (max1 - min1)
}

function random(x: number, y: number) {
  const PHI = 1.61803398874989484820459
  const distance = Math.sqrt((x * PHI - x) ** 2 + (y * PHI - y) ** 2) * 0.5
  return Math.abs(Math.tan(distance) * x) % 1
}

function drawFrame(currentTime: number) {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  if (!startTime) {
    startTime = currentTime
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = container.getBoundingClientRect()
  const width = Math.floor(rect.width)
  const height = Math.floor(rect.height)

  if (width <= 0 || height <= 0) return

  if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, width, height)

  const totalSize = Math.max(props.dotSize * 2, 4)
  const dotSize = Math.max(props.dotSize, 1)

  // Центрируем сетку
  const offsetX = Math.abs(Math.floor((width % totalSize - dotSize) * 0.5))
  const offsetY = Math.abs(Math.floor((height % totalSize - dotSize) * 0.5))

  // Время анимации
  const elapsed = (currentTime - startTime) / 1000
  const speed = props.animationSpeed * (prefersReducedMotion ? 0.3 : 1)

  // КЛЮЧЕВАЯ ОСОБЕННОСТЬ: частотная анимация как в оригинале
  const frequency = 5.0 // частота обновления паттерна
  const u_time = elapsed * speed

  // Подготавливаем цвета как в оригинале
  const colors: RGB[] = (() => {
    if (props.colors.length >= 3) {
      return [props.colors[0], props.colors[0], props.colors[1], props.colors[1], props.colors[2], props.colors[2]]
    }
    if (props.colors.length === 2) {
      return [props.colors[0], props.colors[0], props.colors[0], props.colors[1], props.colors[1], props.colors[1]]
    }
    return [props.colors[0], props.colors[0], props.colors[0], props.colors[0], props.colors[0], props.colors[0]]
  })()

  const blendBoost = props.blendMode === 'multiply' ? 1.6 : props.blendMode === 'overlay' ? 1.25 : 1.0

  // Рисуем точки с частотной анимацией
  for (let y = offsetY; y < height; y += totalSize) {
    for (let x = offsetX; x < width; x += totalSize) {
      const st2_x = Math.floor(x / totalSize)
      const st2_y = Math.floor(y / totalSize)

      // ОРИГИНАЛЬНАЯ ЛОГИКА ACETERNITY: случайный offset для каждой ячейки
      const show_offset = random(st2_x, st2_y)

      // КЛЮЧЕВАЯ ФОРМУЛА: частотная анимация с случайными задержками
      const time_factor = Math.floor((u_time / frequency) + show_offset + frequency)
      const rand = random(st2_x * time_factor + 1.0, st2_y * time_factor + 1.0)

      // Выбираем opacity из массива на основе случайного значения
      const opacityIndex = Math.floor(rand * props.opacities.length)
      const baseOpacity = props.opacities[Math.max(0, Math.min(props.opacities.length - 1, opacityIndex))]

      // Выбираем цвет на основе show_offset
      const colorIndex = Math.floor(show_offset * 6)
      const [r, g, b] = colors[Math.max(0, Math.min(5, colorIndex))]

      // ДОПОЛНИТЕЛЬНАЯ ВОЛНОВАЯ АНИМАЦИЯ для "дыхания"
      const wave = Math.sin((st2_x * 0.65 + st2_y * 0.58) + u_time * 2.0 + show_offset * Math.PI * 2)
      const waveIntensity = map(wave, -1, 1, 0.7, 1.3)

      // Итоговая прозрачность с учётом всех факторов
      let opacity = baseOpacity * props.intensity * blendBoost * waveIntensity

      // ПОСТОЯННАЯ АНИМАЦИЯ: убираем step функции из оригинала, которые создавали hover-эффект
      // Вместо этого делаем плавную постоянную анимацию
      const continuousAnimation = 0.8 + 0.4 * Math.sin(u_time * 3.0 + show_offset * Math.PI)
      opacity *= continuousAnimation

      opacity = Math.min(1, Math.max(0, opacity))

      if (opacity <= 0.01) continue

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
      ctx.fillRect(x, y, dotSize, dotSize)
    }
  }
}

function animate(currentTime: number) {
  if (!isAnimating) return

  drawFrame(currentTime)
  rafId = requestAnimationFrame(animate)
}

function startAnimation() {
  if (isAnimating) return

  isAnimating = true
  startTime = 0
  rafId = requestAnimationFrame(animate)
}

function stopAnimation() {
  isAnimating = false
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
}

function handleResize() {
  if (isAnimating) {
    drawFrame(performance.now())
  }
}

onMounted(async () => {
  await nextTick()

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => handleResize())
    resizeObserver.observe(containerRef.value)
  }

  startAnimation()
})

onBeforeUnmount(() => {
  stopAnimation()

  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value)
    resizeObserver = null
  }
})

watch(() => [props.animationSpeed, props.opacities, props.colors, props.dotSize, props.intensity, props.waveAmplitude, props.blendMode], () => {
  if (isAnimating) {
    drawFrame(performance.now())
  }
}, { deep: true })
</script>
