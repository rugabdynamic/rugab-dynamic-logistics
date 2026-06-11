import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(scriptDir, "..");
const sourcePath = join(rootDir, "prisma", "schema.prisma");
const outputPath = join(rootDir, "prisma", "schema.generated.prisma");

function readDotEnv() {
  try {
    const envPath = join(rootDir, ".env");
    const entries = {};
    const content = readFileSync(envPath, "utf8");

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separator = trimmed.indexOf("=");
      if (separator === -1) continue;

      const key = trimmed.slice(0, separator).trim();
      let value = trimmed.slice(separator + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      entries[key] = value;
    }

    return entries;
  } catch {
    return {};
  }
}

function providerFor(databaseUrl) {
  if (/^file:/i.test(databaseUrl)) return "sqlite";
  if (/^postgres(?:ql)?:\/\//i.test(databaseUrl)) return "postgresql";

  const protocol = databaseUrl.includes(":")
    ? databaseUrl.slice(0, databaseUrl.indexOf(":") + 1)
    : "missing";

  throw new Error(
    `Unsupported DATABASE_URL protocol "${protocol}". Expected file: or postgresql://.`
  );
}

const dotEnv = readDotEnv();
const databaseUrl = process.env.DATABASE_URL || dotEnv.DATABASE_URL || "file:./dev.db";
const provider = providerFor(databaseUrl);

const schema = readFileSync(sourcePath, "utf8").replace(
  /provider\s*=\s*"(sqlite|postgresql)"/,
  `provider = "${provider}"`
);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, schema);

console.log(`Generated Prisma schema for ${provider}: ${relative(rootDir, outputPath)}`);
