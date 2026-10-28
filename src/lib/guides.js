// 指南文章加载器：构建时收集 src/content/guides/*.md
// Markdown 头部使用简单 frontmatter（title / date / tag / summary）
const modules = import.meta.glob('../content/guides/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) return { meta: {}, body: raw }
  const meta = {}
  m[1].split('\n').forEach((line) => {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) meta[kv[1].trim()] = kv[2].trim().replace(/^["']|["']$/g, '')
  })
  return { meta, body: m[2] }
}

export const guides = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '')
    const { meta, body } = parseFrontmatter(raw)
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      tag: meta.tag || '指南',
      summary: meta.summary || '',
      body
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getGuide(slug) {
  return guides.find((g) => g.slug === slug)
}
