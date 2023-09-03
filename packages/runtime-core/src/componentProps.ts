/*
 * @Author: lmmqxyx
 * @Date: 2023-09-02 23:55:58
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-02 23:56:13
 * @FilePath: /vue3_mine/packages/runtime-core/src/componentProps.ts
 * @Description:
 */

export interface PropOptions<T = any, D = T> {
  type?: PropType<T> | true | null
  required?: boolean
  default?: D | DefaultFactory<D> | null | undefined | object
  validator?(value: unknown): boolean
  /**
   * @internal
   */
  skipCheck?: boolean
  /**
   * @internal
   */
  skipFactory?: boolean
}

const enum BooleanFlags {
  shouldCast,
  shouldCastTrue
}

type NormalizedProp =
  | null
  | (PropOptions & {
      [BooleanFlags.shouldCast]?: boolean
      [BooleanFlags.shouldCastTrue]?: boolean
    })

// normalized value is a tuple of the actual normalized options
// and an array of prop keys that need value casting (booleans and defaults)
export type NormalizedProps = Record<string, NormalizedProp>
export type NormalizedPropsOptions = [NormalizedProps, string[]] | []
