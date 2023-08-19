
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'
import { extend } from "@vue/shared"

let renderer:Renderer<Element>


export const createApp=((...args)=>{
    const app=ensureRenderer().createApp(...args)

    return app
})


const rendererOptions = /*#__PURE__*/ extend({ patchProp }, nodeOps)

function ensureRenderer() {
    return (
      renderer ||
      (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
    )
  }