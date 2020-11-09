import * as React from "react";
import {createDrawerNavigator} from "react-navigation-drawer";
import {AppTabNavigator} from "../Components/AppTabNavigator";
import SideBarMenu from "../Components/SideBarMenu";

export const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator},
},
{
    contentComponent:SideBarMenu
},
{
    initialRouteName:"Home"
})