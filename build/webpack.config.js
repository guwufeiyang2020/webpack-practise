const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.NODE_ENV === "development";

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[hash: 8].js",
    chunkFilename: "js/[name].[hash: 8].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: [
          "cache-loader",
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: isDev ? "vue-style-loader" : MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../dist/css/",
              hmr: isDev,
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: isDev ? "vue-style-loader" : MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../dist/css/",
              hmr: isDev,
            },
          },
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
        ],
      },
      {
        test: /\.(jep?g|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240,
            fallback: {
              loader: "file-loader",
              options: {
                name: "img/[name].[hash:8].[ext]",
              },
            },
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240,
            fallback: {
              loader: "file-loader",
              options: {
                name: "media/[name].[hash:8].[ext]",
              },
            },
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240,
            fallback: {
              loader: "file-loader",
              options: {
                name: "media/[name].[hash:8].[ext]",
              },
            },
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: ["*", ".js", ".json", ".vue"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new vueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDev ? "[id].css" : "[id].[hash].css",
    }),
  ],
};
