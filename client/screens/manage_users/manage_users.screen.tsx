import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import SafeViewAndroid from "@/components/SafeViewAndroid";
import { FIREBASE_FIRESTORE } from "@/FirebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const ManageUserScreen = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [updatedDetails, setUpdatedDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

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

  const handleUpdateUser = async () => {
    if (selectedUser) {
      try {
        const userRef = doc(FIREBASE_FIRESTORE, "users", selectedUser.uid);
        await updateDoc(userRef, updatedDetails);
        alert("User updated successfully!");
        setModalVisible(false);
        fetchUsers();
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user.");
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const userRef = doc(FIREBASE_FIRESTORE, "users", userId);
      await deleteDoc(userRef);
      alert("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const openUpdateModal = (user: any) => {
    setSelectedUser(user);
    setUpdatedDetails({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setModalVisible(true);
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
      </View>
      <View className="" style={{ height: 570, flexGrow: 0 }}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View className="flex flex-col items-center bg-[#F7F7F7] mb-3 p-7 mt-5">
              <Text style={styles.userText}>
                Name: {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.userText}>Email: {item.email}</Text>
              <View className="flex flex-row items-center p-2">
                <View className="mr-3">
                  <Button
                    title="update user"
                    color="#14AE5C"
                    onPress={() => openUpdateModal(item)}
                  />
                </View>
                <Button
                  title="delete user"
                  color="#C00F0C"
                  onPress={() => handleDeleteUser(item.uid)}
                />
              </View>
            </View>
          )}
        />
      </View>

      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Update User</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={updatedDetails.firstName}
                onChangeText={(text) =>
                  setUpdatedDetails({ ...updatedDetails, firstName: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={updatedDetails.lastName}
                onChangeText={(text) =>
                  setUpdatedDetails({ ...updatedDetails, lastName: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={updatedDetails.email}
                onChangeText={(text) =>
                  setUpdatedDetails({ ...updatedDetails, email: text })
                }
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={handleUpdateUser}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default ManageUserScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  updateButton: {
    backgroundColor: "#14AE5C",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#C00F0C",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
