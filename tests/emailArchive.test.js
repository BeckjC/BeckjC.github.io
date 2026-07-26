import test from 'node:test'
import assert from 'node:assert/strict'

import { parseArchiveEmail } from '../src/lib/emailArchive.js'

const sampleArchive = `# Sample Email

- Sent: 2026-07-25
- Archived: 2026-07-26
- Author: Beck Cherry
- Source of truth: original sent HTML preserved below
- Notes: test note

## Preview text

A short preview.

## Intro

Hello there.

## Main Section

Paragraph one.

\`Inline code\`

[A link](https://example.com)

## Footer links

- https://beckcherry.com
- {{ unsubscribe_url }}

## Original sent HTML

${'```'}html
<div>Hello</div>
${'```'}
`

test('parseArchiveEmail extracts metadata, sections, links, and original html', () => {
  const parsed = parseArchiveEmail(sampleArchive, '/emails/2026-07-25-sample-email.md')

  assert.equal(parsed.slug, '2026-07-25-sample-email')
  assert.equal(parsed.title, 'Sample Email')
  assert.equal(parsed.sent, '2026-07-25')
  assert.equal(parsed.preview, 'A short preview.')
  assert.equal(parsed.footerLinks.length, 2)
  assert.equal(parsed.originalHtml, '<div>Hello</div>')
  assert.equal(parsed.sections.length, 2)
  assert.equal(parsed.sections[0].title, 'Intro')
  assert.deepEqual(parsed.sections[0].paragraphs, ['Hello there.'])
})
