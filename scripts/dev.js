// @ts-check

// Using esbuild for faster dev builds.
// We are still using Rollup for production builds because it generates
// smaller files w/ better tree-shaking.

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
console.log(require, import.meta.url);
