// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'favicon',
          href: '/favicon.svg',
          type: 'image/svg+xml',
        },
      ],
    },
  },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.scss'],
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
})