/*
 * @Author: lmmqxyx
 * @Date: 2023-09-03 18:06:58
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-03 18:11:12
 * @FilePath: /vue3_mine/packages/runtime-core/src/errorHandling.ts
 * @Description:
 */
import { ComponentInternalInstance } from './component'
import { LifecycleHooks } from './enums'
import { VNode } from './vnode'

// contexts where user provided function may be executed, in addition to
// lifecycle hooks.
export const enum ErrorCodes {
  SETUP_FUNCTION,
  RENDER_FUNCTION,
  WATCH_GETTER,
  WATCH_CALLBACK,
  WATCH_CLEANUP,
  NATIVE_EVENT_HANDLER,
  COMPONENT_EVENT_HANDLER,
  VNODE_HOOK,
  DIRECTIVE_HOOK,
  TRANSITION_HOOK,
  APP_ERROR_HANDLER,
  APP_WARN_HANDLER,
  FUNCTION_REF,
  ASYNC_COMPONENT_LOADER,
  SCHEDULER
}

export const ErrorTypeStrings: Record<LifecycleHooks | ErrorCodes, string> = {
  [LifecycleHooks.SERVER_PREFETCH]: 'serverPrefetch hook',
  [LifecycleHooks.BEFORE_CREATE]: 'beforeCreate hook',
  [LifecycleHooks.CREATED]: 'created hook',
  [LifecycleHooks.BEFORE_MOUNT]: 'beforeMount hook',
  [LifecycleHooks.MOUNTED]: 'mounted hook',
  [LifecycleHooks.BEFORE_UPDATE]: 'beforeUpdate hook',
  [LifecycleHooks.UPDATED]: 'updated',
  [LifecycleHooks.BEFORE_UNMOUNT]: 'beforeUnmount hook',
  [LifecycleHooks.UNMOUNTED]: 'unmounted hook',
  [LifecycleHooks.ACTIVATED]: 'activated hook',
  [LifecycleHooks.DEACTIVATED]: 'deactivated hook',
  [LifecycleHooks.ERROR_CAPTURED]: 'errorCaptured hook',
  [LifecycleHooks.RENDER_TRACKED]: 'renderTracked hook',
  [LifecycleHooks.RENDER_TRIGGERED]: 'renderTriggered hook',
  [ErrorCodes.SETUP_FUNCTION]: 'setup function',
  [ErrorCodes.RENDER_FUNCTION]: 'render function',
  [ErrorCodes.WATCH_GETTER]: 'watcher getter',
  [ErrorCodes.WATCH_CALLBACK]: 'watcher callback',
  [ErrorCodes.WATCH_CLEANUP]: 'watcher cleanup function',
  [ErrorCodes.NATIVE_EVENT_HANDLER]: 'native event handler',
  [ErrorCodes.COMPONENT_EVENT_HANDLER]: 'component event handler',
  [ErrorCodes.VNODE_HOOK]: 'vnode hook',
  [ErrorCodes.DIRECTIVE_HOOK]: 'directive hook',
  [ErrorCodes.TRANSITION_HOOK]: 'transition hook',
  [ErrorCodes.APP_ERROR_HANDLER]: 'app errorHandler',
  [ErrorCodes.APP_WARN_HANDLER]: 'app warnHandler',
  [ErrorCodes.FUNCTION_REF]: 'ref function',
  [ErrorCodes.ASYNC_COMPONENT_LOADER]: 'async component loader',
  [ErrorCodes.SCHEDULER]:
    'scheduler flush. This is likely a Vue internals bug. ' +
    'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core'
}

export type ErrorTypes = LifecycleHooks | ErrorCodes

export function callWithErrorHandling(
  fn: Function,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    res = args ? fn(...args) : fn()
  } catch (err) {
    handleError(err, instance, type)
  }
  return res
}

export function handleError(
  err: unknown,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  throwInDev = true
) {
  const contextVNode = instance ? instance.vnode : null
  if (instance) {
    let cur = instance.parent
    // the exposed instance is the render proxy to keep it consistent with 2.x
    const exposedInstance = instance.proxy
    // in production the hook receives only the error code
    const errorInfo = __DEV__ ? ErrorTypeStrings[type] : type
    while (cur) {
      const errorCapturedHooks = cur.ec
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (
            errorCapturedHooks[i](err, exposedInstance, errorInfo) === false
          ) {
            return
          }
        }
      }
      cur = cur.parent
    }
    // app-level handling
    const appErrorHandler = instance.appContext.config.errorHandler
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        ErrorCodes.APP_ERROR_HANDLER,
        [err, exposedInstance, errorInfo]
      )
      return
    }
  }
  logError(err, type, contextVNode, throwInDev)
}

function logError(
  err: unknown,
  type: ErrorTypes,
  contextVNode: VNode | null,
  throwInDev = true
) {
  if (__DEV__) {
    const info = ErrorTypeStrings[type]
    if (contextVNode) {
      pushWarningContext(contextVNode)
    }
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`)
    if (contextVNode) {
      popWarningContext()
    }
    // crash in dev by default so it's more noticeable
    if (throwInDev) {
      throw err
    } else if (!__TEST__) {
      console.error(err)
    }
  } else {
    // recover in prod to reduce the impact on end-user
    console.error(err)
  }
}
