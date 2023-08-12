// @ts-check
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'
import { constEnum } from './scripts/const-enum'

// 必须指定环境
if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const require = createRequire(import.meta.url)
// 当前工程文件夹目录
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const masterVersion = require('./package.json').version
const consolidatePkg = require('@vue/consolidate/package.json')

// 所有 packages 目录
const packagesDir = path.resolve(__dirname, 'packages')
// 获取 package 目录路径
const packageDir = path.resolve(packagesDir, process.env.TARGET)

// 定义一个函数 resolve
const resolve = p => path.resolve(packageDir, p)
// 将 json 文件转化为JS对象
const pkg = require(resolve(`package.json`))
// 得到 buildOptions , 也就是获得了打包配置
const packageOptions = pkg.buildOptions || {}
// 得到包名 两种方式.
const name = packageOptions.filename || path.basename(packageDir)

const [enumPlugin, enumDefines] = constEnum()


// 配置输出格式
const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: `es`
  },
  'esm-browser': {
    file: resolve(`dist/${name}.esm-browser.js`),
    format: `es`
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    // 立即执行
    format: `iife`
  },
  // runtime-only builds, for main "vue" package only
  'esm-bundler-runtime': {
    file: resolve(`dist/${name}.runtime.esm-bundler.js`),
    format: `es`
  },
  'esm-browser-runtime': {
    file: resolve(`dist/${name}.runtime.esm-browser.js`),
    format: 'es'
  },
  'global-runtime': {
    file: resolve(`dist/${name}.runtime.global.js`),
    format: 'iife'
  }
}
