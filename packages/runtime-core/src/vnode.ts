import { ReactiveFlags } from "@vue/reactivity"

// TODO: Symbol.for syntax
export const Text = Symbol.for('v-txt')
export const Comment = Symbol.for('v-cmt')
export const Static = Symbol.for('v-stc')

export type VNodeTypes=|string|VNode|typeof Text|typeof Static

export interface VNode<
  HostNode = RendererNode,
  HostElement = RendererElement,
  ExtraProps = { [key: string]: any }> {
  /**
   * @internal
   */
  __v_isVNode: true

  /**
   * @internal
   */
  [ReactiveFlags.SKIP]: true
  type:VNodeTypes
}
