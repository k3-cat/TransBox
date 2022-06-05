import { Instance, types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { convert } from './convertor';
import { vUnitIndex, wUnitIndex } from './data';

const Preset = types.model({
  s: types.string,
  t: types.string,
  m: types.maybeNull(types.string),
});

export interface IPreset extends Instance<typeof Preset> { }

export const HoUnitsStore = types
  .model('HoUnitsStore', {
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

    loadPreset(p: IPreset) {
      self.sUnit = p.s;
      self.tUnit = p.t;
      self.mol = p.m ?? '0';
    },

    sortPreset(data: any) {
      self.presets = data;
    },

    removePreset(o: IPreset) {
      const i = self.presets.findIndex(p => p.s === o.s && p.t === o.t && p.m === o.m);
      self.presets.splice(i, 1);
    },
  }))

  .extend(withStorage({ key: 'ho_unit', autoSave: false, mode: 'inclusive', names: ['presets'] }));
