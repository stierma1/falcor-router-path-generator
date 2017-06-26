var traverse = require("traverse");

module.exports = function(obj, withLength){
  var traversable = traverse(obj)
  var paths = traversable.paths();

  //We remove all non ATOMIC paths ie path must lead to an atomic element
  return paths.filter(function(path){
    var obj = traversable.get(path);

    return (withLength && obj instanceof Array) || !(typeof(obj) === "object" || typeof(obj) === "function");
  });
}

function convertArraysToLength(obj, path){
  var traversable = traverse(obj)
  var plucked = traversable.get(path);
  if(plucked instanceof Array){
    path.push("length");
  }
  return path;
}

module.exports.convertArraysToLength = convertArraysToLength;
