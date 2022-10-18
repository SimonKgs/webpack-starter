const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true
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
                use: [ 'style-loader', 'css-loader'],
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
            }
        ]
    },

    optimization: {

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
            // filename: '[name].[fullhash].css',
            filename: 'styles.css',
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