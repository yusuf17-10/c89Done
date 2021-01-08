import React from "react";
import {createDrawerNavigator} from "react-navigation-drawer";
import {AppTabNavigator} from "../Components/AppTabNavigator";
import SideBarMenu from "../Components/SideBarMenu";
import SettingScreen from "../Screens/SettingScreen";
import MyDonations from "./MyDonationsScreen";
import NotificationScreen from "./NotificationScreen";
import MyReceivedBookScreen from "./MyReceivedBookScreen";
import {Icon} from "react-native-elements";
export const AppDrawerNavigator=createDrawerNavigator({
    Home:{
        screen:AppTabNavigator,
        navigationOptions:{
        drawerIcon:<Icon
        name="Home"
        type="fontawesome5"
        />}
    },
    MyDonations:{
        screen:MyDonations,
        navigationOptions:{
            drawerIcon:<Icon
            name = "MyDonations"
            type = "fontawesome5"
            />
        }
    },
    Notifications:{
        screen:NotificationScreen,
        navigationOptions:{
            drawerIcon:<Icon
            name="Notifications"
            type="fontawesome5"
            />
        }
    },
    MyReceivedBooks:{
        screen:MyReceivedBookScreen,
        navigationOptions:{
            drawerIcon:<Icon
            name="MyReceivedBooks"
            type="fontawesome5"
            />
        }
    },
    Setting:{
        screen:SettingScreen,
        navigationOptions:{
            drawerIcon:<Icon
            name="SettingScreen"
            type="fontawesome5"
            />
        }
    }
    
    
},

{
    contentComponent:SideBarMenu
},
{
    initialRouteName:"Home"
})