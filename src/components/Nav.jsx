import { Link } from 'react-router-dom'

const LINKS = [
  { to: '/#install', label: '安装' },
  { to: '/#mirror', label: '镜像内容' },
  { to: '/#pypi', label: 'PyPI 代理' },
  { to: '/#guides', label: '指南' },
  { to: '/#faq', label: 'FAQ' }
]

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" to="/">
          <span className="logo">H</span> hermes.solepro.cloud
        </Link>
        <nav>
          {LINKS.map((l) => (
            <a key={l.to} href={l.to}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
