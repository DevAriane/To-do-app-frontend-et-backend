import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const logoScale = useRef(new Animated.Value(0.1)).current; // commence petit mais visible

  useEffect(() => {
    const loadApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        router.replace('/onboarding');
      } catch (error) {
        console.log(error);
      }
    };

    Animated.timing(logoScale, {
      toValue: 1,
      duration: 5000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    loadApp();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" />
      <View style={styles.reactLogo}>
        <Animated.View style={{ transform: [{ scale: logoScale }] }}>
          <Image
            style={styles.image}
            source={require('../assets/images/image2.png')}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  reactLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,   // fixe pour tester
    height: 300,  // fixe pour tester
  },
});
