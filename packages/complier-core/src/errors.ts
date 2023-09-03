import { SourceLocation } from './ast'

export interface CompileError extends SyntaxError {
  code: number | string
  loc?: SourceLocation
}
