/**
 * Lets `node --test` import the game's extensionless TypeScript modules.
 * Type stripping is Node's; this only appends `.ts` when the file exists.
 */
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    const parent = context.parentURL ? fileURLToPath(context.parentURL) : "";
    if (parent.includes("/src/") && !specifier.endsWith(".ts") && !specifier.endsWith(".js")) {
      const candidate = new URL(specifier + ".ts", context.parentURL);
      if (existsSync(fileURLToPath(candidate))) {
        return nextResolve(pathToFileURL(fileURLToPath(candidate)).href, context);
      }
    }
  }
  return nextResolve(specifier, context);
}
