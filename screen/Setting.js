import React from 'react';
import themeContext from './themeContext';
import  { useState,setState,useEffect } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  Button,
  Switch,
} from 'react-native';
import { useContext } from 'react';

const Setting = () => {
  const [mode,setMode] = useState(false)
  const theme=useContext(themeContext);

   return (
    <View style={[styles.container,]}>
    <Text style={[styles.text ,]}>Use Dark Mode? 🌚</Text>
    <Switch style={{width:60,height:60}} value={mode} onValueChange={(value) => { 
      setMode(value);
      EventRegister.emit("changeTheme",value);
      }} />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize:20,

    color: '#000000',
  },
  button: {
    color: '#000000',
  },
});

export default Setting;