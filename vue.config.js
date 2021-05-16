// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  productionSourceMap: false,

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // important extra layer for less-loader^6.0.0
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#F8D12E',
            '@processing-color': '#F8D12E',
            '@black': '#12161C',
            '@link-color': '#F8D12E',
            '@btn-primary-color': '@black',
            '@error-color': '#D81E06',
            '@border-color-base': '#8D8D8D',
            '@border-color-split': '#636364',
            '@input-placeholder-color': 'fade(#8D8D8D, 50%)',
            '@font-size-base': '14px',
            '@heading-1-size': '50px',
            '@heading-2-size': '40px',
            '@heading-3-size': '32px',
            '@heading-4-size': '28px',
            '@heading-5-size': '20px'
          }
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/assets/css/variable.scss')]
    }
  }
}
