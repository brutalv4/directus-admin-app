const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = async ({ config }) => {
	config.resolve = {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': path.join(__dirname, '../src')
		}
	};

	config.module.rules.push({
		test: /\.stories\.ts?$/,
		exclude: /node_modules/,
		use: [
			{
				loader: require.resolve('babel-loader')
			}
		]
	});

	config.module.rules.push({
		test: /\.scss$/,
		use: [
			'vue-style-loader',
			'css-loader',
			'sass-loader'
		],
	});

	config.module.rules.push({
		test: /\.ts$/,
		exclude: /node_modules/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/],
					transpileOnly: true
				},
			}
		]
	});

	config.module.rules.push({
		test: /\.svg$/,
		exclude: /node_modules/,
		use: [
			{
				loader: "html-loader"
			}
		]
	})

	config.plugins.push(new ForkTsCheckerWebpackPlugin());

	return config;
};
