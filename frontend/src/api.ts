import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Remplace par ton URL ngrok complet
const NGROK_URL = " https://nonoptionally-disturbed-scottie.ngrok-free.app";

export const api = axios.create({
  baseURL: `${NGROK_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export const apiWithToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return axios.create({
    baseURL: `${NGROK_URL}/api`,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
