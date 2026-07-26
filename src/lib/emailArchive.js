function getFileSlug(filePath = '') {
  return filePath.split('/').pop()?.replace(/\.md$/, '') || ''
}

export function forceLightModeEmailHtml(html = '') {
  return html
    .replace(/\s*<meta name="color-scheme"[^>]*>\s*/gi, '')
    .replace(/\s*<meta name="supported-color-schemes"[^>]*>\s*/gi, '')
    .replace(/@media \(prefers-color-scheme: dark\) \{[\s\S]*?(?=\[data-ogsc\] body,)/, '')
    .replace(/\[data-ogsc\] body,[\s\S]*?(?=<\/style>)/, '')
}

function parseMetadataBlock(block = '') {
  const metadata = {}

  block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const match = line.match(/^-\s*([^:]+):\s*(.+)$/)
      if (!match) return
      const [, key, value] = match
      metadata[key.trim().toLowerCase()] = value.trim()
    })

  return metadata
}

function parseSections(body = '') {
  const headingPattern = /^##\s+(.+)$/gm
  const matches = [...body.matchAll(headingPattern)]

  return matches.map((match, index) => {
    const title = match[1].trim()
    const start = match.index + match[0].length
    const end = index + 1 < matches.length ? matches[index + 1].index : body.length
    const content = body.slice(start, end).trim()

    return { title, content }
  })
}

function parseParagraphs(content = '') {
  return content
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function parseFooterLinks(content = '') {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
}

function extractFencedHtml(content = '') {
  const match = content.match(/```html\n([\s\S]*?)\n```/)
  return match ? match[1].trim() : ''
}

export function parseArchiveEmail(raw, filePath = '') {
  const normalized = raw.replace(/\r\n/g, '\n').trim()
  const titleMatch = normalized.match(/^#\s+(.+)$/m)

  if (!titleMatch) {
    throw new Error(`Archive email is missing a title: ${filePath || 'unknown file'}`)
  }

  const title = titleMatch[1].trim()
  const sectionsStart = normalized.indexOf('\n## ')
  const metadataBlock = sectionsStart === -1
    ? normalized.slice(titleMatch.index + titleMatch[0].length).trim()
    : normalized.slice(titleMatch.index + titleMatch[0].length, sectionsStart).trim()

  const metadata = parseMetadataBlock(metadataBlock)
  const sections = parseSections(sectionsStart === -1 ? '' : normalized.slice(sectionsStart))

  const previewSection = sections.find((section) => section.title === 'Preview text')
  const originalHtmlSection = sections.find((section) => section.title === 'Original sent HTML')
  const footerLinksSection = sections.find((section) => section.title === 'Footer links')

  const contentSections = sections
    .filter((section) => !['Preview text', 'Footer links', 'Original sent HTML'].includes(section.title))
    .map((section) => ({
      title: section.title,
      paragraphs: parseParagraphs(section.content),
    }))

  return {
    slug: getFileSlug(filePath),
    title,
    sent: metadata.sent || '',
    archived: metadata.archived || '',
    author: metadata.author || '',
    preview: previewSection ? previewSection.content.trim() : title,
    notes: metadata.notes || '',
    sourceOfTruth: metadata['source of truth'] || '',
    footerLinks: footerLinksSection ? parseFooterLinks(footerLinksSection.content) : [],
    originalHtml: originalHtmlSection ? extractFencedHtml(originalHtmlSection.content) : '',
    websiteHtml: forceLightModeEmailHtml(originalHtmlSection ? extractFencedHtml(originalHtmlSection.content) : ''),
    sections: contentSections,
  }
}
