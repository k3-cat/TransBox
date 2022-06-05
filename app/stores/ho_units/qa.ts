import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { comMolIndex } from '../../screens/ho_units/utils';

const Preset = types.model({
  s: types.string,
  t: types.string,
  m: types.string
});

export const QAStore = types
  .model({
    warning: 'x',
    presets: types.array(Preset)
  })

  .actions(self => ({
    add(o: { s: string, t: string, m: string; }) {
      if (o.m === 'x' || !comMolIndex.has(o.m) && (isNaN(parseFloat(o.m)) || parseFloat(o.m) <= 100)) {
        self.warning = '请先提供有效的分子量！';
        return;
      }
      if (self.presets.some((i) => i.s === o.s && i.t === o.t && i.m === o.m)) {
        self.warning = '已经保存过这个组合啦！';
        return;
      }

      self.presets.push(
        Preset.create({ s: o.s, t: o.t, m: o.m })
      );
    },

    remove(i: number) {
      self.presets.splice(i, 1);
    },

    setWarning() {
      self.warning = 'x';
    }
  }))

  .extend(
    withStorage({ key: 'unit.qa', mode: 'inclusive', names: ['presets'] })
  );

export const qaStore = QAStore.create();
qaStore.load();
