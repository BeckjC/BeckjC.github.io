import test from 'node:test'
import assert from 'node:assert/strict'

import { getLegacyHash, getRoutePath, parseLocation, shouldNormalizeLegacyHash } from '../src/lib/routes.js'
import { pageKeys } from '../src/siteConfig.js'

test('parseLocation supports root path routes', () => {
  assert.deepEqual(parseLocation({ pathname: '/', hash: '' }), {
    page: pageKeys.home,
    source: 'path',
  })

  assert.deepEqual(parseLocation({ pathname: '/becks-adventures', hash: '' }), {
    page: pageKeys.adventures,
    source: 'path',
  })
})

test('parseLocation supports detail routes', () => {
  assert.deepEqual(parseLocation({ pathname: '/becks-blog/hello-world', hash: '' }), {
    page: pageKeys.blog,
    slug: 'hello-world',
    source: 'path',
  })

  assert.deepEqual(parseLocation({ pathname: '/nans-recipes/stollen', hash: '' }), {
    page: pageKeys.recipes,
    slug: 'stollen',
    source: 'path',
  })
})

test('legacy hashes still resolve and normalize', () => {
  assert.deepEqual(parseLocation({ pathname: '/', hash: '#contact' }), {
    page: pageKeys.about,
    source: 'hash',
  })

  assert.equal(shouldNormalizeLegacyHash({ pathname: '/', hash: '#contact' }), true)
  assert.equal(getRoutePath({ page: pageKeys.about }), '/about-me')
  assert.equal(getLegacyHash({ page: pageKeys.about }), '#contact')
})

test('unknown routes fall back home', () => {
  assert.deepEqual(parseLocation({ pathname: '/totally-unknown', hash: '' }), {
    page: pageKeys.home,
    source: 'path',
    notFound: true,
  })
})
