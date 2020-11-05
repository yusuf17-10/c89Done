import * as React from 'react';
import {
  View
} from 'react-native';
import {createSwitchNavigator,createAppContainer} from "react-navigation";
import {AppTabNavigator} from "./Components/AppTabNavigator";

import WelcomeScreen from "./Screens/WelcomeScreen";

export default class App extends React.Component {
  

  render() {
    return (
      
    <AppContainer/>
      

    );
  }
}

var switchNavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  BottomTab:{screen:AppTabNavigator},
})

var AppContainer=createAppContainer(switchNavigator);
