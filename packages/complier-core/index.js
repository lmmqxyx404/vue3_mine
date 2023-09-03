/*
 * @Author: lmmqxyx
 * @Date: 2023-09-03 17:12:49
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-03 17:13:01
 * @FilePath: /vue3_mine/packages/complier-core/index.js
 * @Description: 
 */
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/compiler-core.cjs.prod.js')
} else {
  module.exports = require('./dist/compiler-core.cjs.js')
}
