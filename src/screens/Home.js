import React, { useRef, useState ,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    
    View,FlatList,SafeAreaView,
    ImageBackground,TouchableOpacity,ScrollView, Pressable
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import {Menu,AlertDialog,Button, Alert}  from 'native-base'
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { DeleteAllNotes, DeleteNote } from '../redux/notesActions';

const Home = ({navigation}) => {
    const noteList = useSelector((state) => state.notes)
    const dispatch = useDispatch()
    const onClose = () => setIsOpen(false)
    const [isChecked,setIsChecked] =useState(false)

const handleClickNote = (id) =>{
    navigation.navigate('Note',{noteId:id})
}
const handleDeleteAll = async () => {
    dispatch(DeleteAllNotes())
}
const handleDeleteNote = (id) => {
    dispatch(DeleteNote(id))
}
const changeCheck = (index) =>{
    noteList.map((item,i) =>{
        console.log("i",i)
    if(index === i){
        setIsChecked(!isChecked)
    }else if(index !== i) {
        console.log("not same")
        setIsChecked(isChecked)
    }

    

})
    // 
    }

    return (
       <SafeAreaView>
        <StatusBar style='auto'/>
        <ScrollView style={Styles.main}>
            <View style={Styles.header}>
                <Text style={Styles.headerText}>My Notes</Text>
            </View>
            <View style={Styles.subHeader}>
                <Menu 
                    placement='bottom left'
                     w='190' 
                     trigger={(triggerProps) => {
                    return(
                        <Pressable accessibilityLabel='More options menu' {...triggerProps}>
                            <MaterialCommunityIcons name='dots-vertical' size={24} color='#404040'/>
                        </Pressable>
                    );
                    }
                    }>
                <Menu.Item onPress={handleDeleteAll}>Delete All</Menu.Item>
                <Menu.Item onPress={()=>navigation.navigate('About')}>About</Menu.Item>
                </Menu>
            </View>
            {
                noteList.length > 0 ?(
                    <>
                    {
                        noteList.map((note,index) => (
            <View key={index} style={Styles.noteContainer}>
                    <View style={Styles.noteHeader}>
                        <Text style={Styles.noteDate}>{note.date}</Text>
                    </View>
                    
                    <TouchableOpacity 
                    style={{ alignItems:'center' }} 
                                        onPress={()=> handleClickNote(note.id)} >
                        <View style={Styles.noteCardWrapper}>
                            <View style={Styles.noteLeftContent}>
                                <View style={{ backgroundColor:'#427dde' ,height:55,width:5,borderRadius:50 }}></View>
                            </View>

                            {/* needed */}
                            <View style={Styles.noteMiddleContent}>
                            <Text  style={[Styles.topText, isChecked && Styles.CheckedText]}>{note.desc}</Text>
                            <Text style={Styles.bottomText}>{note.time}</Text>
                        </View>

                      
                      <CheckBox key={index} value={isChecked} 
                        onValueChange={()=> changeCheck(index)} boxType='circle'
                        />
                       
                        
                        
                        <TouchableOpacity style={Styles.noteRightContent} onPress={() => handleDeleteNote(note.id)}>
                            <FontAwesome5 name='trash' size={16} color='#404040'/>
                        </TouchableOpacity>

                          </View>
                    </TouchableOpacity>
                   
            </View>
                ))}
                </>
            ) : (
                <View style={{ display:'flex',alignItems:'center' }}>
                    <Text style={{ color:'#9f9f9f' }}>You dont have any notes yet ...</Text>
                </View>
            )}




<View style={Styles.addButtonView}>
            <TouchableOpacity style={Styles.addButton} onPress={()=> navigation.navigate('Note',{noteId:null})}>
                <Feather name='plus' size={20} color='white'/>
            </TouchableOpacity>
        </View>

        </ScrollView>
        
       </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f2f2f2',
    },
    main:{
        // flex:1,
        // paddingHorizontal:15,
        // paddingTop:30
    },
    header:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:40
    },
    headerText:{
        fontSize:28,
        fontWeight:'400',
        color:'#000'
    },
    subHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:15,
        marginBottom:15
    },
    noteContainer:{
        paddingBottom:30
    },
    noteHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:15,
        marginBottom:10
    },
    noteDate:{
        fontSize:16,
        fontWeight:'500',
        color:"#404040"
    },
    noteView:{
        fontWeight:'500',
        color:'#404040'
    },
    noteCardWrapper:{
        flexDirection:'row',
        backgroundColor:'#fff',
        padding:15,
        borderRadius:10,
        shadowColor:'#404040',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.1,
        shadowRadius:1,
        marginBottom:10,
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
    },
    noteLeftContent:{
        flex:0.1,
        alignItems:'center',
        justifyContent:'center'
    },

    noteMiddleContent:{
        flex:0.8
    },
    noteRightContent:{
        flex:0.1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    topText:{
        fontSize:16,
        fontWeight:'600',
        color:'#404040',
        marginBottom:6,
        // textDecorationLine: isChecked ? "line-through" : "none"
    },
    CheckedText: {
        textDecorationLine: "line-through",
    },
    middleText:{
        fontSize:12,
        fontWeight:'600',
        color:'#9f9f9f',
        marginBottom:10,
        
    },
    bottomText:{
        fontSize:12,
        color:'#9f9f9f',
    },
    addButtonView:{
        margin:10,
        position:'relative',
        display:'flex',
        alignItems:'flex-end',
        paddingHorizontal:20
    },
    addButton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:50,
        width:50,
        backgroundColor:'#427dde',
        padding:15,
        borderRadius:50,

    }
   
});


export default Home;