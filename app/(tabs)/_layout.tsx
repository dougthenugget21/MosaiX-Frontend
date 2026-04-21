import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AuthProvider } from "../(context)/Authcontext";

export default function TabLayout() {
  return (
    <AuthProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#3D5A80",
          tabBarInactiveTintColor: "#3a3f46",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-sharp"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name={focused ? "add-location-alt" : "add-location-alt"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "person-sharp" : "person-sharp"}
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tabs>
    </AuthProvider>
  );
}
