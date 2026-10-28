import { useEffect, useState } from 'react'

// 实时读取镜像当前同步的 Hermes 版本
export default function VersionStat() {
  const [v, setV] = useState('读取中…')
  useEffect(() => {
    fetch('/packages/version.txt', { cache: 'no-store' })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error())))
      .then((t) => setV(t.trim()))
      .catch(() => setV('—'))
  }, [])
  return <span className="v">{v}</span>
}
