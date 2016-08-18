'use strict';

var TabBar = require("../View/TabBar");
var realm = require('../Model/model.js');
var Signup = require('./Signup');
var SignIn = require('../Model/SignIn');
var firebase = require('../Model/firebase');
var ForgetPassword =require('./ForgetPassword');
// var user = require('../Model/user');

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import {
  Button,
  Spinner,
  Icon,
} from 'native-base';
var windowSize = Dimensions.get('window');

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email:'', 
      password:'',
      // isLoggedIn: false,
      isLoading: false,
      // progress: 0,
      // indeterminate: true,
      // size: 80,
      // showsText: true,
      // images: [],
      
    };
    // this.onClickLogin = this.onClickLogin.bind(this);
  }

  onClickLogin(){
    this.setState({isLoading:true})

    SignIn(this.state.email,this.state.password,function(err,user){
      if (err) {
        AlertIOS.alert(err.message);
        this.setState({isLoading:false})
      } else {
        if (!user.emailVerified) {
          AlertIOS.alert('Please verify your email first!');
          this.setState({isLoading:false})
        }
        else {
          
          this.setState({email:'',password:'',isLoading:false})
          this.props.navigator.push({
            name: 'Main',
            title: "Main",
            component: TabBar,
            passProps: {user:user,selectedTab: 'profile'}
          });
        }
      }
    }.bind(this))
      
  }

  onClickSignup(){
    this.props.navigator.push({
        name: 'Signup',
        title: "New Account",
        component: Signup,
    });
  
  }

  forgetPassword(){
    this.props.navigator.push({
        name: 'forgetPassword',
        title: 'Forget Password',
        component: ForgetPassword,
    });
  }

  render() {
    return (
      

      <View style={styles.container}>

      <Image style={styles.bg} source={require('../imgBackground/field.jpg')} />
      <View style={styles.header}>
      <Image style={styles.mark} source={require('../imgBackground/ball.png')} />
      </View>
      <View style={styles.inputs}>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={require('../imgBackground/line1.png')}/>
      <TextInput 
      style={[styles.input, styles.whiteFont]}
      placeholder="Email"
      placeholderTextColor="#FFF"
      onChangeText={(email) => this.setState({email})}
      value={this.state.email}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputPassword} source={require('../imgBackground/line2.png')}/>


      <TextInput
      password={true}
      style={[styles.input, styles.whiteFont]}
      placeholder="Pasword"
      placeholderTextColor="#FFF"
      onChangeText={(password) => this.setState({password})}
      value={this.state.password}
      />
      </View>
      <View style={styles.forgotContainer}>
      <TouchableHighlight onPress={()=>{this.forgetPassword()}}>
      <Text style={styles.greyFont}>Forgot Password</Text>
      </TouchableHighlight>
      </View>
      </View>
      {this.state.isLoading ? <Spinner /> : <Button block warning onPress={()=>{this.onClickLogin()}}>
        <Icon name="ios-football-outline" style={{fontSize: 31, color: 'green'}} />
        Sign in
      </Button>}
      <View style={styles.signup}>
      <Text style={styles.greyFont}>Don't have an account?</Text><TouchableHighlight onPress={()=>{this.onClickSignup()}}><Text style={styles.whiteFont}> Sign Up</Text></TouchableHighlight>
      </View>
      </View>
      );
  }
};
  
const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
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
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    },
    circles: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progress: {
      margin: 10,
    },
    
})
module.exports = Login;