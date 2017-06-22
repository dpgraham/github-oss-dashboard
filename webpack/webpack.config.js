module.exports = {
  entry: './libs/client/index.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ["babel-preset-es2015", "babel-preset-es2016", "babel-preset-es2017", "babel-preset-stage-2", "babel-preset-react"].map(require.resolve)
        }
      },
    ]
  }
};