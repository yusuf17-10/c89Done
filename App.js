import * as React from 'react';
import {
  View
} from 'react-native';


import WelcomeScreen from "./Screens/WelcomeScreen"

export default class App extends React.Component {
  

  render() {
    return (
      <View>
     <WelcomeScreen/>
      </View>

    );
  }
}
