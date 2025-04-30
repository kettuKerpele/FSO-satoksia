const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/test').reverse

test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
})

test('reverse of happy sonni', () => {
  const result = reverse('innostunutsonni')

  assert.strictEqual(result, 'innostunutsonni')
})

test('reverse of kallis kauppa', () => {
  const result = reverse('sokos')

  assert.strictEqual(result, 'sokos')
})