import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '@/assets/context/AuthContext';
import { AuthProvider } from '@/assets/context/AuthContext';
import { TaskProvider } from '@/assets/context/TasksContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
<AuthProvider>
<TaskProvider>
    <Tabs
  screenOptions={{
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarStyle: styles.container,
    tabBarActiveTintColor: '#ff80ab',  // rose pour actif
    tabBarInactiveTintColor: 'white',  // blanc pour inactif
  }}
>
  <Tabs.Screen
    name="index"
    options={{
      title: 'Home',
      tabBarIcon: ({ color }) => (
        <IconSymbol size={28} name="house.fill" color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="TaskFormList"
    options={{
      title: 'Creer',
      tabBarIcon: ({ color }) => (
        <MaterialIcons name="create-new-folder" size={28} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="TaskListScreen"
    options={{
      title: 'Lister',
      tabBarIcon: ({ color }) => (
        <Feather name="list" size={28} color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="profil"
    options={{
      title: 'Profil',
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons
          name="face-man-profile"
          size={28}
          color={color}
        />
      ),
    }}
  />
</Tabs>
</TaskProvider>
</AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
 color:'white',
    backgroundColor: '#ffe0f0', // fond rose clair
   
  }
});
