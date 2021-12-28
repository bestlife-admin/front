/*
* Gulp Builder (Paths)
* @version: 1.0.0 (Fri, 08 May 2020)
* @author: HtmlStream
* @license: Htmlstream (https://htmlstream.com/licenses)
* Copyright 2020 Htmlstream
*/

const config                            = require('../config');
const {additionNames}                   = require('./core');

config.directoryNames = {...config.directoryNames, ...additionNames}

module.exports = {
  root: "./",
  node: {
    dir: "node_modules"
  },
  dist: {
    base: {
      dir: config.directoryNames.dist,
    },
    build: {
      css: config.directoryNames.css,
      js: config.directoryNames.js
    },
    css: {
      dir: config.directoryNames.dist + "/" + config.directoryNames.css,
      files: config.directoryNames.dist + "/" + config.directoryNames.css + "/*.css"
    },
    js: {
      dir: config.directoryNames.dist + "/" + config.directoryNames.js,
      files: config.directoryNames.dist + "/" + config.directoryNames.js + "/*.js"
    },
    vendor: {
      dir: config.directoryNames.dist + "/" + config.directoryNames.vendor
    },
    assets: {
      dir: config.directoryNames.dist + "/" + config.directoryNames.assets
    },
  },
  src: {
    base: {
      dir: config.directoryNames.src,
      files: config.directoryNames.src + "/**/*"
    },
    assets: {
      dir: config.directoryNames.src + "/" + config.directoryNames.assets,
      files: config.directoryNames.src + "/" + config.directoryNames.assets + "/**/*"
    },
    vendor: {
      dir: config.directoryNames.src + "/" + config.directoryNames.vendor
    },
    css: {
      dir: config.directoryNames.src + "/" + config.directoryNames.css,
      files: config.directoryNames.src + "/" + config.directoryNames.css + "/**/*"
    },
    scss: {
      dir: config.directoryNames.src + "/" + config.directoryNames.scss,
      files: config.directoryNames.src + "/" + config.directoryNames.scss + "/**/*.scss"
    },
    js: {
      dir: config.directoryNames.src + "/" + config.directoryNames.js,
      files: config.directoryNames.src + "/" + config.directoryNames.js + "/*.js"
    },
    partials: {
      files: config.directoryNames.src + "/partials/**/*"
    },
    html: {
      dir: config.directoryNames.src,
      files: config.directoryNames.src + "/**/*.html",
    },
    tmp: {
      dir: config.directoryNames.src + "/.tmp",
      files: config.directoryNames.src + "/.tmp/**/*"
    },
    svg: {
      dir: config.directoryNames.src + "/" + config.directoryNames.assets + "/svg-src",
      files: config.directoryNames.src + "/" + config.directoryNames.assets + "/svg-src/**/*.svg"
    }
  },
  build: {
    base: {
      dir: config.directoryNames.build
    },
    html: {
      dir: config.directoryNames.src + "/" + config.buildFolder,
      files: config.buildFolder.length ? config.directoryNames.src + "/*" + config.buildFolder + "/**/*.html" : config.directoryNames.src + "/**/*.html",
    },
    build: {
      css: config.directoryNames.css,
      js: config.directoryNames.js
    },
    css: {
      dir: config.directoryNames.build + "/" + config.directoryNames.css
    },
    js: {
      dir: config.directoryNames.build + "/" + config.directoryNames.js
    },
    vendor: {
      dir: config.directoryNames.build + "/" + config.directoryNames.vendor
    }
  }
}
