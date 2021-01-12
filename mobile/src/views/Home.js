import React,{useEffect, useState} from 'react';
import {View, Text,SafeAreaView,FlatList, TouchableOpacity} from 'react-native'
import { FAB, Portal, Provider} from 'react-native-paper';
import { ListItem, Avatar,Button, Icon  } from 'react-native-elements';
import axios from 'axios'
import {url} from '../constant/config'
import Screen from '../constant/screen'
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Item = (props) => {
    const {item,index,navigation,in1} = props
    return(
        <TouchableOpacity key={index} onPress={() => navigation.navigate(Screen.NEWS,
        {link: item.link,isoDate:item.isoDate,in1:in1,title: item.title,us: 'home'})}>
            <ListItem  bottomDivider>
                <Avatar source={{uri: item.img}} />
                <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>Bài viết lúc: {dayjs(item.isoDate).format('YYYY-MM-DD HH:hh:mm')}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
        
    )
}
function Home(props) {
    const [state, setState] = useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const [isNews, setNews] = useState(0)
    const [arrData ,setArrData] = useState([])
    const [status,setStatus] = useState(0)
    // mới vào isNews = 0 nó sẽ gọi callApi thì qr  =  v1/links/vne like api get sẽ là ${url}/${qr} cái https://weather-node-paper.herokuapp.com/v1/links/vne // chút nữa sẽ

    // là http://ip máy e:3000/v1/links/vne
    useEffect(() => {
        callApi()
    },[isNews])
    const callApi = async() => {
        try {
            
            
            
            //isNews === 1 không voà 2 cái này thì nó mặc định vào cái này v1/links/tt -> http://ip máy e:3000/v1/links/tt
            const data = await axios.get(`${url}/v1/links/news`)// sau đó lại set lại  setArrData giờ sẽ là dữ liệu của báo tuổi trẻ // data test thử
            if(data.data.data) {
                return  setArrData(data.data.data) // khi có dư liệu sẽ đc lưu vào arrData thấy không

            }else {
                return  setArrData([])  //
            }
            
        } catch (error) {
            setArrData([])
        }
    }
    const handleLogout = () => {
        AsyncStorage.getItem(Screen.STORAGE_KEY).then((result) => {
            console.log(result)
            if(result) {
                AsyncStorage.removeItem(Screen.STORAGE_KEY)
                .then((rs1) => {
                    console.log(rs1)
                })
                .catch((e) =>console.log(e))
            }
        })
        return props.navigation.navigate(Screen.LOGIN)
    }
    // khi bấm vàonút màu xanh nó chính là cái FAB.Group
    // Mặc định ban đầu isNews là 0
    // khi chọn vào nút Báo Tuổi Trẻ (emal) thì isNews sẽ chuyenr sang 1(setNews(1)) thì nó sẽ tự động gọi useEffect callApi() 
    return (
        <SafeAreaView style={{flex: 1,paddingTop:20}}>
            <View style={{
                height:49, width: '100%', 
                backgroundColor:'#2089DC',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}> 
            <View></View>
                <View>
                <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Báo </Text>
                
                </View>
                <View style={{paddingRight:20}}>
                    <TouchableOpacity onPress={() => handleLogout()}>
                    <Icon
                        type='ionicon'
                        name='arrow-redo-outline'
                        color='black' />
                    </TouchableOpacity>
                </View>
            </View>
            
            <View>
            <FlatList
                style={{marginBottom:50}}
                data={arrData} // show  arrData lên FlatList đó mỗi bài viết là 1 phần tử của arrData
                renderItem={({item,index}) => <Item in1={isNews} key={index} item={item} index={index} navigation={props.navigation}/>}
                keyExtractor={(item,index) => index.toString()}
            />
            
            </View>
            

        </SafeAreaView>
    );
}

export default Home;