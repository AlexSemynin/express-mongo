/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const webpack = require('webpack');
const path = require('path');
//const tsconfig = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env, argv) {
    const isModeDev = argv.mode === "development";
    const isDev = env.development;
    // const isForDocker = !!env.path?.length;
    // const buildPath = path.resolve(__dirname, isForDocker ? env.path : "../Bin/wwwroot")
    const buildPath = path.resolve(__dirname, "./dist");


    return {
        mode: isModeDev ? "development" : "production",
        devtool: isModeDev ? "source-map" : "nosources-source-map",

        entry: {
          "main": "./src/index.tsx"
        },
        output: {
            filename: "[name].bundle.[contenthash].js",
            path: buildPath,
            publicPath: '/',
            clean: true,
        },
        optimization: {
            minimize: isModeDev === 'production',
            splitChunks: {
                chunks: 'all',

                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `npm.${packageName.replace('@', '')}`;
                        },
                    },
                },
            },
        },
        resolve: {
            alias: {
                globalize$: path.resolve( __dirname, "node_modules/globalize/dist/globalize.js" ),
                globalize: path.resolve(__dirname, "node_modules/globalize/dist/globalize"),
                cldr$: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr.js"),
                cldr: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr")
            },
            extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
            //plugins: [new tsconfig.TsconfigPathsPlugin()]
        },
        devServer: {
          static: {
            directory: path.join(__dirname, 'public'),
          },
          compress: true,
          host: "0.0.0.0",
          port: 9000,
        },

        watchOptions: {
          poll: 1000,
        },

        performance: {
          hints: false,
          maxEntrypointSize: 512000,
          maxAssetSize: 512000
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "ts-loader"
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.scss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/i,
                    type: 'asset/resource',
                    dependency: { not: ['url'] },
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ]
        },
        plugins: [
            // new CopyPlugin({
            //     patterns: [
            //         { from: path.resolve(__dirname, "public/index.html"), to: buildPath },
            //         { from: path.resolve(__dirname, "public/favicon.ico"), to: buildPath }
            //         { from: path.resolve(__dirname, "public/css/dx.generic.Dark.css"), to: `${buildPath}/css` },
            //         { from: path.resolve(__dirname, "public/css/dx.generic.Light.css"), to: `${buildPath}/css` }
            //     ],
            // }),
            new MiniCssExtractPlugin({
                filename: '[name].bundle.[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                favicon: 'public/favicon.ico',
                template: 'public/index.html',
                scriptLoading: 'blocking',
            }),
            new webpack.DefinePlugin({
                // BUILT_AT: JSON.stringify(Date.now()),
                // VERSION: JSON.stringify(env.version),
                //apiVersion: JSON.stringify(env.api_version),
                isDevBuild: isModeDev,
            }),
        ],
    }
}