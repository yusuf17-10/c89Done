import * as React from "react";
import {View,FlatList,StyleSheet,Text} from "react-native";
import {Icon,ListItem} from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../Components/MyHeader";

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
            <MyHeader
            title={"Notifications"}
            navigation={this.props.navigation}
            />
            <View style={{flex:1}}>
                
              {
                this.state.allNotifications.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>You Have No Notifications</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allNotifications}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      
    }
    
}