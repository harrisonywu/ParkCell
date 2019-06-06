
module.exports = {
  mode: "development",
  entry: "./client/src/index.js",
  output: {
    path: "./public",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
    ]
  }
}