import React from 'react';
import { Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib/core';

import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

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
          <TouchableOpacity
            hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}
            accessibilityLabel='菜单'
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ left: 16, position: 'absolute' }}
          >
            <Ionicons size={30} name='menu-outline' color='#ff8a65' />
          </TouchableOpacity>
          <Text center text65M>{title}</Text>
        </View>
      </View>
    </>
  );
}

export default Header;
