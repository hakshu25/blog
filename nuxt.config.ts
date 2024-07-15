// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    cmsApiDomain: process.env.CMS_API_DOMAIN,
    cmsApiKey: process.env.CMS_API_KEY
  },

  ssr: true,
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxt/image"],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  css: ["~/assets/scss/global.scss"],
})