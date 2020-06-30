```flow
st=>start: Start
cond2=>condition: Vnode是否存在
cond3=>condition: oldVnode是否存在
cond4=>condition: oldVnode是否存在
cond5=>condition: !isRealElement && sameVnode(oldVnode, vnode)
cond6=>condition: !!isRealElement
cond7=>condition: oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)
cond8=>condition: isTrue(hydrating)
cond9=>condition: hydrate(oldVnode, vnode, insertedVnodeQueue)
cond10=>condition: isDef(vnode.parent)
cond11=>condition: process.env.NODE_ENV !== 'production'
cond12=>condition: isDef(parentElm)
cond13=>condition: isDef(oldVnode.tag)
op=>operation: invokeDestroyHook(oldVnode)
op2=>operation: 初始化isInitialPatch=false insertedVnodeQueue=[]
op3=>operation: isInitialPatch=true
op4=>operation: createElm(vnode, insertedVnodeQueue)
op5=>operation: invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
op6=>operation: const isRealElement = isDef(oldVnode.nodeType)
op7=>operation: patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
op8=>operation: oldVnode.removeAttribute(SSR_ATTR)
op9=>operation: hydrating = true
op10=>operation: oldVnode = emptyNodeAt(oldVnode)
op11=>operation: const oldElm = oldVnode.elm
op12=>operation: const parentElm = nodeOps.parentNode(oldElm)
op13=>operation: 用新的vnode创建dom节点
op14=>operation: invokeInsertHook(vnode, insertedVnodeQueue, true)
op15=>operation: warn
op16=>operation: let ancestor = vnode.parent
op17=>operation: const patchable = isPatchable(vnode)
op18=>operation: 递归地把父节点重置为空节点占位符
op19=>operation: removeVnodes(parentElm, [oldVnode], 0, 0)
op20=>operation: invokeDestroyHook(oldVnode)
out=>inputoutput: return
out2=>inputoutput: return vnode.elm
out3=>inputoutput: return oldVnode
e=>end

st->cond2
cond2(yes)->op2->cond4
cond2(no)->cond3
cond3(yes)->op->out->e
cond3(no)->out->e
cond4(no)->op3->op4->op5->out2->e
cond4(yes)->op6->cond5
cond5(yes)->op7->op5->out2->e
cond5(no)->cond6
cond6(yes)->cond7
cond6(no)->op11->op12->op13->cond10
cond7(yes)->op8->op9->cond8
cond7(no)->cond8
cond8(yes)->cond9
cond8(no)->op9->op11->op12->op13->cond10
cond9(yes)->op14->out3->e
cond9(no)->cond11
cond10(yes)->op16->op17->op18->cond12
cond10(no)->cond12
cond11(yes)->op15->op10->op11->op12->op13->cond10
cond11(no)->op10->op11->op12->op13->cond10
cond12(yes)->op19->op5->out2->e
cond12(no)->cond13
cond13(yes)->op20->op5->out2->e
cond13(no)->op14->op5->out2->e
```




```javascript
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
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

  // 1.看os oe有没有,没有直接把索引移动向中间
  // 2.依次进行对比,看vnode是否相同
  //  顺序为对比osv nsv 对比oev nev 对比osv nev 对比oev nsv
  // 3.四个地方都不相同的情况下
  // (1) 如果oldCh中没有ns节点一样的key值,将ns插入到os前
  //     如果有,判断vnode是否一样
  //     ①vnode一样,patchVnode
  //     ②vnode不一样,以ns为基础创建一个ele元素并插入到oldStartVnode前
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
    } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
      // os==ne，将os节点移动到oe后面，继续比较其子节点，os索引向后移动一位，ne索引向前移动一位
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
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
        // 将newStartVnode插入到oldStartVnode前
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
      } else {
        vnodeToMove = oldCh[idxInOld]
        //key值和节点都都相同
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
          oldCh[idxInOld] = undefined
          //移动到oldStartVnode前
          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        } else {
          // same key but different element. treat as new element
          // 相同的key，但节点元素不同，和没有相同节点一样.
          // 以ns为基础创建一个ele元素并插入到oldStartVnode前
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        }
      }
      //newStartVnode索引加1
      newStartVnode = newCh[++newStartIdx]
    }
  }

  // 全部遍历完了之后
  if (oldStartIdx > oldEndIdx) {
    //如果旧节点先遍历完，把剩余的vnode全部插入到ne+1前位置
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
  } else if (newStartIdx > newEndIdx) {
    //新节点先遍历完，删除剩余的老节点
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}
```

