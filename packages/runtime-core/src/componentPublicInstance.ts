import { EmitsOptions } from './componentEmits'
import { ComputedOptions, MethodOptions } from './componentOptions'

/**
 * Custom properties added to component instances in any way and can be accessed through `this`
 *
 * @example
 * Here is an example of adding a property `$router` to every component instance:
 * ```ts
 * import { createApp } from 'vue'
 * import { Router, createRouter } from 'vue-router'
 *
 * declare module '@vue/runtime-core' {
 *   interface ComponentCustomProperties {
 *     $router: Router
 *   }
 * }
 *
 * // effectively adding the router to every component instance
 * const app = createApp({})
 * const router = createRouter()
 * app.config.globalProperties.$router = router
 *
 * const vm = app.mount('#app')
 * // we can access the router from the instance
 * vm.$router.push('/')
 * ```
 */
export interface ComponentCustomProperties {}

// public properties exposed on the proxy, which is used as the render context
// in templates (as `this` in the render option)
export type ComponentPublicInstance<
  P = {}, // props type extracted from props option
  B = {}, // raw bindings returned from setup()
  D = {}, // return from data()
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  E extends EmitsOptions = {},
  PublicProps = P,
  Defaults = {},
  MakeDefaultsOptional extends boolean = false,
  Options = ComponentOptionsBase<any, any, any, any, any, any, any, any, any>,
  I extends ComponentInjectOptions = {},
  S extends SlotsType = {}
> = {
  $: ComponentInternalInstance
  $data: D
  $props: Prettify<
    MakeDefaultsOptional extends true
      ? Partial<Defaults> & Omit<P & PublicProps, keyof Defaults>
      : P & PublicProps
  >
  $attrs: Data
  $refs: Data
  $slots: UnwrapSlotsType<S>
  $root: ComponentPublicInstance | null
  $parent: ComponentPublicInstance | null
  $emit: EmitFn<E>
  $el: any
  $options: Options & MergedComponentOptionsOverride
  $forceUpdate: () => void
  $nextTick: typeof nextTick
  $watch<T extends string | ((...args: any) => any)>(
    source: T,
    cb: T extends (...args: any) => infer R
      ? (...args: [R, R]) => any
      : (...args: any) => any,
    options?: WatchOptions
  ): WatchStopHandle
} & P &
  ShallowUnwrapRef<B> &
  UnwrapNestedRefs<D> &
  ExtractComputedReturns<C> &
  M &
  ComponentCustomProperties &
  InjectToObject<I>
