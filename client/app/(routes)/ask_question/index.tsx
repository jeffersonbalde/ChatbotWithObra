import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import Chat from "@/components/Chat";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function index() {
  const [text, onChangeText] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Chat content="Good day. How may I help you?" mode="ai" />
        <Chat content="Who is the current president of the club?" mode="user" />
        <Chat
          content="The president of the current school year is Jirald Sinangote. A third year Computer Science student."
          mode="ai"
        />
        <Chat content="That's right." mode="user" />
        <Chat
          content="It is my honor to give not only an accurate but also a reliable information to our club members."
          mode="ai"
        />
        <Chat content="Please halp." mode="user" />
        <Chat content="Good day. How may I help you?" mode="ai" />
        <Chat content="Please halp." mode="user" />
        <Chat content="Good day. How may I help you?" mode="ai" />
        <Chat content="Please halp." mode="user" />
        <Chat content="Good day. How may I help you?" mode="ai" />
        <Chat content="Halp?" mode="user" />
        <Chat content="Good day. How may I help you?" mode="ai" />
      </ScrollView>
      <View style={styles.footer}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Ask about the club..."
            className="h-14 text-[#000]"
            // keyboardType="text"
          />
        </View>
        <View style={{ position: "absolute", right: "10%", bottom: "65%" }}>
          <Pressable onPress={() => alert("You clicked the button.")}>
            {/* <Image
              source={require("@/assets/images/chatbot_logo.png")}
              className="scale-[.4]"
            /> */}
            <Ionicons name="send" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 18,
  },
  footer: {
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    borderRadius: 30,
    padding: 20,
    borderWidth: 0.5,
    borderColor: "#8E8E8E",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "15%",
    // outlineStyle: 'none'
  },
});
