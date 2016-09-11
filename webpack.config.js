var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/asteroids.js",
  output: {
    // path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "./lib/bundle.js"
  },
  // module: {
  //   loaders: [
  //     {
  //       test: [/\.jsx?$/, /\.js?$/],
  //       exclude: /(node_modules|bower_components)/,
  //       loader: 'babel',
  //       query: {
  //         presets: ['es2015', 'react']
  //       }
  //     }
  //   ]
  // },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
