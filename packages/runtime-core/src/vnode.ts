import { ReactiveFlags } from "@vue/reactivity"

export type VNodeTypes=|string|VNode|Component|typeof Text|typeof Static|

export interface VNode<
  HostNode = RendererNode,
  HostElement = RendererElement,
  ExtraProps = { [key: string]: any }
> {
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
