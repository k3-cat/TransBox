import * as Analytics from 'expo-firebase-analytics';
import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';

import { useStore } from '../../stores';
import Updater from '../Updater';
import Header from './Header';
import { screens } from './screens';
import SideDrawer from './SideDrawer';

const Drawer = createDrawerNavigator();

function Navigator() {
  const R = useStore();
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
        drawerContent={SideDrawer}
        initialRouteName='HoUnits'
        backBehavior='none'
        screenOptions={{
          headerShown: true,
          header: ({ scene }) => {
            return (<Header title={scene.descriptor.options.title!} />);
          },
        }}
      >
        {
          R.updater.diag !== 'x' ?
            <Drawer.Screen name='-Updater' component={Updater}
              options={{
                header: () => null,
                gestureEnabled: false,
              }}
            />
            :
            screens.map(p =>
              p.name !== '' &&
              <Drawer.Screen key={p.name} name={p.name} options={{ title: p.title }} component={p.comp} />
            )
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default observer(Navigator);
