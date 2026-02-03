export function formatDate(date?: string): string | undefined {
  if (!date) {
    return undefined;
  }
  const newValue = date.slice(0, 10).split("-");
  return `${newValue[2]}/${newValue[1]}/${newValue[0]}`;
}
