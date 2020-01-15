const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	stories: ['../src/**/*.story.mdx'],
	addons: [
		'@storybook/addon-actions',
		{
			name: '@storybook/addon-docs',
			options: {
				babelOptions: {
					presets: [
						[
							'@vue/cli-plugin-babel/preset',
							{
								jsx: false
							}
						]
					]
				}
			}
		}
	],
	webpackFinal: async (config, { configType }) => {
		config.module.rules.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
			include: path.resolve(__dirname, '../'),
		});

		config.module.rules.push({
			test: /\.ts$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'ts-loader',
					options: {
						appendTsSuffixTo: [/\.vue$/],
						transpileOnly: true // used with ForkTsCheckerWebpackPlugin
					},
				}
			],
		});

		config.plugins.push(new ForkTsCheckerWebpackPlugin());

		config.resolve.extensions.push('.ts', '.tsx');

		// Return the altered config
		return config;
	}
}
