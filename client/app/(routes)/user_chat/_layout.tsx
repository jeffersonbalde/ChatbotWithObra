import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from "expo-router/drawer";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

// const mode: "admin" | "user" = "admin";

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Logout"
          onPress={() => router.push("/login")}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "",
          }}
        />
        <Drawer.Screen
          name="history/index"
          options={{
            drawerLabel: "09-02-2024",
            title: "",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    marginTop: 620,
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
    // paddingTop: 10,
    backgroundColor: "#EAEAEA"
  },
});
