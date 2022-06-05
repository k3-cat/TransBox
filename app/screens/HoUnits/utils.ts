export function clean(text: string) {
  const num = text.length ? parseFloat(text) : 0;

  if (isNaN(num)) { return text; }

  if (text.endsWith('.') || text.endsWith('0')) {
    return text;
  }
  return num === 0 ? '0' : num.toString();
}
