import * as React from "react";
import {StyleSheet,TouchableOpacity,View,Text} from "react-native";
import {DrawerItems} from "react-navigation-drawer";
import firebase from "firebase";

export default class SideBarMenu extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
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