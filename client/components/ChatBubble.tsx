import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

interface ChatProps {
    role: string;
    text: string;
    onSpeech: () => void;
  }

export default function ChatBubble({ role, text, onSpeech}: ChatProps) {
  return (
    <View style={[styles.chatItem, role === "user" ? styles.userChatItem : styles.modelChatItem]}>
      <Text style={styles.chatText}>{text}</Text>
      {role === "model" && (
        <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
            <Ionicons name="volume-high-outline" size={24} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  ) 
}

const styles = StyleSheet.create({
    chatItem: {
        marginBottom: 20,
        padding: 12,
        borderRadius: 10,
        maxWidth: "90%",
        position: "relative",
    },
    userChatItem: {
        alignSelf: "flex-end",
        backgroundColor: "#EAEAEA",
        borderRadius: 100,
        marginTop: 30,
        marginRight: 20
    },
    modelChatItem: {
        alignSelf: "flex-start",
    },
    chatText: {
        fontSize: 16,
    },
    speakerIcon: {
        position: "absolute",
        bottom: -20,
        right: 5,
    }
})