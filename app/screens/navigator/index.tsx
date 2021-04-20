import * as Analytics from 'expo-firebase-analytics';
import React, { useRef } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';

import Header from './Header';
import { screens } from './screens';
import SideDrawer from './SideDrawer';

const Drawer = createDrawerNavigator();

function Navigator() {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef('not-init');

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current!.getCurrentRoute()!.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current!.getCurrentRoute()!.name;

        if (previousRouteName !== currentRouteName && !currentRouteName.startsWith('-')) {
          routeNameRef.current = currentRouteName;
          await Analytics.setCurrentScreen(currentRouteName);
        }
      }}
    >
      <Drawer.Navigator
        edgeWidth={70}
        minSwipeDistance={40}
        drawerType='slide'
        initialRouteName='HoUnits'
        screenOptions={{
          headerShown: true,
          header: ({ scene }) => {
            return (<Header title={scene.descriptor.options.title!} />);
          },
        }}
        drawerContent={SideDrawer}
      >
        {
          screens.map((p) =>
            p.name === '' ?
              null
              :
              <Drawer.Screen key={p.name} name={p.name} options={{ title: p.title }} component={p.comp} />
          )
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
