export default function stringifyCssVariables(object: object) {
  const entries = Object.entries(object);

  return {
    style: entries.map(([key, value]) => `--${key}: ${value};`).join(""),
  };
}
