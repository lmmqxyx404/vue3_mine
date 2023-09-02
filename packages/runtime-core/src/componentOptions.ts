/*
 * @Author: lmmqxyx
 * @Date: 2023-08-18 22:23:58
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-02 23:54:43
 * @FilePath: /vue3_mine/packages/runtime-core/src/componentOptions.ts
 * @Description: 
 */
import { ComputedGetter, WritableComputedOptions } from '@vue/reactivity'

export type ComputedOptions = Record<
  string,
  ComputedGetter<any> | WritableComputedOptions<any>
>


export interface MethodOptions {
  [key: string]: Function
}

export type ComponentOptions<
  Props = {},
  RawBindings = any,
  D = any,
  C extends ComputedOptions = any,
  M extends MethodOptions = any,
  Mixin extends ComponentOptionsMixin = any,
  Extends extends ComponentOptionsMixin = any,
  E extends EmitsOptions = any,
  S extends SlotsType = any
> = ComponentOptionsBase<
  Props,
  RawBindings,
  D,
  C,
  M,
  Mixin,
  Extends,
  E,
  string,
  S
> &
  ThisType<
    CreateComponentPublicInstance<
      {},
      RawBindings,
      D,
      C,
      M,
      Mixin,
      Extends,
      E,
      Readonly<Props>
    >
  >

export type ComponentOptionsMixin = ComponentOptionsBase<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>


/**
 * Subset of compiler options that makes sense for the runtime.
 */
export interface RuntimeCompilerOptions {
  isCustomElement?: (tag: string) => boolean
  whitespace?: 'preserve' | 'condense'
  comments?: boolean
  delimiters?: [string, string]
}

export type MergedComponentOptions = ComponentOptions &
  MergedComponentOptionsOverride
