const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: {
        main: './source/app/'
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist/bundles"),
        pathinfo: true,
        sourceMapFilename: "[file].map",
        filename: "[name].js"
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },

    resolve: {
        extensions: [".tsx",".ts", ".js"]
    },
    watch: true
};
