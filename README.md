# vue3_mine
it is a projetc made by my step-by-step process of learning Vue3.

# Analysis the Vue3 composition
There are 3 parts consisting the Vue3--```compiler``` ```runtime``` ```reactive```

# Before write down the code
The project is managed by pnpm.
The code is supported by TypeScript.
In the root package, it should addd devDependencies.
# some npm packages.
## esm-bundler
transfer ES6 to ES5

## cjs
deal with common js in node.

## global
share the common functions

## rollup


# the diffeerence between 2 and 3
## mvvm implementation
in 2, use defineProperty.
in 3, use Proxy.

## tree shaking in 3
This can reduce the code size.
if you use `watch` in 3, then only `watch` could be imported in the js file.

# about child package.json file
The buildOptions set the build configuration. Relatived with the above cjs global.

# about root package.json
`"type": "module",` The type attr indicates that the .js file would be treated as a module.
not a common js file.

if you want to use common js file. You'd better use .cjs file or use the following syntax.
`const require = createRequire(import.meta.url)`
