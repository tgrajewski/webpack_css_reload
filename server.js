'use strict';


const path = require('path');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var compiler = null, server = null;


function run() {
    compiler = webpack({
        'mode': 'development',
        'entry': './main.js',
        'devtool': false,
        'output': {
            'filename': 'out.js',
            'path': path.join(process.cwd(), 'build'),
            'publicPath': '/'
        },
        'module': {
            'rules': [
                {
                    'test': /\.css$/,
                    'use': ['style-loader', 'css-loader'],
                }
            ]
        },
        'stats': 'none',
        'infrastructureLogging': {
            'level': 'info'
        }
    });


    server = new WebpackDevServer(compiler, {
        'port': 8080,
        'devMiddleware': {
            'writeToDisk': true
        },
        'client': {
            'logging': 'info'
        },
        'static': [
            {
                'directory': 'build',
                'watch': true
            }
        ]
    });

    server.listen(undefined, 'local-ip');


    process.once('SIGINT', exit);
}


function exit() {
    server.close();
}


run();
