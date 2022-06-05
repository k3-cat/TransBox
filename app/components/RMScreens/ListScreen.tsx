import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { useLocalStore } from '../../stores/utils/localStore';
import { FabGroup, Portal } from '../../ui-lib';

interface ListScreenProps {
  children: JSX.Element;
}

function ListScreen({ children }: ListScreenProps) {
  const store = useLocalStore();
  const navigation = useNavigation();

  return (
    <Portal.Host>
      {children}
      <FabGroup
        openIcon='checkmark'
        closeIcon='create'
        actions={[
          {
            icon: 'add-outline',
            label: '添加',
            onPress: () => { navigation.navigate('-Edit'); store.add(); },
          },
          {
            icon: 'build',
            label: '管理',
            onPress: () => navigation.navigate('-Manage'),
          },
        ]}
      />
    </Portal.Host>
  );
}

export default ListScreen;
