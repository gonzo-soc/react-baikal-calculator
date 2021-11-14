/** webpack.config.js */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [ // Перечисляем правила, по которым будут выбираться лоадеры для тех или иных файлов
      {
        test: /\.jsx?$/, // Задаем регулярку, которая определит применять ли лоадер к файлу
        exclude: /(node_modules|bower_components)/, // Исключаем ненужные файлы
        use: { // Воспользуемся указанным ниже лоадером к указанными опциями (для babel)
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }
      },

      {
        test: /\.css$/, // регулярка для файлов CSS
        // Можем указать последовательность лоадеров в виде массива
        use: ['style-loader', {
          loader: 'css-loader',
          options: { modules: true }
        }]
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  }
};