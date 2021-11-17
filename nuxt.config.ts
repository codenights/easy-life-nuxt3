import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
})
