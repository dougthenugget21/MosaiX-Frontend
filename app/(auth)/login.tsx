import { router } from "expo-router";
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
import { useAuth } from "../(context)/Authcontext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#547AA5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#EAE7F2",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#EAE7F2",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#DCE3EC",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3D5A80",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1B1B1B",
    borderWidth: 1,
    borderColor: "#DCE3EC",
  },
  button: {
    marginTop: 18,
    backgroundColor: "#3D5A80",
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
    marginTop: 14,
    alignItems: "center",
  },
  linkText: {
    color: "#3D5A80",
    fontSize: 14,
    fontWeight: "600",
  },
});
