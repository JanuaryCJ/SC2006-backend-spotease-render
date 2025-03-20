import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

const EntryBox = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, style }) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType || "default"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#33373E",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    height: 50,
    color: "#FFF",
    fontSize: 16,
  },
});

export default EntryBox;
