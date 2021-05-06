import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { convert } from './convertor';

const Preset = types.model({
  s: types.string,
  t: types.string,
  m: types.maybeNull(types.string),
});

export const HoUnitStore = types
  .model('HoUnitStore', {
    // converter
    value: '0',
    sUnit: 'μg/L',
    tUnit: 'pg/mL',
    mol: '0',
    unitDiag: types.optional(types.enumeration(['s', 't', 'x']), 'x'),
    // preset
    presets: types.optional(types.array(Preset), []),
  })

  .views(self => ({
    get u() {
      return self.unitDiag === 's' ? self.sUnit.split('/') : self.tUnit.split('/');
    },

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

    setU(u: string) {
      if (self.unitDiag === 's') {
        self.sUnit = u;
      } else { // t | x
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
      self.presets.push(Preset.create({ s: self.sUnit, t: self.tUnit, m: self.needMol ? self.mol : null }));
    },

    loadPreset(i: number) {
      const p = self.presets[i];
      self.sUnit = p.s;
      self.tUnit = p.t;
      self.mol = p.m ?? '0';
    },

    sortPreset(from: number, to: number) {
      if (from === to) { return; }
      const tmp = self.presets.slice();
      tmp.splice(to, 0, ...tmp.splice(from, 1));
      self.presets.replace(tmp);
    },

    removePreset(i: number) {
      self.presets.splice(i, 1);
    },
  }))

  .extend(withStorage({ key: 'ho_unit', autoSave: false, mode: 'inclusive', names: ['presets'] }));
