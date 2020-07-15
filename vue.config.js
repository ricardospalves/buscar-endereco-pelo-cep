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
  }
}
