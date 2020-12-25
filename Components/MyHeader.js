import * as React from "react";
import {Header,Icon,Badge, ThemeProvider} from "react-native-elements";
import {View} from "react-native"
import db from "../config";
import firebase from "firebase";


export default class MyHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:""
        }
    }
    getNumberOfNotifications(){
        db.collection("allNotifications").where("notificationStatus","==","unread")
        .onSnapshot((snapshot)=>{
            var unreadNotifications = snapshot.docs.map(doc => doc.data())
            this.setState({
                value:unreadNotifications.length
            })
        })
    }

    
    componentDidMount(){
        this.getNumberOfNotifications()
    }


 BellIconWithBadge = ()=>{
    return(
        <View>
            <Icon
            name="bell"
            type="font-awesome"
            color="black"
            onPress={()=>{
          //      this.props.navigation.navigate("notification")
            }}
            />
            <Badge
            value={this.state.value}
            containerStyle={{position:"absolute",top:-4,right:-4}}

            />
        </View>
    )
}

  render(){
    return(

        <Header
            centerComponent={{text:this.props.title,style:{color:"blue",fontSize:20,fontWeight:"bold"}}}
            leftComponent={<Icon
            name="bars"
            type="font-awesome"
            color="black"
            onPress={()=>{
               // this.props.navigation.toggleDrawer()
            }}

            />}

            rightComponent={
                <this.BellIconWithBadge {...props}/>
            
            }
        />

    )
    
}
}
