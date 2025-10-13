// api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = "http://10.179.118.191:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token aux requêtes protégées
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Réponse du serveur reçue
      console.error("Erreur API:", error.response.data || error.response.statusText);
      if (error.response.status === 401) {
        console.warn("Token invalide ou expiré. Déconnexion...");
        // Ici tu peux appeler logout() si besoin
      }
    } else if (error.request) {
      // Requête envoyée mais pas de réponse
      console.error("Erreur API: pas de réponse du serveur", error.message);
    } else {
      // Erreur dans la configuration de la requête
      console.error("Erreur API: problème interne", error.message);
    }

    return Promise.reject(error);
  }
);


// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Erreur API:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.warn("Token invalide ou expiré. Déconnexion...");
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
      } catch (storageError) {
        console.error('Erreur nettoyage token:', storageError);
      }
    }
    return Promise.reject(error);
  }
);

// URL par défaut pour les images stockées
export const image_default_url = "http://10.179.118.191:8000/storage";

export default api;
