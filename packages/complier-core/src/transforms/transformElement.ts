/*
 * @Author: lmmqxyx
 * @Date: 2023-09-03 14:10:51
 * @LastEditors: lmmqxyx
 * @LastEditTime: 2023-09-03 14:11:12
 * @FilePath: /vue3_mine/packages/complier-core/src/transforms/transformElement.ts
 * @Description:
 */

import { CallExpression, ExpressionNode, ObjectExpression } from '../ast'

export type PropsExpression = ObjectExpression | CallExpression | ExpressionNode
