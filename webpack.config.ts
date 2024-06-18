import path from "path";

import webpack from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";

import MiniCssExtractPlugin from "mini-css-extract-plugin";

import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = "production" | "development";

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  const isDevMode = env.mode === "development";

  const config: webpack.Configuration = {
    mode: env.mode ?? "development",

    // місце входу, звідки почнеться збірка
    // є можливість додати кілька точок входу - { piont: path.resolve(...) }
    entry: path.resolve(__dirname, "src", "index.tsx"),

    // місце в яке буде проведено збірку
    output: {
      path: path.resolve(__dirname, "build"),

      // [name], [contenthash] - динамічна назва файлу та хеш, в залежносіт від змісту файлу
      filename: "[name].[contenthash].js",

      // очистка папки "build" перед збіркою.
      clean: true,
    },

    module: {
      // порядок має значення!!!
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader, // заміняємо "style.loader" на "MiniCssExtractPlugin.loader"  для винесення css файлів у окремі чанки
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },

        {
          // ts-loader вміє працювати з jsx
          // якби ми не використовували typescript - потрібно було б використовувати babel-loader
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },

    plugins: [
      // плагін для атоматичного формування html файлу з скриптами
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),

      // для винесення css файлів у окремі чанки
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/[name].[contenthash].css",
      }),
    ],

    // сервер на якому буде працювати вебпак для динамчіного відображення змін
    devServer: isDevMode
      ? {
          port: env.port ?? 3000,
          open: true,
        }
      : undefined,
  };

  return config;
};
