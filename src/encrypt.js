import fs from "fs";
import { encryptFile } from "./crypto.js";
import { getTargets } from "./config.js";

export async function encryptAll() {
  const targets = getTargets();
  for (const file of targets) {
    if (fs.existsSync(file)) {
      encryptFile(file, `${file}.enc`);
      fs.unlinkSync(file);
      console.log(`🔒 Encrypted: ${file}`);
    }
  }
}
