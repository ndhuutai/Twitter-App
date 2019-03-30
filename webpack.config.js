const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
	const isProduction = env === 'production';
	const CSSExtract = new ExtractTextPlugin('styles.css');
	return {
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
				use: CSSExtract.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap:true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap:true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap:true
							}
						}
					]
				})
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
			}),
			CSSExtract
		],
		devtool: isProduction?'source-map':'inline-source-map',
		devServer: {
			index: '',
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true,
			proxy: [{
				context: ['/searchUser', '/searchTweets'],
				target: 'http://localhost:3000'
			}]
		},
		//This is for issues with request package
		node: {
			fs: 'empty',
			net: 'empty',
			tls: 'empty'
		}
	}
};
