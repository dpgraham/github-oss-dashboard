module.exports = {
  entry: './libs/clients/index.js',
  output: {
    filename: 'assets/build/bundle.js'
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