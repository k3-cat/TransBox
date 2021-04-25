import format from 'date-fns/format';
import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

import { dateF, fulldateF, hour12TimeF, hour24TimeF, timeLocal } from '../i18n/datetime';

export const SettingStore = types
  .model({
    updateChannel: types.maybeNull(types.enumeration(['google', 'github'])),

    localCode: 'zh-CN',
    timeLocalCode: 'zh-CN',
    hour24: true,
  })

  .views((self) => ({
    github(url: string) {
      return 'https://github.com' + url;
    },

    get timeLocal() { return timeLocal.get(self.timeLocalCode)!; },
    format(type: 'y' | 'd' | 'w' | 't') {
      if (type === 'y') {
        return fulldateF.get(self.timeLocalCode)!;
      }
      if (type === 'd') {
        return dateF.get(self.timeLocalCode)!;
      }
      if (type === 'w') {
        return (d: Date) => format(d, 'EEE', { locale: this.timeLocal });
      }
      if (type === 't') {
        return self.hour24 ? hour24TimeF : hour12TimeF.get(self.timeLocalCode)!;
      }
      return (d: Date) => format(d, 'P p');
    },
  }))

  .actions((self) => ({
    toggleUpdateChannel(overide?: 'google' | 'github' | null) {
      self.updateChannel = overide !== undefined ? overide : (self.updateChannel?.endsWith('github') ? 'google' : 'github');
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
