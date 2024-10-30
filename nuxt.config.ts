// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app:{
    head:{
      title:"Akieni - Blog",
      link:[
        {
          rel:"stylesheet",
          href:"/assets/lib/bootstrap-5.2.3/css/bootstrap.min.css"
        },
        {
          rel:"stylesheet",
          href:"/assets/lib/fontawesome-5.15.4/css/all.min.css"
        },
        {
          rel:"stylesheet",
          href:"/assets/css/style.css"
        },
        {
          rel:"preconnect",
          href:"https://fonts.googleapis.com"
        },
        {
          rel:"preconnect",
          href:"https://fonts.gstatic.com",
          crossorigin:true
        },
        {
          rel:"stylesheet",
          href:"https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        }
      ],
      script:[
        {
          src:"/assets/lib/bootstrap-5.2.3/js/bootstrap.min.js",
          type:"text/javascript"
        }
      ]
    }
  },
  buildModules: [
    '@nuxtjs/composition-api/module', // Ensure you have the Composition API if needed
    // other modules
  ],
})
