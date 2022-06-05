import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

const dateStr = new Map([
  ['zh-CN', 'MMMdo'],
  ['en-US', 'dd-MMM'],
]);

const timeStr = new Map([
  ['zh-CN', 'aaa h:mm'],
  ['en-US', 'h:mm aaa'],
]);

export const SettingStore = types
  .model({
    updateChannel: types.maybeNull(types.enumeration(['google', 'github'])),

    local: 'zh-CN',
    timeLocal: 'zh-CN',
    hour24: true,
  })

  .views((self) => ({
    github(url: string) {
      return 'https://github.com' + url;
    },

    dateStr() {
      return dateStr.get(self.timeLocal)!;
    },

    timeStr() {
      if (self.hour24) {
        return 'HH:mm';
      }
      return timeStr.get(self.timeLocal)!;
    },
  }))

  .actions((self) => ({
    toggleUpdateChannel(overide?: 'google' | 'github' | null) {
      self.updateChannel = overide !== undefined ? overide : (self.updateChannel?.endsWith('github') ? 'google' : 'github');
    },

    setLocal(local: string) {
      self.local = local;
    },

    toggleHour24() {
      self.hour24 = !self.hour24;
    },

    setTimeLocal(local: string) {
      self.timeLocal = local;
    },
  }))

  .extend(withStorage({ key: 'settings' }));
