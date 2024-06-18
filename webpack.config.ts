import path from "path";

import webpack from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";

type Mode = "production" | "development";

interface EnvVariables {
  mode: Mode;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    mode: env.mode ?? "development",

    // місце входу, звідки почнеться збірка
    // є можливість додати кілька точок входу - { piont: path.resolve(...) }
    entry: path.resolve(__dirname, "src", "index.ts"),

    // місце в яке буде проведено збірку
    output: {
      path: path.resolve(__dirname, "build"),

      // [name], [contenthash] - динамічна назва файлу та хеш, в залежносіт від змісту файлу
      filename: "[name].[contenthash].js",

      // очистка папки "build" перед збіркою.
      clean: true,
    },

    module: {
      rules: [
        {
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
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
    ],
  };

  return config;
};
