import { types } from 'mobx-state-tree';

export const UpdaterStore = types
  .model({
    diag: types.optional(types.enumeration(['ota', 'apk', 'x']), 'x'),
    name: '',
    info: '',
    url: '',
    count: NaN,
  })

  .actions((self) => ({
    setDiag(diag: 'ota' | 'apk' | 'x') {
      self.diag = diag;
    },

    setInfo(info: string) {
      self.info = info;
    },

    setMetaInfo(name: string, url: string, count: number) {
      self.name = name;
      self.url = url;
      self.count = count;
    },
  }));
