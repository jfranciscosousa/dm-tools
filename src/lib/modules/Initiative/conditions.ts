import type { Condition } from "$lib/types";

/**
 * Parses a free-text condition string into a Condition object.
 *
 * Rules:
 * - Trim whitespace from the whole input.
 * - Split on whitespace. If the last token is a positive integer (/^\d+$/)
 *   AND there are preceding tokens, it becomes the duration and the rest is the label.
 * - Otherwise the whole trimmed string is the label with null duration.
 * - Returns null if the resulting label is empty.
 * - Written number words ("five") are not parsed — digits only.
 *
 * Examples:
 *   "Exhaustion 5"          → { label: "Exhaustion", duration: 5 }
 *   "Poisoned"              → { label: "Poisoned", duration: null }
 *   "  Burning hands 3  "   → { label: "Burning hands", duration: 3 }
 *   "Exhaustion five"       → { label: "Exhaustion five", duration: null }
 *   "Level 2 Exhaustion"    → { label: "Level 2 Exhaustion", duration: null }
 *   "Level 2 Exhaustion 4"  → { label: "Level 2 Exhaustion", duration: 4 }
 */
export function parseConditionInput(raw: string): Condition | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const tokens = trimmed.split(/\s+/);
  const last = tokens[tokens.length - 1];

  if (/^\d+$/.test(last) && tokens.length > 1) {
    const duration = parseInt(last, 10);
    const label = tokens.slice(0, -1).join(" ");
    return label ? { label, duration } : null;
  }

  return { label: trimmed, duration: null };
}
