const path = require('path');

module.exports = {
  mode:"development",
  watch: true,
  entry: {
    Scene1: './Scenes/Scene1/core.js',
  },
  output: {
    filename: '[name]/[name].js',
    path :path.join(__dirname,'/dist/'),
  },
};  