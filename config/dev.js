module.exports = {
  env: {
    NODE_ENV: '"development"',
    METHOD: '"proxy"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    devServer: {
      host: 'localhost', // 如需局域网（如手机）访问，请更换为0.0.0.0
      port: 8080,
      https: false,
      // "proxy": {
      //   "/api": {
      //     "target": "https://api.douban.com/v2/movie",
      //     "pathRewrite": {
      //       "^/api": ""
      //     },
      //     "changeOrigin": true
      //   }
      // }
      // proxy: [
      //   {
      //     context: "['/api']",
      //     target: "https://api.douban.com/v2/movie",
      //     changeOrigin: true,
      //     pathRewrite: {
      //       "^/api": ""
      //     },
      //     secure: false
      //   }
      // ]
    }
  }
}
