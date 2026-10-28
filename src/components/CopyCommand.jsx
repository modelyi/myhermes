import { useState } from 'react'

// 深色终端风格命令块 + 一键复制
export default function CopyCommand({ command, block = false }) {
  const [ok, setOk] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = command
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setOk(true)
    setTimeout(() => setOk(false), 1600)
  }

  return (
    <div className="cmd" style={block ? { maxWidth: 'none' } : undefined}>
      <code>{command}</code>
      <button className={'copy-btn' + (ok ? ' ok' : '')} onClick={copy}>
        {ok ? '已复制 ✓' : '复制'}
      </button>
    </div>
  )
}
