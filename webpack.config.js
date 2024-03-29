const path = require('path');

module.exports = {
  mode: "development",
  entry: "./client/src/index.js",
  output: {
    path: path.join(__dirname + "/public"),
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
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  }
}