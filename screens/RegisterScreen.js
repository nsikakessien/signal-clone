import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Input, Text } from "@rneui/themed";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(user);

      await updateProfile(user, {
        displayName: name,
        photoURL: imageUrl || "../assets/user.png",
      });
    } catch (error) {
      console.log(error);

      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal Account
      </Text>

      <View style={styles.inputContainer}>
        <Input
          value={name}
          placeholder="Full Name"
          autoFocus
          onChangeText={(text) => setName(text)}
          type="text"
        />
        <Input
          value={email}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          type="email"
        />
        <Input
          value={password}
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          type="password"
        />
        <Input
          value={imageUrl}
          placeholder="Profile Photo URL (Optional)"
          onChangeText={(text) => setImageUrl(text)}
          type="text"
          onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={styles.button}
        title="Register"
        raised
        onPress={register}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
