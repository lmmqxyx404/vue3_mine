// 有四个响应式API reactive,shallowReactive readonly,shallowReadonly
// 1. 参数为对象，如果是基本数据类型，处理方式不太一样

export { isRef, type Ref } from './ref'
export { toRaw, isShallow, isReactive, isReadonly } from './reactive'
export {
  type WritableComputedOptions,
  type ComputedGetter,
  type ComputedSetter
} from './computed'
// 从 reactive.ts 导出四个方法. 本质上都是给 createReactiveObject() 处理。
// 1. 是否只读  2. 是否深层
export { reactive, readonly } from './reactive'
