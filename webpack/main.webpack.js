var nodeExternals = require('webpack-node-externals');

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
    target: 'node', // use require() & use NodeJs CommonJS style
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externalsPresets: {
        node: true // in order to ignore built-in modules like path, fs, etc.
    },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  }
}