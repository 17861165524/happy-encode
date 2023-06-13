const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin } = require("vue-loader");
module.exports = {
    mode: "development", // 当前的开发环境，mode的默认配置就是production
    entry: '/src/main.js', // 入口文件
    output: { // 出口文件
        filename: 'bundle.js',
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/"
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            // template: '__dirname,/src/index.html',
            template:path.resolve(__dirname, "src/index.html"),
            // filename: "index.html",
            title: "qm-vue3",
            minify: {
                collapseWhitespace: true, // 去掉空格
                removeComments: true, // 删除注释
            }
        })
    ], // 使用的插件
    module: { // 对文件处理的方式配置（模块加载）
        generator: {}, // 生成器
        parser: {}, // 解析器
        rules: [
            {
                test: /\.vue$/,
                use: [
                    { loader: "thread-loader" },
                    {
                        loader: "vue-loader",
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false,
                            }
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["css-loader", "style-loader"]
            },
            {
                test: /\.scss$/,
                use: ["css-loader", "style-loader", "sass-loader"]
            }
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             cacheDirectory: true,
            //             presets: ['@babel/preset-env'],
            //             plugins: [
            //                 '@babel/plugin-transform-runtime',
            //                 '@babel/plugin-transform-modules-commonjs',
            //             ],
            //         }
            //     }
            // }


        ], // 修改模块的创建方式
    },
    // devServer: {
    //     port: 2023, // 启动端口
    //     open: true, // 是否自动打开页面
    //     hot: true, // 是否开启热更新
    //     proxy: {
    //         "/api": {
    //             target: "http://127.0.0.1",
    //             changeOrigin: true, // 收否允许跨域
    //             pathRewrite: { // 重定向
    //                 "^/api": ""
    //             }
    //         }
    //     }

    // }
        devServer: {
          port: 3005, // 启动端口
          hot: true, // 是否开启热模块替换
          open: true, // 是否开启自动打开页面
          proxy: {
            // 代理规则
            "/api": {
              target: "http://127.0.0.1:8080",
              secure: false,
              changeOrigin: true,
              pathRewrite: {
                // 重定向规则
                "^/api": "/api",
              },
            },
          },
        },
    
}
