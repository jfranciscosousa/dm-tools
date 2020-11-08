export default function stringifyCssVariables(
  object: Record<string, unknown>
): { style: string } {
  const entries = Object.entries(object);

  return {
    style: entries.map(([key, value]) => `--${key}: ${value};`).join(""),
  };
}
