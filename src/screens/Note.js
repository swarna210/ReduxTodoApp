import React, { useRef, useState,useEffect } from 'react';
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
import { useSelector,useDispatch } from 'react-redux';
import { AddNote,EditNote } from '../redux/notesActions';

const Note = ({navigation,route}) => {
    const {noteId} = route.params
    const notesList = useSelector(state => state.notes)
    const dispatch = useDispatch()
    const richText = useRef();
    const scrollRef = useRef()
    const [descHTML,setDescHTML]  =useState('')
    const [selectedNote,setSelectedNote] = useState()

    const richTextHandler = (descriptionText)=>{
        if(descriptionText){
            setDescHTML(descriptionText);
        }else{
            setDescHTML('')
        }
    }
    useEffect(()=> {
      if(noteId){
         const selectedNotes = notesList.filter((e) =>e.id === noteId )[0]
         setSelectedNote(selectedNotes)
         setDescHTML(selectedNotes.note)
         setTopic(selectedNotes.topic)
      }else{
        console.log('no note')
      }
    },[noteId])
    const onSaveNote = () => {
      const replaceHTML = descHTML.replace(/<(.|\n)*?>/g,'').trim();
      const replaceWhitespaces = replaceHTML.replace(/&nbsp;/g,'').trim();
      const date = new Date();
      if(replaceWhitespaces.length <= 0 ){
        console.log('empty')
      }else{
        if(noteId){
            dispatch(EditNote(
                selectedNote.id,
                descHTML,
                date.toLocaleDateString(),
                date.toLocaleTimeString(),
                replaceWhitespaces.substring(0,40)
                ))
        }else{
            dispatch(
                AddNote(
                Date.now(),
                descHTML,
                
                date.toLocaleDateString(),
                date.toLocaleTimeString(),
                replaceWhitespaces.substring(0,40)
                )
            )
        }
        navigation.navigate('Home')
      }
    }
    return (
       <SafeAreaView style={Styles.container}>
        <StatusBar style='auto' />
            <View style={Styles.richTextContainer}>
                <View style={{ display:'flex' ,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={onSaveNote} style={{ 
                                        width:'85%',
                                        backgroundColor:'#427dde',
                                        borderRadius:10,
                                        paddding:50,
                                        height:'25%',
                                        alignItems:'center',
                                        justifyContent:'center'
                                     }}
                                        >
                        <Text style={{ textAlign:'center',color:'#e6e6e6',fontWeight:'600'}} >Save Changes
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
                                    onCursorPosition={(p) => scrollRef.current.scrollTo({y : p,animated:true})}
                        ></RichEditor>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={{ paddingHorizontal:20,marginTop:10,marginBottom:20,backgroundColor:'#d9d9d9' }}>
                    {/* <TextInput value={topic}
                    onChangeText={(txt) => setTopic(txt)}
                     placeholder='Enter title Here' 
                     placeholderTextColor={'gray'} style={{fontSize:16,paddingVertical:10}}/> */}
                </View>
                <RichToolbar 
                editor={richText}
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