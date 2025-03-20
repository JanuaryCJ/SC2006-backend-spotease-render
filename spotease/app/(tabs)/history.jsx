import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function history() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("(auth)/login")} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      
      {/* Title */}
      <Text style={styles.title}>          History</Text>
      
      {/* Search History */}
      <TouchableOpacity style={styles.option} onPress={() => router.push("(history)/searchHistory")}> 
        <Text style={styles.optionText}>Search History</Text>
        <MaterialIcons name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>
      
      {/* Parking Location */}
      <TouchableOpacity style={styles.option} onPress={() => router.push("(history)/parkingLocation")}> 
        <Text style={styles.optionText}>Parking Location</Text>
        <MaterialIcons name="chevron-right" size={24} color="gray" />
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
});
