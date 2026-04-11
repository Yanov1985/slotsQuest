// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false }, // Отключено для ускорения dev-сервиса (можно включить при дебаге)

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-security',
    '@vite-pwa/nuxt',
    'nuxt-og-image',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@pinia/nuxt',
    'nuxt-delay-hydration',
    'nuxt-schema-org',
    'nuxt-link-checker',
    '@nuxt/scripts',
    'nuxt-swiper'
  ],

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: 'locales',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', file: 'en.json', iso: 'en-US', name: 'Global / English' },
      { code: 'ru', file: 'ru.json', iso: 'ru-RU', name: 'Россия (Russian)' },
      { code: 'pt-BR', file: 'pt-BR.json', iso: 'pt-BR', name: 'Brasil (Portuguese)' },
      { code: 'es-CL', file: 'es-CL.json', iso: 'es-CL', name: 'Chile (Spanish)' },
      { code: 'hi-IN', file: 'hi-IN.json', iso: 'hi-IN', name: 'India (Hindi)' },
      { code: 'tr', file: 'tr.json', iso: 'tr-TR', name: 'Turkey (Turkish)' },
      { code: 'uz', file: 'uz.json', iso: 'uz-UZ', name: 'Uzbekistan (Uzbek)' },
      { code: 'az', file: 'az.json', iso: 'az-AZ', name: 'Azerbaijan (Azerbaijani)' },
      { code: 'es-AR', file: 'es-AR.json', iso: 'es-AR', name: 'Argentina (Spanish)' },
      { code: 'ca', file: 'ca.json', iso: 'en-CA', name: 'Canada (English)' },
      { code: 'es-CO', file: 'es-CO.json', iso: 'es-CO', name: 'Colombia (Spanish)' },
      { code: 'id', file: 'id.json', iso: 'id-ID', name: 'Indonesia (Indonesian)' },
      { code: 'bn', file: 'bn.json', iso: 'bn-BD', name: 'Bangladesh (Bengali)' },
    ],
    // Включаем i18n только для публичных страниц, админке переводы URL не нужны
    pages: {
      'admin/**': false
    }
  },

  delayHydration: {
    mode: 'init', // Замораживает JS до первого взаимодействия (скролл/клик), взрывая баллы Google PageSpeed
    debug: false
  },

  site: {
    // Избегаем предупреждения "should not be localhost" обходя strict проверки site url для devmode
    url: process.env.NUXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'production' ? 'https://slotquest.app' : 'http://127.0.0.1:3000'),
    name: 'Brand'
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  icon: {
    serverBundle: {
      collections: ['heroicons', 'solar', 'lucide', 'pajamas', 'logos', 'svg-spinners', 'simple-icons', 'skill-icons']
    },
    clientBundle: {
      scan: true, // Должно быть true, иначе server SSR не может подгрузить иконки во время dev и сыпет ошибки
      sizeLimitKb: 512
    },
    mode: 'svg'
  },

  // @nuxt/fonts обрабатывает шрифты автоматически на основе тайлвинда без конфигов

  image: {
    quality: 80,
    format: ['webp', 'avif'],
    domains: ['localhost', 'hxwyfdjfugcogpkjpjot.supabase.co', '127.0.0.1']
  },

  // Enterprise sitemap: индекс + раздельные карты (pages, slots, images) для лучшего crawl в Google.
  sitemap: {
    // Админ-раздел не должен индексироваться поисковиками.
    exclude: ['/admin/**'],
    // Отключаем автогенерацию из nuxt:pages, чтобы не тащить служебные/админ-маршруты.
    excludeAppSources: ['nuxt:pages'],
    // Multi-sitemap конфигурация для больших каталогов.
    sitemaps: {
      pages: {
        includeAppSources: false,
        // Источник нужен и для child-sitemap, иначе карта получится пустой.
        sources: ['/__sitemap__/urls']
      },
      slots: {
        includeAppSources: false,
        sources: ['/__sitemap__/urls'],
        chunks: 1000
      },
      images: {
        includeAppSources: false,
        sources: ['/__sitemap__/urls'],
        chunks: 1000
      }
    }
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://127.0.0.1:3001',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3000'
    }
  },

  css: ['~/assets/css/main.css'],

  devServer: {
    port: 3000,
    host: 'localhost'
  },

  routeRules: {
    // Полностью закрываем админку от индексации (включая страницу авторизации).
    '/admin/**': {
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet'
      }
    },
    // Отменяем прокси для внутренних эндпоинтов Nuxt
    '/api/_nuxt_icon/**': { proxy: false },
    // API proxy - передаем в бекенд все API
    '/api/**': { proxy: 'http://127.0.0.1:3001/api/**' },
    // Cache static assets for 1 year
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/assets/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    // 1-minute Stale-While-Revalidate cache full HTML for instantly blazing fast TTFB (Production Only)
    '/slots': process.env.NODE_ENV === 'production' ? { swr: 60 } : {},
    '/slots/**': process.env.NODE_ENV === 'production' ? { swr: 60 } : {},
    '/': process.env.NODE_ENV === 'production' ? { swr: 60 } : {}
  },

  nitro: {
    compressPublicAssets: true,
    experimental: {
      wasm: true
    }
  },

  security: {
    rateLimiter: false,
    headers: {
      contentSecurityPolicy: false, // Turn off CSP temporarily to avoid breaking existing inline scripts
      crossOriginEmbedderPolicy: false,
    }
  },

  linkChecker: {
    enabled: process.env.NODE_ENV === 'production', // Отключено в DEV
    showLiveInspections: false,
    runOnBuild: false
  },

  pwa: {
    disable: process.env.NODE_ENV !== 'production', // Отключено в DEV
    registerType: 'autoUpdate',
    manifest: {
      name: 'Brand',
      short_name: 'Brand',
      theme_color: '#1a1a2e',
      background_color: '#1a1a2e',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/favicon.ico',
          sizes: '64x64',
          type: 'image/x-icon'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
