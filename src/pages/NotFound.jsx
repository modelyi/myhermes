import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="doc">
        <div className="wrap nf">
          <div className="big">404</div>
          <p>页面不存在或已被移动。</p>
          <p>
            <Link to="/">← 返回首页</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
