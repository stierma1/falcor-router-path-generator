#!/usr/bin/env node

var program = require('commander');
var pathGen = require("../lib/main");
var fs = require("fs");
var path = require("path");

program
  .version(require("../package.json").version)
  .option('-p, --prefix [prefix]', 'Prefix for the falcor routes, is required')
  .option('-i, --input [input]', 'Path to json obj, is required')
  .option('-o, --output [output]', 'Path to output the generated routes, is optional')
  .parse(process.argv);

if(!program.prefix){
  throw new Error("Router prefix is required");
}

if(!program.input){
  throw new Error("Input path is required");
}

var fullPath = path.join(process.cwd(), program.input);

var obj = require(fullPath);

var pathsGenerated = pathGen(program.prefix, obj);

if(program.output){
  var fullOutPath = path.join(process.cwd(), program.output);
  fs.writeFileSync(fullOutPath, pathsGenerated, "utf8");
} else {
  console.log(pathsGenerated);
}
