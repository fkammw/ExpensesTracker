

import React from "react"; 
import { Text, View } from "react-native"; 
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
  
const Home = () => { 
  return ( 
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}> 
      <Text style={{ color: "#006600", fontSize: 40 }}>Home Screen!</Text> 
      <Foundation name="home" size={24} color="black" /> 
    </View> 
  ); 
}; 
  
export default Home; 