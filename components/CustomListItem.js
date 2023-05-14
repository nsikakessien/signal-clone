import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, ListItem } from "@rneui/themed";

const CustomListItem = ({ id, data, enterChat }) => {
  return (
    <ListItem
      key={id}
      onPress={() => enterChat(id, data.chatName)}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri: "https://res.cloudinary.com/dpdzpf9hm/image/upload/v1682605541/cld-sample-5.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {data.chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          This is a test subtitle
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
