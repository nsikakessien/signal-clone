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
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data?.photoURL ||
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
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
  }, [navigation, messages]);

  const sendMessage = async () => {
    Keyboard.dismiss();
    const collectionRef = collection(db, "chats", route.params.id, "messages");
    await addDoc(collectionRef, {
      timeStamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "chats", route.params.id, "messages"),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      }
    );

    return unsub;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView style={styles.container}>
        <>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.sender}>
                  <Avatar
                    rounded
                    size={30}
                    source={{ uri: data.photoURL }}
                    position="absolute"
                    bottom={-15}
                    right={-5}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.receiver}>
                  <Avatar
                    rounded
                    size={30}
                    source={{ uri: data.photoURL }}
                    position="absolute"
                    bottom={-15}
                    right={-5}
                  />
                  <Text style={styles.receiverText}>{data.message}</Text>
                  <Text style={styles.receiverName}>{data.displayName}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              style={styles.inputContainer}
              onSubmitEditing={sendMessage}
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
  sender: {
    alignSelf: "flex-end",
    padding: 15,
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
    backgroundColor: "#ECECEC",
  },
  receiver: {
    alignSelf: "flex-start",
    padding: 15,
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
    backgroundColor: "#2B68E6",
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
  receiverName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  receiverText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
});
