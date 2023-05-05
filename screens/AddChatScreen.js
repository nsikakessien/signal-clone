import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  const createChat = async () => {
    try {
      await addDoc(collection(db, "chats"), {
        chatName: input,
      });
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a new Chat"
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
        onSubmitEditing={createChat}
      />
      <Button onPress={createChat} title="Create a new Chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
