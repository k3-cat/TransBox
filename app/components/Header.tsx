import React, { Fragment } from 'react';
import { Platform, StatusBar, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib/core';

import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const hitSlop = {
  top: 30,
  left: 30,
  right: 30,
  bottom: 30,
};

function Header() {
  const navigation = useNavigation();

  return (
    <Fragment>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <View
        style={{
          width: "100%",
          top: 0,
          height: 60,
          backgroundColor: "white",
          ...Platform.select({
            ios: {
              shadowRadius: 5,
              shadowOpacity: 0.15,
              shadowOffset: { width: 1, height: 7 },
              shadowColor: "#757575",
            },
            android: {
              elevation: 6,
            },
          }),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            top: 30
          }}
        >
          <TouchableOpacity
            hitSlop={hitSlop}
            accessibilityLabel='菜单'
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ left: 16, position: 'absolute' }}
          >
            <Ionicons
              size={30}
              name="menu-outline"
              color="rgba(110, 157, 251, 1.0)"
            />
          </TouchableOpacity>
          <Text center style={{ fontSize: 17 }}>TransBox</Text>
        </View>
      </View >
    </Fragment >
  );
}

export default Header;
