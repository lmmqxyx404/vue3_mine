// @ts-check
import { createRequire } from 'node:module'

// 必须指定环境
if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}
