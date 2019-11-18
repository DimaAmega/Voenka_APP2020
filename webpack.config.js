const path = require('path');


module.exports = {
  mode:"development",
  entry: './public/javascripts/index/main.js',
  output: {
    filename: 'dest.js',
    path: path.join(__dirname, './public/javascripts/index/'),
  },
};  