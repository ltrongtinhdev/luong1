import React,{useState} from 'react';
import {View, Text, SafeAreaView,Dimensions, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import axios from 'axios'
import {url} from '../constant/config'
const {width,height} = Dimensions.get('screen')
function Register(props) {
    const [name,setName] = useState('')
    const [user,setUser] = useState('')
    const [pass,setPass] = useState('')
    const [cpass,setCPass] = useState('')

    const handleSubmit = async() => {

        // ấn vào nút đăng kí
        try {
            if(!name || !user || !pass || !cpass) {
                return Alert.alert("Vui long nhap day du thong tin")
            }
            // check các điều kiện họ tên user pass rỗng thì thông báo Vui long nhap day du thong tin
            if(pass !== cpass) {
                return Alert.alert("Maat khau khong trungf")
            }
            // nếu 2 pass không trùng
            const body = {
                fullName: name,
                userName: user,
                password: pass
            }
            const data = await axios.post(`${url}/v1/users/register`,body)
            if(data.data.code === 0) {
                setCPass('')
                setName('')
                setPass('')
                setUser('')
                // tạo thành công trên server nè
                return Alert.alert(
                    "Thong bao",
                    "Dang ki thanh cong",
                    [
                      
                      { text: "OK", onPress: () => props.navigation.goBack() }
                    ],
                    { cancelable: false }
                  );
            } else {
                // thất bại
                return Alert.alert("Dang ki khong thah cong")
            }
        } catch (error) {
            // Lỗi server không lấy dữ liệu
            return Alert.alert("Loi")
        }

    }
    return (
        <SafeAreaView style={{paddingTop:36,flex:1}}>
            <View style={{
                paddingTop:height/4.5,
                margin:30,
                flexDirection:'column',
                justifyContent:'center', 
                alignItems:'center'}}>
                    <Input
                    placeholder='Họ và tên'
                    inputStyle={{paddingLeft:15}}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    leftIcon={
                        <Icon
                        name='user'
                        size={24}
                        color='black'
                        />
                    }
                />
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
                <Input
                    placeholder='Nhập lại mật khẩu'
                    inputStyle={{paddingLeft:15}}
                    value={cpass}
                    onChangeText={(text) => setCPass(text)}
                    leftIcon={
                        <Icon
                        name='lock'
                        size={24}
                        color='black'
                        />
                    }
                />
                <Button
                    onPress={handleSubmit}
                    buttonStyle={{width:220}}
                    title="Đăng kí"
                />
                <Divider style={{ height:10 }} />
                <Button
                    onPress={() => props.navigation.goBack()}
                    buttonStyle={{width:220}}
                    title="Quay lại đăng nhập"
                />
            </View>
        </SafeAreaView>
    );
}

export default Register;