import * as React from "react";
import {View,FlatList,StyleSheet,Text} from "react-native";
import {Icon,ListItem} from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../Components/MyHeader";
import SwipeableFlatList from "../Components/SwipebleFlatList";
import {RFValue} from "react-native-responsive-fontsize"
export default class NotificationsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]

        }
        this.notificationRef=null
    }
    getNotifications=()=>{
        this.requestRef=db.collection("allNotifications").where("notificationStatus","==","unread")
        .where("targetedUserId","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications=[]
            snapshot.docs.map(doc=>{
                var notification=doc.data()
                notification["docId"]=doc.id
                allNotifications.push(notification)
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }

    componentDidMount(){
        this.getNotifications()
    }

    componentWillUnmount(){
        this.notificationRef()
    }

    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>(
        <ListItem key={i}
        title={item.bookName}
        leftElement={<Icon
        name="book"
        />}
        titleStyle={{color:"black",fontWeight:"bold"}}
            subtitle={item.message}
            bottomDivider
        />
             
        
    )
    render(){
        return(
          <View style={{flex:1}}>
           
            <View style={{flex:1}}>
                
              {
                this.state.allNotifications.length === 0
                ?(
                  <View style={{flex:1}}>
                    <Text style={{ fontSize: 20}}>You Have No Notifications</Text>
                  </View>
                )
                :(
                 <SwipeableFlatList
                 allNotifications={this.state.allNotifications}
                 />
                )
              }
            </View>
          </View>
        )
      
    }
    
}

const styles = StyleSheet.create({
  button:{
      backgroundColor: '#81c0d4',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginTop:RFValue(60),
      borderWidth:2,
      width:150,
      height:50,
  },
  text:{
      justifyContent:"center",
      marginTop:RFValue(30),
      fontSize:10
  }
})