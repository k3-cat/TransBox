import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

export const SettingStore = types
  .model({
    updatingSource: types.maybeNull(types.enumeration(['google', 'github'])),

    localCode: 'zh-CN',
    timeLocalCode: 'zh-CN',
    hour24: true,
  })

  .actions((self) => ({
    setUpdatingSource(source: 'google' | 'github') {
      self.updatingSource = source;
    },

    setLocal(local: string) {
      self.localCode = local;
    },

    toggleHour24() {
      self.hour24 = !self.hour24;
    },

    setTimeLocal(local: string) {
      self.timeLocalCode = local;
    },
  }))

  .extend(withStorage({ key: 'settings' }));
