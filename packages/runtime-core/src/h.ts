import { VNodeProps } from "./vnode"

/*
 * @Author: lmmqxyx
 * @Date: 2023-09-13 23:55:57
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-13 23:56:13
 * @FilePath: \vue3_mine\packages\runtime-core\src\h.ts
 * @Description: 
 */
type RawProps = VNodeProps & {
  // used to differ from a single VNode object as children
  __v_isVNode?: never
  // used to differ from Array children
  [Symbol.iterator]?: never
} & Record<string, any>
