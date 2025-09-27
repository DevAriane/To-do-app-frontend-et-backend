import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator, Alert ,Image,StyleSheet} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


export default function TaskDetailScreen() {

 

  return (
    <SafeAreaView style={styles.area}>
    <View style={styles.container}>
      <Text style={{color:"#d6336c",fontSize:20,fontWeight:'900'}}>
        task.title
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        task.description || "Aucune description
      </Text>
      <Image source={require('../assets/images/Paste.png')} style={{height:"40%",width:"80%"}} resizeMode="contain"/>
      <Button
        title="non terminée terminée"
    
      />
    </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    area:{
        flex:1,
    },
    container:{
        display:'flex',
        justifyContent:"center",
        alignItems:'center',
        height:'100%',
        width:'100%',
        backgroundColor:"white"
    }
});