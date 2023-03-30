module.exports = {
  mode: 'none',
  entry: './assets/js/app.js',
  output: {
    path: __dirname + '/public/javascripts',
    filename: 'application.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
