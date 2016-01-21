var path = require("path");

module.exports = {
	entry: "./example/index.tsx",
	output: {
		filename: "example/index.js"
	},
	resolve: {
		extensions: ['', '.js', '.ts', '.tsx']
	},
	module: {
		loaders: [{ test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ }]
	}
};
