import { CollectionTypes } from "./collectionHandlers"
import { ShallowReactiveMarker } from "./reactive"

declare const RefSymbol: unique symbol
export declare const RawSymbol: unique symbol

export interface Ref<T = any> {
  value: T
  /**
   * Type differentiator only.
   * We need this to be in public d.ts but don't want it to show up in IDE
   * autocomplete, so we use a private Symbol instead.
   */
  [RefSymbol]: true
}

/**
 * Checks if a value is a ref object.
 *
 * @param r - The value to inspect.
 * @see {@link https://vuejs.org/api/reactivity-utilities.html#isref}
 */
export function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
export function isRef(r: any): r is Ref {
  return !!(r && r.__v_isRef === true)
}



// corner case when use narrows type
// Ex. type RelativePath = string & { __brand: unknown }
// RelativePath extends object -> true
type BaseTypes = string | number | boolean

/**
 * This is a special exported interface for other packages to declare
 * additional types that should bail out for ref unwrapping. For example
 * \@vue/runtime-dom can declare it like so in its d.ts:
 *
 * ``` ts
 * declare module '@vue/reactivity' {
 *   export interface RefUnwrapBailTypes {
 *     runtimeDOMBailTypes: Node | Window
 *   }
 * }
 * ```
 */
export interface RefUnwrapBailTypes {}

export type UnwrapRef<T>=T extends ShallowRef<infer V>?V:T extends Ref<infer V>?UnwrapRefSimple<V>:UnwrapRefSimple<T>


export type UnwrapRefSimple<T>=T extends
|Function
|CollectionTypes
|BaseTypes|Ref|RefUnwrapBailTypes[keyof RefUnwrapBailTypes]|{[RawSymbol]?:true}?T:T extends ReadonlyArray<any>?{[K in keyof T]:UnwrapRefSimple<T[K]>}:T extends object&{[ShallowReactiveMarker]?:never}?{
  [P in keyof T]:P extends symbol?T[P]:Unwra
}