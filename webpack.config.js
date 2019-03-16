const path = require('path');

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
		},]
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'public')
	}
};