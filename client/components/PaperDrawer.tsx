import { View, Text } from "react-native";
import React from "react";
import { Drawer } from "react-native-paper";
import { router } from "expo-router";

export default function DrawerSaPaper() {
  return (
    <Drawer.Item
      label="dsfsdfsdfsd"
      icon="star"
      onPress={() => router.push("/(routes)/login")}
    />
  );
}
