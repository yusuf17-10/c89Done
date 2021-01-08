import * as React from "react";
import {Text,TouchableOpacity,View,StyleSheet} from "react-native";
import {AppStackNavigator} from "../Components/AppStackNavigator";
import firebase from "firebase";
import db from "../config";
import {Card} from "react-native-elements";
import {RFValue} from "react-native-responsive-fontsize"
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

            <Card>
                <Text style={styles.text} >
                    Name:{this.state.bookName}
                </Text>

                </Card>

                </View>
                

                <View>
                    {this.state.receiverId!== this.state.userId ?
                    (<TouchableOpacity style={styles.button}
                         onPress={()=>{
                        this.addNotification()
                        this.updateBookStatus()
                        this.props.navigation.navigate("MyDonations")
                    }}><Text style={styles.text}>I Want To Donate</Text></TouchableOpacity>)
                :null}

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