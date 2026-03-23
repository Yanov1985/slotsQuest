// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-security',
    '@vite-pwa/nuxt',
    '@nuxtjs/partytown',
    'nuxt-og-image'
  ],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'Brand'
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  // Конфигурация иконок: управляет тем, какие наборы грузятся на сервере и клиенте.
  icon: {
    serverBundle: {
      collections: ['heroicons', 'solar', 'lucide', 'pajamas', 'logos', 'svg-spinners', 'simple-icons', 'skill-icons']
    },
    clientBundle: {
      scan: true,
      sizeLimitKb: 512
    },
    provider: 'iconify',
    fallbackToApi: true,
    mode: 'svg'
  },

  googleFonts: {
    families: {
      'Inter': [300, 400, 500, 600, 700, 800, 900],
      'JetBrains Mono': [300, 400, 500, 600, 700],
      'Roboto': [300, 400, 500, 700, 900],
      'Montserrat': [300, 400, 500, 600, 700, 800, 900]
    },
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    download: true,
    base64: false
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
    domains: ['localhost']
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
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
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
      robots: false,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet'
      }
    },
    // API proxy
    '/api/**': { proxy: 'http://127.0.0.1:3001/api/**' },
    // Cache static assets for 1 year
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/assets/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    // 10-minute Stale-While-Revalidate cache for specific routes
    // For a CMS-driven site where instant updates are expected, you might want these disabled.
    // '/slots': { swr: 600 },
    // '/slots/**': { swr: 600 },
    // '/': { swr: 600 }
  },

  nitro: {
    compressPublicAssets: true,
    devProxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true
      }
    },
    experimental: {
      wasm: true
    }
  },

  security: {
    headers: {
      contentSecurityPolicy: false, // Turn off CSP temporarily to avoid breaking existing inline scripts
      crossOriginEmbedderPolicy: false,
    }
  },

  partytown: {
    forward: ['dataLayer.push'],
  },

  pwa: {
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
