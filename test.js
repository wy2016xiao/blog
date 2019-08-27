let isNode;
(function(){
  var root = this;
  if (typeof window !== 'undefined' && root === window) {
    return isNode = false
  }
  isNode = true
}).call(this)

console.log(isNode)