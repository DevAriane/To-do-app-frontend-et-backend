import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color="#ff80ab"/>,
        }}
      />
       <Tabs.Screen
        name="TaskFormList"
        options={{
          title: 'Creer',
          tabBarIcon: ({ color }) => <MaterialIcons name="create-new-folder" size={28} color="#ff80ab" />
          
        }}
      />
       <Tabs.Screen
        name="TaskListScreen"
        options={{
          title: 'Lister',
          tabBarIcon: ({ color }) => <Feather name="list" size={28} color="#ff80ab" />
        }}
      />
       <Tabs.Screen
        name="profil"
        options={{
          title: 'profil',
          tabBarIcon: ({ color }) => 
          <MaterialCommunityIcons name="face-man-profile" size={28} color="#ff80ab" />
        }}
      />
    </Tabs>
  );
}
