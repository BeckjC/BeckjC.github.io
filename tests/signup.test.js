import test from 'node:test'
import assert from 'node:assert/strict'

import { isValidEmail, normalizeEmail } from '../src/lib/signup.js'

test('normalizeEmail trims and lowercases', () => {
  assert.equal(normalizeEmail('  Beck@Example.COM '), 'beck@example.com')
})

test('isValidEmail accepts valid addresses and rejects malformed ones', () => {
  assert.equal(isValidEmail('beck@example.com'), true)
  assert.equal(isValidEmail('beck+test@example.co.uk'), true)
  assert.equal(isValidEmail('not-an-email'), false)
  assert.equal(isValidEmail('missing@tld'), false)
  assert.equal(isValidEmail(''), false)
})
