import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { comMolIndex } from '../../screens/HoUnits/utils';
import { convert } from './convertor';

const Preset = types.model({
  s: types.string,
  t: types.string,
  m: types.maybeNull(types.string),
});

export const HoUnitStore = types
  .model({
    // converter
    value: '0',
    sUnit: 'μg/L',
    tUnit: 'pg/mL',
    mol: '0',
    unitDiag: types.optional(types.enumeration(['s', 't', 'x']), 'x'),
    // preset
    warning: 'x',
    presets: types.optional(types.array(Preset), []),
  })

  .views(self => ({
    get needMol() {
      return self.sUnit.includes('mol') || self.sUnit.includes('IU') || self.tUnit.includes('mol') || self.tUnit.includes('IU');
    },

    get result() {
      return convert(self.value, self.sUnit, self.tUnit, self.mol);
    },
  }))

  .actions(self => ({
    setValue(v: string) {
      self.value = v;
    },

    setS(u: string) {
      self.sUnit = u;
    },

    setT(u: string) {
      self.tUnit = u;
    },

    setUnit(u: string) {
      if (self.unitDiag === 's') {
        self.sUnit = u;
      }
      else if (self.unitDiag === 't') {
        self.tUnit = u;
      }
      self.unitDiag = 'x';
    },

    setMol(m: string) {
      self.mol = m;
    },

    setDiag(s: 's' | 't' | 'x') {
      self.unitDiag = s;
    },

    savePreset() {
      if (self.needMol && !comMolIndex.has(self.mol) && (isNaN(parseFloat(self.mol)) || parseFloat(self.mol) <= 100)) {
        self.warning = '请先提供有效的分子量！';
        return;
      }
      if (self.presets.some((i) => i.s === self.sUnit && i.t === self.tUnit && i.m === self.mol)) {
        self.warning = '已经保存过这个组合啦！';
        return;
      }

      self.presets.push(Preset.create({ s: self.sUnit, t: self.tUnit, m: self.mol }));
    },

    removePreset(i: number) {
      self.presets.splice(i, 1);
    },

    clearWarning() {
      self.warning = 'x';
    },
  }))

  .extend(withStorage({ key: 'ho_unit', mode: 'inclusive', names: ['presets'] }));
