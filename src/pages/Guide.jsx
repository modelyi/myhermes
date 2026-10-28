import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import { getGuide } from '../lib/guides.js'

const mdComponents = {
  pre: ({ children }) => <pre className="code">{children}</pre>,
  blockquote: ({ children }) => <div className="note info">{children}</div>,
  table: ({ children }) => (
    <div className="table-wrap">
      <table>{children}</table>
    </div>
  )
}

export default function Guide() {
  const { slug } = useParams()
  const guide = getGuide(slug)

  if (!guide) {
    return (
      <>
        <Nav />
        <main className="doc">
          <div className="wrap nf">
            <div className="big">404</div>
            <p>没有找到这篇指南。</p>
            <p>
              <Link to="/#guides">← 返回指南列表</Link>
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main className="doc">
        <div className="wrap">
          <p className="crumb">
            <Link to="/">首页</Link> / 指南 / {guide.title}
          </p>
          <h1>{guide.title}</h1>
          <p className="meta">
            {guide.date} · 适用镜像版本：stable 通道（当前 v0.22.5）
          </p>
          <div className="md">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {guide.body}
            </ReactMarkdown>
          </div>
          <p style={{ marginTop: 34 }}>
            <Link to="/#guides">← 返回指南列表</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
