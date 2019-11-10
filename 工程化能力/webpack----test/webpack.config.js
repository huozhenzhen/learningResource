var webpack = require("webpack");
var htmlWebpackPlugin = require("html-webpack-plugin");
var autoprefixer = require('autoprefixer');
var path = require('path');
// var files = glob.sync(srcDir + "/**/main.js");	

// var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 将css抽离出来

module.exports = {
	"entry": "./src/App.js",
	"output": {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].js"
	},
	"resolve": {
	    extensions: ['.js', '.scss'],
	    alias: {
	        // 'vue$': 'vue/dist/vue.common.js',
	        'src': path.resolve(__dirname, 'src')
	    }
	},
	"module": {
		rules: [{
			test: /\.js$/,
			include: path.resolve(__dirname, 'src'), //相对立 exclude
			use: {
				loader: "babel-loader",
				options: {
					"presets": [
						"env"
					]
				},
			}
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader?importantLoaders=1', 'postcss-loader']
		}, {
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
		}, {
			test: /\.ejs$/,
			use: ['ejs-loader']
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			use: ['url-loader?limit=2000&name=img/[name]-[hash:5].[ext]']
		}]
	},
	"devServer": {
		contentBase: path.join(__dirname, 'dist'),
		hot: true
	},
	"plugins": [
		new webpack.LoaderOptionsPlugin({
			//wp2应该把自定义的文件的这儿
			options: {
				postcss: function() {
					return [
						autoprefixer({
							broswers: ['last 5 versions']
						})
					];
				}
			}
		}),
		new htmlWebpackPlugin({
			template: 'template.html',
			filename: "index.html",
			inject: "body", //插入位置
			title: "Test template", //插入一个值
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};