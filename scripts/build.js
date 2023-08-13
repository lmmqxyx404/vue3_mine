// @ts-check

/*
Produces production builds and stitches together d.ts files.

To specify the package to build, simply pass its name and the desired build
formats to output (defaults to `buildOptions.formats` specified in that package,
or "esm,cjs"):

```
# name supports fuzzy match. will build all packages with name containing "dom":
nr build dom

# specify the format to output
nr build core --formats cjs
```
*/

import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import minimist from 'minimist'
import execa from 'execa'
// used in run()
import { scanEnums } from './const-enum.js'
import { targets as allTargets, fuzzyMatchTarget } from './utils.js'
import { cpus } from 'node:os'
import path from 'node:path'
import { existsSync } from 'node:fs'

// use node:module
const require = createRequire(import.meta.url)
// use minimist
const args = minimist(process.argv.slice(2))

const targets = args._
const formats = args.formats || args.f
// 指明运行环境
const devOnly = args.devOnly || args.d
console.log(devOnly)

const prodOnly = !devOnly && (args.prodOnly || args.p)
const buildTypes = args.withTypes || args.t
const sourceMap = args.sourcemap || args.s
const isRelease = args.release
const buildAllMatching = args.all || args.a

// use execa
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)

run()

async function run() {
  // use current dir
  const removeCache = scanEnums()

  try {
    const resolvedTargets = targets.length
      ? fuzzyMatchTarget(targets, buildAllMatching)
      : allTargets
    console.log(resolvedTargets)
    await buildAll(resolvedTargets)
  } finally {
    removeCache()
  }
}

async function buildAll(targets) {
  await runParallel(cpus().length, targets, build)
}

async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = []
  const executing = []
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source))
    ret.push(p)

    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}

async function build(target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const pkg = require(`${pkgDir}/package.json`)

  // if this is a full build (no specific targets), ignore private packages
  if ((isRelease || !targets.length) && pkg.private) {
    return
  }

  // if building a specific format, do not remove dist.
  if (!formats && existsSync(`${pkgDir}/dist`)) {
    await fs.rm(`${pkgDir}/dist`, { recursive: true })
  }

  const env =
    (pkg.buildOptions && pkg.buildOptions.env) ||
    (devOnly ? 'development' : 'production')
  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [
        `COMMIT:${commit}`,
        `NODE_ENV:${env}`,
        `TARGET:${target}`,
        formats ? `FORMATS:${formats}` : ``,
        prodOnly ? `PROD_ONLY:true` : ``,
        sourceMap ? `SOURCE_MAP:true` : ``
      ]
        .filter(Boolean)
        .join(',')
    ],
    { stdio: 'inherit' }
  )
}
