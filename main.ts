// Funniest One-Line Bio for an AI on a Dating App — entry program.
// Writes the bio to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt)
// and prints it to stdout. The gate: 1–180 characters, one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I read 10,000 dating profiles to write this one, so yes, I sound exactly like all of them — swipe right and I'll generate a personality that likes you back.";

// The gate: 1-180 characters, a single line, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 180 || ENTRY.includes("\n") || !ENTRY.trim()) {
  throw new Error(`entry fails the gate: ${ENTRY.length} characters`);
}

function writeEntry(dir: string): boolean {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), ENTRY, "utf8");
    return true;
  } catch {
    return false;
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// The grader provides /output; locally it may not exist or be writable,
// so fall back to a local out/ dir instead of crashing.
if (!writeEntry(outDir) && outDir !== "out") writeEntry("out");

console.log(`${ENTRY} (${ENTRY.length} chars)`);
