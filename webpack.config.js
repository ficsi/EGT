const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
}

// Plugins
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
let extractPlugin = new MiniCssExtractPlugin({
    filename: '[name].css',
});
let esLint = new ESLintPlugin({
    fix: true,
});

// Config
module.exports = {
    mode: mode,
    entry: {
        bundle: ['@babel/polyfill', './src/scripts/index.js', './src/styles/main.scss'],
    },
    resolve: {
        modules: [path.resolve('node_modules')],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [new TerserJSPlugin({}), new MiniCssExtractPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|le)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff|woff2?|eot|ttf|otf|svg)$/i,
                exclude: /image/,
                generator: {
                    filename: (name) => {
                        const path = name.filename.split('/').slice(1, -1).join('/');
                        return `${path}/[name][ext]`;
                    },
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                generator: {
                    filename: (name) => {
                        const path = name.filename.split('/').slice(1, -1).join('/');
                        return `${path}/[name][ext]`;
                    },
                },
            },
        ],
    },
    plugins: [extractPlugin, esLint],
    devServer: {
        hot: true,
        static: [
            {
                directory: path.resolve(__dirname, 'src'),
            },
            {
                directory: path.join(__dirname, 'dist/bundle.css'),
            },
        ],
        port: 9000,
    },
};
