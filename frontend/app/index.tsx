
import { StatusBar } from 'expo-status-bar';
import {  StyleSheet ,Image,View,Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Animated,Easing,} from "react-native";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function HomeScreen() {

   const router = useRouter();
  const logoScale = new Animated.Value(0);

  useEffect(() => {
    const loadApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        router.replace('/onboarding');
      } catch (error) {}
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
   <SafeAreaView>
    <StatusBar backgroundColor='white'/>
   
    <View style={styles.reactLogo}> 

       <Animated.View
          style={ { transform: [{ scale: logoScale }] }}
        >
   <Image 
   style={{width:'80%',height:'40%'}} 
   source={require('../assets/images/image2.png')} 
   resizeMode='contain'
   />
  </Animated.View>
   </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    width:"100%",
    height:"100%",
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
  },

  image:{

  }

});
