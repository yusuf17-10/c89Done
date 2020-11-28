import * as React from "react";
import {Text,View,TextInput,TouchableOpacity,StyleSheet, SnapshotViewIOS,Alert} from "react-native";
import firebase from "firebase";
import db from "../config";


export default class SettingScreen extends React.component{
    constructor(){
        super();
        this.state = {
            emailId: '',
            first_name:"",
            last_name:"",
            address:"",
            phone:"",
            docid:""
          };
    }

    updateUserDetails=()=>{
        db.collection("user").doc(this.state.docid).update({
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            address:this.state.address,
            phone:this.state.phone
        })
        Alert.alert("UPDATED SUCCESSFULLY");
    }
    


    getUserDetails(){
        var user = firebase.auth().currentUser
        var email = user.email
        db.collection("user").where("emailId","==",email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var data = doc.data()
                this.setState({
                    emailId:data.emailId,
                    first_name:data.first_name,
                    last_name:data.last_name,
                    address:data.address,
                    phone:data.phone,
                    docid:doc.id,
                })
            })
        })
    }
    componentDidMount(){
        this.getUserDetails()
    }

    render(){
        return(
            <View style={{justifyContent:"center",flex:1}}>
                <Text>SettingScreen</Text>

            <TextInput placeholder={"first_name"}
            style={styles.input}
            onChangeText={(text)=>{
                this.setState({
                    first_name:text
                })
            }}
            value={this.state.first_name}>
            </TextInput>

            <TextInput 
                placeholder={"last_name"}
                style={styles.input}
                onChangeText={(text)=>{
                    this.setState({
                        last_name:text
                    })
                }}
                value={this.state.last_name}>
            </TextInput>

            

            <TextInput placeholder={"address"}
            style={styles.input}
            multiline={true}
            onChangeText={(text)=>{
                this.setState({
                    address:text
                })
            }}
            value={this.state.address}>

            </TextInput>

            <TextInput placeholder={"PhoneNumber"}
            style={styles.input}
            keyboardType={"numeric"}
            onChangeText={(text)=>{
                this.setState({
                    phone:text
                })
            }}
            value={this.state.phone}>
            </TextInput>

        <TouchableOpacity style={styles.button}
        onPress={()=>{
            this.updateUserDetails()
        }}>
            <Text>Save</Text>
        </TouchableOpacity>

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