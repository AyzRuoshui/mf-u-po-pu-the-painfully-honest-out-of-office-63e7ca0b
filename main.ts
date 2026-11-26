// The Painfully Honest Out-of-Office — one deterministic entry line.
// Runs directly under Node 22 with TypeScript type stripping enabled.
import * as fs from "node:fs";

const ENTRY =
  "I am out until Monday, and I will not be reading email. Replies will wait until next week. For help now, please contact Mina at mina@example.com; she can actually help. Thank you for your patience.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

/** 按 Unicode 码点计数，而不是按 UTF-16 单元或字节计数。 */
function countCodePoints(text: string): number {
  return [...text].length;
}

/** 拒绝空串、非字符串、越界、换行、控制字符和 BOM，并校验严格 UTF-8 往返。 */
function validateEntry(text: unknown): string {
  if (typeof text !== "string") {
    throw new TypeError("Entry must be a string");
  }
  const codePoints = countCodePoints(text);
  if (codePoints < MIN_CHARS || codePoints > MAX_CHARS) {
    throw new RangeError(`Entry must be 1-${MAX_CHARS} characters, got ${codePoints}`);
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
  if (/[\r\n\u0000-\u001F\u007F]/.test(text)) {
    throw new Error("Entry must be a single clean line");
  }
  const buffer = Buffer.from(text, "utf8");
  if (
    buffer.toString("utf8") !== text ||
    (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf)
  ) {
    throw new Error("Entry must be strict UTF-8 without a BOM");
  }
  return text;
}

/** 优先采用 MAKEFUN_OUTPUT_DIR；空白值回退到 /output。 */
function resolveOutputDir(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR;
  return configured && configured.trim().length > 0 ? configured : "/output";
}

const entry = validateEntry(ENTRY);
const outputDir = resolveOutputDir();
const outputPath = `${outputDir.replace(/[\\/]+$/, "")}/entry.txt`;
const body = Buffer.from(`${entry}\n`, "utf8");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, body, { encoding: "utf8", flag: "w" });
process.stdout.write(`Wrote ${outputPath} (${countCodePoints(entry)} chars, ${Buffer.byteLength(entry, "utf8")} bytes)\n`);
