// Core API ------------------------------------------------------------------

export const version = __VERSION__

// Custom Renderer API ---------------------------------------------------------

export { createRenderer } from './renderer'
export type {
  Renderer,
  RendererNode,
  RendererElement,
  HydrationRenderer,
  RendererOptions,
  RootRenderFunction
} from './renderer'

export type {
  App,
  AppConfig,
  AppContext,
  Plugin,
  CreateAppFunction,
  OptionMergeFunction
} from './apiCreateApp'

export { warn } from './warning'

// 2.x COMPAT ------------------------------------------------------------------

export { DeprecationTypes } from './compat/compatConfig'

const _compatUtils = {
  warnDeprecation,
  createCompatVue,
  isCompatEnabled,
  checkCompatEnabled,
  softAssertCompatEnabled
}

/**
 * @internal only exposed in compat builds.
 */
export const compatUtils = (
  __COMPAT__ ? _compatUtils : null
) as typeof _compatUtils

// For integration with runtime compiler
export { registerRuntimeCompiler, isRuntimeOnly } from './component'
