import { types } from 'mobx-state-tree';
import React, { useContext } from 'react';

import { HoUnitsStore, hoUnitsStore } from './ho_units';

const RootStore = types.model({
  ho_units: HoUnitsStore
});

export const rootStore = RootStore.create({
  ho_units: hoUnitsStore
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
