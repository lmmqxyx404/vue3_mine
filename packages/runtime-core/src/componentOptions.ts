import { ComputedGetter, WritableComputedOptions } from '@vue/reactivity'

export type ComputedOptions = Record<
  string,
  ComputedGetter<any> | WritableComputedOptions<any>
>


export interface MethodOptions {
  [key: string]: Function
}
