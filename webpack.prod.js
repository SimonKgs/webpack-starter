const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    output: {
        clean: true,
        filename: '[name].[contenthash].js',
    },

    module: {
        rules: [
            //  carga los archivos html
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: false
                }
            },
            //  carga el style importado en js
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader'],
            },
            //  carga el style de forma global
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, "css-loader"],
            },
            //  carga imagenes importadas en js
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            //  babel compila el codigo con compatibilidad con navegadores antiguos
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        // para que cargue el html
        new HtmlWebPack({
            title: 'Mi webpack App',
            // filename: 'Holamundo.html'
            template: './src/index.html'
        }),
        //  carga el css global
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        //  permite copiar archivos al dist, lo uso para copiar toda la estructura de carpetas donde estan las imagenes y cargar desde el index la imagen
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'src/assets/' }
            ]
        })

    ],
}