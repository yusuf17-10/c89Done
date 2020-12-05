import * as React from "react";
import {Text,TouchableOpacity,View,StyleSheet} from "react-native";
import db from "../config";
import firebase from "firebase";
import {ListItem,Icon} from "react-native-elements";
export default class MyDonations extends React.Component{

    constructor(){
        super();
        this.state={
            donorId:firebase.auth().currentUser.email,
            allDonations:[],
            donorName:""
            
        }
        this.requestRef=null
    }
    static navigationOptions={header:null}

    componentDidMount(){
        this.getDonorDetails(this.state.donorId);
        this.getAllDonations();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    getDonorDetails=(donorId)=>{
        db.collection("user").where("emailId","==",donorId).get().then(
            (snapshot)=>{
                snapshot.forEach((doc)=>{
                    this.setState({donorName:doc.data().firstName+" "+doc.data().lastName})
                })
            }
        )
        
    }

    sendNotification=(bookDetails,requestStatus)=>{
        var requestId = bookDetails.requestId;
        var donorId = bookDetails.donorId;
        db.collection("allNotifications").where("requestId","==",requestId)
        .where("donorId","==",donorId).get().then(
            (snapshot)=>{
                snapshot.forEach((doc)=>{
                    var message = ""
                    if(requestStatus==="bookSent"){
                        message=this.state.donorName+" sent you book"
                    }else{
                        message=this.state.donorName+" has shown interest in donating book"
                    }
                    db.collection("allNotifications").doc(doc.id).update({
                        message:message,
                        notificationStatus:"unRead",
                        date:firebase.firestore.FieldValue.serverTimestamp()
                    })
                })
            }
        )
    }

    sendBook=(bookDetails)=>{
        if(bookDetails.requestStatus==="bookSent"){
            var requestStatus="donorInterested";
            db.collection("allDonations").doc(bookDetails.docId).update({
                requestStatus:requestStatus
            })
            this.sendNotification(bookDetails,requestStatus)
        }else{
            var requestStatus="booksent";
            db.collection("allDonations").doc(bookDetails.docId).update({
                requestStatus:requestStatus
            })
            this.sendNotification(bookDetails,requestStatus)

            
        }
    }

    getAllDonations=()=>{
        this.requestRef=db.collection("allDonations").where("donorId","==",this.state.donorId).onSnapshot(
            snapshot=>{
                var allDonations=snapshot.docs.map(document=>document.data)
                this.setState({
                    allDonations:allDonations
                })
            }
        )
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>(
        <ListItem key={i}
        title={item.bookName}
        leftElement={<Icon
        name="book"
        />}
        titleStyle={{color:"black",fontWeight:"bold"}}
        rightElement={
            <TouchableOpacity onPress={()=>{
                this.sendBook(item)
            }}>
                <Text>{item.requestStatus==="bookSent" ? "bookSent":"sendBook"}</Text>
            </TouchableOpacity>
        }
        >
             
        </ListItem>
    )
    render(){
        return(
          <View style={{flex:1}}>
            
            <View style={{flex:1}}>
              {
                this.state.allDonations.length === 0
                ?(
                  <View style={styles.subContainer}>
                    <Text style={{ fontSize: 20}}>List Of All Book Donations</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allDonations}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
    }


    
const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })
    
