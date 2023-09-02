/*
 * @Author: lmmqxyx
 * @Date: 2023-09-02 23:21:09
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-02 23:21:54
 * @FilePath: /vue3_mine/packages/runtime-dom/src/index.ts
 * @Description: 
 */

import { Renderer, createRenderer } from 'packages/runtime-core/src/renderer'
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
         会约束函数参数的数据类型
      */
      (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
    )
  }