import assert from 'node:assert/strict'
import * as filesystem from 'node:fs'
import { mkdir, mkdtemp, realpath, rm, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { setTimeout as delay } from 'node:timers/promises'

const backendRequire = createRequire(new URL('../back-end/package.json', import.meta.url))
const frontendRequire = createRequire(new URL('../front-end/package.json', import.meta.url))
const qs = backendRequire('qs')

test('minimatch limits optimization amplification while preserving ordinary matching', () => {
  const { Minimatch, minimatch } = frontendRequire('minimatch')
  const matcher = new Minimatch(`${'a/**/../b/'.repeat(10)}end`, {
    optimizationLevel: 2,
    braceExpandMax: 16,
  })
  assert.ok(matcher.globParts.length <= 16)
  assert.equal(minimatch('src/nested/page.vue', 'src/**/*.{ts,vue}'), true)
  assert.equal(minimatch('src/nested/page.js', 'src/**/*.{ts,vue}'), false)
  assert.equal(new Minimatch('**/*.ts', { dot: true }).match('.hidden/page.ts'), true)
})

test('glob stops reading directories after cancellation', async (context) => {
  const { glob } = frontendRequire('glob')
  const directory = await mkdtemp(join(tmpdir(), 'consensus-glob-abort-'))
  context.after(() => rm(directory, { recursive: true, force: true }))
  await mkdir(join(directory, 'first', 'nested'), { recursive: true })
  await mkdir(join(directory, 'second', 'nested'), { recursive: true })
  await writeFile(join(directory, 'first', 'nested', 'fixture.txt'), 'fixture')
  const controller = new AbortController()
  const reason = new Error('Owned fixture cancellation')
  let reads = 0
  const operation = glob('**/*', {
    cwd: directory,
    signal: controller.signal,
    fs: {
      ...filesystem,
      readdir(path, options, callback) {
        reads++
        filesystem.readdir(path, options, (error, entries) => {
          if (reads === 1) controller.abort(reason)
          callback(error, entries)
        })
      },
    },
  })
  await assert.rejects(operation, error => error === reason)
  await delay(50)
  assert.equal(reads, 1)
})

test('backend comma-array serialization handles non-callable coercion properties', () => {
  for (const value of ['blocked', 1, null, false, {}]) {
    for (const encodeValuesOnly of [false, true]) {
      assert.doesNotThrow(() => qs.stringify({ items: [{ toString: value }] }, {
        arrayFormat: 'comma',
        encodeValuesOnly,
      }))
    }
  }
})

test('backend query parsing and ordinary comma serialization retain their contracts', () => {
  assert.deepEqual(qs.parse('tag=one&tag=two'), { tag: ['one', 'two'] })
  assert.deepEqual(qs.parse('filter[0]=one&filter[1]=two'), { filter: ['one', 'two'] })
  assert.deepEqual(qs.parse('filter.name=one', { allowDots: true }), { filter: { name: 'one' } })
  assert.equal(qs.stringify({ items: ['one', 'two'] }, { arrayFormat: 'comma' }), 'items=one%2Ctwo')
  assert.equal(qs.stringify({ items: ['one', 'two'] }, {
    arrayFormat: 'comma',
    encodeValuesOnly: true,
  }), 'items=one,two')
})

test('the installed Rollup resolver consumes the guarded merge implementation', async () => {
  const resolverEntry = frontendRequire.resolve('@rollup/plugin-node-resolve')
  const resolverRequire = createRequire(resolverEntry)
  assert.equal(
    await realpath(resolverRequire.resolve('deepmerge')),
    await realpath(new URL('../vendor/deepmerge/dist/cjs.js', import.meta.url)),
  )
  const { nodeResolve } = frontendRequire('@rollup/plugin-node-resolve')
  assert.equal(nodeResolve({ extensions: ['.mjs', '.js'] }).name, 'node-resolve')
  assert.equal(nodeResolve().name, 'node-resolve')
})
