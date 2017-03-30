const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: {
        main: './source/app',
        vendor: './source/app/vendor'
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist/bundles"),
        publicPath: "dist/bundles",
        sourceMapFilename: "[file].map",
        filename: "[name].js"
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        }, ]
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        host: 'localhost',
        port: 9000,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor']
        }),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true
        }),
        
        new webpack.HotModuleReplacementPlugin()
    ],
    watch: true
};
