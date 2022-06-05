import { comMolIndex, vUnitIndex, wUnitIndex } from '../../screens/ho_units/utils';

export function convert(value: string, sUnit: string, tUnit: string, mol: string = '') {
  var s = sUnit.split('/');
  var t = tUnit.split('/');

  var result = parseFloat(value) * wUnitIndex.get(s[0])! / wUnitIndex.get(t[0])! / vUnitIndex.get(s[1])! * vUnitIndex.get(t[1])!;

  var molN = (comMolIndex.has(mol) ? comMolIndex.get(mol)! : parseFloat(mol));

  if (s[0].endsWith('mol')) { result *= molN; }
  else if (s[0].endsWith('IU')) { result /= molN; }

  if (t[0].endsWith('mol')) { result /= molN; }
  else if (t[0].endsWith('IU')) { result *= molN; }

  if (result > 10000 || (result != 0 && result < 0.001) || isNaN(result)) {
    return -1;
  }
  return result;
}
