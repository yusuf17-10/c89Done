import * as React from 'react';
import {View,Text,StyleSheet,TextInput,KeyboardAvoidingView,TouchableOpacity,Alert} from 'react-native';
import firebase from "firebase";
import db from "../config"
import MyHeader from "../Components/MyHeader";
export default class BookRequest extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            bookName:"",
            reasonToRequest:""

        }

    }

    createuniqueId(){
        return Math.random().toString(36).substring(7);
    }

    addRequest=(bookName,reasonToRequest)=>{
        var userId=this.state.userId
        var randomRequestId=this.createuniqueId();
        db.collection("requestedBooks").add({
            userId:userId,
            bookName:bookName,
            reasonToRequest:reasonToRequest,
            requestId:randomRequestId
        })
        
        return Alert.alert("Book Requested sucssesfully");
    }

render(){
    return(
        <View style={styles.container}>
              <MyHeader
            title={"Book Request"}
            navigation={this.props.navigation}
            />
            <Text>BookRequest Screen</Text>
            
            <KeyboardAvoidingView>
                <TextInput style={styles.input} 
                placeholder="Enter Book Name"
                onChangeText={(text)=>{
                    this.setState({bookName:text});
                }}
                
                value={this.state.bookName}
                />

                <TextInput style={[styles.input,{height:200}]} 
                multiline
                numberOfLines={8}
                placeholder="Reason To Request"
                onChangeText={(text)=>{
                    this.setState({reasonToRequest:text});
                }}
                
                value={this.state.reasonToRequest}
                />
                <TouchableOpacity style={styles.button}

                onPress={()=>{
                    this.addRequest(this.state.bookName,this.state.reasonToRequest)
                }}>
                    <Text>Request</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      justifyContent: 'center',
      alignItems: 'center'
    },
    
    input: {
      backgroundColor: 'green',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 2,
      marginTop: 10,
      borderWidth:2,
      width:200,
      height:50,
    },
    button: {
      backgroundColor: 'green',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 10,
      borderWidth:2,
      width:150,
      height:50,
    },
  });
  
