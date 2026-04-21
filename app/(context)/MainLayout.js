import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "./Authcontext";

export default function MainLayout() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const group = segments?.[0];

    const inAuth = group === "(auth)";
    const inTabs = group === "(tabs)";

    if (!token && !inAuth) {
      router.replace("/(auth)/login");
    } else if (token && !inTabs) {
      router.replace("/(tabs)");
    }
  }, [token, isLoading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
