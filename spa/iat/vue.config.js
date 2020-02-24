const webpack = require("webpack");
const PACKAGE = require("./package.json");
const { version, author } = PACKAGE;
const date = Date().toString();
const banner = `
Author: ${author.name} - ${author.email} - ${author.url}
Build Date: ${date}
Vrsion: ${version}
`;

module.exports = {
  configureWebpack: {
    plugins: [new webpack.BannerPlugin(banner)]
  }
};
