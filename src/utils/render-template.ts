import type { VarMap } from '../types'

const pattern = /\{(\w+)\}/g

export function renderTemplate(content: string, values: VarMap) {
  return content.replace(pattern, (match, key) => values[key] ?? match)
}
