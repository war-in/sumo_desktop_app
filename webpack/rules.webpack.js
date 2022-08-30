const path = require("path");
module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.(js|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.css/,
    use: ["style-loader", "css-loader"]
  },
  {
    test: /\.(png|gif|jpe?g|svg|ico)$/,
    include: [
      path.join(__dirname, '..', 'public')
    ],
    use: [{
      loader: 'file-loader',
      options: {
        name: 'images/[name]-[hash].[ext]'
      }
    }]
  }
]