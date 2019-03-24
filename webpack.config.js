const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/index.ts",
    mode: 'development',    //or "production"
    target: "node",
    // externals: {    //leaves modules from bundling
    //     express: "express",
    //     "dotenv": "dotenv"
    // },
    externals: [nodeExternals()],   //leaves modules from bundling...and expects them to be present in the environment app is running.
    devtool: "inline-source-map",   //or "source-map"
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app-server.js'
    },
    module: {   //for unbundled files
        rules: [
            { test: /\.(js|ts)$/, use: 'babel-loader', exclude: /node_modules/, },
            { test: /\.(ts)?$/, loader: 'ts-loader', exclude: /node_modules/ },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.(js|ts)$/, loader: "source-map-loader", enforce: "pre" },
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   //creating separate bundle node modules
                    chunks: "initial",
                    test: path.resolve(__dirname, "node_modules"),
                    name: "vendor",
                    filename: "vendor.bundle.js",
                    enforce: true,
                }
            }
        }
    },
    plugins: [  //for bundled files
        new CleanWebpackPlugin(['dist/*']),
        new TSLintPlugin({
            files: ['./src/**/*.ts']
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server'
        // })
    ]
};