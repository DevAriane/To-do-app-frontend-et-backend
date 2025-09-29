import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';
import { User } from './types';

export const register = async (name: string, email: string, password: string): Promise<User> => {
  try {
    const res = await api.post('/register', { name, email, password });
    await AsyncStorage.setItem('token', res.data.token);
    return res.data.user;
  } 
  catch (error: any) {
  console.log("🚨 Erreur Laravel complète :", error.response?.data);
  throw new Error(
    JSON.stringify(error.response?.data?.errors) ||
    error.response?.data?.message ||
    "Erreur lors de l'inscription"
  );
}


};


export const login = async (email: string, password: string): Promise<User> => {
  const res = await api.post('/login', { email, password });
  await AsyncStorage.setItem('token', res.data.token);
  return res.data.user;
};

export const logout = async (): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    await api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
    await AsyncStorage.removeItem('token');
  }
};
