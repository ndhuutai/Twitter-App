const path = require('path');
const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.join(__dirname,'public'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			loader: 'babel-loader',
			test: /\.js$/,
			exclude: /node_modules/
		}, {
			test: /\.(s?css)$/,
			use: [{
				loader: 'style-loader', // inject CSS to page
			}, {
				loader: 'css-loader', // translates CSS into CommonJS modules
			}, {
				loader: 'postcss-loader', // Run post css actions
				options: {
					plugins: function () { // post css plugins, can be exported to postcss.config.js
						return [
							require('precss'),
							require('autoprefixer')
						];
					}
				}
			}, {
				loader: 'sass-loader' // compiles Sass to CSS
			}]
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: [
				{
					loader: 'url-loader',
					options: {limit: 40000}
				},
				'image-webpack-loader'
			]
		}]
	},
	plugins: [
		new MomentLocalesPlugin(),
		new MomentLocalesPlugin({
			localesToKeep: ['es-us'],
		})
	],
	devtool: 'source-map',
	devServer: {
		index: '',
		contentBase: path.join(__dirname, 'public'),
		historyApiFallback: true,
		proxy: [{
			context: ['/home', '/searchTweets'],
			target: 'http://localhost:3000'
		}]
	},
	//This is for issues with request package
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};