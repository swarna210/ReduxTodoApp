import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    
    View,FlatList,SafeAreaView,
    ImageBackground,TouchableOpacity,ScrollView, Pressable
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Menu,AlertDialog,Button, KeyboardAvoidingView}  from 'native-base'
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import {actions,RichEditor,RichToolbar} from 'react-native-pell-rich-editor'
import { Platform } from 'react-native';
import { act } from 'react-test-renderer';


const Note = ({navigation}) =>{
    const richText = useRef();
    const scrollRef = useRef()
    const [descHTML,setDescHTML]  =useState('')
    const [title,setTitle] = useState('')
    const richTextHandler = (descriptionText)=>{
        if(descriptionText){
            setDescHTML(descriptionText);
        }else{
            setDescHTML('')
        }
    }
    return (
       <SafeAreaView style={Styles.container}>
        <StatusBar style='auto' />
            <View style={Styles.richTextContainer}>
                <View style={{ display:'flex' ,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity style={{ 
                                        width:'85%',
                                        backgroundColor:'#427dde',
                                        borderRadius:10,
                                        paddding:50,
                                        height:'25%',
                                        alignItems:'center',
                                        justifyContent:'center'
                                     }}
                                        >
                        <Text style={{ textAlign:'center',color:'#e6e6e6',fontWeight:'600'}}>Save Changes
                        </Text>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={100} 
                behaviour={Platform.OS === 'ios' ? 'paddding':'height'} 
                style={{ flex:1 }}
                >
                    <ScrollView ref={scrollRef} style={Styles.noteMain}>
                        <RichEditor placeholder='Type Here'
                                    initialContentHTML={descHTML}
                                    ref={richText}
                                    onChange={richTextHandler}
                                    androidHardwareAccelerationDisabled={true}
                                    initialFocus
                                    onCursorPosition={(p) => scrollRef.current.scrollTo({y : p+30,animated:true})}
                        ></RichEditor>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={{ paddingHorizontal:20,marginTop:10,marginBottom:20,backgroundColor:'#d9d9d9' }}>
                    <TextInput placeholder='Enter title Here' placeholderTextColor={'gray'} style={{fontSize:16,paddingVertical:10}}/>
                </View>
                <RichToolbar editor={richText}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.setStrikethrough,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.undo,
                    actions.redo,
                    actions.keyboard

                ]}
                ></RichToolbar>
            </View>
            
       </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
   container:{
   flex:1,
   backgroundColor:'#fff',
   paddingBottom:10,

   },
   noteMain:{
    backgroundColor:'white',
    paddingHorizontal:10,
    
   },
   richTextContainer:{
    display:'flex',
    flex:1,
    flexDirection:'column-reverse',
    marginBottom:10
   }
});


export default Note;