import { types } from 'mobx-state-tree';
import { withStorage } from 'mst-easy-storage';

export const UpdaterStore = types
  .model({
    lastVersion: '',
    unit_qa_cleaned: false, //v1.0.1
  })

  .actions(self => ({
    setVersion(ver: string) {
      self.lastVersion = ver;
    },

    // v1.0.1
    clean_unit_qa() {
      self.unit_qa_cleaned = true;
    }
  }))

  .extend(
    withStorage({ key: 'updater' })
  );

export const updaterStore = UpdaterStore.create();
updaterStore.load();
