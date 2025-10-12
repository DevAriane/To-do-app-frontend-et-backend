import React, { useEffect } from "react";
import { View, ActivityIndicator, TouchableOpacity ,Image,StyleSheet, StatusBar,Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import api from "@/src/api";

 


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
    <SafeAreaView style={styles.area}> 
      <StatusBar backgroundColor="#fff0f6"/>
    <View style={styles.reactLogo}>

 <Image 
   style={{width:'80%',height:'40%'}} 
   source={require('../assets/images/Pasted3.png')} 
   resizeMode='contain'
   />

    <TouchableOpacity style={styles.button} onPress={()=> {
 checkAuth();
    }}><Text style={styles.buttonText}>  Get Startet</Text></TouchableOpacity>
     
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area:{
    flex:1,
  backgroundColor: "#fff0f6",},
  reactLogo: {
    width:"100%",
    height:"100%",
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:  "#fff0f6",
  },
    button: {
    backgroundColor:"#ff80ab", // vert moderne
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30, // arrondi
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // ombre Android
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },

  image:{

  }

});