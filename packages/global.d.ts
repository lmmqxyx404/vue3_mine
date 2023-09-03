/*
 * @Author: lmmqxyx
 * @Date: 2023-08-13 22:37:57
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-03 18:21:22
 * @FilePath: /vue3_mine/packages/global.d.ts
 * @Description:
 */
/// <reference types="vite/client" />

// Global compile-time constants
declare var __DEV__: boolean
declare var __TEST__: boolean
declare var __VERSION__: string

// used in vue/src/dev.ts
declare var __BROWSER__: boolean
declare var __ESM_BUNDLER__: boolean
