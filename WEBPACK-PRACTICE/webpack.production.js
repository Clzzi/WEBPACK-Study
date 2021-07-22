const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const terserWebpackPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common");

const config = {
  mode: "production",
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "venders",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [new terserWebpackPlugin()],
  },
};

module.exports = merge.merge(common, config);
