import { isObject } from '@vue/shared'
import {
  isRef,
  Ref,
  toRaw,
  isShallow,
  isReactive,
  isReadonly
} from '@vue/reactivity'

export function initCustomFormatter() {
  /* eslint-disable no-restricted-globals */
  if (!__DEV__ || typeof window === 'undefined') {
    return
  }

  const vueStyle = { style: 'color:#3ba776' }
  const numberStyle = { style: 'color:#0b1bc9' }
  const stringStyle = { style: 'color:#b62e24' }
  const keywordStyle = { style: 'color:#9d288c' }

  // custom formatter for Chrome
  // https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html
  const formatter = {
    header(obj: unknown) {
      // TODO also format ComponentPublicInstance & ctx.slots/attrs in setup
      // isObject is from vue/shared
      if (!isObject(obj)) {
        return null
      }

      if (obj.__isVue) {
        return ['div', vueStyle, `VueInstance`]
        // isRef from vue/reactivity
      } else if (isRef(obj)) {
        return [
          'div',
          {},
          ['span', vueStyle, genRefFlag(obj)],
          '<',
          formatValue(obj.value),
          `>`
        ]
      } else if (isReactive(obj)) {
        return [
          'div',
          {},
          ['span', vueStyle, isShallow(obj) ? 'ShallowReactive' : 'Reactive'],
          '<',
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ]
      } else if (isReadonly(obj)) {
        return [
          'div',
          {},
          ['span', vueStyle, isShallow(obj) ? 'ShallowReadonly' : 'Readonly'],
          '<',
          formatValue(obj),
          '>'
        ]
      }
      return null
    },
    hasBody(obj: unknown) {
      return obj && (obj as any).__isVue
    },
    body(obj: unknown) {
      if (obj && (obj as any).__isVue) {
        return [
          'div',
          {},
          ...formatInstance((obj as ComponentPublicInstance).$)
        ]
      }
    }
  }

  function formatValue(v: unknown, asRaw = true) {
    if (typeof v === 'number') {
      return ['span', numberStyle, v]
    } else if (typeof v === 'string') {
      return ['span', stringStyle, JSON.stringify(v)]
    } else if (typeof v === 'boolean') {
      return ['span', keywordStyle, v]
    } else if (isObject(v)) {
      return ['object', { object: asRaw ? toRaw(v) : v }]
    } else {
      return ['span', stringStyle, String(v)]
    }
  }

  function genRefFlag(v: Ref) {
    if (isShallow(v)) {
      return `ShallowRef`
    }
    if ((v as any).effect) {
      return `ComputedRef`
    }
    return `Ref`
  }

  if ((window as any).devtoolsFormatters) {
    ;(window as any).devtoolsFormatters.push(formatter)
  } else {
    ;(window as any).devtoolsFormatters = [formatter]
  }
}
