import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Syne_700Bold } from "@expo-google-fonts/syne";
import { Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import SafeViewAndroid from "@/components/SafeViewAndroid";
import {
  Entypo,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import Button from "@/components/Button";
import RoundedButton from "@/components/RoundedButton";
import { router } from "expo-router";
import { useState } from "react";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScren() {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const [buttonSpinner, setButtonSpinner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [required, setRequired] = useState<string>("");
  const [error, setError] = useState({
    password: "",
  });

  let [fontsLoaded, fontsError] = useFonts({
    Syne_700Bold,
    Inter_500Medium,
  });

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.{6,})/;

    if (!passwordSpecialCharacter.test(password)) {
      setError({
        ...error,
        password: "Write at least one special character.",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordOneNumber.test(password)) {
      setError({
        ...error,
        password: "Write at least one number",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setError({
        ...error,
        password: "Write at least 6 characters",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setError({
        ...error,
        password: "",
      });
      setUserInfo({ ...userInfo, password: value });
    }
  };

  const auth = FIREBASE_AUTH

  const signUp = async () => {
    if(error.password == "") {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          userInfo.email,
          userInfo.password
        );
        console.log(response);
        alert("Create account successfully");
        router.push('/(routes)/login')
      } catch (error: any) {
        console.log(error);
        alert("Sign up failed: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Password error: " + error.password)
    }
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea} className="">
      {/* logo container */}
      <View className="flex flex-row items-center">
        <Image
          source={require("@/assets/images/chatbot_logo.png")}
          className="scale-50"
        />
        <Text style={{ fontFamily: "Inter_500Medium" }} className="text-2xl">
          Chat With Obra
        </Text>
      </View>

      {/* form container */}
      <View className="flex flex-col pl-6 gap-5">
        <Text style={{ fontFamily: "Syne_700Bold" }} className="text-2xl mb-3">
          Create Account
        </Text>

        {/* email container */}
        <View className="flex flex-col gap-2">
          <Text className="text-lg">Email</Text>
          <TextInput
            className="h-12 border-black w-80 rounded-full pl-14 "
            style={{ borderColor: "#8E8E8E", borderWidth: 0.5 }}
            placeholder="jefferson.balde@sccpag.edu.ph"
            keyboardType="email-address"
            value={userInfo.email}
            onChangeText={(value) => setUserInfo({ ...userInfo, email: value })}
            autoCapitalize="none"
          />
          <Fontisto
            style={{ position: "absolute", left: 23, top: 50.8 }}
            name="email"
            size={20}
            color={"#A1A1A1"}
          />
          {required && (
            <View>
              <Entypo name="cross" size={18} color={"red"} />
            </View>
          )}
        </View>

        {/* password container */}
        <View className="flex flex-col gap-2">
          <Text className="text-lg">Password</Text>
          <TextInput
            className="h-12 border-black w-80 rounded-full pl-14 "
            style={{ borderColor: "#8E8E8E", borderWidth: 0.5 }}
            placeholder="*********"
            keyboardType="default"
            secureTextEntry={!isPasswordVisible}
            defaultValue=""
            onChangeText={handlePasswordValidation}
          />
          <SimpleLineIcons
            style={{ position: "absolute", left: 23, top: 50.8 }}
            name="lock"
            size={19}
            color={"#A1A1A1"}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!isPasswordVisible)}
            style={styles.visibleIcon}
          >
            {isPasswordVisible ? (
              <Ionicons name="eye-off-outline" size={23} color={"#747474"} />
            ) : (
              <Ionicons name="eye-outline" size={23} color={"#ffff0"} />
            )}
          </TouchableOpacity>

          {error.password && (
            <View className="flex flex-row items-center">
              <Entypo name="cross" size={18} color={"red"} />
              <Text style={{color: "red", fontSize: 11, marginTop: -1}}>{error.password}</Text>
            </View>
          )}
        </View>

        <View className="">
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <RoundedButton label="Create Account" onPress={signUp} />
            )}
          </View>

        <View className="flex flex-row items-center pl-7">
          <Text className="text-center text-base text-[#8E8E8E]">
            Already have an account?
          </Text>
          <Pressable onPress={() => router.push("/(routes)/login")}>
            <Text className="text-base font-medium"> Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  visibleIcon: {
    position: "absolute",
    right: 55,
    top: 46,
  }
})