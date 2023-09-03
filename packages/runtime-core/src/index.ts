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
