module.exports = {
    entry: {
        background: './src/extension/background.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + 'build/app/',
    },
}
