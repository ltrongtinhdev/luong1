import React,{useState,useEffect} from 'react';
import {View, Text, SafeAreaView,Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input,Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import Screen from '../constant/screen'
const {width,height} = Dimensions.get('screen')
import axios from 'axios'
import {url} from '../constant/config'
function Login(props) {
    const [user,setUser] = useState('')
    const [pass, setPass] = useState('')
    
    
    
    
    const handleLogin = async() => {
        
        try {
            if(!user || !pass) {
                return Alert.alert("Vui long k bo trong user or pass")
            }
            
            const body = {
                username: user,
                password: pass
            }
            //return props.navigation.navigate(Screen.HOME)
            const data = await axios.post(`${url}/v1/users/login`,JSON.stringify(body),
            {headers:{"Content-Type" : "application/json"}})
            if(data?.data?.code === 0) {
                setUser('')
                setPass('')
                return props.navigation.navigate(Screen.HOME)
            } else {
                return Alert.alert("Tai khoan hoac mat khau khong dung")
            }
        } catch (error) {
            console.log(error)
            return Alert.alert("Tai khoan hoac mat khau khong dung")
        }

        // cái này khi ấn vào nút button đăng nhập
    }
    return (
        <SafeAreaView style={{paddingTop:36,flex:1}}>
            <View style={{
                paddingTop:height/4,
                margin:30,
                flexDirection:'column',
                justifyContent:'center', 
                alignItems:'center'}}>
                <Input
                    placeholder='Tài khoản'
                    inputStyle={{paddingLeft:15}}
                    value={user}
                    onChangeText={(text) => setUser(text)}
                    leftIcon={
                        <Icon
                        name='user'
                        size={24}
                        color='black'
                        />
                    }
                />
                <Input
                    placeholder='Mật khẩu'
                    inputStyle={{paddingLeft:15}}
                    value={pass}
                    onChangeText={(text) => setPass(text)}
                    leftIcon={
                        <Icon
                        name='lock'
                        size={24}
                        color='black'
                        />
                    }
                />
                <Button
                    onPress={handleLogin}
                    buttonStyle={{width:220}}
                    title="Đăng nhập"
                />
                <Divider style={{ height:10 }} />
                <Button
                    onPress={() => props.navigation.navigate(Screen.REG)}
                    buttonStyle={{width:220}}
                    title="Đăng kí"
                />
            </View>
        </SafeAreaView>
    );
}

export default Login;