import React, {useEffect, useState} from 'react';
import { ListItem, Icon  } from 'react-native-elements';
import {View, Text, SafeAreaView,FlatList,TouchableOpacity,Image} from 'react-native'
import Screen from '../constant/screen'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../constant/config'
const anh1 = require('../../assets/1.jpg')


  const Item = (props) => {
    const {item,index,navigation} = props
    const [data, setData] = useState({})
    // mới vào phần thông tin thời tiết thì sẽ gọi thằng này useEffect => thằng này gọi func fetchData
    useEffect(() => {
        fetchData()
    }, [])
    
    const fetchData = async() => {
       
    }
    
    
    const fixNumber =(name) => name.toFixed(2)
    const formatAddress = (name) => {
        let a = ''
        switch (name) {
            case 1:
                return a = 'Hà Nội'
            case 2:
                return a = 'Hồ Chí Minh'
            case 3:
                return a = 'Đà Nẵng'
            case 4:
                return a = 'Hàn Quốc'
            default:
                return a
                
        }
    }
    return(
        <TouchableOpacity onPress={() => props.navigation.navigate(Screen.DETAIL,{data: item})}>
            <ListItem  bottomDivider containerStyle={{height:200, justifyContent:'center'}}>
                <ListItem.Content>
                
                <Image style={{width:'100%', height:90}} source={{uri: item.img}}/>
                <View  style={{flexDirection:'column', paddingLeft:'38%'}}>
                <Text>Địa điểm: {formatAddress(item.address) || ''} </Text>
                {/* <Text>Nhiệt độ: {item.temperature} </Text>
                <Text>Sức gió: {item.wind_power} </Text> */}
                </View>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
        
    )
}
function Weather(props) {
    const handleLogout = () => {
        return props.navigation.navigate(Screen.LOGIN)
    }
    const [arr,setArr] = useState([])
    useEffect(() => {
        getWeather()
    },[])
    const getWeather = async() => {
        try {
            const data = await axios.get(`${url}/v1/weathers/get`)
            console.log(data.data)
            if(data.data) {
                setArr(data?.data?.data ? data.data.data : [])
            } else {
                setArr([])
            }
        } catch (error) {
            setArr([])
        }
    }
    return (
        <SafeAreaView style={{paddingTop:20}}>
            <View style={{
                height:49, width: '100%', 
                backgroundColor:'#2089DC',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}> 
            <View></View>
                <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Dự báo thời tiết</Text>
                <View style={{paddingRight:20}}>
                    <TouchableOpacity onPress={()=>handleLogout()}>
                    <Icon
                        type='ionicon'
                        name='arrow-redo-outline'
                        color='black' />
                    </TouchableOpacity>
                </View>
            </View>
           <View></View>
            <FlatList
                style={{marginBottom:50}}
                data={arr}
                renderItem={({item,index}) => <Item item={item} key={index} navigation={props.navigation}/>}
                keyExtractor={(item,index) => index.toString()}
            />
        </SafeAreaView>
    );
}

export default Weather;