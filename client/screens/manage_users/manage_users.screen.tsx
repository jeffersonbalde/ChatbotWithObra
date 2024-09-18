import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";
import SafeViewAndroid from "@/components/SafeViewAndroid";
import { Syne_700Bold } from "@expo-google-fonts/syne";
import { Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";

const ManageUserScreen = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userInput, setUserInput] = useState<String | null>("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.254.105:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea]} className="">
      <View className="flex flex-row items-center">
        <Image
          source={require("@/assets/images/chatbot_logo.png")}
          className="scale-50"
        />
        <Text
          style={{ fontFamily: "Inter_500Medium" }}
          className="text-2xl font-semibold"
        >
          Chat With Obra
        </Text>
      </View>

      <View className="flex flex-col justify-center pl-8 gap-2">
        <Text className="text-2xl font-medium">Users</Text>
        <TextInput
          className="h-12 border-black w-80 rounded-full pl-14 "
          style={{ borderColor: "#8E8E8E", borderWidth: 0.5 }}
          placeholder="jefferson.balde@sccpag.edu.ph"
          keyboardType="email-address"
          // value={userInput}
          // onChangeText={(value) => setUserInfo({ ...userInfo, email: value })}
          autoCapitalize="none"
        />
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View className="flex flex-col items-center bg-[#F7F7F7] mb-3 p-7">
            {/* <Text style={styles.userText}>Name: {item.display_name || 'N/A'}</Text> */}
            <Text style={styles.userText}>Email: {item.email}</Text>
            <View className="flex flex-row items-center p-2">
              <View className="mr-3">
                <Button title="update user" color="#14AE5C" />
              </View>
              <Button title="delete user" color="#C00F0C" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ManageUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  userContainer: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  userText: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
