
# 🛡️ Husky Secret Guard

[![NPM Version](https://img.shields.io/npm/v/husky-secret-guard.svg)](https://www.npmjs.com/package/husky-secret-guard)
[![License](https://img.shields.io/npm/l/husky-secret-guard.svg)](LICENSE)
[![Node Version](https://img.shields.io/node/v/husky-secret-guard.svg)](https://nodejs.org/)

**Husky Secret Guard** 是一个用于加密和解密敏感文件的工具，专为配合 **Husky pre-commit 钩子** 设计。  
它可以在提交代码时自动加密敏感文件（如 `.env`、配置文件），在本地开发或部署时自动解密，确保敏感信息不泄露到 Git 仓库中。

---

## 📦 功能

- 自动加密指定敏感文件
- 自动解密文件用于开发或部署
- 与 Husky 钩子无缝集成，提交时自动加密
- 支持自定义配置文件和多文件管理
- 使用 AES-256-CBC 对称加密，安全可靠
- CLI 简单易用

---

## 🔧 安装

```bash
npm install husky-secret-guard --save-dev
```

## ⚙️ 配置 Husky
1.	安装 Husky：
```bash
npx husky install
```
2.	在 package.json 添加：
```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```
3. 安装 Husky pre-commit 钩子：
```bash
npx husky-secret-guard install # 这会在 .husky/pre-commit 中自动添加加密脚本。
```

## 🛠️ 使用方法

1️⃣ 手动加密
```bash
npx husky-secret-guard encrypt
```
2️⃣ 手动解密
```bash
npx husky-secret-guard decrypt
```
3️⃣ 开发时自动解密
在 `package.json` 中添加：
```bash
{
  "scripts": {
    "predev": "npx husky-secret-guard decrypt",  # 启动开发环境前会自动解密文件
    "dev": "npm run xxx"
  }
}
```
## 📝 文件配置
在项目根目录下创建 `.husky-secret-guard.json` 文件，用于配置加密文件和密钥。
```bash
{
  "files": [".env", "config/secret.json"],  # 需要加密的文件列表
}
```
## 🔐 密钥管理
```bash
export HUSKY_SECRET_GUARD_KEY="my-strong-secret"
```
## 📂 Git 忽略配置
```bash
.env
config/default.json
```
* 将加密后的文件 .env.enc 可以提交到仓库。

## 🚀 工作流程
| 阶段 | 操作                                      | 工具动作                   | 结果       |
| -- | --------------------------------------- | ---------------------- | -------- |
| 开发 | `npm run dev`                           | 解密 `.env.enc → .env`   | 还原本地环境   |
| 提交 | `git commit`                            | 自动加密 `.env → .env.enc` | 仓库中仅保留密文 |

## 📚 示例项目
```bash
npm run dev       # 自动解密
git add .
git commit -m "feat: secure update"  # 自动加密
git push          # 仓库只保留密文
```

### 安全密钥生成
**！！！使用以下命令生成强随机密钥，记得将密钥妥善保管，或者使用环境变量。**
```bash
# 复制以下命令到终端运行：
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
