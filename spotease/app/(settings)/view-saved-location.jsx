import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ViewSavedLocation() {
    const router = useRouter();
    
    const savedLocations = [
        { id: "1", name: "Home" },
        { id: "2", name: "Work" },
        { id: "3", name: "Mom’s Home" }
    ];
    
    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            
            {/* Title */}
            <Text style={styles.title}>Saved Locations</Text>
            
            {/* Locations List */}
            <FlatList
                data={savedLocations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.locationItem}>
                        <Text style={styles.locationText}>{item.name}</Text>
                        <MaterialIcons name="chevron-right" size={24} color="gray" />
                    </TouchableOpacity>
                )}
            />
            
            {/* Clear Button */}
            <TouchableOpacity style={styles.clearButton} onPress={() => console.log("Clearing locations...")}> 
                <Text style={styles.clearButtonText}>Clear</Text>
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
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
    },
    locationItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    locationText: {
        fontSize: 18,
        color: "white",
    },
    clearButton: {
        backgroundColor: "#008080",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    clearButtonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
});
