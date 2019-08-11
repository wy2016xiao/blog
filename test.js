setTimeout(function() {
  console.log('1 setTimeout callback');
}, 0)

new Promise(function(resolve) {
  setTimeout(function() {
  console.log('2 promise setTimeout create');
}, 0)
  resolve()
}).then(function() {
  console.log('3 promise then');
})

console.log('4 outer console');