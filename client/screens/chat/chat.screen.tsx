import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { speak, isSpeakingAsync, stop } from "expo-speech";
import ChatBubble from "@/components/ChatBubble";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeViewAndroid from "@/components/SafeViewAndroid";
import Ionicons from "@expo/vector-icons/Ionicons";


// Define types for the chat messages
type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

export default function ChatScreen() {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const API_KEY = "AIzaSyCRauHbBNOil1cavJaJ4EX0OxoVVbm6JoI";

  const handleUserInput = async () => {
    // Add user input to chat
    const updatedChat: ChatMessage[] = [
      ...chat,
      { role: "user", parts: [{ text: userInput }] },
    ];

    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );

      console.log("Gemini API Response:", response.data);

      const modelResponse: string =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        // Gemini response
        const updatedChatWithModel: ChatMessage[] = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];

        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error: any) {
      console.error("Error calling Gemini Pro API:", error);
      console.error("Error response", error.response);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async (text: string) => {
    if (isSpeaking) {
      // if it is speaking, stop the speech
      stop();
      setIsSpeaking(false);
    } else {
      // if not speaking, start the speech
      if (!(await isSpeakingAsync())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
  };

  const renderChatItem = ({ item }: { item: ChatMessage }) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handleSpeech(item.parts[0].text)}
    />
  );

  return (
    <SafeAreaProvider
      style={[SafeViewAndroid.AndroidSafeArea, styles.container]}
    >
      <Text style={styles.title}>Chat With Obra</Text>
      <FlatList
        data={chat}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />

      {loading && <ActivityIndicator style={styles.loading} color="#333" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask your question"
          placeholderTextColor="#aaa"
          value={userInput}
          onChangeText={setUserInput}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleUserInput} style={styles.button}>
          <Ionicons name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    // marginTop: 30,
    textAlign: "center",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    marginRight: 10,
    paddingLeft: 20,
    padding: 10,
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 25,
    color: "#333",
    backgroundColor: "#fff",
    textAlign: 'left', 

  },
  button: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 25,
  },
  loading: {
    marginTop: 10
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
