```javascript
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  // 如果有Promise类并且是原生类则使用Promise
  // 使用一个立即resolve的Promise来调用回调列表
  // ios直接使用setTImeout
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // 如果能用MutationObserver类
  // 创建一个文本节点,用该类监听这个节点
  // 然后手动修改这个文本节点的值让MutationObserver触发
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // 尝试使用setImmedate
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // 尝试使用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

