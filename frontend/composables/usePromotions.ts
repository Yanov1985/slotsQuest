export const usePromotions = () => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();

  const getPromotions = async (params = {}) => {
    return await $fetch(`${import.meta.client ? '' : config.public.apiUrl}/api/promotions`, {
      params: { ...params, lang: locale.value }
    });
  };

  const getPromotionBySlug = async (slug: string) => {
    return await $fetch(`${import.meta.client ? '' : config.public.apiUrl}/api/promotions/${slug}`, {
      params: { lang: locale.value }
    });
  };

  return {
    getPromotions,
    getPromotionBySlug
  };
};
