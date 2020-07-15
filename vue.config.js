const SiteMap = require('sitemap-webpack-plugin').default
const URL = 'https://buscarenderecopelocep.netlify.app'

module.exports = {
  pwa: {
    name: 'Buscar endereço pelo CEP',
    themeColor: '#FFFFFF',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    manifestOptions: {
      start_url: 'https://buscarenderecopelocep.netlify.app/'
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
