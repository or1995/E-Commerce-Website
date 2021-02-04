const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1,
                      modules: true
                    }
                  }
                ]
              },
              {
                test: /\.(png|jpg|gif)$/i,
                loader: 'url-loader'
                }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
      ],
}