React.lazy这个API，无论是否使用Suspense，都会throw出pending状态，然后被跟节点捕获到。
此时会在顶层DOM设置内联样式”display: none !important;“。但仅仅只是设置了样式，没有阻止子组件的didmount触发。
所以会发生didmount被触发时，整个DOM树都被display none的情况。此时诸如offsetWidth这样的值的获取会出错。