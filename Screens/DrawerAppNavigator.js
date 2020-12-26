import React from "react";
import {createDrawerNavigator} from "react-navigation-drawer";
import {AppTabNavigator} from "../Components/AppTabNavigator";
import SideBarMenu from "../Components/SideBarMenu";
import SettingScreen from "../Screens/SettingScreen";
import MyDonations from "./MyDonationsScreen";
import NotificationScreen from "./NotificationScreen";
import MyReceivedBookScreen from "./MyReceivedBookScreen";
export const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    MyDonations:{screen:MyDonations},
    Notifications:{screen:NotificationScreen},
    MyReceivedBooks:{screen:MyReceivedBookScreen},
    Setting:{screen:SettingScreen}
    
    
},

{
    contentComponent:SideBarMenu
},
{
    initialRouteName:"Home"
})