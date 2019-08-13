console.log('1');

setTimeout(function() {
  console.log('2');
  new Promise(function(resolve) {
    console.log('3');
    resolve();
  }).then(function() {
    console.log('4')
  })
}, 0)
new Promise(function(resolve) {
  console.log('5');
  resolve();
}).then(function() {
  console.log('6')
})

new Promise(function(resolve) {
  setTimeout(function() {
    console.log('7');
  }, 0)
  resolve()
}).then(function() {
  console.log('8');
})
// 1
// 5
// 6
// 2
// 3
// 4
// 7
// 8