module.exports = {
  entry: './libs/clients/index.js',
  output: {
    filename: 'assets/build/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2016', 'react']
        }
      },
    ]
  }
};