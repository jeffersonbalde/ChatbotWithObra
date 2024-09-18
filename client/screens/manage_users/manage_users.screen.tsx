import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const ManageUserScreen = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


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
    <View style={styles.container}>
      <Text style={styles.title}>List of Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.uid} 
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userText}>Name: {item.display_name || 'N/A'}</Text>
            <Text style={styles.userText}>Email: {item.email}</Text>
          </View>
        )}
      />
    </View>
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
