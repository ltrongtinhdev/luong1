import React,{useEffect,useState} from 'react';
import {View, Text} from 'react-native'
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Screen from '../constant/screen';
import dayjs from 'dayjs'
import axios from 'axios'
import {url} from '../constant/config'
function News(props) {
    const {link} = props.route.params
    
    
    
    return (
        <View style={{flex: 1}}>
            <WebView source={{ uri: link }}/>
        </View>
    );
}

export default News;