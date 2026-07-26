import { parseArchiveEmail } from '../lib/emailArchive.js'

const archiveModules = import.meta.glob('../../emails/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function formatSentDate(value) {
  if (!value) return ''

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}

export const emailArchiveEntries = Object.entries(archiveModules)
  .map(([filePath, raw]) => {
    const entry = parseArchiveEmail(raw, filePath)

    return {
      ...entry,
      sentLabel: formatSentDate(entry.sent),
    }
  })
  .sort((a, b) => b.sent.localeCompare(a.sent))
