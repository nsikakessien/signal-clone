import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: "https://res.cloudinary.com/dpdzpf9hm/image/upload/v1682605541/cld-sample-5.jpg",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            width: 80,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const sendMessage = async () => {
    Keyboard.dismiss();
    const docRef = doc(collection(db, "chats", route.params.id, "messages"));
    await setDoc(docRef, {
      timeStamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView style={styles.container}>
        <>
          <ScrollView></ScrollView>
          <View style={styles.footer}>
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              style={styles.inputContainer}
              placeholder="Signal Message"
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name="send" size={24} color="#2b68e6" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ececec",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
});
