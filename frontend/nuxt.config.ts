// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],
  
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
