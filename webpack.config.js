module.exports = {
  entry: './src/Game.ts',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build/js',
    publicPath: 'build/js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
}
