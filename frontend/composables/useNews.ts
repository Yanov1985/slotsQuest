export const useNews = () => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();

  const getNews = async (params = {}) => {
    return await $fetch(`${import.meta.client ? '' : config.public.apiUrl}/api/news`, {
      params: { ...params, lang: locale.value }
    });
  };

  const getNewsBySlug = async (slug: string) => {
    return await $fetch(`${import.meta.client ? '' : config.public.apiUrl}/api/news/${slug}`, {
      params: { lang: locale.value }
    });
  };

  return {
    getNews,
    getNewsBySlug
  };
};
