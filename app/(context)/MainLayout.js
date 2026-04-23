import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "./Authcontext";

export default function MainLayout() {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!token) {
      router.replace("/(auth)/login");
    } else {
      router.replace("/(tabs)");
    }
  }, [token, isLoading]);

  if (isLoading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
