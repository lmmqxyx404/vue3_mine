/*
 * @Author: lmmqxyx
 * @Date: 2023-08-19 11:34:50
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-02 23:27:25
 * @FilePath: /vue3_mine/packages/runtime-core/src/apiCreateApp.ts
 * @Description: 
 */
import { Component, Data } from "./component";
import { ComponentOptions } from "./componentOptions";

export interface App<HostElement = any> {
  version: string
  config: AppConfig

  use<Options extends unknown[]>(
    plugin: Plugin<Options>,
    ...options: Options
  ): this
  use<Options>(plugin: Plugin<Options>, options: Options): this

  mixin(mixin: ComponentOptions): this
  component(name: string): Component | undefined
  component(name: string, component: Component): this
  directive(name: string): Directive | undefined
  directive(name: string, directive: Directive): this
  mount(
    rootContainer: HostElement | string,
    isHydrate?: boolean,
    isSVG?: boolean
  ): ComponentPublicInstance
  unmount(): void
  provide<T>(key: InjectionKey<T> | string, value: T): this

  /**
   * Runs a function with the app as active instance. This allows using of `inject()` within the function to get access
   * to variables provided via `app.provide()`.
   *
   * @param fn - function to run with the app as active instance
   */
  runWithContext<T>(fn: () => T): T

  // internal, but we need to expose these for the server-renderer and devtools
  _uid: number
  _component: ConcreteComponent
  _props: Data | null
  _container: HostElement | null
  _context: AppContext
  _instance: ComponentInternalInstance | null

  /**
   * v2 compat only
   */
  filter?(name: string): Function | undefined
  filter?(name: string, filter: Function): this

  /**
   * @internal v3 compat only
   */
  _createRoot?(options: ComponentOptions): ComponentPublicInstance
}

export type CreateAppFunction<HostElement> = (
    rootComponent: Component,
    rootProps?: Data | null
  ) => App<HostElement>
  
  export interface AppConfig {
    // @private
    readonly isNativeTag?: (tag: string) => boolean
  
    performance: boolean
    optionMergeStrategies: Record<string, OptionMergeFunction>
    globalProperties: ComponentCustomProperties & Record<string, any>
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      info: string
    ) => void
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  
    /**
     * Options to pass to `@vue/compiler-dom`.
     * Only supported in runtime compiler build.
     */
    compilerOptions: RuntimeCompilerOptions
  
    /**
     * @deprecated use config.compilerOptions.isCustomElement
     */
    isCustomElement?: (tag: string) => boolean
  
    // TODO remove in 3.4
    /**
     * Temporary config for opt-in to unwrap injected refs.
     * @deprecated this no longer has effect. 3.3 always unwraps injected refs.
     */
    unwrapInjectedRef?: boolean
  }


  type PluginInstallFunction<Options> = Options extends unknown[]
  ? (app: App, ...options: Options) => any
  : (app: App, options: Options) => any

export type Plugin<Options = any[]> =
  | (PluginInstallFunction<Options> & {
      install?: PluginInstallFunction<Options>
    })
  | {
      install: PluginInstallFunction<Options>
    }
