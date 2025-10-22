#!/usr/bin/env node
import { encryptAll } from "../src/encrypt.js";
import { decryptAll } from "../src/decrypt.js";
import { installHuskyHook } from "../src/install.js";

const cmd = process.argv[2];

switch (cmd) {
  case "encrypt":
    await encryptAll();
    break;
  case "decrypt":
    await decryptAll();
    break;
  case "install":
    installHuskyHook();
    break;
  default:
    console.log(`
🛡️  husky-secret-guard

Usage:
  npx husky-secret-guard install   # 安装 Husky pre-commit 钩子
  npx husky-secret-guard encrypt   # 手动加密文件
  npx husky-secret-guard decrypt   # 手动解密文件
`);
}
