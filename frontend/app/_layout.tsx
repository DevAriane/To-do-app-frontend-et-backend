import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from '@/assets/context/AuthContext';
import { TaskProvider } from '@/assets/context/TasksContext';


import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
  <AuthProvider>
    <TaskProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen name="onboarding" options={{ headerShown: false }} />
         <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
          <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
           <Stack.Screen name="details" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </TaskProvider>
</AuthProvider>
  );
}
