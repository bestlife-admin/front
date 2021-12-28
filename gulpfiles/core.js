/*
* Gulp Builder (Core)
* @version: 1.0.0 (Fri, 27 May 2020)
* @author: HtmlStream
* @license: Htmlstream (https://htmlstream.com/licenses)
* Copyright 2020 Htmlstream
*/

const userConfig = require('../config');

// Replace container with container-fluid if set default header
if (userConfig.layoutBuilder.header.layoutMode === 'default' && userConfig.layoutBuilder.header.containerMode === 'container') {
  userConfig.layoutBuilder.header.containerMode = 'container-fluid';
}

// Mutatuin
const mutator = {
  autopath: "@@autopath",
  deleteLine: "hs-builder:delete",
  "deleteLine:build": "hs-builder:build-delete",
  "deleteLine:dist": "hs-builder:dist-delete",
  previewMode: false,
}

const additionNames = {
  assets: "assets",
  css: "assets/css",
  js: "assets/js",
  scss: "assets/scss",
  svg: "assets/svg",
  vendor: "assets/vendor"
}

module.exports.additionNames = additionNames;

module.exports.config = {...mutator, ...userConfig}

const context = {
  buildFolder: userConfig.buildFolder,
  fileNames: userConfig.fileNames,
  vars: userConfig.vars,
  startPath: userConfig.startPath,
  directoryNames: userConfig.directoryNames,
  layoutBuilder: userConfig.layoutBuilder,
  languageDirection: userConfig.languageDirection
}

module.exports.context = {...mutator, ...context}

// Lighten color fucntion
module.exports.gulpLighten = (p1) => {
  const options = p1.split(',')

  let col = options[0].toString()
  let amt = parseInt(options[1])
  var usePound = false

  if (col[0] == "#") {
    col = col.slice(1)
    usePound = true
  }
  var num = parseInt(col, 16)
  var r = (num >> 16) + amt
  if (r > 255) {
    r = 255
  } else if (r < 0) {
    r = 0
  }
  var b = ((num >> 8) & 0x00FF) + amt
  if (b > 255) {
    b = 255
  } else if (b < 0) {
    b = 0
  }
  var g = (num & 0x0000FF) + amt
  if (g > 255) {
    g = 255
  } else if (g < 0) {
    g = 0
  }
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
}

// Darken color fucntion
module.exports.gulpDarken = (p1) => {
  const options = p1.split(',')

  let col = options[0].toString()
  let amt = -parseInt(options[1])
  var usePound = false

  if (col[0] == "#") {
    col = col.slice(1)
    usePound = true
  }
  var num = parseInt(col, 16)
  var r = (num >> 16) + amt
  if (r > 255) {
    r = 255
  } else if (r < 0) {
    r = 0
  }
  var b = ((num >> 8) & 0x00FF) + amt
  if (b > 255) {
    b = 255
  } else if (b < 0) {
    b = 0
  }
  var g = (num & 0x0000FF) + amt
  if (g > 255) {
    g = 255
  } else if (g < 0) {
    g = 0
  }
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
}

// Rgba convert fucntion
module.exports.gulpRGBA = (p1) => {
  const options = p1.split(',')
  const hex = options[0].toString()
  const transparent = options[1].toString()

  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
    c= hex.substring(1).split('');
    if(c.length== 3){
      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c= '0x'+c.join('');
    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',' + transparent + ')';
  }
  throw new Error('Bad Hex');
}

// Path level function
module.exports.pathLevel = (file) => {
  relativePathLevels = file.relative.split(/\/|\\/).length - 1;

  let level = '';

  if (relativePathLevels) {
    for (let i = 0; i < relativePathLevels; i++) {
      if (relativePathLevels === i + 1) {
        level = level + '..'
      } else {
        level = level + '../'
      }
    }
  }
  else {
    level = '.'
  }

  return level;
}

module.exports.shieldingVariables = (match, p1) => {
  return match.replace(p1, '@@');
}

module.exports.shieldingFunctions = (match, p1) => {
  return match.replace(p1, 'gulp');
}
