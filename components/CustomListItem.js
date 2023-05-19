import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const CustomListItem = ({ data, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "chats", data.id, "messages"),
      orderBy("timeStamp", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setChatMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return unsub;
  }, []);

  return (
    <ListItem
      onPress={() => enterChat(data.id, data.data.chatName)}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {data.data.chatName}
        </ListItem.Title>
        {chatMessages?.[0]?.message && (
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
