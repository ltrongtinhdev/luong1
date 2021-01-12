import React from 'react';
import {View, Text,Image} from 'react-native'
function Detail(props) {
    const {data} = props.route.params
    console.log(data)
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
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Image style={{width:'100%', height:90, marginBottom:30}} source={{uri: data.img}}/>
                <View  style={{flexDirection:'column'}}>
                <Text>Địa điểm: {formatAddress(data.address) || ''} </Text>
                <Text>Nhiệt độ: {data.temperature} </Text>
                <Text>Sức gió: {data.wind_power} </Text>
                </View>
        </View>
    );
}

export default Detail;