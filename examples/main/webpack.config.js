var path = require('path');

module.exports = {
	entry: './index.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js'],
		alias: {
			'color-harmony-generator': path.join(__dirname, '..', '..', 'src')
		}
	},
	module: {
		loaders: [
			{ test: /\.(js)(\?.*)?$/, loader: 'babel-loader', exclude: /node_modules/ }
		]
	}
};
