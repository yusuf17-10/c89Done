import * as React from "react";
import { render } from "react-dom";
import {SnapshotViewIOS, Text,TouchableOpacity,View} from "react-native";
import {AppStackNavigator} from "../Components/AppStackNavigator";
import firebase from "firebase";
import db from "../config";
import {Card} from "react-native-elements";

export default class ReceiverDetails extends React.Component{
    constructor(props){
        super(props);

        this.state={
            userId:firebase.auth().currentUser.email,
            receiverId:this.props.navigation.getParam("details")["userId"],
            requestId:this.props.navigation.getParam("details")["requestId"],
            bookName:this.props.navigation.getParam("details")["bookName"],
            reasonForRequest:this.props.navigation.getParam("details")["reasonToRequest"],

            receiverName:"",
            receiverAddress:"",
            receiverContact:"",
            receiverRequestDocId:""


        }
    }

    addNotification=()=>{
        var message=this.state.userId+" has shown intrest in donating the book";
        db.collection("allNotifications").add({
            targetedUserId:this.state.receiverId,
            donorId:this.state.userId,
            requestId:this.state.requestId,
            bookName:this.state.bookName,
            date:firebase.firestore.FieldValue.serverTimestamp(),
            notificationStatus:"unRead",
            message:message
        })
    }

    getReceiverDetails=()=>{
        db.collection("user").where("emailId","==",this.state.receiverId).get()
        .then(
            snapshot=>{
                snapshot.forEach(doc=>{
                    this.setState({
                        receiverName:doc.data().firstName,
                        receiverContact:doc.data().phone,
                        receiverAddress:doc.data().address

                    })
                })
            }
        )
    }

    updateBookStatus=()=>{
        db.collection("all_donations").add({
            bookName:this.state.bookName,
            requestId:this.state.requestId,
            requestedBy:this.state.receiverName,
            donorId:this.state.userId,
            requestStatus:"DonorIntrested"
        })
    }

    render(){
        return(
            <View>
                <Text>ReceiverDetailsScreen</Text>

                <View>

                <Text>
                    Name:{this.state.bookName}
                </Text>

                </View>
                

                <View>
                    {this.state.receiverId!== this.state.userId ?
                    (<TouchableOpacity onPress={()=>{
                        this.addNotification()
                        this.updateBookStatus()
                        this.props.navigation.navigate("MyDonations")
                    }}><Text>I Want To Donate</Text></TouchableOpacity>)
                :null}

                </View>
            </View>
        )
    }
}