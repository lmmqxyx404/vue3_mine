/*
 * @Author: lmmqxyx
 * @Date: 2023-09-02 23:21:09
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-03 17:40:40
 * @FilePath: /vue3_mine/packages/runtime-dom/src/index.ts
 * @Description:
 */

import { Renderer, createRenderer } from '@vue/runtime-core'
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'
import { extend, isFunction, isString } from '@vue/shared'
import { CreateAppFunction } from '@vue/runtime-core'

let renderer: Renderer<Element>

export const createApp = ((...args) => {
  // 注意类型
  const app = ensureRenderer().createApp(...args)

  const { mount } = app

  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    const container = normalizeContainer(containerOrSelector)
    if (!container) return

    const component = app._component

    if (!isFunction(component) && !component.render && !component.template) {
      // __UNSAFE__
      // Reason: potential execution of JS expressions in in-DOM template.
      // The user must make sure the in-DOM template is trusted. If it's
      // rendered by the server, the template should not contain any user data.
      component.template = container.innerHTML
    }
  }
  return app
}) as CreateAppFunction<Element>

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

function normalizeContainer(
  container: Element | ShadowRoot | string
): Element | null {
  if (isString(container)) {
    const res = document.querySelector(container)
    if (__DEV__ && !res) {
      warn(
        `Failed to mount app: mount target selector "${container}" returned null.`
      )
    }
    return res
  }
  if (
    __DEV__ &&
    window.ShadowRoot &&
    container instanceof window.ShadowRoot &&
    container.mode === 'closed'
  ) {
    warn(
      `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
    )
  }
  return container as any
}
