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
            receiverId:this.props.navigation.getParam("details")["userid"],
            requestId:this.props.navigation.getParam("details")["requestId"],
            bookName:this.props.navigation.getParam("details")["bookName"],
            reasonForRequest:this.props.navigation.getParam("details")["reasonToRequest"],

            receiverName:"",
            receiverAddress:"",
            receiverContact:"",
            receiverRequestDocId:""


        }
    }

    getReceiverDetails=()=>{
        db.collection("users").where("emailId","==",this.state.receiverId).get()
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

                <Card>
                    Name:{this.state.bookName}
                </Card>

                </View>
                

                <View>
                    {this.state.receiverId!== this.state.userId ?
                    (<TouchableOpacity onPress={()=>{
                        this.updateBookStatus()
                        this.props.navigation.navigate("MyDonation")
                    }}>I Want To Donate</TouchableOpacity>)
                :null}

                </View>
            </View>
        )
    }
}