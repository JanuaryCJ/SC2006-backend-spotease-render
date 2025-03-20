import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import EntryBox from "../../components/EntryBox";
import CustomButton from "../../components/CustomButton";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import JustTextButton from '../../components/JustTextButton';

import logo from '../../assets/images/SpotEaseLogo.png';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    //if either fields are empty
    if (!email.trim() || !password.trim())
    {
      Alert.alert("Error","Email and Password cannot be empty. Try again.");
      return;
    }

    //if both fields are filled
    router.push("/home");
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>Login</Text>

      <EntryBox
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <EntryBox
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <JustTextButton title="Forgot Password?" onPress={() => router.push("/(auth)/forgetPassword")} containerStyle={{alignItems:"flex-end"}}/>

      <CustomButton title="Login" onPress={handleLogin} />

      <JustTextButton title="Don't have an account? Register" onPress={() => router.push("/(auth)/register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor:"#2E2E2E",flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#00E6E6", marginBottom: 20 },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  logo: {width: 400, height: 200, marginBottom: 15},
});
