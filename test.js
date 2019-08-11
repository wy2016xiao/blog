let obj = {
  
}
let oldValue = [1]
Object.defineProperty(obj, 'list', {
  enumerable: true,
  configurable: true,
  get: function () {
    console.log('be get')
    return oldValue
  },
  set: function (newValue) {
    console.log('be set')
    oldValue = newValue
  }
});

obj.list[1] = 2;