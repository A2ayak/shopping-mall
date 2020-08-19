module.exports = {
  configureWebpack: {
    resolve: {
      alias :{
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'common': 'components/common'
      }
    }
  },
  // css: {
  //   loaderOptions: {
  //     css: {},
  //     postcss: {
  //       plugins: [
  //         require('postcss-px2rem')({
  //           remUnit: 37.5
  //         })
  //       ]
  //     }
  //   }
  // }
}
