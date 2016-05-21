#!/usr/bin/env node

var program = require('commander');
var pathGen = require("../lib/main");
var fs = require("fs");
var path = require("path");

program
  .version(require("../package.json").version)
  .option('-p, --prefix [prefix]', 'Prefix for the falcor routes, is required')
  .option('-i, --input [inputPath]', 'Path to json obj, is required')
  .option('-o, --output [outputPath]', 'Path to output the generated routes, is optional')
  .parse(process.argv);

if(!program.prefix){
  throw new Error("Router prefix is required");
}

if(!program.inputPath){
  throw new Error("Input path is required");
}

var fullPath = path.join(process.cwd(), program.inputPath);

var obj = require(fullPath);

var pathsGenerated = pathGen(program.prefix, obj);

if(program.outputPath){
  var fullOutPath = path.join(process.cwd(), program.outputPath);
  fs.writeFileSync(pathsGenerated, "utf8");
} else {
  console.log(pathsGenerated);
}
