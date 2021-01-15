```javascript
/**
 * diff的核心函数
 * 按照规律一个个对比vnode
 *
 * @date 2020-05-07
 * @param {*} parentElm 父DOM节点
 * @param {*} oldCh 同层比较中的节点组
 * @param {*} newCh 同层比较中的节点组
 * @param {*} insertedVnodeQueue 插入队列
 * @param {*} removeOnly
 */
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  let oldStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newStartIdx = 0
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm

  // removeOnly is a special flag used only by <transition-group>
  // to ensure removed elements stay in correct relative positions
  // during leaving transitions
  const canMove = !removeOnly

  if (process.env.NODE_ENV !== 'production') {
    checkDuplicateKeys(newCh)
  }

  // DIFF规则
  // 1.看os oe有没有,没有直接把索引移动向中间一位
  // 2.依次进行对比,看vnode是否相同
  //  顺序为对比osv nsv 对比oev nev 对比osv nev 对比oev nsv
  // osv === nsv, oev === nev 时只做下标更改,  下标向中间移动一位
  // osv === nev os移动到oe后面,  双方下标向中间移动一位
  // oev === nsv oe移动到os前面,  双方下标向中间移动一位
  // 3.四个地方都不相同的情况下,判断在oldCh中是否有相同key的vnode
  // (1) 在oldCh中有相同key的vnode
  //     进一步判断是否为相同vnode
  //        ①vnode一样,插入到oldStartVnode前,并将oldvnode置为undefined
  //        ②vnode不一样,以ns为基础创建一个ele元素并插入到oldStartVnode前
  // (2) 在oldCh中没有相同key的vnode
  //     创建一个ele元素并插入到oldStartVnode前

  // 同时,该规则是递归的.在每一个找到相等的oldVnode的时候,继续对相等的双方(新旧vnode)调用patchVnode
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {// os没有定义，os索引向后移动一位
      oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {//oe没有定义，oe索引向前移动一位
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      //os==ns，保持节点位置不变，继续比较其子节点，os,ns索引向后移动一位
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      //oe==ne，保持节点位置不变，继续比较其子节点，oe，ne索引向前移动一位。
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // os==ne，将os节点移动到oe后面，继续比较其子节点，os索引向后移动一位，ne索引向前移动一位
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // oe==ns，将oe移动到os节点前，继续比较其子节点，oe索引向后移动一位，ns向前移动一位
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      //两组都不相同的情况下
      // 做个映射表,方便在旧vnode中找到那个vnode
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      //在oldstartIdx与oldEndIdx间，查找与newStartVnode相同(key相同，或者节点元素相同)节点索引位置
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
      if (isUndef(idxInOld)) { 
        // 没有相同节点，证明是个新的vnode
        // 创建newStartVnode的真实dom节点并插入到oldStartVnode(不是最前面,是当前索引前面)前
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
      } else {
        vnodeToMove = oldCh[idxInOld]
        // 对比两个元素的key和节点
        if (sameVnode(vnodeToMove, newStartVnode)) {
          //key值和节点都都相同
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
          oldCh[idxInOld] = undefined
          //移动到oldStartVnode(不是最前面,是当前索引前面)前
          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        } else {
          // 相同的key，但节点元素不同，和没有相同节点一样.
          // 以ns为基础创建一个ele元素并插入到oldStartVnode前
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        }
      }
      //newStartVnode索引向前移
      newStartVnode = newCh[++newStartIdx]
    }
  }

  // 全部遍历完了之后
  if (oldStartIdx > oldEndIdx) {
    //如果旧节点先遍历完，把剩余的vnode全部插入到oe后面位置

    // 尝试取nev后面的一个元素,取不到就算了
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
  } else if (newStartIdx > newEndIdx) {
    //新节点先遍历完，删除剩余的老节点
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}
```