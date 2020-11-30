import React from "react";
import {createDrawerNavigator} from "react-navigation-drawer";
import {AppTabNavigator} from "../Components/AppTabNavigator";
import SideBarMenu from "../Components/SideBarMenu";
import SettingScreen from "../Screens/SettingScreen";
import MyDonations from "./MyDonationsScreen";
export const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    MyDonations:{screen:MyDonations},
    Setting:{screen:SettingScreen}
},

{
    contentComponent:SideBarMenu
},
{
    initialRouteName:"Home"
})