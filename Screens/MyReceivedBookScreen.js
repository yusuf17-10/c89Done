import * as React from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet} from "react-native";
import {ListItem} from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../Components/MyHeader";

export default class MyReceivedBookScreen extends React.Component{

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            receivedBookList:[]
        }
    
        this.requestRef=null
    }

    getReceivedBookList=()=>{
        this.requestRef = db.collection("requestedBooks").where("userId","==",this.state.userId)
        .where("bookStatus","==","received").onSnapshot((snapshot)=>{
            var receivedBookList = snapshot.docs.map((doc)=>{
                doc.data()
            })
            this.setState({
                receivedBookList:receivedBookList
            })
        })
    }
    componentDidMount(){
        this.getReceivedBookList()
    }

    componentWillUnmount(){
        this.requestRef()
    }

    keyExtracter=(item,index)=>index.toString()

    renderItem=({item,i})=>{
        <ListItem
        title={item.bookName}
        key={i}
        subtitle={item.bookStatus}
        titleStyle={{color:"black", fontWeight:"bold"}}
        bottomDivider
        />
    }
    
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    {
                        this.state.receivedBookList===0 ? 
                        (
                            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                            <Text>
                             List Of All Received Books
                            </Text>
                            </View>
                        ):(
                            <FlatList
                            data={this.state.receivedBookList}
                            keyExtractor={this.keyExtracter}
                            renderItem={this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }

}



