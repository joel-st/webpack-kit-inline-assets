const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const { stringify } = require('querystring');

module.exports = (env, argv) => {
  const production = (argv.mode && argv.mode === 'production') ? true : false;
  console.log('\033[0mMODE \033[0;32m' + argv.mode + '\n');
  return {
    // mode specified in package.json scripts
    // input
    entry: path.resolve(__dirname, 'src', 'app.jsx'),
    // output
    output: {
      path: path.resolve(__dirname, 'build'),
    },
    // transformations
    module: {
      rules: [
        {
          test: /\.jsx?/i,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ["@babel/plugin-transform-runtime"],
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "h",
                  pragmaFrag: "Fragment",
                },
              ],
            ]
          }
        },
        {
          test: /\.(s(a|c)ss)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader"
            }
          ]
        },
      ]
    },
    // plugins
    plugins: [
      // extract styles save to as main.css
      new MiniCssExtractPlugin(),
      // handle indexl.html file
      new HtmlWebpackPlugin({
        // use template
        template: path.resolve(__dirname, 'src', 'index.html'),
        cache: false,
        inject: false,
        minify: false
      }),
      new WebpackShellPluginNext({
        onAfterDone:{
          scripts: [
            // some space to breathe
            "echo ''",

            // copy index.html, main.js and main.css to root folder
            "cat build/index.html > index.html && cat build/main.js > main.js && cat build/main.css > main.css",

            // inlining style – open style tag
            "perl -pe 's/<!-- Buildstyle -->/<style id=\"buildstyle\" type=\"text\\/css\"><!-- Buildstyle-Style --><!-- Buildstyle-End -->/g' -i index.html;",
            // inlining style – insert main.css
            "perl -pe 's/<!-- Buildstyle-Style -->/`cat main.css`/ge' -i index.html;",
            // inlining style – close style tag
            "perl -pe 's/<!-- Buildstyle-End -->/<\\/style>/g' -i index.html;",

            // remove main.css from root folder
            "rm main.css",

            // log status
            "echo '\033[0;32m✓\033[0m Inlining Style Done'",

            // inlining script – open script tag
            "perl -pe 's/<!-- Buildscript -->/<script id=\"buildscript\" type=\"text\\/javascript\"><!-- Buildscript-Script --><!-- Buildscript-End -->/g' -i index.html;",
            // inlining script – insert main.js
            "perl -pe 's/<!-- Buildscript-Script -->/`cat main.js`/ge' -i index.html;",
            // inlining script – close script tag
            "perl -pe 's/<!-- Buildscript-End -->/<\\/script>/g' -i index.html;",

            // remove main.js from root folder
            "rm main.js",

            // log status
            "echo '\033[0;32m✓\033[0m Inlining Script Done'",
          ],
          blocking: true,
          parallel: false
        }
      })
    ],
    // resolve
    resolve: {
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
        '@components': path.resolve(__dirname, 'src', 'components')
      },
      extensions: ['*', '.js', '.jsx'],
    },
    // devtool
    devtool: 'inline-source-map',
  };
}
