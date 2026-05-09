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
  {
    name: 'createCSharpProject',
    type: 'confirm',
    message: 'Create C# project',
    initial: true,
  },
])

const projectName = toPascalName(response.projectName) ?? 'MyMod'
const author = response.author.trim()
const packageId = `${author}.${projectName}`
const targetDir = resolve(process.cwd(), projectName)
const templateDir = join(import.meta.dir, '../template')
const values = {
  projectName,
  author,
  packageId,
}

await copyTemplate(join(templateDir, 'About'), join(targetDir, 'About'), values)

if (response.createCSharpProject) {
  await copyTemplate(join(templateDir, 'Source'), join(targetDir, 'Source'), values)
  await copyTemplate(join(templateDir, '.gitignore'), join(targetDir, '.gitignore'), values)
}

console.log(`Created Mod in ${targetDir}`)
