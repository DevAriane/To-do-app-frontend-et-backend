import React, { useEffect } from "react";
import { View, ActivityIndicator, TouchableOpacity ,Image,StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          router.replace('/TaskListScreen'); // utilisateur déjà connecté
        } else {
          router.replace('/LoginScreen'); // pas connecté
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token", error);
        router.replace('/LoginScreen');
      }
    };

   
  

  return (
    <SafeAreaView>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

 <Image 
   style={{width:'80%',height:'40%'}} 
   source={require('../assets/images/Pasted.png')} 
   resizeMode='contain'
   />

    <TouchableOpacity onPress={()=> {
 checkAuth();
    }}>Get Startet</TouchableOpacity>
     
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