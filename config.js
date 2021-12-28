/*
* Gulp Builder (Config)
* @version: 4.0.0 (01 June, 2021)
* @author: HtmlStream
* @license: Htmlstream (https://htmlstream.com/licenses)
* Copyright 2021 Htmlstream
*/


// You may find more detailed documentation at documentation/gulp.html

module.exports = {

  //
  // Start path when launching a Gulp
  //

  startPath: "/index.html",


  //
  // Variables that can be used in HTML pages and SVG files
  //

  vars: {
    themeFont: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap",
    version: "?v=1.0",
    style: {
      color: '#377dff', // Primary Color
      font: 'Inter' // Primary Font
    }
  },


  //
  // Layout builder to customize look and feel of siderbar and navbar
  //

  layoutBuilder: {
    skin: 'default', // default, dark, light
    header: {
      layoutMode: 'default', // default, single, double
      containerMode: 'container' // container, container-fluid
    },
    sidebarLayout: 'default', // default, compact, mini
  },


  //
  // Skip CSS & JavaScript files from bundle files (e.g. vendor.min.css)
  //

  skipFilesFromBundle: {
    dist: [
    ],

    build: [
      "assets/css/docs.css",
      "assets/css/snippets.css",
      "node_modules/bootstrap-icons/font/bootstrap-icons.css",
      "node_modules/aos/dist/aos.css",
      "node_modules/aos/dist/aos.js"
    ]
  },


  //
  // Copy/Paste files and folders into different path
  //

  copyDependencies: {
    dist: {
      "*assets/js/theme-custom.js": ""
    },

    build: {
      "node_modules/bootstrap-icons/font/*fonts/**": "assets",
      "*assets/js/theme-custom.js": ""
    }
  },


  //
  // An option to set custom folder name for build process
  //

  buildFolder: "", // e.g. my-project


  //
  // Replace an asset paths in HTML to CDN
  //

  replacePathsToCDN: {},


  //
  // Change directory folder names
  //

  directoryNames: {
    src: "./src",
    dist: "./dist",
    build: "./build"
  },


  //
  // Change bundle file names
  //

  fileNames: {
    dist: {
      js: "theme.min.js",
      css: "theme.min.css"
    },

    build: {
      css: "theme.min.css",
      js: "theme.min.js",
      vendorCSS: "vendor.min.css",
      vendorJS: "vendor.min.js",
    }
  },


  //
  // Files types that will be copied to the ./build/* folder
  //

  fileTypes: "jpg|png|svg|mp4|webm|ogv|json",


  //
  // Language Direction
  //

  languageDirection: {
    isRTL: false, // true, false
    lang: 'en' // e.g. en, ar
  }
}
