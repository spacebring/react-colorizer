var path = require('path');

module.exports = {
	entry: './examples/main/index.js',
	output: {
		path: __dirname,
		filename: 'examples/main/bundle.js'
	},
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{ test: /\.(js)(\?.*)?$/, loader: 'babel-loader', exclude: /node_modules/ }
		]
	}
};
