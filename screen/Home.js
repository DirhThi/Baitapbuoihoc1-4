import React from 'react';
import  { useState,setState,useEffect,useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import CheckBox from '@react-native-community/checkbox';
import product from '../product';
import themeContext from './themeContext';


const Home = () => {
  const theme=useContext(themeContext);
  const [mode,setMode] = useState(false);
  const [data,setdata] = useState(product);
  let [favId,setfavId] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let favData=data.map(temp => favId.includes(temp.id) ? {
      ...temp,selected : true } : temp
    )
    setdata([...favData])
  },[favId])

  const getData = async () => {
    try {
      const storedFavoriteIds = await AsyncStorage.getItem('@fav_id');
      if (storedFavoriteIds !== null) {
        setfavId(JSON.parse(storedFavoriteIds));
      }

    } catch (e) {
      console.log('Error :', e);
    }
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@fav_id', value)
    } catch (e) {
      // saving error
    }
  }

  const onChangeValue = async (item) => {
    let favData=data.map(temp => temp.id===item.id ? {
      ...temp,selected : item.selected ? false : true } : temp
    )
    setdata([...favData])
    favId=[];
    favData.forEach(item => {
      if(item.selected==true)
      {
        favId.push(item.id);
      }
    });
    try {
      await AsyncStorage.setItem('@fav_id', JSON.stringify(favId));
      console.log('saved')
    } catch (e) {
      console.log('Error :', e);
    }
    console.log(favId)
  }

  const renderItem = ({ item}) => {
    return (
      <View style={styles.item} /*onPress={()=>navigation.navigate('screen2',{id:item.id,namepr:item.nameProduct,price:item.price,image:item.image, description:item.description})}*/>
        <View style={{ alignItems:'center',justifyContent:'space-between', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{width:80 , height:80 ,margin:10,borderRadius:10}} source={{uri: item.image }}/>
            <View style={{ flexDirection: 'column' ,justifyContent:'center' }}>
            <Text >{item.nameProduct}</Text>
              <Text >{item.price}$</Text>
            </View>
          </View> 
          <CheckBox
            disabled={false}
            value={item.selected}
            onValueChange={() => onChangeValue(item)}
            
          />
        </View>
       
      </View>
      
    );
  }

return (
<SafeAreaView
  style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>

 <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
</SafeAreaView>
);

};

const styles = StyleSheet.create({
  item: {
      width:300,
      height:100,
      backgroundColor:'#CCCCCC',
      borderRadius:10,
      margin:8,
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


export default Home;