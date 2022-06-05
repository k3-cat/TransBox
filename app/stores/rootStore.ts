import { types } from 'mobx-state-tree';
import React, { useContext } from 'react';

import { HoUnitsStore, hoUnitsStore } from './ho_units';
import { UpdaterStore, updaterStore } from './updater';
import { triggerUpdateAction } from './updater/trigger';

const RootStore = types.model({
  ho_units: HoUnitsStore,
  updater: UpdaterStore
});

export const rootStore = RootStore.create({
  ho_units: hoUnitsStore,
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
