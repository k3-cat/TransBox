import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

export const SettingStore = types
  .model({
    connectionGood: false,

    updateChannel: types.maybeNull(types.enumeration(['google', 'github'])),

  })

  .views((self) => ({
    github(url: string) {
      if (self.connectionGood) {
        return 'https://github.com' + url;
      }
      return 'http://140.82.114.3' + url;
    },
  }))

  .actions((self) => ({
    setConnectionState(s: boolean) {
      self.connectionGood = s;
    },

    toggleUpdateChannel(overide?: 'google' | 'github' | null) {
      self.updateChannel = overide !== undefined ? overide : (self.updateChannel?.endsWith('github') ? 'google' : 'github');
    },

  }))

  .extend(withStorage({ key: 'settings' }));
