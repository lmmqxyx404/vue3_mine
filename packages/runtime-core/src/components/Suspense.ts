/*
 * @Author: lmmqxyx
 * @Date: 2023-09-03 18:27:59
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-03 18:28:21
 * @FilePath: /vue3_mine/packages/runtime-core/src/components/Suspense.ts
 * @Description:
 */
import { RendererElement, RendererNode } from '..'
import { ComponentInternalInstance } from '../component'
import { MoveType, SetupRenderEffectFn } from '../renderer'
import { VNode } from '../vnode'

export interface SuspenseProps {
  onResolve?: () => void
  onPending?: () => void
  onFallback?: () => void
  timeout?: string | number
  /**
   * Allow suspense to be captured by parent suspense
   *
   * @default false
   */
  suspensible?: boolean
}

export interface SuspenseBoundary {
  vnode: VNode<RendererNode, RendererElement, SuspenseProps>
  parent: SuspenseBoundary | null
  parentComponent: ComponentInternalInstance | null
  isSVG: boolean
  container: RendererElement
  hiddenContainer: RendererElement
  anchor: RendererNode | null
  activeBranch: VNode | null
  pendingBranch: VNode | null
  deps: number
  pendingId: number
  timeout: number
  isInFallback: boolean
  isHydrating: boolean
  isUnmounted: boolean
  effects: Function[]
  resolve(force?: boolean, sync?: boolean): void
  fallback(fallbackVNode: VNode): void
  move(
    container: RendererElement,
    anchor: RendererNode | null,
    type: MoveType
  ): void
  next(): RendererNode | null
  registerDep(
    instance: ComponentInternalInstance,
    setupRenderEffect: SetupRenderEffectFn
  ): void
  unmount(parentSuspense: SuspenseBoundary | null, doRemove?: boolean): void
}

export const isSuspense = (type: any): boolean => type.__isSuspense
