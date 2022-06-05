import { types } from 'mobx-state-tree';

export const UpdaterStore = types
  .model({
    diag: types.optional(types.enumeration(['ota', 'apk', '']), ''),
    info: '',
    url: '',
    count: NaN,
  })

  .actions((self) => ({
    setDiag(diag: 'ota' | 'apk' | '') {
      self.diag = diag;
    },

    setInfo(info: string) {
      self.info = info;
    },

    setUrlandCount(url: string, count: number) {
      self.url = url;
      self.count = count;
    },
  }));
