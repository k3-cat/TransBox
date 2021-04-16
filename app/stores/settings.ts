import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

export const SettingStore = types
  .model({
    updateChannel: types.maybeNull(types.enumeration(['google', 'github'])),

  })

  .actions((self) => ({
    toggleUpdateChannel(overide?: 'google' | 'github' | null) {
      self.updateChannel = overide !== undefined ? overide : (self.updateChannel?.endsWith('github') ? 'google' : 'github');
    },

  }))

  .extend(withStorage({ key: 'settings' }));
