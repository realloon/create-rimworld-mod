#!/usr/bin/env bun
import type { Answers } from './types'
import { copyTemplate, toPascalName } from './utils'
import { join, resolve } from 'node:path'
import prompts from 'prompts'

const response = await prompts<keyof Answers>([
  {
    name: 'projectName',
    type: 'text',
    message: '输入项目名称',
    initial: 'MyMod',
  },
  {
    name: 'author',
    type: 'text',
    message: '输入作者',
    initial: 'author',
  },
])

const projectName = toPascalName(response.projectName)
const author = response.author.trim()
const packageId = `${author}.${projectName}`
const targetDir = resolve(process.cwd(), projectName)
const templateDir = join(import.meta.dir, '..', 'template')

await copyTemplate(templateDir, targetDir, {
  projectName,
  author,
  packageId,
})

console.log(`Created ${projectName} in ${targetDir}`)
