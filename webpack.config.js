const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './src/index.js',
        './style/style.scss'
    ],
    output: {
        path: __dirname,
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
                        // {
                        //     loader: "style-loader"
                        // },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: () => {
                                    return [
                                        require('autoprefixer')({
                                            browsers: 'last 5 versions'
                                        })
                                    ]
                                }
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
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
        new ExtractTextPlugin('styles.css'),
    ]
};

// For debugging
// process.traceDeprecation = true;
