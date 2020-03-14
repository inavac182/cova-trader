const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: "source-map",
    entry: "./src/index.tsx",
    mode: "production",
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: 'awesome-typescript-loader'
            },
            { 
                test: /\.less$/,
                use: [ 
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 
                    'css-loader', 
                    'less-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [ 
                        'file-loader'
                    ]
              }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.min.js'
    },
    plugins: isProduction ? 
        [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ] : [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ]
};
