import React from "react";
import LottieView from "lottie-react-native";

export default class Santa extends React.Component{
  render(){
    return(
<LottieView
source={require("../assets/santa1.json")}
style={{width:"60%"}}
autoPlay loop/>
    )
  }
}
