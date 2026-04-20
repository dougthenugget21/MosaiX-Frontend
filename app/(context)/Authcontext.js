import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [username, setUsername] = useState(null);

  // Load session on app start
  useEffect(() => {
    const loadSession = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedProfileId = await AsyncStorage.getItem("profile_id");
      const storedUsername = await AsyncStorage.getItem("user_name");

      setToken(storedToken);
      setProfileId(storedProfileId);
      setUsername(storedUsername);
    };

    loadSession();
  }, []);

  // login
  const login = async (data) => {
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("profile_id", String(data.profile_id));
    await AsyncStorage.setItem("user_name", data.user_name);

    setToken(data.token);
    setProfileId(data.profile_id);
    setUsername(data.user_name);
  };

  // Logout
  const logout = async () => {
    await AsyncStorage.clear();

    setToken(null);
    setProfileId(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        profileId,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
