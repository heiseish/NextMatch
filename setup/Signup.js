'use strict';


var TabBar = require("../View/TabBar");
var firebase = require('../Model/firebase');
var user = require('../Model/user');
var SignUp = require('../Model/SignUp'); 
var userRef = require('../Model/userRef');
var findLastUserId = require('../Model/findLastUserId');

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
  Image,
  Dimensions,
  AlertIOS,

} from 'react-native';
import {
  Button,
  Spinner,
  Container,
  Content,
  Header,
  Title,
  Icon,
  CardItem,
  Card,
} from 'native-base';
var windowSize = Dimensions.get('window');


class Signup extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      displayname: '',
      password:'',
      passwordConf: '',
      // isLoggedIn: false,
      
      isLoading: false,
      user: user,
      userId: '',
   }
}
  componentDidMount(){
    this.setState({userId: findLastUserId()});
  }



  _return(){
    this.props.navigator.pop();
  }
  onClickSignUp(){
    this.setState({
      isLoading: true
    });
    // SignUp
    SignUp(this.state.email,this.state.password,(error,user) => {
      if (error){
        switch(error.code){

            case "auth/email-already-in-use":
            AlertIOS.alert("The new user account cannot be created because the email is already in use.");
            break;

            case "auth/invalid-email":
            AlertIOS.alert("The specified email is not a valid email.");
            break;

            case "auth/weak-password":
            AlertIOS.alert("The password is too weak!")
            break;

            default:
            AlertIOS.alert("Error creating user:");
          }
          this.setState({isLoading:false})

        } else {
   
            
            this.setState({isLoading:false})
            AlertIOS.alert('Please verify your email before using. Thank you');
            this.props.navigator.pop();
  
      
          



        }
      })
    userRef.push({
              userId: findLastUserId(),
              displayname: this.state.displayname,
              email: this.state.email
      })
  }

 

  render() {
   

    return (
      
     

      <View style={styles.container}>
       

      <Image style={styles.bg} source={require('../imgBackground/stadium.jpg')}/>
      <View style={styles.header}>
      <Button transparent onPress={() => this._return()} style={{alignSelf: 'flex-start', marginTop: 20,marginLeft:10}}>
        <Icon name="ios-arrow-back-outline" style={{color: "#FFF"}}/>
      </Button>
      </View>
      {this.state.isLoading ? <Spinner/> : <View/>}

      <View style={styles.inputs}>
      
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={require('../imgBackground/line1.png')}/>
      <TextInput 
      style={[styles.input, styles.whiteFont]}
      placeholder="Email Address"
      placeholderTextColor="#FFF"
      onChangeText={(email) => this.setState({email})}
      value={this.state.email}
      ref={component => this.email = component}
      />
      </View>

      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={require('../imgBackground/line1.png')}/>
      <TextInput 
      style={[styles.input, styles.whiteFont]}
      placeholder="Enter your display name"
      placeholderTextColor="#FFF"
      onChangeText={(displayname) => this.setState({displayname})}
      value={this.state.displayname}
      ref={component => this.displayname = component}
      />
      </View>


      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={require('../imgBackground/line2.png')}/>
      <TextInput 
      password={true}
      style={[styles.input, styles.whiteFont]}
      placeholder="Please enter a valid password"
      placeholderTextColor="#FFF"
      onChangeText={(password) => this.setState({password})}
      value={this.state.password}
      ref={component => this.password = component}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputPassword} source={require('../imgBackground/line2.png')}/>
      <TextInput
      password={true}
      style={[styles.input, styles.whiteFont]}
      placeholder="Please enter the password again"
      placeholderTextColor="#FFF"
      onChangeText={(passwordConf) => this.setState({passwordConf})}
      value={this.state.passwordConf}
      ref={component => this.passwordConf = component}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>



     

      </View>
      <Button block warning onPress={() => {this.onClickSignUp()}} style={{marginTop:90}}>
      Sign Up
      </Button>
      </View>

      </View>

      );
  }
};




const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      // backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        // justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        // backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        marginBottom: 100,
        padding: 20,
        alignItems: 'center'
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .8
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#ffff80'
    },
    circles: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progress: {
      margin: 10,
    },
    separator: {
      height: 1,
      backgroundColor: '#dddddd',
      width: 100
    },
})







module.exports = Signup;