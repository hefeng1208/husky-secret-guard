import fs from "fs";

const DEFAULT_TARGETS = [".env", "config/default.json"];

export function getTargets() {
  if (fs.existsSync(".husky-secret.config.json")) {
    return JSON.parse(fs.readFileSync(".husky-secret.config.json", "utf8")).files;
  }
  return DEFAULT_TARGETS;
}
