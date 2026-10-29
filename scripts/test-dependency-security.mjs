import assert from 'node:assert/strict'
import { realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import test from 'node:test'

const backendRequire = createRequire(new URL('../back-end/package.json', import.meta.url))
const frontendRequire = createRequire(new URL('../front-end/package.json', import.meta.url))
const qs = backendRequire('qs')

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
