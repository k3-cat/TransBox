import Analytics from 'expo-firebase-analytics';
import React, { useRef } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';

import About from './About';
import Memorial from './memorial/Index';
import Reminder from './reminder/Index';
import HoUnits from './ho_units/Index';

const Drawer = createDrawerNavigator();

export default function Navigator() {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef('not-init');

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        routeNameRef.current = navigationRef.current!.getCurrentRoute()!.name
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current!.getCurrentRoute()!.name;

        if (previousRouteName !== currentRouteName) {
          routeNameRef.current = currentRouteName;
          await Analytics.setCurrentScreen(currentRouteName);
        }
      }}
    >
      <Drawer.Navigator initialRouteName='HoUnits'>
        <Drawer.Screen name='HoUnits' options={{ title: '单位换算' }} component={HoUnits} />
        <Drawer.Screen name='Reminder' options={{ title: '提醒' }} component={Reminder} />
        <Drawer.Screen name='Memorial' options={{ title: '纪念日' }} component={Memorial} />

        <Drawer.Screen name='About' options={{ title: '关于' }} component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
