const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

    entry: {
        main: './source/app',
        vendor: './source/app/vendor'
    },
    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : false,
    output: {
        path: path.resolve(__dirname, "dist/bundles"),
        publicPath: "dist/bundles",
        sourceMapFilename: "[file].map",
        filename: "[name].js"
    },

    module: {
        rules: [{
                test: /\.tsx?$/,
                use: ['ts-loader', 'angular2-template-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader',
                exclude: /\.async\.(html|css)$/
            },
        ]
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css"]
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

        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        })
    ],
    watch: NODE_ENV == 'development',

    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
