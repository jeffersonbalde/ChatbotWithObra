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

export default function RegisterScreen() {
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
      <View className="flex flex-col pl-6 gap-2">
        <Text style={{ fontFamily: "Syne_700Bold" }} className="text-2xl mb-3">
          Create Account
        </Text>

        {/* name container */}
        <View className="flex flex-col gap-2">
          <Text className="text-lg">Name</Text>
          <TextInput
            className="h-12 border-black w-80 rounded-full pl-14 "
            style={{ borderColor: "#8E8E8E", borderWidth: 0.5 }}
            placeholder="Jefferson Balde"
          />
          <Fontisto
            style={{ position: "absolute", left: 23, top: 50.8 }}
            name="email"
            size={20}
            color={"#A1A1A1"}
          />
        </View>

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

        {/* confirm password container */}
        <View className="flex flex-col gap-2 mb-14">
          <Text className="text-lg">Confirm Password</Text>
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

        <View className=""> 
          <RoundedButton label="Create Account" onPress={() => alert("test")} />
        </View>

        <View className="flex flex-row items-center pl-7">
          <Text className="text-center text-base text-[#8E8E8E]">
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("/(routes)/login")}>
            <Text className="text-base font-medium">Log in</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
