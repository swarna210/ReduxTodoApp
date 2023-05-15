import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    Image,
    View,FlatList,SafeAreaView,
    ImageBackground,TouchableOpacity,ScrollView, Pressable
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Menu,AlertDialog,Button}  from 'native-base'
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import logo from '../../assets/logo.png'

const About = ({navigation}) => {
    
    return (
       <View style={Styles.container}>
          <View style={{ display:'flex',alignItems:'center' }}>
            <View style={{ padding:20,display:'flex',alignItems:'center',
                   backgroundColor:'#fff',maxWidth:200,borderRadius:10,marginBottom:20}}>
                    <Image source={logo} style={{width:150,height:150,borderRadius:10,opacity:0.7}}/>
                   </View>
                   <Text style={Styles.aboutText}>
This app is a simple notepad app multiple useful features.
You can use it to write notes,memos,messages,shopping list and to do lists.
It works as a simple word processing progtam and gives you the flexibility to type in whatever
you need.
        </Text>
          </View>
          <Text style={Styles.versionText}>Version 1.0.0</Text>
       </View> 
    );
}

const Styles = StyleSheet.create({
    container:{
       flex:1,
       padding:20,
    },
   aboutText:{

   }
});


export default About;