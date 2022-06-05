import React from 'react';
import { Text, View } from 'react-native-ui-lib/core';

import {
  DrawerContentComponentProps, DrawerContentScrollView, DrawerItem
} from '@react-navigation/drawer';

import { pages } from './pages';

function SideDrawer(props: DrawerContentComponentProps) {
  let offset = 0;

  return (
    <DrawerContentScrollView {...props}>
      <View paddingV-40 margin-10 br40 style={{ backgroundColor: '#fff3e0' }}>
        <Text center text70M style={{ color: '#ffb74d' }}>按照惯例这里要有图</Text>
      </View>
      {
        pages.map((p, i) => {
          if (p.name.startsWith('-')) { return; }
          if (p.name === '') { offset++; return <View key={i} marginV-20 marginH-20 height={1.2} bg-dark60 />; }
          return (
            <DrawerItem
              key={i}
              label={p.title}
              labelStyle={{ fontSize: 15 }}
              focused={props.state.index === i - offset}
              onPress={() => props.navigation.navigate(p.name)}
            />
          );
        })
      }
    </DrawerContentScrollView>
  );
}

export default SideDrawer;
