// The Painfully Honest Out-of-Office — make.fun bounty entry.
// Writes the entry sentence to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I am out of the office recharging the enthusiasm I spent answering emails like this one, and will reply when I have some to spare.";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function checkEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS} to ${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const terminators = (text.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !/[.!?]$/.test(text)) {
    throw new Error("entry must be exactly one sentence");
  }
}

function main(): void {
  checkEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
