import * as React from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native';
//import {ScrollView,TouchableOpacity} from "react-native-gesture-handler";
import db from "../config";




export default class BookDonate extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>BookDonate Screen</Text>
            </View>
        )
    }
    }
    
    
    var styles=StyleSheet.create({
        container:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
         }
    })
/*
export default class BookDonate extends React.Component{
    constructor(){
        super();
        this.state={
            allrequests:[],
        }
    }
render(){
    return(
        <View>

        <View style={styles.container}>
            <Text>BookDonate Screen</Text>
        </View>
 <FlatList
            data = {this.state.allrequests}
            renderItem={({item})=>(
                <View>
                  
                </View>
            )}
            keyExtractor={(item,index)=>index.toString()}
            onEndReached={}
            onEndReachedThreshold={}
        />
        </View>
      
    )
}
}


var styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
     }
})
*/



