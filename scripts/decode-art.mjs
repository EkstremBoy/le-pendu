import { existsSync, readFileSync, writeFileSync } from "node:fs";

const jpg = "public/art/hills.jpg";
const b64 = "public/art/hills.jpg.b64";
if (!existsSync(jpg) && existsSync(b64)) {
  writeFileSync(jpg, Buffer.from(readFileSync(b64, "utf8"), "base64"));
}