const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, '../AplikacjaPrzepisy/'),
  entry: './src/main.ts',
  module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            {
              loader: 'awesome-typescript-loader',
              options: { configFileName: 'tsconfig.json' }
            } 
          ]
        },
		{
		  test: /\.css$/,
		  use: [ 'style-loader', 'css-loader' ]
		},
		{
			test: /\.html$/,
			use: [
				{
					loader: "html-loader",
					options: { minimize: true }
				}
			]
		}
      ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  optimization:{
    minimize: false, // <---- disables uglify.
    // minimizer: [new UglifyJsPlugin()] if you want to customize it.
  },
  resolve: {
	extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 8080,
            clientLogLevel: "none",
            historyApiFallback: true
        }
};