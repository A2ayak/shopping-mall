module.exports = {
  plugins: {
    // ...
    autoprefixer: {},
    'postcss-px-to-viewport': {
      // options
      // unitToConvert: 'px',
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      // fontViewportUnit: 'vw',
      selectorBlackList: ['ignore','tab-bar'],
      minPixelValue: 1,
      mediaQuery: false,
      // replace: true,
      exclude: [/.TabBar\.vue/],
      // include: undefined,
      // landscape: false,
      // landscapeUnit: 'vw',
      // landscapeWidth: 568
    },
  }
}