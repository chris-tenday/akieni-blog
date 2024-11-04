// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  ssr:true,
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
    },
    meta:[
      {name:"viewport",content:"width=device-width, initial-scale=1.0"}
    ],
    layoutTransition:{
      name:"layout",
      mode:"out-in"
    }
  },
  buildModules: [
    '@nuxtjs/composition-api/module', // Ensure you have the Composition API if needed
    // other modules
  ],
  runtimeConfig:{
    public:{
      baseUrl:"http://127.0.0.1:8000/api"
    }
  },
  modules:[
    '@nuxt/test-utils/module'
  ],

})
