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
            }
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

    modules: ['@nuxtjs/axios', 'nuxt-i18n'],

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
        host: '192.168.1.40'
    }
};
