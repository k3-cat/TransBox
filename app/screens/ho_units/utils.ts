export const wUnitIndex = new Map([
  ['μg', 0.000001],
  ['ng', 0.000000001],
  ['pg', 0.000000000001],
  ['IU', 1.0],
  ['mIU', 0.001],
  ['μIU', 0.000001],
  ['nmol', 0.000000001],
  ['pmol', 0.000000000001]
]);

export const wUnits = [...wUnitIndex.keys()];

export const vUnitIndex = new Map([
  ['L', 1.0],
  ['dL', 0.1],
  ['mL', 0.001]
]);

export const vUnits = [...vUnitIndex.keys()];

export const comMolIndex = new Map([
  ['雌二醇 (E2)', 272.38],
  ['孕酮 (P)', 314.46],
  ['泌乳素 (PRL)', 21276.6],
  ['睾酮 (T)', 288.42]
]);

export const comMols = [...comMolIndex.keys()];

export function clean(text: string) {
  var num = text.length ? parseFloat(text) : 0;

  if (isNaN(num)) { return text; }

  if (text.endsWith('.') || text.endsWith('0')) {
    return text;
  }
  return num === 0 ? '0' : num.toString();
}
