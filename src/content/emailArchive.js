import { parseArchiveEmail } from '../lib/emailArchive.js'

const archiveModules = import.meta.glob('../../emails/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const emailArchiveEntries = Object.entries(archiveModules)
  .map(([filePath, raw]) => parseArchiveEmail(raw, filePath))
  .sort((a, b) => b.sent.localeCompare(a.sent))
