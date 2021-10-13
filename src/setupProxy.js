const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use("/auth/**",
//     createProxyMiddleware({
//       target: "http://localhost:5000",
//     }));
// };

module.exports = function (app) {
  app.use(
    "/auth/**",
    createProxyMiddleware({
      target: "https://shuffleplus-c524f1.netlify.app",
    })
  );
};
