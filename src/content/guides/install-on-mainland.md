---
title: 大陆网络环境安装指南
date: 2026-10-28
tag: 安装
summary: 从零开始：前置要求、一键安装、手动校验、卸载与重装、常见报错处理。
---

本文介绍如何在大陆的云主机或本地机器上，通过私有镜像站快速、完整地安装 Hermes Agent。镜像站跟踪官方 **stable release**（非 main 分支），所有二进制和源码包均提供 sha256 校验，依赖安装走镜像站自带的官方 PyPI 缓存代理。

## 一、前置要求

- 系统：Linux（x86_64 / aarch64）或 macOS（Intel / Apple Silicon）
- 命令行具备 `curl` 和 `tar`（主流系统默认已安装）
- 普通用户即可，**不需要 root / sudo**（全部装在用户家目录）
- 磁盘空间：预留约 2 GB（含 Python 解释器与全部依赖）

> **安装位置**：程序位于 `~/.hermes-agent`，可执行文件软链在 `~/.local/bin`，Python 3.14 环境独立存放，不改动系统 Python。

## 二、一键安装

执行下面一条命令即可，正常情况下 1～3 分钟完成：

```bash
curl -fsSL https://hermes.solepro.cloud/install.sh | bash
```

如果你倾向于先审查脚本（推荐）：

```bash
curl -fsSL https://hermes.solepro.cloud/install.sh -o install.sh
less install.sh          # 审查内容
bash install.sh
```

安装结束后看到 “Hermes Agent 部署就绪！” 即成功。按提示刷新 shell 并启动：

```bash
source ~/.bashrc        # zsh 用户：source ~/.zshrc
hermes
```

## 三、安装后验证

- `hermes --version`：能输出版本信息即正常
- `ls -l ~/.local/bin/uv ~/.local/bin/hermes`：两个入口都应存在
- `~/.hermes-agent/.venv/bin/python -V`：应为 Python 3.14.x
- `cat ~/.hermes-agent/version.txt`：与镜像站 version.txt 一致

## 四、升级与卸载

### 升级

镜像站每日 03:00（北京时间）同步最新 stable release。重新跑一遍安装命令即可升级；脚本会**先下载校验、解压成功后再替换旧目录**，中途失败不会破坏现有安装。

### 完全卸载

```bash
rm -rf ~/.hermes-agent ~/.local/bin/hermes ~/.local/bin/uv
# 再编辑 ~/.bashrc 或 ~/.zshrc，删除 ~/.local/bin 的 PATH 行
```

## 五、自定义安装（环境变量）

在命令前加环境变量即可覆盖默认配置：

| 变量 | 默认 | 什么时候改 |
| --- | --- | --- |
| `HERMES_MIRROR` | https://hermes.solepro.cloud | 自建了同款镜像站时 |
| `UV_INDEX_URL` | 本站 /simple/ 代理 | 想用其他 PyPI 源时（注意下方排障） |
| `UV_PYTHON_INSTALL_MIRROR` | ghfast 代理 | 下载 Python 3.14 太慢时可换其他可达镜像 |

```bash
# 示例：指定自定义镜像站
HERMES_MIRROR=https://mirror.example.com bash install.sh
```

## 六、常见报错处理

### 1. 依赖解析报 No solution found（exclude-newer）

这是国内 PyPI 镜像缺少包上传时间元数据、与 Hermes 的安全隔离策略冲突导致的。确认安装时使用本站默认源即可；若手动设置了 `UV_INDEX_URL` 指向国内镜像，请取消后重试：

```bash
unset UV_INDEX_URL
bash install.sh
```

### 2. hermes: command not found

PATH 尚未生效。新开终端，或 `source ~/.bashrc` / `source ~/.zshrc`。也可直接用全路径 `~/.local/bin/hermes` 启动。

### 3. Python 3.14 下载卡住

第 3 步需要下载独立 Python 解释器，默认走 ghfast 代理。个别网络下可能较慢，可中断后换镜像重试：

```bash
UV_PYTHON_INSTALL_MIRROR=其他可达地址 bash install.sh
```

### 4. sha256 校验失败

说明下载不完整或文件异常。脚本会直接终止且不覆盖旧安装。一般重试即可；反复失败请检查本机是否有劫持 HTTP 流量的代理 / 网关。

### 5. 磁盘空间不足

全套环境约占 1～2 GB。脚本使用临时目录下载，建议 `$HOME` 所在分区至少留 2 GB。

> **需要帮助**：若遇到本文未覆盖的问题，保留终端完整输出，反馈给镜像站管理员。
