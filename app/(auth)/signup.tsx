import { router } from "expo-router";
import { useAuth } from "../../app/(context)/Authcontext";

import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = "https://mosaix-backend.onrender.com/userProfile/create";
  //const API_URL = "http://localhost:3000/userProfile/create";
  const { login } = useAuth();

  const handleSignUp = async () => {
    try {
      if (!email || !user_name || !password) {
        alert("Please fill all details to create login account!");
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          user_name,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Issue with signup. Please try again in sometime!",
        );
      }

      // Store session
      await login({
        token: data.token,
        profile_id: data.user.profile_id,
        user_name: data.user.user_name,
      });

      // Redirect to feed page
      router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

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

          <Text style={styles.label}>Username</Text>
          <TextInput
            value={user_name}
            onChangeText={setUsername}
            placeholder="Choose a username"
            placeholderTextColor="#7A869A"
            style={styles.input}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            placeholderTextColor="#7A869A"
            style={styles.input}
            secureTextEntry
          />

          <Pressable style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(auth)/login")}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Already have an account? Log in</Text>
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
});
