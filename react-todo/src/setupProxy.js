const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://3.145.203.32:4000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // rewrite path
      },
    })
  );
};