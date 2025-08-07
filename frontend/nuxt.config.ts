// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/google-fonts'
  ],

  icon: {
     serverBundle: {
       collections: ['heroicons']
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
    prefetch: false,
    preconnect: false,
    preload: false,
    download: true,
    base64: false
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001'
    }
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  nitro: {
    experimental: {
      wasm: true
    },
    devProxy: {
      '/api': {
        target: 'http://localhost:3001/api',
        changeOrigin: true,
        prependPath: true
      }
    }
  }
})
