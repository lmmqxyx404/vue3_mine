import { VNode } from './vnode'

/*
 * @Author: lmmqxyx
 * @Date: 2023-09-02 23:27:52
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-02 23:28:07
 * @FilePath: /vue3_mine/packages/runtime-core/src/directives.ts
 * @Description:
 */
export interface DirectiveBinding<V = any> {
  instance: ComponentPublicInstance | null
  value: V
  oldValue: V | null
  arg?: string
  modifiers: DirectiveModifiers
  dir: ObjectDirective<any, V>
}

export type Directive<T = any, V = any> =
  | ObjectDirective<T, V>
  | FunctionDirective<T, V>

export type DirectiveHook<T = any, Prev = VNode<any, T> | null, V = any> = (
  el: T,
  binding: DirectiveBinding<V>,
  vnode: VNode<any, T>,
  prevVNode: Prev
) => void

export interface ObjectDirective<T = any, V = any> {
  created?: DirectiveHook<T, null, V>
  beforeMount?: DirectiveHook<T, null, V>
  mounted?: DirectiveHook<T, null, V>
  beforeUpdate?: DirectiveHook<T, VNode<any, T>, V>
  updated?: DirectiveHook<T, VNode<any, T>, V>
  beforeUnmount?: DirectiveHook<T, null, V>
  unmounted?: DirectiveHook<T, null, V>
  getSSRProps?: SSRDirectiveHook
  deep?: boolean
}

export type FunctionDirective<T = any, V = any> = DirectiveHook<T, any, V>
