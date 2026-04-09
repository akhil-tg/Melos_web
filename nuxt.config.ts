import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // App configuration
  app: {
    baseURL: '/Melos_web/',
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'canonical', href: 'https://akhil-tg.github.io/Melos_web' }
      ]
    }
  },

  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    resolve(__dirname, 'assets/styles/main.scss')
  ],
  
  components: {
    dirs: [
      {
        path: resolve(__dirname, 'components'),
        global: true
      },
      {
        path: resolve(__dirname, 'app/components'),
        global: true
      }
    ]
  },
  
  alias: {
    '~': fileURLToPath(new URL('./', import.meta.url)),
    '@': fileURLToPath(new URL('./', import.meta.url))
  }
})
