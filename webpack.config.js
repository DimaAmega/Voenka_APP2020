const path = require('path');

module.exports = {
  mode:"development",
  watch: true,
  entry: {
    Scene1: './Scenes/Scene1/core.js',
    // ObjectsContainer: './Custom_Modules/ObjectsContainer.js',
  },
  output: {
    filename: '[name]/[name].js',
    path :path.join(__dirname,'/dist/'),
  },
};  