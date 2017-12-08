import React, { Component } from 'react';
import { StyleSheet, View,Keyboard ,TextInput,Button,Alert, Text } from 'react-native';
import DatabaseUtils from './utils/DatabaseUtils' ; 

class App extends Component {

  state = {
    value : '',
    key:''
  }

  saveDataToDatabase = async ()=>{
    Keyboard.dismiss();
    value =   await DatabaseUtils.insertSingleRow( this.state.key,this.state.value);
    Alert.alert("database status",value);
  }

  retrieveDataFromDatabase = async () =>{
    Keyboard.dismiss();
    value =   await DatabaseUtils.selectSingleRow( this.state.key);
    Alert.alert("database value",value);
  }

  clearDatabase = async()=>{
    Keyboard.dismiss();
    DatabaseUtils.clearDatabase();
  }

  render() { 
    return (
      <View style={styles.container}>
      
          <View style= {styles.textInputContainer} >
              <Text style= {styles.titleItem}>
              AsyncStorage Database 
              </Text>
          </View>

          <View style= {styles.textInputContainer} >
              <TextInput 
              style = {styles.textInputItem}
              onChangeText ={ (text)=>{
                  this.setState({value:text})
              }}
              placeholder = {"insert data"}
              />
          </View>

          <View style= {styles.textInputContainer} >
              <TextInput 
              style = {styles.textInputItem}
              onChangeText ={ (text)=>{
                  this.setState({key:text})
              }}
              placeholder = {"insert key"}
              />
          </View>

          <View style= {styles.buttonContainer} >
              <Button 
              title = {"Save data"}
              style = {styles.buttonItem}
              onPress = {this.saveDataToDatabase}
              />
          </View>

          <View style= {styles.buttonContainer} >
              <Button 
              title = {"Get data"}
              style = {styles.buttonItem}
              onPress = {this.retrieveDataFromDatabase}
              />
          </View>

          <View style= {styles.buttonContainer} >
              <Button 
              title = {"Clear Database"}
              style = {styles.buttonItem}
              onPress = {this.clearDatabase}
              />
          </View>

      </View>
  )}
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  },
  titleItem:{
    fontSize:30,
    alignItems:'center',
    justifyContent:'space-between',
    color:'black',
    marginHorizontal: '10%'
  },
  textInputContainer:{
    margin:'5%'
  }
  ,
  textInputItem:{
    fontSize:20,   
  },
  buttonItem:{
    fontSize:20,
    width:30
  },
  buttonContainer:{
    margin:'5%',
    borderRadius:5 
  }
}); 

export default App;