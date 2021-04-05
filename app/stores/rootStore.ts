import { types } from 'mobx-state-tree';
import React, { useContext } from 'react';

import { UnitStore, unitStore } from './unit/unit';

const RootStore = types.model({
  unit: UnitStore
});

export const rootStore = RootStore.create({
  unit: unitStore
});


const RootStoreContext = React.createContext<typeof rootStore>(rootStore);

export const StoreProvider = RootStoreContext.Provider;

export const useStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error('Use StoreProvider!');
  }
  return store;
};
