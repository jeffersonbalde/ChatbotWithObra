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
import SafeViewAndroid from "@/components/SafeViewAndroid";
import { Syne_700Bold } from "@expo-google-fonts/syne";
import { Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { FIREBASE_FIRESTORE } from "@/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Octicons from "@expo/vector-icons/Octicons";

const ManageUserScreen = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userInput, setUserInput] = useState<String | null>("");

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(FIREBASE_FIRESTORE, "users")
      );
      const userList: any[] = [];
      querySnapshot.forEach((doc) => {
        userList.push({ ...doc.data(), uid: doc.id });
      });
      setUsers(userList);
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
      <View className="flex flex-col justify-center gap-2 items-center">
        <Text className="text-2xl font-medium">Users</Text>
        <TextInput
          className="h-12 border-black w-80 rounded-full pl-12"
          style={{ borderColor: "#8E8E8E", borderWidth: 0.5, marginBottom: 20 }}
          placeholder="jefferson.balde@sccpag.edu.ph"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Octicons
          name="person"
          size={21}
          color="#A1A1A1"
          style={{ position: "absolute", left: 55, top: 53 }}
        />
      </View>
      <View className="" style={{ height: 570, flexGrow: 0 }}>
        <FlatList
          data={users}
          // style={{ height: 900, flexGrow: 0 }}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View className="flex flex-col items-center bg-[#F7F7F7] mb-3 p-7 mt-5 ">
              <Text style={styles.userText}>
                Name: {item.firstName} {item.lastName}
              </Text>
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
      </View>
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
  userText: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
