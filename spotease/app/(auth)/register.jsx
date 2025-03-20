import React, { useState } from "react";
import { View, Text, Alert, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import EntryBox from "../../components/EntryBox";
import CustomButton from "../../components/CustomButton";
import logo from '../../assets/images/SpotEaseLogo.png';
import {Render_API_URL} from '@env'

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [error, setError] = useState("");

    const API_URL = `${Render_API_URL}/register`; // ✅ Correct API endpoint

    const handleRegister = async () => {
        setError(""); // Clear previous errors

        if (!email.trim() || !password.trim() || !password1.trim()) {
            setError("Email and Password cannot be empty.");
            return;
        }

        if (password !== password1) {
            setError("Passwords do not match! Please try again.");
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const text = await response.text(); // ✅ Get raw response to avoid JSON parse errors

            // ✅ Check if response is valid JSON before parsing
            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                throw new Error(`Invalid JSON response: ${text}`);
            }

            if (data.data === "User already exists") {
                setError("User already exists! Try logging in.");
                return;
            }

            if (data.status === "User registered") {
                Alert.alert("Success", "Account registered successfully.");
                router.push("/login");
            } else {
                setError("Registration failed. Try again.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setError("Server error. Please try again later.");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Register</Text>

            <EntryBox placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <EntryBox placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <EntryBox placeholder="Confirm Password" value={password1} onChangeText={setPassword1} secureTextEntry />

            <CustomButton title="Register" onPress={handleRegister} />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#2E2E2E", flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: "#00E6E6", marginBottom: 20 },
    logo: { width: 400, height: 200, marginBottom: 15 },
    errorText: { color: "red", marginTop: 10 },
});
