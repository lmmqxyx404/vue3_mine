import { RendererOptions } from "packages/runtime-core/src/renderer"

const doc = (typeof document !== 'undefined' ? document : null) as Document

// :Omit<RendererOptions<Node,Element>,'patchProp'>
export const nodeOps:Omit<RendererOptions<Node,Element>,'patchProp'> = {
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
  createElement: (tagName):Element => {
    return document.createElement(tagName)
  },

  createText: text=>doc.createTextNode(text),

  createComment: text => doc.createComment(text),

  
  setText: (node, text) => {
    node.nodeValue = text
  },

  setElementText: (el, text) => {
    el.textContent = text
  },

  
  parentNode: node => node.parentNode as Element | null,

  nextSibling: node => node.nextSibling,
  
  querySelector: select => doc.querySelector(select),

}
