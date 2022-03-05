const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
		main: './src/index.js',
	},
  output: {
		// 指定输出到硬盘上的目录
		path: path.resolve(__dirname, 'dist'),
		// 表示的是打包生成的index.html文件里面引用资源的前缀
		// publicPath: '/',
		filename: 'main.js',
	},
  devtool: 'source-map',
  devServer: {
		// 表示的是打包生成的静态文件所在的位置(若是devServer里面的publicPath没有设置，则会认为是output里面设置的publicPath的值)
		// publicPath: '/',
		// 用于配置提供额外静态文件内容的目录
		// contentBase: path.resolve('public'),
		// 是否启动压缩，gzip
		compress: true,
		port: 8080,
		open: false,
		// proxy: {
		// 	'/api': {
		// 		target: 'http://localhost:3000',
		// 		pathRewrite: {
		// 			'^/api': '',
		// 		},
		// 	},
		// },
		// before(app) {
		// 	app.get('/api/users', (req, res) => {
		// 		res.json([{ id: 1, name: 'zhufeng' }]);
		// 	});
		// },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}