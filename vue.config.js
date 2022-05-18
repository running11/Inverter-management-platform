const path = require("path");

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/styles/variable.scss")],
    });
}
function resolve(dir) {
  return path.join(__dirname, '.', dir)
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
    config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
    //const svgRule = config.module.rule('svg')
    //svgRule.uses.clear()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include
      .add(resolve('./src/assets/icons/svg')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      '/api2': {
        target: "http://52.131.236.19:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api2": ""
        }
      },
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
