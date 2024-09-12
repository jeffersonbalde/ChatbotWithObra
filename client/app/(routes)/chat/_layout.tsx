import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

const mode: 'admin' | 'user' = 'admin'; // Defining the mode type explicitly

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the URL from root
          options={{
            drawerLabel: 'Home',
            title: '',
          }}
        />
        <Drawer.Screen
          name="database/index" // This is the name of the page and must match the URL from root
          options={{
            drawerLabel: 'Database',
            title: 'Database',
            drawerItemStyle: {
              display: mode === 'admin' ? undefined : 'none', // 'undefined' allows default display
            },
            drawerStyle: {},
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
