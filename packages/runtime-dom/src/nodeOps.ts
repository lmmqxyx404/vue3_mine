const doc = (typeof document !== 'undefined' ? document : null) as Document

// :Omit<RendererOptions<Node,Element>,'patchProp'>
export const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null)
  },
  remove: child => {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  // 创建元素， 跨平台的特性
  createElement: tagName => {
    document.createElement(tagName)
  },
  querySelector: select => {
    doc.querySelector(select)
  }
}
