const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, 'promise/index.js')
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },

    mode: "none",

    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'promise/index.html'),
            filename: 'index.html',
            // chunks: {
            //     index: 'index'
            // },
            chunks: ['index'],
            inject: true,
            minify: {
              html5: true,
              collapseWhitespace: true,
              preserveLineBreaks: false,
              minifyCSS: true,
              minifyJS: true,
              removeComments: false
            }
        }),
        new CleanWebpackPlugin()
    ]
}