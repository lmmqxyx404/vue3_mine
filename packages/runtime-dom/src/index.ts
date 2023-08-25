
import { createRenderer } from 'packages/runtime-core/src/renderer'
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'
import { extend } from "@vue/shared"

let renderer:Renderer<Element>


export const createApp=((...args: any)=>{
    // 注意类型
    const app=ensureRenderer().createApp(...args)

    return app
})


const rendererOptions = /*#__PURE__*/ extend({ patchProp }, nodeOps)

function ensureRenderer() {
    return (
      renderer ||
      /* 下面括号中的表达式里面的函数
          createRenderer<Node, Element | ShadowRoot>
         
      */
      (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
    )
  }