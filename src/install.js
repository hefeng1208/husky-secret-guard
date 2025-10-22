import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export function installHuskyHook() {
  const huskyDir = path.resolve(".husky");
  if (!fs.existsSync(huskyDir)) {
    console.log("📦 Husky not initialized. Running `npx husky install`...");
    execSync("npx husky install", { stdio: "inherit" });
  }

  const hookPath = path.join(huskyDir, "pre-commit");
  const content = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx husky-secret-guard encrypt
`;

  fs.writeFileSync(hookPath, content);
  fs.chmodSync(hookPath, "755");
  console.log("✅ Husky pre-commit hook installed successfully.");
}
