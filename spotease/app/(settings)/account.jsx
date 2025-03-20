import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Account() {
    const router = useRouter();

    return (
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.push("(settings)/settings")} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
    
          {/* Title */}
          <Text style={styles.title}>         Account</Text>

          <Text style={styles.optionText}>Welcome User!</Text>
    
          {/* Options */}
          <TouchableOpacity style={styles.option} onPress={() => router.push("/change-account-details")}>
            <Text style={styles.optionText}>Change Account Details</Text>
            <MaterialIcons name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.option} onPress={() => router.push("/view-saved-locations")}>
            <Text style={styles.optionText}>View Saved Locations</Text>
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
      color: "white",
      textAlign: "center",
      marginBottom: 20,
      marginTop: 50,
    },
    option: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      backgroundColor: "#1e1e1e",
      borderRadius: 10,
      marginVertical: 5,
    },
    optionText: {
      fontSize: 18,
      color: "white",
    },
  });
  