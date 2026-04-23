import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../(context)/Authcontext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logo = require("../../assets/images/logo.png");

  const API_URL = "https://mosaix-backend.onrender.com/userProfile/login";
  // const API_URL = "http://localhost:3000/userProfile/login";
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please fill in all fields to login!");
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      //alert(response.status);

      if (!response.ok) {
        if (response.status === 404) {
          alert("No account with this email. Please sign up.");
        } else if (response.status === 401) {
          alert("Incorrect password. Please try again.");
        } else {
          alert("Login failed. Please try again.");
        }
        return;
      }

      const data = await response.json();

      // Store session
      await login({
        token: data.token,
        profile_id: data.profile_id,
        user_name: data.user_name,
      });

      // Redirect to feed page
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.logo}>
        {logo ? (
          <Image source={logo} style={styles.logoImage} />
        ) : (
          <Ionicons name="person" size={50} color={theme.muted} />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to continue</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#7A869A"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#7A869A"
            style={styles.input}
            secureTextEntry
          />

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(auth)/signup")}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Don’t have an account? Sign up</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const theme = {
  bg: "#E6F2EA",
  card: "#FFFFFF",
  cardSoft: "#D8E9DD",
  primary: "#166534",
  accent: "#F97316",
  text: "#0F1F14",
  muted: "#4B5B52",
  border: "rgba(22, 101, 52, 0.15)",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: theme.text,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: theme.muted,
    marginBottom: 24,
  },

  card: {
    backgroundColor: theme.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.border,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.muted,
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: theme.cardSoft,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: theme.text,
    borderWidth: 1,
    borderColor: theme.border,
  },

  button: {
    marginTop: 20,
    backgroundColor: theme.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  linkButton: {
    marginTop: 16,
    alignItems: "center",
  },

  linkText: {
    color: theme.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  logo: {
    width: 200,
    height: 150,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 80,
  },
  logoImage: {
    width: "100%",
    height: "50%",
  },
});
