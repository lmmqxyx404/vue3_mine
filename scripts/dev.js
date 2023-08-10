// @ts-check

// Using esbuild for faster dev builds.
// We are still using Rollup for production builds because it generates
// smaller files w/ better tree-shaking.

import { createRequire } from 'node:module'
import { resolve, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
// minimist 用于解析命令行参数
import minimist from 'minimist'

const require = createRequire(import.meta.url)
// console.log(require, import.meta.url)

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

const args = minimist(process.argv.slice(2))
const target = args._[0] || 'vue'
const format = args.f || 'global'
const inlineDeps = args.i || args.inline
const pkg = require(`../packages/${target}/package.json`)

console.log(args, target, format, inlineDeps, pkg)

const outputFormat = format.startsWith('global')
  ? 'iife'
  : format === 'cjs'
  ? 'cjs'
  : 'esm'

const postfix = format.endsWith('-runtime')
  ? `runtime.${format.replace(/-runtime$/, '')}`
  : format

const outfile = resolve(
  __dirname,
  `../packages/${target}/dist/${
    target === 'vue-compat' ? `vue` : target
  }.${postfix}.js`
)

const relativeOutfile = relative(process.cwd(), outfile)

let external = []
if (!inlineDeps) {
  if (format === 'cjs' || format.includes('esm-bundler')) {
    external = [
      ...external,
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      // for @vue/compiler-sfc / server-renderer
      'path',
      'url',
      'stream'
    ]
  }
}
