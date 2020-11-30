import * as React from "react";
import {createStackNavigator} from "react-navigation-stack";
import ReceiverDetails from "../Screens/RecieverDetailsScreen";
import BookDonateScreen from "../Screens/BookDonate";

export const AppStackNavigator = createStackNavigator({
    BookDonateScreen:{screen:BookDonateScreen},
    ReceiverDetails:{screen:ReceiverDetails}
},
{
    initialRouteName:"BookDonateScreen"
}
)

