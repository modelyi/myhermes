import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 路由切换时回到页面顶部；若带 hash 则滚动到对应锚点
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView()
      }, 60)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
