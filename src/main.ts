#!/usr/bin/env bun
import type { Answers } from './types'
import { join, resolve } from 'node:path'
import prompts from 'prompts'
import { toPascalName, copyTemplate } from './utils'

const response = await prompts<keyof Answers>([
  {
    name: 'projectName',
    type: 'text',
    message: 'Project name',
    initial: 'MyMod',
  },
  {
    name: 'author',
    type: 'text',
    message: 'Author',
    initial: 'Author',
  },
])

const projectName = toPascalName(response.projectName) ?? 'MyMod'
const author = response.author.trim()
const packageId = `${author}.${projectName}`
const targetDir = resolve(process.cwd(), projectName)
const templateDir = join(import.meta.dir, '../template')

await copyTemplate(templateDir, targetDir, {
  projectName,
  author,
  packageId,
})

console.log(`Created Mod in ${targetDir}`)
