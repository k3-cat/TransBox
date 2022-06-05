import { types } from 'mobx-state-tree';

import { convert } from './convertor';
import { QAStore, qaStore } from './qa';

export const HoUnitsStore = types
  .model({
    qa: QAStore,
    value: types.string,
    sUnit: types.string,
    tUnit: types.string,
    mol: types.string,
    unitDiag: types.enumeration(['s', 't', 'x'])
  })

  .views(self => ({
    get needMol() {
      return self.sUnit.includes('mol') || self.sUnit.includes('IU') || self.tUnit.includes('mol') || self.tUnit.includes('IU');
    },

    get result() {
      return convert(self.value, self.sUnit, self.tUnit, self.mol);
    }
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
      self.qa.add({
        s: self.sUnit,
        t: self.tUnit,
        m: !self.needMol || self.mol !== '0' ? self.mol : 'x'
      });
    }
  }));

export const hoUnitsStore = HoUnitsStore.create({
  qa: qaStore,
  value: '0',
  sUnit: 'μg/L',
  tUnit: 'pg/mL',
  mol: '0',
  unitDiag: 'x'
});
