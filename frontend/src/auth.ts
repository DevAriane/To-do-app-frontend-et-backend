import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import { User } from './types';

export const register = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const res = await api.post('/register', { name, email, password });
    await AsyncStorage.setItem('token', res.data.token);
    return res.data.user;
  } 
 catch (error: any) {
  if (error.response) {
    console.log("🚨 Erreur Laravel complète :", error.response.data);

    const backendError =
      error.response.data?.message ||
      JSON.stringify(error.response.data?.errors) ||
      "Erreur côté serveur Laravel";

    throw new Error(backendError);
  } else if (error.request) {
    // Requête envoyée, mais pas de réponse du serveur
    console.log("🚨 Aucun retour de Laravel :", error.request);
    throw new Error("Impossible de joindre le serveur Laravel");
  } else {
    // Erreur avant même l’envoi de la requête (configuration, etc.)
    console.log("🚨 Erreur inattendue :", error.message);
    throw new Error("Erreur interne dans l'application");
  }
}



};

export const getUserData = async (): Promise<User | null> => {
  const token = await AsyncStorage.getItem('token');
  if (!token) return null;

  try {
    const res = await api.get('/user', { headers: { Authorization: `Bearer ${token}` } });
    return res.data.user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};


export async function login(email: string, password: string) {
  try {
    const response = await api.post("/login", { email, password });

    const token = response.data.token;
    const user = response.data.user;

    // ✅ Sauvegarder le token et les infos utilisateur
    if (token) {
      await AsyncStorage.setItem("token", token);
    }
    if (user) {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
    }

    return response.data; // retourne la réponse si besoin
  } catch (error) {
    console.error("Erreur lors du login :", error);
    throw error;
  }
}


export const logout = async (): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    await api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
    await AsyncStorage.removeItem('token');
  }
};
