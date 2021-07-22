const merge = require("webpack-merge");
const common = require("./webpack.common");
const StyleLintPlugin = require("stylelint-webpack-plugin")

const config = {
  mode: "development",
  devServer: {
    open: false,
    overlay: true,
    port: 6969,
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/subpage$/,
          to: "subpage.html",
        },
        {
          from: /./,
          to: "404.html",
        },
      ],
    },
  },
  plugins: [new StyleLintPlugin()],
};

module.exports = merge.merge(common, config);
