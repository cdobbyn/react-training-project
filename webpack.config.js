const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js',
        './assets/style/base.scss'
    ],
    output: {
        path: __dirname.concat('/dist/'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015', 'stage-1']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // minimize: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => {
                                    return [
                                        require('autoprefixer')({
                                            browsers: [
                                                "> 2%"
                                            ]
                                        })
                                    ]
                                }
                            }
                        },
                        { loader: "sass-loader" }
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './dist/'
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new HtmlWebpackPlugin({
            template: './assets/templates/index.ejs',
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                html5: true,
                removeComments: true,
            }
        }),
    ]
};

// For debugging
// process.traceDeprecation = true;
