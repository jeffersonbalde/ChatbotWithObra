import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { Syne_700Bold } from "@expo-google-fonts/syne";
import { Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import SafeViewAndroid from "@/components/SafeViewAndroid";
import { Fontisto, SimpleLineIcons } from "@expo/vector-icons";
import Button from "@/components/Button";
import RoundedButton from "@/components/RoundedButton";
import { router } from "expo-router";

export default function LoginScreen() {
  let [fontsLoaded, fontsError] = useFonts({
    Syne_700Bold,
    Inter_500Medium,
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  }
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="">
      {/* logo container */}
      <View className="flex flex-row items-center">
        <Image
          source={require("@/assets/images/chatbot_logo.png")}
          className="scale-50"
        />
        <Text style={{ fontFamily: "Inter_500Medium" }} className="text-2xl">
          Query Bot
        </Text>
      </View>

      {/* form container */}
      <View className="flex flex-col pl-6 gap-5">
        <Text style={{ fontFamily: "Syne_700Bold" }} className="text-2xl mb-3">
          Hello, Login now
        </Text>

        {/* email container */}
        <View className="flex flex-col gap-2">
          <Text className="text-lg">Email</Text>
          <TextInput
            className="h-12 border-black w-80 rounded-full pl-14 "
            style={{ borderColor: "#8E8E8E", borderWidth: 0.5 }}
            placeholder="jefferson.balde@sccpag.edu.ph"
          />
          <Fontisto
            style={{ position: "absolute", left: 23, top: 50.8 }}
            name="email"
            size={20}
            color={"#A1A1A1"}
          />
        </View>

        {/* password container */}
        <View className="flex flex-col gap-2">
          <Text className="text-lg">Password</Text>
          <TextInput
            className="h-12 border-black w-80 rounded-full pl-14 "
            style={{ borderColor: "#8E8E8E", borderWidth: 0.5 }}
            placeholder="*********"
          />
          <SimpleLineIcons
            style={{ position: "absolute", left: 23, top: 50.8 }}
            name="lock"
            size={19}
            color={"#A1A1A1"}
          />
        </View>

        <Text className="text-[#8E8E8E] pl-3 text-base font-semibold mb-16">
          Forgot Password?
        </Text>

        <View className="">
          <RoundedButton label="Sign In" onPress={() => router.push('/(routes)/ask_question')} />
        </View>

        <View className="flex flex-row items-center pl-7">
          <Text className="text-center text-base text-[#8E8E8E]">
            Don’t have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("/(routes)/register")}>
            <Text className="text-base font-medium">Create account</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
