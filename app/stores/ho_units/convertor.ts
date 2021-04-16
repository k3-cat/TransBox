import { comMolIndex, vUnitIndex, wUnitIndex } from '../../screens/HoUnits/utils';

function getMol(mol?: string) {
  if (!mol) { return NaN; }
  if (comMolIndex.has(mol)) {
    return comMolIndex.get(mol)!;
  }
  const n = parseFloat(mol);
  return n > 100 ? n : NaN;
}

export function convert(source: string, sUnit: string, tUnit: string, mol?: string) {
  const s = sUnit.split('/');
  const t = tUnit.split('/');

  let result = parseFloat(source) * wUnitIndex.get(s[0])! / wUnitIndex.get(t[0])! / vUnitIndex.get(s[1])! * vUnitIndex.get(t[1])!;

  if (s[0].endsWith('mol')) { result *= getMol(mol); }
  else if (s[0].endsWith('IU')) { result /= getMol(mol); }

  if (t[0].endsWith('mol')) { result /= getMol(mol); }
  else if (t[0].endsWith('IU')) { result *= getMol(mol); }

  if (isNaN(result)) {
    return -1;
  }
  return result;
}
