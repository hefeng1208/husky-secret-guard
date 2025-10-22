import crypto from "crypto";
import fs from "fs";

const ALGORITHM = "aes-256-cbc";
const IV = Buffer.alloc(16, 0);

function getKey() {
  const key = process.env.HUSKY_SECRET_GUARD_KEY || "HUSKY_SECRET_5B799AB458756FEB3916063F236";
  return crypto.createHash("sha256").update(key).digest();
}

export function encryptFile(inputPath, outputPath) {
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), IV);
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);
  input.pipe(cipher).pipe(output);
}

export function decryptFile(inputPath, outputPath) {
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), IV);
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);
  input.pipe(decipher).pipe(output);
}
