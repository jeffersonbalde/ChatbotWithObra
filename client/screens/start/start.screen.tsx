import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { Syne_700Bold } from "@expo-google-fonts/syne";
import { Inter_500Medium } from "@expo-google-fonts/inter";
import { LinearGradient } from "expo-linear-gradient";
import SafeViewAndroid from "@/components/SafeViewAndroid";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function StartScreen() {
  let [fontsLoaded, fontsError] = useFonts({
    Syne_700Bold,
    Inter_500Medium,
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  const askQuestiononButtonPress = () => {
    router.push("/(routes)/chat")
  }

  const loginButtonPress = () => {
    router.push("/(routes)/login")
  }

  const manageUserScreen = () => {
    router.push("/(routes)/manage_users")
  }

  return (
    <SafeAreaView
      style={SafeViewAndroid.AndroidSafeArea}
      className="flex flex-col items-center justify-center h-screen"
    >
      <View className="gap-32">

        {/* logo container */}
        <View className="flex flex-row items-center justify-center">
          <Image
            source={require("@/assets/images/obra_logo.png")}
            className="scale-100"
          />
          <Text className="text-4xl ml-2 text-[#13AD87] font-bold">Chat With Obra</Text>
        </View>
    
        {/* button container */}
        <View className="items-center">
          <Button label="Ask Question" onPress={askQuestiononButtonPress}/>
          <Button label="Login" onPress={loginButtonPress}/>
          <Button label="Manage Users" onPress={manageUserScreen}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
