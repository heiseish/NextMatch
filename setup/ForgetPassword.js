'use strict';


var TabBar = require("../View/TabBar");
var firebase = require('../Model/firebase');
var user = require('../Model/user');
var SignUp = require('../Model/SignUp');
var ChangePassword = require('../Model/ChangePassword');

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


class ForgetPassword extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      // isLoggedIn: false,
      
      isLoading: false,
   }
}
  _return(){
    this.props.navigator.pop();
  }
  
  reset(){
    this.setState({
      isLoading: true
    });
    ChangePassword(this.state.email,(function(error,user){
      if (error) {
        AlertIOS.alert(error);
        this.setState({isLoading:false})
      } else {
        this.setState({isLoading:false})
        AlertIOS.alert('Please check your email to change the password. Thank you');
        this.props.navigator.pop();
      }
    }.bind(this)));
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


      <View style={styles.inputs}>
      
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={require('../imgBackground/line1.png')}/>
      <TextInput 
      style={[styles.input, styles.whiteFont]}
      placeholder="Please enter your email Address"
      placeholderTextColor="#FFF"
      onChangeText={(email) => this.setState({email})}
      value={this.state.email}
      ref={component => this.email = component}
      />
      </View>
      

     

      </View>
      <Button block warning onPress={() => {this.reset()}} style={{marginBottom:110}}>
      Sign Up
      </Button>
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







module.exports = ForgetPassword;