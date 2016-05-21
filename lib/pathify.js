var traverse = require("traverse");

module.exports = function(obj){
  var traversable = traverse(obj)
  var paths = traversable.paths();

  //We remove all non ATOMIC paths ie path must lead to an atomic element
  return paths.filter(function(path){
    var obj = traversable.get(path);
    return !(obj instanceof Array || typeof(obj) === "object" || typeof(obj) === "function");
  });
}
