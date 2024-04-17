import type { ComponentInternalInstance } from './component'

/**
 * mark the current rendering instance for asset resolution (e.g.
 * resolveComponent, resolveDirective) during render
 */
export let currentRenderingInstance: ComponentInternalInstance | null = null
export let currentScopeId: string | null = null
