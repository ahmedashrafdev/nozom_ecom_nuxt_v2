export default {
    head: {
        titleTemplate: 'Nozom - Multi-purpose Ecomerce website',
        title: 'Nozom - Multi-purpose Ecomerce website',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'Nozom - Multipurpose Marketplace Ecommerce website'
            }
        ],
        link: [
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext'
            },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css2?family=Cairo&display=swap'
            },
        ]
    },

    css: [
        'swiper/dist/css/swiper.css',
        '~/static/fonts/Linearicons/Font/demo-files/demo.css',
        '~/static/fonts/font-awesome/css/font-awesome.css',
        '~/static/css/bootstrap.min.css',
        '~/assets/scss/style.scss'
    ],

    plugins: [
        { src: '~plugins/vueliate.js', ssr: false },
        { src: '~/plugins/swiper-plugin.js', ssr: false },
        { src: '~/plugins/vue-notification.js', ssr: false },
        { src: '~/plugins/axios.js', ssr: false },
        { src: '~/plugins/lazyLoad.js', ssr: false }
    ],

    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/style-resources',
        'cookie-universal-nuxt'
    ],

    styleResources: {
        scss: './assets/scss/env.scss'
    },

    modules: ['@nuxtjs/axios', 'nuxt-i18n' , '@nuxtjs/auth-next'],

    i18n: {
        locales: [
            { code: 'en', file: 'en.json' },
            { code: 'ar', file: 'ar.json' }
        ],
        lazy: true,
        defaultLocale: 'en',
        langDir: 'lang/locales/'
    },

    router: {
        linkActiveClass: '',
        linkExactActiveClass: 'active'
    },

    server: {
        port: 4002,
        host: 'localhost'
    },

    auth: {
        vuex: {
            namespace:"nuxtAuth",
        },
        strategies: {
          local: {
            token: {
              property: 'access_token',
              required: true,
              type: 'Bearer'
            },
            redirect: {
                login: '/account/login',
                logout: '/',
                callback: '/account/login',
                home: '/'
            },
            user: {
            //   property: 'user',
              autoFetch: true
            },
            endpoints: {
                
              login: { url: `http://localhost:8000/api/login`, method: `post` },
              logout: { url: `http://localhost:8000/api/logout`, method: `post` },
              user: { url: `http://localhost:8000/api/user`, method: `get` }
            }
          }
        }
    },
};
