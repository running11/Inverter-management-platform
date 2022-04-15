const path = require("path");

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/styles/variable.scss")],
    });
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  assetsDir: "static",
  runtimeCompiler: true, //关键点在这
  pages: {
    index: {
      //entry for the page
      entry: "src/main.ts",
      //the source template
      template: "public/index.html",
      //output as dist/index.html
      filename: "index.html",
    },
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.symlinks(true);
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  },
  devServer: {
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      "/api": {
        target: "http://47.103.108.152:8886",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  configureWebpack(config){
    config.externals = {
      "AMap": "window.AMap", // // 高德地图配置
      "AMapUI": "window.AMapUI"
    }
  }
};
