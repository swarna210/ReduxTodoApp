
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,KeyboardAvoidingView,Platform,
  useColorScheme,
  View,ImageBackground
} from 'react-native';

import Home from './src/screens/Home'
import About from './src/screens/About'
import Note from './src/screens/Note';

import { NativeBaseProvider } from 'native-base';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import {store,persistor} from './src/redux/store'

const Stack = createStackNavigator()
function MyStack(){
  return(
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
      <Stack.Screen name='About' component={About} options={{headerShown:false}}/>
      <Stack.Screen name='Note' component={Note} options={{headerShown:false}}/>
  </Stack.Navigator>
  )

}
export default function App() {
  

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
      </PersistGate>
      </Provider>
    </NativeBaseProvider>
    
  );
}

const Styles = StyleSheet.create({
  
});


