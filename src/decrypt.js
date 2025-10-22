import fs from "fs";
import { decryptFile } from "./crypto.js";
import { getTargets } from "./config.js";

export async function decryptAll() {
  const targets = getTargets();
  for (const file of targets) {
    const encFile = `${file}.enc`;
    if (fs.existsSync(encFile)) {
      decryptFile(encFile, file);
      console.log(`🔓 Decrypted: ${file}`);
    }
  }
}
