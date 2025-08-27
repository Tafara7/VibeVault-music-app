const path = require("path");

module.exports = {
  entry: "./frontend/src/index.js",
  // entry: path.join(__dirname, 'frontend', 'src', 'index.js'),
  output: {
    // path: path.resolve(__dirname, 'frontend', 'public'),
    path: path.resolve('frontend', 'public'),
    filename: "bundle.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/"
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};