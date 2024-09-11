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
            title: 'QueryBot',
          }}
        />
        <Drawer.Screen
          name="History/index" // This is the name of the page and must match the URL from root
          options={{
            drawerLabel: '09-08-2024',
            title: '09-08-2024',
            drawerStyle: {},
          }}
        />
        <Drawer.Screen
          name="Database/index" // This is the name of the page and must match the URL from root
          options={{
            drawerLabel: 'Database',
            title: 'Database',
            drawerItemStyle: {
              display: mode === 'admin' ? undefined : 'none', // 'undefined' allows default display
            },
            drawerStyle: {},
          }}
        />
        <Drawer.Screen
          name="Logout/index" // This is the name of the page and must match the URL from root
          options={{
            drawerLabel: 'Logout',
            title: 'Logout',
            drawerStyle: {},
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
