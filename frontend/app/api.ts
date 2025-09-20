import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'http://10.0.2.2:8000/api', // Android emulator
});

export const apiWithToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return axios.create({
    baseURL: 'http://10.0.2.2:8000/api',
    headers: { Authorization: `Bearer ${token}` },
  });
};
