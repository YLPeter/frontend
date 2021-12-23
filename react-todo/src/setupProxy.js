const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  let aws = false
  let address = 'https://sheltered-island-26661.herokuapp.com'
  if (aws){
    address = 'http://3.135.77.77:4000'
  }

  
  app.use(
    '/api',
    createProxyMiddleware({
      target: address,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // rewrite path
      },
    })
  );
};