import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Settings() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("(tabs)/home")} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>         Settings</Text>

      {/* Options */}
      <TouchableOpacity style={styles.option} onPress={() => router.push("/account")}>
        <Text style={styles.optionText}>Account</Text>
        <MaterialIcons name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => console.log("Logging Out")}>
        <Text style={styles.optionText}>Log Out</Text>
        <MaterialIcons name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>

      {/* History Button */}
      <TouchableOpacity style={styles.historyButton} onPress={() => router.push("(tabs)/history")}>
        <Text style={styles.historyText}>History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00A88E",
    marginTop: 50,
    marginBottom: 40,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  optionText: {
    fontSize: 18,
    color: "white",
  },
  historyButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#00A88E",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  historyText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
