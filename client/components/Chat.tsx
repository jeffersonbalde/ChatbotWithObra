import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Feather from '@expo/vector-icons/Feather';


interface ChatProps {
  content: string;
  mode: string;
}

export default function Chat({ content, mode }: ChatProps) {
  async function copyText(text: string) {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  }

  if (mode === "user") {
    return (
      <View style={styles.userContainer}>
        <Text style={{ textAlign: "right", margin: 0, padding: 0 }}>
          {content}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start" }}>
        <Image source={require("@/assets/images/chatbot_logo.png")} className="scale-[.3]"/>
      </View>
      <View style={styles.content}>
        <Text>{content}</Text>
      </View>
      <View style={{ padding: 8, alignSelf: "flex-start", marginLeft: 40 }}>
        <Pressable onPress={() => copyText(content)}> 
          <Feather name="copy" size={18} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      maxWidth: '100%', 
      maxHeight: undefined, 
      padding: 10,
      marginBottom: 10,
      fontSize: 18,
      alignSelf: 'flex-start',
      flexDirection: 'column', 
    },
    content: {
      marginTop: -20,
      marginLeft: 45,
    },
    userContainer: {
      backgroundColor: '#D9D9D9',
      maxWidth: '100%', 
      maxHeight: undefined,
      padding: 20,
      marginBottom: 10,
      fontSize: 18,
      alignSelf: 'flex-end',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  });
  
