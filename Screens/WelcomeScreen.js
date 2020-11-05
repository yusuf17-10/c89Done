import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import firebase from "firebase";
import db from "../config"

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      isModalVisible:"false",
      firstname:"",
      lastname:"",
      address:"",
      phone:"",
      confirmPassword:"",
    };
  }
  userLogin=(emailId,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId,password).then(()=>{
      return(
        this.props.navigation.navigate("DonateBook")
      )
    })
    .catch((error)=>{
      var errorcode=error.code;
      var errormessage=error.message;
      return(
        Alert.alert(errormessage)
      )

    })
  }

    userSignUp=(username,password,confirmPassword)=>{
      if(password!==confirmPassword){
          return Alert.alert("Password Doesn't Match");
      }else {
        firebase.auth().createUserWithEmailAndPassword(username,password).then((response)=>{
          return(
            Alert.alert("successfully AddedUser")
          )
        })
        .catch((error)=>{
          var errorcode=error.code;
          var errormessage=error.message;
          return(
            Alert.alert(errormessage)
          )
    
        })
        db.collection("user").add({
          first_name:this.state.firstname,
          last_name:this.state.lastname,
          phone:this.state.phone,
          address:this.state.address,

        })
      }
    
  }

  showModal=()=>{
    return(
      <Modal 
      visible={this.state.isModalVisible}
      animationType="fade"
      transparent={false}
      >
        <View>

  <ScrollView>
    <KeyboardAvoidingView>
      <Text>Registration</Text>
      <TextInput 
      style={styles.input}
      placeholder={"FirstName"}
      maxLength={8}
      onChangeText={(text)=>{
        this.setState({firstname:text})
      }}/>
       <TextInput 
       style={styles.input}
      placeholder={"LastName"}
      maxLength={8}
      onChangeText={(text)=>{
        this.setState({lastname:text})
      }}/>
       <TextInput
       style={styles.input} 
      placeholder={"address"}
      multiline={true}
      onChangeText={(text)=>{
        this.setState({address:text})
      }}/>
       <TextInput 
       style={styles.input}
      placeholder={"PhoneNumber"}
      keyboardType={"numeric"}
      maxLength={10}
      onChangeText={(text)=>{
        this.setState({phone:text})
      }}/>

<TextInput 
      style={styles.input}
      placeholder={"ConfirmPassword"}
      secureTextEntry={true}
      onChangeText={(text)=>{
        this.setState({confirmPassword:text})
      }}/>

      <TouchableOpacity style={styles.button}
      onPress={()=>{
        this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
      }}>
        <Text>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
      onPress={()=>{
        this.setState({isModalVisible:false})
      }}>
        <Text>cancel</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  </ScrollView>
        </View>

      </Modal>
    )
  }
  render() {
    return (
      <View style={styles.container}>

        <View>
        
          <Text>BookSanta</Text>
          {
            this.showModal()
          }
        </View>

        
          <TextInput
             placeholder="email"
            keyboardType="email-address"
            style={styles.input}
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}
          />
        
        
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
      

        <TouchableOpacity style={styles.button}
        onPress={()=>{
          this.userLogin(this.state.emailId,this.state.password);
        }}>
          <Text>Login</Text>
        </TouchableOpacity>

 <TouchableOpacity style={styles.button}
        onPress={()=>{
         this.setState({isModalVisible:true});
        }}>
          <Text>SignUp</Text>
        </TouchableOpacity>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  input: {
    backgroundColor: 'green',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginTop: 10,
    borderWidth:2,
    width:200,
    height:50,
  },
  button: {
    backgroundColor: 'green',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    borderWidth:2,
    width:150,
    height:50,
  },
});
