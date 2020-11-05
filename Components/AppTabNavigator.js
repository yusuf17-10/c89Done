import * as React from "react";
import {Image} from "react-native";
import {createBottomTabNavigator} from "react-navigation-tabs";
import BookDonate from "../Screens/BookDonate";
import BookRequest from "../Screens/BookRequest"

export const AppTabNavigator = createBottomTabNavigator({
    DonateBook:{
        screen:BookDonate,
        navigationOptions:{
            tabBarIcon:<Image
            source={require("../assets/request-list.png")}
            style={{width:20,height:20}}
            />
        }
    },

    RequestBook:{
        screen:BookRequest,
        navigationOptions:{
            tabBarIcon:<Image
            source={require("../assets/request-book.png")}
            style={{width:20,height:20}}
            />
        }
    }
})