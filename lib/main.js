var pathify = require("./pathify");
var ProtoRoute = require("./proto-route");

module.exports = function(prefix, obj, withLength){
  var paths = pathify(obj, withLength);
  if(withLength){
    paths = paths.map((path) => {
      return pathify.convertArraysToLength(obj, path);
    })
  }
  var routes = [];
  for(var i in paths){
    var pathIsCovered = false;
    for(var j in routes){
      if(routes[j].isPathCovered(paths[i])){
        pathIsCovered = true;
        break;
      }
    }

    if(!pathIsCovered){
      routes.push(new ProtoRoute(paths[i]));
    }
  }

  var finishedRoutes = routes.map(function(val){
    return {route:val.generateFalcorRouterPath(prefix)};
  });

  return JSON.stringify(finishedRoutes, null, 2);
}
