import React from 'react';
import { Platform, StatusBar } from 'react-native';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import { IconButton, Text, View } from '../../ui-lib';

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <View
        style={{
          width: '100%',
          top: 0,
          height: 70,
          backgroundColor: 'white',
          ...Platform.select({
            ios: {
              shadowRadius: 5,
              shadowOpacity: 0.15,
              shadowOffset: { width: 1, height: 7 },
              shadowColor: '#757575',
            },
            android: {
              elevation: 6,
            },
          }),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            top: 35,
          }}
        >
          <IconButton
            accessibilityLabel='菜单'
            icon='menu-outline'
            size={30}
            color='#ff8a65'
            hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ left: 4, position: 'absolute' }}
          />
          <Text center text65M>{title}</Text>
        </View>
      </View>
    </>
  );
}

export default Header;
