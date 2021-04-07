import { types } from 'mobx-state-tree';
import React, { useContext } from 'react';

import { UnitStore, unitStore } from './unit/unit';
import { UpdaterStore, updaterStore } from './updater/store';
import { triggerUpdateAction } from './updater/trigger';

const RootStore = types.model({
  unit: UnitStore,
  updater: UpdaterStore
});

export const rootStore = RootStore.create({
  unit: unitStore,
  updater: updaterStore
});

triggerUpdateAction(rootStore);


const RootStoreContext = React.createContext<typeof rootStore>(rootStore);

export const StoreProvider = RootStoreContext.Provider;

export const useStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error('Use StoreProvider!');
  }
  return store;
};
