import React from 'react';
import  { useState,setState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  Button,
} from 'react-native';
import product from '../product';
import { useIsFocused } from '@react-navigation/native';


const Fav = () => {
  const [data,setdata] = useState(product);
  let [favdata,setfavdata] = useState([]);
  let [favId,setfavId] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  useEffect(() => {
    let favData=data.map(temp => favId.includes(temp.id) ? {
      ...temp,selected : true } : {...temp,selected : false }
    )
    setdata([...favData])
  },[favId])

  useEffect(()=>{
    var favData=[];
    data.forEach(item => {
      if(item.selected==true)
      {
        favData.push(item);
      }
    });

    setfavdata(favData);
  },[data])

  
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
          
        </View>
       
      </View>
      
    );
  }

return (
<SafeAreaView
  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

 <FlatList
      data={favdata}
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

export default Fav;