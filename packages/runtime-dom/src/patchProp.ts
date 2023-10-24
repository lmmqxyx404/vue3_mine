/*
 * @Author: lmmqxyx
 * @Date: 2023-08-22 18:25:42
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-10-24 10:08:16
 * @FilePath: \vue3_mine\packages\runtime-dom\src\patchProp.ts
 * @Description: 
 */
// type DOMRendererOptions = RendererOptions<Node, Element>

import { isModelListener, isOn } from '@vue/shared'
import { patchClass } from './modules/class'
import { patchStyle } from './modules/style'
import { patchEvent } from './modules/events'
import { RendererOptions } from '@vue/runtime-core'

type DOMRendererOptions = RendererOptions<Node, Element>

export const patchProp: DOMRendererOptions['patchProp'] = (
  el,
  key,
  prevValue,
  nextValue,
  isSVG = false,
  prevChildren,
  parentComponent,
  parentSuspense,
  unmountChildren
) => {
  if (key === 'class') {
    patchClass(el, nextValue)
  } else if (key === 'style') {
    patchStyle(el, prevValue, nextValue)
  } else if (isOn(key)) {
    // ignore v-model listeners
    if (!isModelListener(key)) {
      patchEvent
    }
  }
}
