# vue3_mine
it is a projetc made by my step-by-step process of learning Vue3.

# Analysis the Vue3 composition
There are 3 parts consisting the Vue3--```compiler``` ```runtime``` ```reactive```

# Before write down the code
The project is managed by pnpm.
The code is supported by TypeScript.

# some npm packages.
## esm-bundler
transfer ES6 to ES5

## cjs
deal with common js in node.

## global
share the common functions

# the diffeerence between 2 and 3
## mvvm implementation
in 2, use defineProperty.
in 3, use Proxy.

## tree shaking in 3
This can reduce the code size.
if you use `watch` in 3, then only `watch` could be imported in the js file.