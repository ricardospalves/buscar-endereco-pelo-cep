const SiteMap = require('sitemap-webpack-plugin').default
const URL = 'https://buscarenderecopelocep.netlify.app'

module.exports = {
  pwa: {
    name: 'Buscar endereço pelo CEP',
    themeColor: '#FFFFFF',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    manifestOptions: {
      start_url: 'https://buscarenderecopelocep.netlify.app/',
      icons: [
        {
          'src': './img/icons/android-chrome-192x192.png',
          'sizes': '192x192',
          'type':
          'image/png'
        },
        {
          'src': './img/icons/android-chrome-512x512.png',
          'sizes': '512x512',
          'type': 'image/png'
        }
      ]
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },
    workboxOptions: {
      exclude: [
        '_redirects'
      ]
    }
  },
  configureWebpack: {
    plugins: [
      new SiteMap(
        URL,
        [
          {
            path: URL,
            lastmod: new Date().toISOString().replace(/\..+/, ''),
            priority: '1'
          }
        ],
        {
          filename: 'sitemap.xml',
          lastmod: true,
          priority: '1'
        }
      )
    ]
  }
}
