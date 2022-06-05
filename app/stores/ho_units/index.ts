import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { convert } from './convertor';

const Preset = types.model({
  s: types.string,
  t: types.string,
  m: types.maybeNull(types.string),
});

export const HoUnitsStore = types
  .model({
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
      self.presets.push(Preset.create({ s: self.sUnit, t: self.tUnit, m: self.needMol ? self.mol : null }));
    },

    removePreset(i: number) {
      self.presets.splice(i, 1);
    },
  }))

  .extend(withStorage({ key: 'ho_unit', mode: 'inclusive', names: ['presets'] }));

export function loadHoUnitsStore() {
  const store = HoUnitsStore.create();
  store.load();
  return store;
}
