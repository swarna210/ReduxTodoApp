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
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { DeleteAllNotes, DeleteNote } from '../redux/notesActions';

const Home = ({navigation}) => {
    const noteList = useSelector((state) => state.notes)
    const dispatch = useDispatch()
    const [sortedNotes,setSortedNotes] = useState([])
    const[isOpen,setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef(null)
// 

const sort = (arr) => {
    var date = '';
    var sorted = [];
    var temp = [];
    arr.forEach((e.index) => {
        if(index === 0) {
            temp.push(e)
            date = e.date
            if(index ===  arr.length -1){
                const ob = {
                    day:date,
                    notes:temp
                }
                sorted.push(ob)
            }
        } else{
            if(e.date === date){
                temp.push(e)
                if(index === arr.length -1){
                    const ob = {
                        day:date,
                        notes:temp
                    };
                    sorted.push(ob)
                }
            }else{
                const ob = {
                    day:date,
                    notes:temp
                };
                sorted.push(ob)
                temp = []
                date =  e.date
                temp.push(e)
                if(index ===  arr.length -1){
                    const ob = {
                        day:date,
                        notes:temp
                    };
                    sorted.push(ob);
                }
            }
        }
    });
    return sorted;
 };


// 
useEffect(() =>{
    setSortedNotes(sort(notesList))
},[noteList])
const handleClickNote = (id) =>{
    navigation.navigate('Note',{noteId:id})
}

const handleDeleteAll = async () => {
    dispatch(DeleteAllNotes())
    onClose()
}
const handleDeleteNote = (id) => {
    dispatch(DeleteNote(id))
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
                <Menu.Item onPress={() => setIsOpen(!isOpen)}>Delete All</Menu.Item>
                <Menu.Item onPress={()=>navigation.navigate('About')}>About</Menu.Item>
                </Menu>
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <Alert.Content>
                        <AlertDialog.CloseButton/>
                        <AlertDialog.Header>Delete All Notes</AlertDialog.Header>
                        <AlertDialog.Body>
                            <Text style={{ color:'#404040' }}>
                                This will remove all your notes from this app.
                            </Text>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                                <Button variant="unstyled" 
                                        colorScheme='coolGrey' 
                                        onPress={onClose}
                                        ref={cancelRef}>
                                                Cancel
                                </Button>
                            <Button colorScheme='danger' onPress={handleDeleteAll}>Delete</Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                        </Alert.Content>
                    </AlertDialog>
            </View>
            {
                noteList.length > 0 ?(
                    <>
                    {
                        sortedNotes.map((note,index) => (
            <View key={index} style={Styles.noteContainer}>
                    <View style={Styles.noteHeader}>
                        <Text style={Styles.noteDate}>{note.day}</Text>
                        <Text style={Styles.noteView}>View All</Text>
                    </View>
                    {

                    note.notes.map((m,idx) =>(
                    <TouchableOpacity key= {idx} style={{ alignItems:'center' }} onPress={()=> handleClickNote(m.id)} >
                        <View style={Styles.noteCardWrapper}>
                            <View style={Styles.noteLeftContent}>
                                <View style={{ backgroundColor:'#427dde' ,height:55,width:5,borderRadius:50 }}></View>
                            </View>

                            <View style={Styles.noteMiddleContent}>
                            <Text style={Styles.topText}>{m.topic}</Text>
                            <Text style={Styles.middleText}>{m.desc}</Text>
                            <Text style={Styles.bottomText}>{m.time}</Text>
                        </View>
                        <TouchableOpacity style={Styles.noteRightContent} onPress={() => handleDeleteNote(m.id)}>
                            <FontAwesome5 name='trash' size={16} color='#404040'/>
                        </TouchableOpacity>
                          </View>
                    </TouchableOpacity>
                    ))}
            </View>
            ))}
            </>
            ) : (
                <View style={{ display:'flex',alignItems:'center' }}>
                    <Text style={{ color:'#9f9f9f' }}>You dont have any notes yet ...</Text>
                </View>
            )}
        </ScrollView>
        <View style={Styles.addButtonView}>
            <TouchableOpacity style={Styles.addButton} onPress={()=> navigation.navigate('Note',{noteId:null})}>
                <Feather name='plus' size={20} color='white'/>
            </TouchableOpacity>
        </View>
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
        fontWeight:'400'
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
        marginBottom:6
    },
    middleText:{
        fontSize:12,
        fontWeight:'600',
        color:'#9f9f9f',
        marginBottom:10
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