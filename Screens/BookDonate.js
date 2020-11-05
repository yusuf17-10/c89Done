import * as React from 'react';
import {View,Text,StyleSheet} from 'react-native';


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

