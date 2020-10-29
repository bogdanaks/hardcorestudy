const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        background: './src/extension/background.js',
        script: './src/extension/script.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build/app/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
}
