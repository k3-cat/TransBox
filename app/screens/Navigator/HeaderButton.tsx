import React from 'react';

import { DrawerActions, useNavigation } from '@react-navigation/core';

import { IconButton } from '../../ui-lib';

function HeaderButton() {
  const navigation = useNavigation();
  return (
    <IconButton
      accessibilityLabel='菜单'
      icon='menu-outline'
      size={30}
      color='#ff8a65'
      hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ marginLeft: 15, marginTop: 7 }}
    />
  );
}

export default HeaderButton;
