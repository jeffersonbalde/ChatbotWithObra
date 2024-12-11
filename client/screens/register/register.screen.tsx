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
  ScrollView,
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

import Octicons from "@expo/vector-icons/Octicons";
import Button from "@/components/Button";
import RoundedButton from "@/components/RoundedButton";
import { router } from "expo-router";
import { useState } from "react";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
export default function RegisterScren() {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
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
      setError({ ...error, password: "Write at least one special character." });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordOneNumber.test(password)) {
      setError({ ...error, password: "Write at least one number" });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setError({ ...error, password: "Write at least 6 characters" });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setError({ ...error, password: "" });
      setUserInfo({ ...userInfo, password: value });
    }
  };

  const handleConfirmPasswordValidation = (value: string) => {
    if (value !== userInfo.password) {
      setError({ ...error, confirmPassword: "Passwords do not match." });
    } else {
      setError({ ...error, confirmPassword: "" });
    }
    setUserInfo({ ...userInfo, confirmPassword: value });
  };

  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    if (error.password === "" && error.confirmPassword === "") {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          userInfo.email,
          userInfo.password
        );

        const userRef = doc(FIREBASE_FIRESTORE, "users", response.user.uid);
        await setDoc(userRef, {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          uid: response.user.uid,
        });

        alert("Account created successfully");
        router.push("/(routes)/chat");
      } catch (error: any) {
        console.log(error);
        alert("Sign up failed: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Password error: " + (error.password || error.confirmPassword));
    }
  };

  return (
    <SafeAreaView
      style={SafeViewAndroid.AndroidSafeArea}
      className="flex flex-col items-center"
    >
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        {/* logo container */}
            {/* logo container */}
            <View className="flex flex-row items-center">
              <Image
                source={require("@/assets/images/logo.jpg")}
                className="scale-50 w-36 h-36"
              />
              <Text
                style={{ fontFamily: "Inter_500Medium" }}
                className="text-2xl"
              >
                Chat With Obra
              </Text>
            </View>

        {/* form container */}
        <View className="flex flex-col gap-5">
          <Text
            style={{ fontFamily: "Syne_700Bold" }}
            className="text-2xl mb-3"
          >
            Create Account
          </Text>

          {/* first name */}
          <View className="flex flex-col gap-2">
            <Text className="text-lg">First Name</Text>
            <TextInput
              className="h-12 border-black w-80 rounded-full pl-14"
              style={{ borderColor: "#8E8E8E", borderWidth: 0.5 }}
              // placeholder="Jefferson"
              value={userInfo.firstName}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, firstName: value })
              }
            />
            <Octicons
              name="person"
              size={21}
              color="#A1A1A1"
              style={{ position: "absolute", left: 23, top: 50.8 }}
            />
          </View>

          {/* last name */}
          <View className="flex flex-col gap-2">
            <Text className="text-lg">Last Name</Text>
            <TextInput
              className="h-12 border-black w-80 rounded-full pl-14"
              style={{ borderColor: "#8E8E8E", borderWidth: 0.5 }}
              // placeholder="Balde"
              value={userInfo.lastName}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, lastName: value })
              }
            />
            <Octicons
              name="person"
              size={21}
              color="#A1A1A1"
              style={{ position: "absolute", left: 23, top: 50.8 }}
            />
          </View>

          {/* email container */}
          <View className="flex flex-col gap-2">
            <Text className="text-lg">Email</Text>
            <TextInput
              className="h-12 border-black w-80 rounded-full pl-14"
              style={{ borderColor: "#8E8E8E", borderWidth: 0.5 }}
              // placeholder="jefferson.balde@sccpag.edu.ph"
              keyboardType="email-address"
              value={userInfo.email}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
              autoCapitalize="none"
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
              className="h-12 border-black w-80 rounded-full pl-14"
              style={{ borderColor: "#8E8E8E", borderWidth: 0.5 }}
              // placeholder="*********"
              secureTextEntry={!isPasswordVisible}
              onChangeText={handlePasswordValidation}
            />
            <SimpleLineIcons
              style={{ position: "absolute", left: 23, top: 49 }}
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
                <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                  {error.password}
                </Text>
              </View>
            )}
          </View>

          {/* confirm password container */}
          <View className="flex flex-col gap-2">
            <Text className="text-lg">Confirm Password</Text>
            <TextInput
              className="h-12 border-black w-80 rounded-full pl-14"
              style={{ borderColor: "#8E8E8E", borderWidth: 0.5 }}
              // placeholder="*********"
              secureTextEntry={!isPasswordVisible}
              onChangeText={handleConfirmPasswordValidation}
            />

            <SimpleLineIcons
              style={{ position: "absolute", left: 23, top: 49 }}
              name="lock"
              size={19}
              color={"#A1A1A1"}
            />
          </View>

          {error.confirmPassword && (
            <View className="flex flex-row items-center">
              <Entypo name="cross" size={18} color={"red"} />
              <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                {error.confirmPassword}
              </Text>
            </View>
          )}

          <View className="flex flex-col gap-5">
            {/* Signup Button */}
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              // <Pressable onPress={signUp}>
              //   <RoundedButton label="Sign Up" />
              // </Pressable>
              <RoundedButton label="Sign Up" onPress={signUp} />
            )}

            {/* Already have an account */}
            <View className="flex flex-row items-center mt-2 mb-9">
              <Text className="text-center text-base text-[#8E8E8E]">
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("/(routes)/login")}>
                <Text className="text-base font-medium">Create account</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  visibleIcon: {
    position: "absolute",
    right: 60,
    top: 48,
  },
});
