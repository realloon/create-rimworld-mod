import type { VarMap } from '../types'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { renderTemplate } from './render-template'

export async function copyTemplate(
  sourceDir: string,
  targetDir: string,
  values: VarMap,
) {
  await mkdir(targetDir, { recursive: true })
  const entries = await readdir(sourceDir, { withFileTypes: true })

  for (const entry of entries) {
    const sourcePath = join(sourceDir, entry.name)
    const targetName = renderTemplate(entry.name, values)
    const targetPath = join(targetDir, targetName)

    if (entry.isDirectory()) {
      await copyTemplate(sourcePath, targetPath, values)
      continue
    }

    const content = await readFile(sourcePath, 'utf8')
    await writeFile(targetPath, renderTemplate(content, values))
  }
}
