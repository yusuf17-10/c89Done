import * as React from "react";
import {StyleSheet,TouchableOpacity,View,Text} from "react-native";
import {Avatar} from "react-native-elements";
import {DrawerItems} from "react-navigation-drawer";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-image-picker";
import db from "../config";



export default class SideBarMenu extends React.Component{
    state = {
        userId:firebase.auth().currentUser.email,
        image:"#",
        name:"",
        docId:""
    }

    getUserProfile(){
        db.collection("user").where("emailId","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            snapshot.forEach(doc => {
                this.setState({name:doc.data().firstName +" "+doc.data().lastName})
            });
        })
    }


    fetchImage=(imageName)=>{
        var storageName = firebase.storage().ref().child("user_profiles/" +imageName);
        storageName.getDownloadURL().then((url)=>{
            this.setState({image:url})
        })
        .catch((error)=>{
            this.setState({image:"#"})
        })
    }
        componentDidMount(){
            this.getUserProfile();

        }

    uploadImage=async(uri,imageName)=>{
        var response = await fetch(uri);
        var blob = await response.blob();
        var ref = firebase.storage().ref().child("user_profiles/" +imageName);
        return ref.put(Blob).then((response)=>{
           // this.fetchImage(imageName)
        })


    }

    selectPicture=async()=>{
        
        const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if(!cancelled){
            this.uploadImage(uri,this.state.userId)
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View>
                <Avatar
                    rounded
                    source={{
                        
                        uri : this.state.image

                    }}
                    size = {"xlarge"}
                    onPress={()=>{
                        this.selectPicture()
                    }}
                    showEditButton/>
                    <Text>{this.state.name}</Text>
                </View>
                <View style={{flex:1,backgroundColor:"aqua",fontSize:10,justifyContent:"center",alignItems:"center"}}>

                    <DrawerItems {...this.props}/>
                    
                </View>
            <View>
                <TouchableOpacity style={{width:100,height:50,backgroundColor:"blue",borderRadius:10}}
                onPress={()=>{
                    this.props.navigation.navigate("WelcomeScreen")
                    firebase.auth().signOut
                }}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}
