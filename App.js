import  { useState,setState ,useEffect} from 'react';
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Button,
  Alert,
  FlatList,
 
} from 'react-native';
import {NavigationContainer,DefaultTheme,DarkTheme,} from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screen/Home';
import Fav from './screen/Fav';
import Setting from './screen/Setting';
import { useColorScheme } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import {themeContext} from './screen/themeContext';
import {theme} from  './screen/theme';
import ThemeProvider from '@react-navigation/native';


const Tab=createBottomTabNavigator();


const App = () => {
  const[mode,setMode] = useState(false)

  useEffect(() => {
    let eventListener = EventRegister.addEventListener("changeTheme",(data) => {
      setMode(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    }
  })
  
  return (
      <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme} >
       <Tab.Navigator  screenOptions={({route}) => ({
     
      
    
    tabBarStyle:{
      position:'absolute',
      bottom:15,
      left:10,
      right:10,
      elevation:0,
      backgroundColor:'#ffffff',
      borderRadius:15, 
      height:60,
    },
    tabBarShowLabel:true,
    tabBarLabelStyle:{
      fontSize:16,
      marginBottom:10
    },
    tabBarIconStyle:{display:'none'}
    
    })}
    >
      <Tab.Screen name='Trang chủ' component={Home}/>
      <Tab.Screen name='Yêu thích' component={Fav}/>
      <Tab.Screen name='Cài đặt' component={Setting}/>

      </Tab.Navigator>
   </NavigationContainer>
    
    );
    };


    

    function Screen1({navigation}) {

      
    }
   /* function Screen2({navigation,route}) {

      const { id, namepr,price,image } = route.params

    return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <View style={styles.item}>
            <View style={{flexDirection: 'row'}}>
              
              <Image style={{width:100 , height:100,}} source={{uri: JSON.stringify(image)}}/>
              <View style={{flexDirection: 'column' ,justifyContent:'center' }}>
              <Text >{JSON.stringify(namepr)}</Text>
                <Text >{JSON.stringify(price)}</Text>
              </View>
            </View>
      </View>
      <View>
        <Text>description : </Text>
        <Text>
        {JSON.stringify(price)}
        </Text>
      </View>

    </SafeAreaView>
    );
    }    */

const styles = StyleSheet.create({
  item: {
      width:300,
      height:100,
      backgroundColor:'#CCCCCC',
      borderRadius:10,
      margin:10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
