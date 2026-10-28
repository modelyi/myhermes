import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import CopyCommand from '../components/CopyCommand.jsx'
import VersionStat from '../components/VersionStat.jsx'
import { guides } from '../lib/guides.js'

const SOON = [
  { tag: '技巧', title: '日常使用技巧与最佳实践', desc: '即将更新：会话管理、配置建议、与现有工作流的结合方式。' },
  { tag: '排障', title: '常见问题排查手册', desc: '即将更新：依赖解析、网络超时、PATH 不生效、Python 环境问题。' },
  { tag: '运维', title: '镜像站同步机制说明', desc: '即将更新：同步频率、失败重试、缓存策略与版本回滚。' }
]

export default function Home() {
  return (
    <>
      <Nav />

      <section className="hero">
        <div className="wrap">
          <span className="badge">
            <span className="dot" />
            镜像服务运行中 · 每日 03:00 (UTC+8) 自动同步
          </span>
          <h1>Hermes Agent 私有镜像站</h1>
          <p className="lead">
            面向大陆网络环境的安装加速：一键安装脚本、多架构 uv、Python 3.14 与带完整元数据的
            PyPI 缓存代理。跟踪官方 stable release，所有下载文件均提供 sha256 校验。
          </p>
          <CopyCommand command="curl -fsSL https://hermes.solepro.cloud/install.sh | bash" />
        </div>
      </section>

      <section id="install">
        <div className="wrap">
          <h2>
            <span className="n">01</span>一键安装
          </h2>
          <p className="sub">脚本自动完成 5 个步骤，无需手动准备 Python 环境。</p>

          <div className="grid cols-3" style={{ marginBottom: 26 }}>
            <div className="card stat">
              <VersionStat />
              <span className="k">当前 Hermes 版本（stable）</span>
            </div>
            <div className="card stat">
              <span className="v">Python 3.14</span>
              <span className="k">自动安装隔离解释器</span>
            </div>
            <div className="card stat">
              <span className="v">4 架构</span>
              <span className="k">Linux / macOS × Intel / ARM</span>
            </div>
          </div>

          <ol className="steps">
            <li>
              <h3>探测架构，下载 uv 并校验</h3>
              <p>
                识别系统与 CPU 架构，下载对应的静态 uv 二进制，用 <code>sha256sums.txt</code>{' '}
                校验通过后安装到 <code>~/.local/bin/uv</code>。
              </p>
            </li>
            <li>
              <h3>拉取 Hermes 源码并校验</h3>
              <p>
                下载 release 源码包并校验哈希；解压验证成功后才替换 <code>~/.hermes-agent</code>
                ，安装失败不会破坏已有版本。
              </p>
            </li>
            <li>
              <h3>创建 Python 3.14 虚拟环境</h3>
              <p>
                由 uv 下载独立构建的 Python 解释器（不污染系统 Python），在{' '}
                <code>~/.hermes-agent/.venv</code> 建立隔离环境。
              </p>
            </li>
            <li>
              <h3>
                安装全量组件 <code>[all]</code>
              </h3>
              <p>
                依赖经本站的 <a href="#pypi">PyPI 缓存代理</a> 安装，满足 Hermes 的{' '}
                <code>exclude-newer</code> 安全策略；随后软链 <code>hermes</code> 命令。
              </p>
            </li>
            <li>
              <h3>注册 PATH</h3>
              <p>
                按当前 shell 自动写入 <code>~/.bashrc</code> 或 <code>~/.zshrc</code>。执行{' '}
                <code>source</code> 后即可运行 <code>hermes</code>。
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section id="platforms">
        <div className="wrap">
          <h2>
            <span className="n">02</span>支持平台
          </h2>
          <p className="sub">
            需要系统自带 <code>curl</code> 与 <code>tar</code>（macOS / 主流 Linux 发行版默认具备）。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>系统</th>
                  <th>架构</th>
                  <th>对应 uv 包</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Linux</td>
                  <td>x86_64</td>
                  <td>
                    <code>uv-x86_64-linux.tar.gz</code>
                  </td>
                  <td>✅ 已实测</td>
                </tr>
                <tr>
                  <td>Linux</td>
                  <td>aarch64 / ARM64</td>
                  <td>
                    <code>uv-aarch64-linux.tar.gz</code>
                  </td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>macOS</td>
                  <td>Apple Silicon (arm64)</td>
                  <td>
                    <code>uv-aarch64-macos.tar.gz</code>
                  </td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td>macOS</td>
                  <td>Intel (x86_64)</td>
                  <td>
                    <code>uv-x86_64-macos.tar.gz</code>
                  </td>
                  <td>✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="note info" style={{ marginTop: 20 }}>
            <strong>已在大陆 x86_64 Linux 机器上端到端验证</strong>
            106 个依赖解析约 28 秒、安装约 22 秒，Python 3.14.9，
            <code>hermes</code> 命令可正常运行。
          </div>
        </div>
      </section>

      <section id="mirror">
        <div className="wrap">
          <h2>
            <span className="n">03</span>镜像内容与完整性
          </h2>
          <p className="sub">
            所有文件位于 <code>/packages/</code>，由同步容器每日从 GitHub 官方源拉取，原子更新、无脏读窗口。
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>文件</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>
                      <a href="/packages/hermes-agent-latest.tar.gz">hermes-agent-latest.tar.gz</a>
                    </code>
                  </td>
                  <td>最新 stable release 源码包</td>
                </tr>
                <tr>
                  <td>
                    <code>
                      <a href="/packages/version.txt">version.txt</a>
                    </code>
                  </td>
                  <td>当前同步的 release tag</td>
                </tr>
                <tr>
                  <td>
                    <code>uv-*.tar.gz</code>（4 个）
                  </td>
                  <td>四架构 uv 静态二进制（musl / apple-darwin）</td>
                </tr>
                <tr>
                  <td>
                    <code>
                      <a href="/packages/sha256sums.txt">sha256sums.txt</a>
                    </code>
                  </td>
                  <td>全部文件的 sha256 清单，最后原子生成</td>
                </tr>
                <tr>
                  <td>
                    <code>
                      <a href="/install.sh">install.sh</a>
                    </code>
                  </td>
                  <td>一键安装脚本（本身不缓存，始终取最新）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 16 }}>手动校验：</p>
          <CopyCommand
            block
            command="curl -fsSL https://hermes.solepro.cloud/packages/sha256sums.txt -o sums.txt && sha256sum -c sums.txt"
          />
        </div>
      </section>

      <section id="pypi">
        <div className="wrap">
          <h2>
            <span className="n">04</span>PyPI 缓存代理
          </h2>
          <p className="sub">
            本站反代官方 PyPI，索引元数据与 pypi.org 完全一致（含 upload-time），wheel/sdist
            在服务端缓存 30 天。安装脚本默认使用，也可单独用于其他项目。
          </p>

          <div className="grid cols-2">
            <div className="card">
              <h3>uv</h3>
              <pre className="code">
                <code>{`export UV_INDEX_URL=https://hermes.solepro.cloud/simple/
uv pip install -r requirements.txt`}</code>
              </pre>
            </div>
            <div className="card">
              <h3>pip</h3>
              <pre className="code">
                <code>{`pip install -i https://hermes.solepro.cloud/simple/ <包名>`}</code>
              </pre>
              <p style={{ marginBottom: 0 }}>
                <code>/simple/</code> 对应索引，<code>/pypi-files/</code>{' '}
                对应文件下载，均为透传缓存，不修改包内容。
              </p>
            </div>
          </div>

          <div className="note warn">
            <strong>为什么不直接用国内 PyPI 镜像？</strong>
            Hermes 的 <code>pyproject.toml</code> 设置了 <code>exclude-newer = "3 days"</code>{' '}
            安全隔离策略，uv 必须读取每个包的官方上传时间（PEP 700
            元数据）。实测阿里云、清华、腾讯、华为等镜像均不提供该字段，会导致依赖解析失败；只有官方索引满足要求，因此本站对官方源做缓存加速。
          </div>
        </div>
      </section>

      <section id="env">
        <div className="wrap">
          <h2>
            <span className="n">05</span>可选环境变量
          </h2>
          <p className="sub">在安装命令前设置即可覆盖默认值。</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>变量</th>
                  <th>默认值</th>
                  <th>作用</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>HERMES_MIRROR</code>
                  </td>
                  <td>
                    <code>https://hermes.solepro.cloud</code>
                  </td>
                  <td>镜像站地址（自建站点时替换）</td>
                </tr>
                <tr>
                  <td>
                    <code>UV_INDEX_URL</code>
                  </td>
                  <td>
                    <code>https://hermes.solepro.cloud/simple/</code>
                  </td>
                  <td>依赖包索引</td>
                </tr>
                <tr>
                  <td>
                    <code>UV_PYTHON_INSTALL_MIRROR</code>
                  </td>
                  <td>ghfast 代理的 python-build-standalone</td>
                  <td>Python 3.14 解释器下载地址</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="guides">
        <div className="wrap">
          <h2>
            <span className="n">06</span>使用指南与技巧
          </h2>
          <p className="sub">持续更新 Hermes Agent 的实战用法与排障经验。</p>
          <div className="articles">
            {guides.map((g) => (
              <Link key={g.slug} className="article" to={`/guides/${g.slug}`}>
                <span className="tag">{g.tag}</span>
                <h3>{g.title}</h3>
                <p>{g.summary}</p>
                <time>{g.date}</time>
              </Link>
            ))}
            {SOON.map((g) => (
              <div key={g.title} className="article soon">
                <span className="tag">{g.tag}</span>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
                <time>敬请期待</time>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <h2>
            <span className="n">07</span>常见问题
          </h2>

          <h3>安装后提示 hermes: command not found？</h3>
          <p>
            新开一个终端，或手动执行 <code>source ~/.bashrc</code>（zsh 用户执行{' '}
            <code>source ~/.zshrc</code>）。
          </p>

          <h3>如何升级到最新版？</h3>
          <p>
            重新执行一次安装命令即可。镜像站每日 03:00 同步 stable
            release，脚本会校验后原子替换；也可先查看{' '}
            <a href="/packages/version.txt">version.txt</a> 确认当前版本。
          </p>

          <h3>如何卸载？</h3>
          <pre className="code">
            <code>{`rm -rf ~/.hermes-agent ~/.local/bin/hermes ~/.local/bin/uv
# 再从 shell 配置文件中删除 ~/.local/bin 的 PATH 行即可`}</code>
          </pre>

          <h3>安装脚本能离线审查吗？</h3>
          <p>
            可以：先{' '}
            <code>curl -fsSL https://hermes.solepro.cloud/install.sh -o install.sh</code>{' '}
            审查后再 <code>bash install.sh</code>。脚本对每个下载文件都做
            sha256 校验，文件损坏或被篡改会直接终止。
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
