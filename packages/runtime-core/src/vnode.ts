/*
 * @Author: lmmqxyx
 * @Date: 2023-09-02 23:21:09
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-03 17:56:55
 * @FilePath: /vue3_mine/packages/runtime-core/src/vnode.ts
 * @Description:
 */
import { ReactiveFlags, Ref } from '@vue/reactivity'
import { ComponentPublicInstance } from './componentPublicInstance'

// TODO: Symbol.for syntax
export const Text = Symbol.for('v-txt')
export const Comment = Symbol.for('v-cmt')
export const Static = Symbol.for('v-stc')

export type VNodeTypes = string | VNode | typeof Text | typeof Static

type VNodeMountHook = (vnode: VNode) => void
type VNodeUpdateHook = (vnode: VNode, oldVNode: VNode) => void
export type VNodeHook =
  | VNodeMountHook
  | VNodeUpdateHook
  | VNodeMountHook[]
  | VNodeUpdateHook[]

export type VNodeRef =
  | string
  | Ref
  | ((
      ref: Element | ComponentPublicInstance | null,
      refs: Record<string, any>
    ) => void)

// https://github.com/microsoft/TypeScript/issues/33099
export type VNodeProps = {
  key?: string | number | symbol
  ref?: VNodeRef
  ref_for?: boolean
  ref_key?: string

  // vnode hooks
  onVnodeBeforeMount?: VNodeMountHook | VNodeMountHook[]
  onVnodeMounted?: VNodeMountHook | VNodeMountHook[]
  onVnodeBeforeUpdate?: VNodeUpdateHook | VNodeUpdateHook[]
  onVnodeUpdated?: VNodeUpdateHook | VNodeUpdateHook[]
  onVnodeBeforeUnmount?: VNodeMountHook | VNodeMountHook[]
  onVnodeUnmounted?: VNodeMountHook | VNodeMountHook[]
}

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
  type: VNodeTypes
  props: (VNodeProps & ExtraProps) | null
  key: string | number | symbol | null
  ref: VNodeNormalizedRef | null
  /**
   * SFC only. This is assigned on vnode creation using currentScopeId
   * which is set alongside currentRenderingInstance.
   */
  scopeId: string | null
  /**
   * SFC only. This is assigned to:
   * - Slot fragment vnodes with :slotted SFC styles.
   * - Component vnodes (during patch/hydration) so that its root node can
   *   inherit the component's slotScopeIds
   * @internal
   */
  slotScopeIds: string[] | null
}
