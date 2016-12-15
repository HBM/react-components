
module.exports = {
  entry: './src/index.js',
  output: {
    path: './lib',
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.woff$/,
        loader: 'url-loader'
      }
    ]
  },
  externals: {
    'react': 'react',
    'react-router': 'react-router',
    'react-motion': 'react-motion'
  }
}
