import * as React from "react";
import {View,Text,Dimensions,Animated,StyleSheet,TouchableHighlight} from "react-native";
import {ListItem,Icon} from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import {SwipeListView} from "react-native-swipe-list-view";

export default class SwipeableFlatList extends React.Component{
    constructor(props){
        super(props);
        this.setState={
            allNotifications:this.props.allNotifications
        }
    }
    updateMarkAsRead=(notification)=>{
        db.collection("allNotifications").doc(notification.docId).update({
            notificationStatus:"read"
        })
    }
    renderItem=data=>{
        <ListItem
            leftElement={<Icon
                    name="book"
                    type="font-awesome"
                    color="skyblue"
                    />}
                title={data.item.bookName}
                titleStyle={{color:"black",fontWeight:"bold"}}
                subtitle={data.item.message}
                bottomDivider
              

        />
    }

    renderHiddenItem=()=>{
        <View style={{}}>
            <View>
                <Text>

                </Text>
            </View>
        </View>
    }

    onSwipeValueChange=swipeData=>{
        var allNotifications=this.state.allNotifications
        const {key,value}=swipeData
        if(value < Dimensions.get("window").width){
            const newData=[...allNotifications]
            const prevIndex = allNotifications.findIndex(item=>item.key===key)
            this.updateMarkAsRead(allNotifications[prevIndex])
            newData.splice(prevIndex,1)
            this.setState({allNotifications:newData})
        }
    }

    render(){
        return(
            <View>
                <SwipeListView
                disableRightSwipe
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}  
                rightOpenValue={-Dimensions.get("window").width}
                previewRowKey={"0"} 
                previewOpenDelay={3000}  
                previewOpenValue={-40}
                onSwipeValueChange={this.onSwipeValueChange}
                />
            </View>
        )
    }
}