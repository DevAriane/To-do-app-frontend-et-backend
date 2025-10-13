import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/src/api";
import { Alert } from "react-native";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("userData");

        if (storedToken) {
          setToken(storedToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else if (storedToken) {
          await getUser(); // recharge depuis Laravel
        }
      } catch (error) {
        console.log("Erreur chargement auth :", error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await api.post("/register", { name, email, password });
      const { token, user } = res.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setToken(token);
      setUser(user);
    } catch (error: any) {
      console.log("Erreur register:", error.response?.data || error.message);
      Alert.alert("Erreur", "Impossible de créer le compte");
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/login", { email, password });
      const { token, user } = res.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setToken(token);
      setUser(user);
    } catch (error: any) {
      console.log("Erreur login:", error.response?.data || error.message);
      Alert.alert("Erreur", "Email ou mot de passe incorrect");
      throw error;
    }
  };

  const getUser = async () => {
    try {
      const res = await api.get("/user");
      setUser(res.data);
      await AsyncStorage.setItem("userData", JSON.stringify(res.data));
    } catch (error) {
      console.log("Erreur getUser:", error);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      console.log("Erreur logout (non bloquant)", e);
    } finally {
      await AsyncStorage.multiRemove(["token", "userData"]);
      setToken(null);
      setUser(null);
      delete api.defaults.headers.common["Authorization"];
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};
