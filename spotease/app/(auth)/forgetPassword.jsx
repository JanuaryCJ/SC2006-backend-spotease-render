import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import EntryBox from "../../components/EntryBox";
import CustomButton from "../../components/CustomButton";
import logo from '../../assets/images/SpotEaseLogo.png';

export default function forgetPassword() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [error, setError] = useState("");

    const handleForgetPassword = () => {
      //if either fields are empty
      if (!email.trim() || !password.trim())
      {
        Alert.alert("Error","Email and Password cannot be empty. Try again.");
        return;
      }
      //password does not match
      if (password != password1){
        setError("Passwords do not match! Please try again.");
        Alert.alert("Error","Passwords do not match! Please try again.");
        setPassword1(""); //clear the input field to allow user to enter password again
        return;
      }

      //password matches - return to login page
      Alert.alert("Success","Password changed successfully.");
      router.push("/login");
    }

    return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>Reset Password</Text>

      <EntryBox
        placeholder = "Email"
        value = {email}
        onChangeText = {setEmail}
        keyboardType = "email-address"
      />

      <EntryBox
        placeholder = "Password"
        value = {password}
        onChangeText = {setPassword}
        secureTextEntry
      />

      <EntryBox
        placeholder = "Confirm Password"
        value = {password1}
        onChangeText = {setPassword1}
        secureTextEntry
      />

      <CustomButton title="Reset Password" onPress={handleForgetPassword} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor:"#2E2E2E",flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#00E6E6", marginBottom: 20 },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  logo: {width: 400, height: 200, marginBottom: 15},
});