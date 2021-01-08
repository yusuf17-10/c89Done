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
  Image
} from 'react-native';
import {RFValue} from "react-native-responsive-fontsize";
import firebase from "firebase";
import db from "../config"

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      isModalVisible:"false",
      firstName:"",
      lastName:"",
      address:"",
      phone:"",
      confirmPassword:"",
    };
  }
  userLogin=(emailId,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId,password).then(()=>{
      return(
        this.props.navigation.navigate("BookDonateScreen")
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
          firstName:this.state.firstName,
          lastName:this.state.lastName,
          phone:this.state.phone,
          address:this.state.address,
          emailId:this.state.emailId

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
      value={this.state.firstName}
      placeholder={"FirstName"}
      maxLength={8}
      onChangeText={(text)=>{
        this.setState({firstName:text})
      }}/>
       <TextInput 
       style={styles.input}
       value={this.state.lastName}

      placeholder={"LastName"}
      maxLength={8}
      onChangeText={(text)=>{
        this.setState({lastName:text})
      }}/>
       <TextInput
      value={this.state.address}
      style={styles.input} 
      placeholder={"address"}
      multiline={true}
      onChangeText={(text)=>{
        this.setState({address:text})
      }}/>
       <TextInput 
       style={styles.input}
       value={this.state.phone}
        placeholder={"PhoneNumber"}
        keyboardType={"numeric"}
        maxLength={10}
        onChangeText={(text)=>{
        this.setState({phone:text})
      }}/>


          <TextInput
            value={this.state.emailId}
             placeholder="email"
            keyboardType="email-address"
            style={styles.input}
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}
          />
        
        
          <TextInput
            placeholder="password"
            value={this.state.password}
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />


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

        <Image
            source={"assets/BookSanta.jpg"}
            style={{justifyContent:"center",alignSelf:"center"}}
        />
        <View>
        
          <Text>BookSanta</Text>
          {
            this.showModal()
          }
        </View>

        
          <TextInput
            value={this.state.emailId}
             placeholder="email"
            keyboardType="email-address"
            style={styles.input}
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}
          />
        
        
          <TextInput
            placeholder="password"
            value={this.state.password}
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
    alignItems: 'center',
    backgroundColor:'aqua'
  },
  
  input: {
  
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    marginTop: RFValue(10),
    borderWidth:2,
    width:200,
    height:50,
  },
  button: {
    backgroundColor:"#d14038",
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop:RFValue(10),
    
    borderWidth:2,
    width:150,
    height:50,
  },
});
