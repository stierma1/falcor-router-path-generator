"use strict"

class ProtoRoute{
  constructor(primitivePath){
    this._primitivePath = primitivePath;
    this._protoNodes = [];

    for(var i in this._primitivePath){
      var primitiveNode = this._primitivePath[i];
      if(parseInt(primitiveNode) >= 0){
        this._protoNodes.push([]);
      } else {
        this._protoNodes.push(primitiveNode);
      }
    }

  }

  isPathCovered(primitivePath){
    if(primitivePath.length !== this._primitivePath.length){
      return false;
    }

    for(var i = 0; i < primitivePath.length; i++){
      var primitiveNode = primitivePath[i];
      if(parseInt(primitiveNode) >= 0){
        if(!(this._protoNodes[i] instanceof Array)){
          return false;
        }
      }
      else if(primitiveNode !== this._protoNodes[i]) {
        return false;
      }
    }

    return true;
  }

  generateFalcorRouterPath(prefix){
    return this._protoNodes.map(function(value, idx){
      if(value instanceof Array){
        return "{integers:idx" + idx +"}";
      }
      return value;
    }).reduce(function(red, value){
      if(value[0] === "{"){
        return red + "[" + value + "]";
      }
      return red + "." + value;
    }, prefix)
  }
}

module.exports = ProtoRoute;
