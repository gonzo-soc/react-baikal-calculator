/** webpack.config.js */
const path = require('path');
const appDir = 'src';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(appDir),
    }
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          "sass-loader",

          // load mixins and variables from index.scss (see index.jsx)
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [`${appDir}/styles/sass/_mixins.scss`, `${appDir}/styles/sass/_variables.scss`]
            }
          }
        ],
      },

      // use webpack5 asset loader: https://webpack.js.org/guides/asset-management/
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
};