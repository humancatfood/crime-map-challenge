const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');

const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');


const PATHS = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'dist')
};



const common = {

  entry: {
    app: PATHS.src,
    vendor: Object.keys(pkg.dependencies)
  },

  output: {
    path: PATHS.build,
    filename: '[name].js'
  },

  context: PATHS.src,

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    }),

    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.ejs'),
      hash: true
    }),
    new ExtractTextPlugin('styles.css')
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(sass|scss)/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: 'inline',
                plugins: [
                  autoprefixer({
                    browsers: ['last 4 versions']
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          },
          'image-webpack-loader'
        ]
      }
    ]
  }

};


const development = {
  devtool: 'source-map',
  devServer: {
    contentBase: PATHS.src,
    historyApiFallback: true,
    hot: true,

    watchOptions: {
      poll: 300
    },

    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000 ,
  },
  plugins: [
    new webpack.DefinePlugin({
      'ENV.DEBUG': true,
      'ENV.API_KEY': JSON.stringify(pkg.apiKeys.development),
      'process.env.BABEL_ENV': 'development'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};


const production = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'ENV.DEBUG': false,
      'ENV.API_KEY': JSON.stringify(pkg.apiKeys.production),
      'process.env.BABEL_ENV': 'build'
    })
  ]
};


switch (process.env.npm_lifecycle_event)
{

  case 'build':
    module.exports = merge(common, production);
    break;

  default:
    module.exports = merge(common, development);

}

