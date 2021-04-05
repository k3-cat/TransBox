import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import About from './About';
import Lollipop from './Lollipop';
import Memorial from './memorial/Index';
import Reminder from './reminder/Index';
import Unit from './unit/Index';

const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Unit'
    >
      <Drawer.Screen name='Unit' options={{ title: '单位换算' }} component={Unit} />
      <Drawer.Screen name='Reminder' options={{ title: '提醒' }} component={Reminder} />
      <Drawer.Screen name='Memorial' options={{ title: '纪念日' }} component={Memorial} />

      <Drawer.Screen name='About' options={{ title: '关于' }} component={About} />
      <Drawer.Screen name='Lollipop' options={{
        drawerLabel: () => null,
        title: '棒棒糖~'
      }} component={Lollipop} />
    </Drawer.Navigator>
  );
}
