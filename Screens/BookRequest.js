import * as React from 'react';
import {View,Text,StyleSheet,TextInput,KeyboardAvoidingView,TouchableOpacity,ALert,TouchableHighlight} from 'react-native';
import firebase from "firebase";
import db from "../config"
import { ThemeProvider } from 'react-native-elements';
import {BookSearch} from "react-native-google-books";
import { FlatList } from 'react-native-gesture-handler';

export default class BookRequest extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            bookName:"",
            reasonToRequest:"",
            isBookRequestActive:"",
            userDocId:"",
            dataSource:"",
            showFlatList:false
        }

    }

    createuniqueId(){
        return Math.random().toString(36).substring(7);
    }

   /*componentDidMount(){
        var books = BookSearch.searchBook("Harry Potter","AIzaSyCT2YrQaaYnl9OM4KI-E4A9E2fZZisZAlA")
    }*/

    async getBooksFromApi(bookName){
        this.setState({bookName:bookName})
        if(bookName.length>2){
            var books = await BookSearch.searchBook(bookName,"AIzaSyCT2YrQaaYnl9OM4KI-E4A9E2fZZisZAlA")
            this.setState({dataSource:books.data,showFlatList:true})

        }
    }
    renderItem=({item,i})=>{
        return(
            <TouchableHighlight style={{
                alignItems:"center",
                backgroundColor:"pink",
                padding:10,
                width:"90%",
            }} 
            activeOpacity={0.6}
            underlayColor={"blue"}
            onPress={()=>{
                this.setState({
                    showFlatList:false,bookName:item.volumeInfo.title
                })
            }}
            bottomDivider>

                <Text>{item.volumeInfo.title}</Text>

            </TouchableHighlight>
        )
    }

    sendNotification=()=>{
        db.collection("user").where("emailId","==",this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var name = doc.data().firstName
                var lastname = doc.data().lastname
                db.collection("allNotification").where("requestId","==",this.state.requestId).get()
                .then((snapshot)=>{
                    snapshot.forEach((doc)=>{
                        var donorId = doc.data().donorId;
                        var bookName = doc.data().bookName
                        db.collection("allDonations").add({
                            targetedUserId : donorId,
                            message : name+" "+lastname+" Received The Book "+bookName,
                            notificationStatus:"unread",
                            bookName:bookName
                        })

                    })
                })

            })
        })
    }    

    updateBookRequestedStatus=()=>{
        db.collection("requestedBooks").doc(this.state.docId).update({
            bookStatus:"recieved"
        })
        db.collection("user").where("emailId","==",this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection("user").doc(doc.id).update({
                    isBookRequestActive:false
                })
            })
        })
    }

    addRequest=async(bookName,reasonToRequest)=>{
        var userId=this.state.userId
        var randomRequestId=this.createuniqueId();
        var books = await BookSearch.searchBook(bookName,"AIzaSyCT2YrQaaYnl9OM4KI-E4A9E2fZZisZAlA")
        db.collection("requestedBooks").add({
            userId:userId,
            bookName:bookName,
            reasonToRequest:reasonToRequest,
            requestId:randomRequestId,
            date:firebase.firestore.FieldValue.serverTimestamp(),
            imageLink:books.data[0].volumeInfo.imageLink.smallThumbnail
        })
         await this.getBookRequest()
        db.collection("user").where("emailId","==",userId).get()
        .then().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection("user").doc(doc.id).update({
                    isBookRequestActive:true
                })
           })
        })
        this.setState({
            bookName:"",
            reasonToRequest:"",
        })
        return Alert.alert("Book Requested sucssesfully");
    }
    getBookRequest=()=>{
        var bookRequest = db.collection("requestedBooks").where("userId","==",this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                if(doc.data().bookStatus!=="received"){
                    this.setState({
                        requestId:doc.data().requestId,
                        requestedBookName:doc.data().bookName,
                        bookStatus:doc.data().bookStatus,
                        docId:doc.id
                    })
                }
            })
        })
    }

    receivedBook=(bookName)=>{
        var requestId = this.state.requestId;
        var userId = this.state.userId;
        db.collection("receivedBooks").add({
            userId:userId,
            bookName:bookName,
            requestId:requestId,
            bookStatus:"received"

        })
    }

    getIsBookRequestActive(){
        db.collection("user").where("emailId","==",this.state.userId)
        .onSnapshot((querySnapShot)=>{
            querySnapShot.forEach((doc)=>{
                this.setState({
                    isBookRequestActive:doc.data().isBookRequestActive,
                    userDocId:doc.id
                })
            })
        })
    }



    
render(){
    if(this.state.isBookRequestActive === true){

        return(
            <View style={{flex:1,justifyContent:"center"}}>
                <View style={{justifyContent:"center",flex:1,flexDirection:'row'}}>
                <Text>
                    BOOK NAME
                </Text>
                
                <Text>
                    {
                        this.state.requestedBookName
                    }
                </Text>
                </View>

                <View style={{justifyContent:"center",flex:1,flexDirection:'row'}}>
                <Text>
                    BOOK Status
                </Text>
                
                <Text>
                    {
                        this.state.bookStatus
                    }
                </Text>
                </View>
                <TouchableOpacity style={styles.button}
                onPress={()=>{
                    this.sendNotification()
                    this.updateBookRequestedStatus()
                    this.receivedBook(this.state.requestedBookName)
                }}>
                    <Text >Recieved The Book </Text>
                </TouchableOpacity>
            </View>
        )

    }else{
    return(
        <View style={styles.container}>
            <Text>BookRequest Screen</Text>
            
            <KeyboardAvoidingView>
           

                {
                    this.state.showFlatList ?
                    (
                    <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item,index)=> index.toString()}/>
                    )
                    :(
                       <View>
                 <TextInput style={styles.input} 
                placeholder="Enter Book Name"
                onChangeText={(text)=>{
                    this.setState({bookName:text});
                }}
                
                value={this.state.bookName}
                />

                <TextInput style={[styles.input,{height:200}]} 
                multiline
                numberOfLines={8}
                placeholder="Reason To Request"
                onChangeText={(text)=>{
                    this.setState({reasonToRequest:text});
                }}
                
                value={this.state.reasonToRequest}
                />
                
                <TouchableOpacity style={styles.button}

                onPress={()=>{
                    this.addRequest(this.state.bookName,this.state.reasonToRequest)
                }}>
                    <Text>Request</Text>
                </TouchableOpacity>

                       </View> 
                    )
                }

            </KeyboardAvoidingView>
        </View>
    )
}
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
  
