import type { VarMap } from '../types'

export function renderTemplate(content: string, values: VarMap) {
  return content.replace(
    /\{\{(\w+)\}\}/g,
    (match, key: string) => values[key] ?? match,
  )
}
