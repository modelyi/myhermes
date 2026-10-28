# myhermes — Hermes Agent 私有镜像站前端

[hermes.solepro.cloud](https://hermes.solepro.cloud) 的网站前端：镜像安装说明、PyPI 缓存代理用法、使用指南与技巧文章。

- **技术栈**：React 18 + React Router 6 + Vite 5，指南文章用 Markdown（`src/content/guides/*.md`，构建时打包，支持 GFM 表格）
- **部署形态**：Docker 多阶段构建（Node 构建 → nginx 提供静态文件），容器只监听 `127.0.0.1:8092`，由宿主 nginx 反代 443
- **本站只做前端展示**：`/install.sh`、`/packages/`、`/simple/`、`/pypi-files/` 等镜像与 PyPI 代理路径由宿主 nginx 处理，不在本仓库内

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
```

> 首页会请求 `/packages/version.txt` 读取当前镜像版本；本地开发时该接口不存在，仅显示为 “—”，不影响其他功能。

## 构建与部署

```bash
# 国内构建可换 npm 源（docker-compose.yml 中的 build arg）
docker compose build
docker compose up -d          # 监听 127.0.0.1:8092
```

宿主 nginx 把域名根路径反代到容器：

```nginx
location / {
    proxy_pass http://127.0.0.1:8092;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

容器内 nginx 已配置 SPA 回退，直接访问 `/guides/<文章>` 不会 404。

## 新增指南文章

1. 在 `src/content/guides/` 新建 `xxx.md`
2. 头部写 frontmatter：`title` / `date`(YYYY-MM-DD) / `tag` / `summary`
3. 重新构建部署；首页“使用指南与技巧”会自动列出新文章，路由为 `/guides/xxx`

## 目录结构

```
src/
├── components/      # Nav、Footer、复制按钮、版本读取等
├── content/guides/  # Markdown 指南文章
├── lib/guides.js    # 文章 frontmatter 解析与加载（import.meta.glob）
├── pages/           # Home / Guide / NotFound
└── styles.css
docker/nginx.conf    # 容器内静态站点配置（SPA 回退、资源缓存）
```
