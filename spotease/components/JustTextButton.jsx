import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import React from "react";

export default function JustTextButton({ title, onPress, textStyle, containerStyle }) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  
  text: {
    fontSize: 14,
    color: "#A0A0A0",
    marginBottom: 20,
  },
});
