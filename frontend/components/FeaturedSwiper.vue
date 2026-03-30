<template>
  <div class="featured-swiper-wrapper my-6 relative">
    <div class="flex items-center justify-between mb-4 px-2">
      <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
        <Icon name="solar:fire-bold-duotone" class="text-orange-500 mr-2 -mt-1" />
        <slot name="title">Горячие Новинки</slot>
      </h2>
      <div class="flex space-x-2 hidden sm:flex">
        <!-- Навигационные кнопки свайпера внедряются автоматически, но мы можем стилизовать их -->
      </div>
    </div>

    <!-- Nuxt Swiper Component -->
    <Swiper
      :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
      :slides-per-view="1.2"
      :space-between="16"
      :breakpoints="{
        '480': { slidesPerView: 2.2, spaceBetween: 16 },
        '768': { slidesPerView: 3.2, spaceBetween: 20 },
        '1024': { slidesPerView: 4.2, spaceBetween: 24 },
        '1280': { slidesPerView: 5.2, spaceBetween: 24 }
      }"
      :autoplay="{
        delay: 3500,
        disableOnInteraction: true,
        pauseOnMouseEnter: true
      }"
      :loop="true"
      navigation
      pagination
      class="slots-swiper !pb-12"
    >
      <SwiperSlide v-for="item in slots" :key="item.id || item.slug">
        <SlotCard :slot="item" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
const props = defineProps({
  slots: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style scoped>
/* Кастомизация интерфейса Swiper (Стрелки и Точки) под наш Cyberpunk/Dark UI */
.featured-swiper-wrapper {
  /* Фикс для обрезки теней в Swiper */
  padding: 10px;
  margin: -10px auto 20px auto;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #fff;
  background: rgba(30, 41, 59, 0.8);
  width: 44px;
  height: 44px;
  border-radius: 12px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  transition: all 0.3s ease;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(168, 85, 247, 0.9); /* Tailwind purple-500 */
  border-color: rgba(216, 180, 254, 0.5);
  transform: scale(1.1);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 1.1rem;
  font-weight: 800;
}

:deep(.swiper-pagination-bullet) {
  background: #64748b; /* slate-500 */
  opacity: 0.6;
  width: 8px;
  height: 8px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #a855f7; /* purple-500 */
  opacity: 1;
  width: 24px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
}
</style>
