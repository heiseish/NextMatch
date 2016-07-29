'use strict';


var TabBar = require("../View/TabBar");
var realm = require('../Model/model.js');

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
  	Image,
  	Dimensions,
  	TouchableHighlight,
  	NavigatorIOS,
  	TabBarIOS,
} from 'react-native';
var windowSize = Dimensions.get('window');

class Signup extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username:'', 
      password:'',
      passwordConf: '',
      // isLoggedIn: false,
      fullname: '',
      position: '',
      displayname: '',
    }
  }
  render() {

    return (
      

      <View style={styles.container}>

      <Image style={styles.bg} source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/a3/03/3c/a3033c8b069b102dd3b1f15c56f9c541.jpg'}}/>
      <View style={styles.header}>
      <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
      </View>
      <View style={styles.inputs}>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
      <TextInput 
      style={[styles.input, styles.whiteFont]}
      placeholder="Full name"
      placeholderTextColor="#FFF"
      onChangeText={(fullname) => this.setState({fullname})}
      value={this.state.fullname}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
      <TextInput 
      style={[styles.input, styles.whiteFont]}
      placeholder="Display name"
      placeholderTextColor="#FFF"
      onChangeText={(displayname) => this.setState({displayname})}
      value={this.state.displayname}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
      <TextInput 
      style={[styles.input, styles.whiteFont]}
      placeholder="Username"
      placeholderTextColor="#FFF"
      onChangeText={(username) => this.setState({username})}
      value={this.state.username}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
      <TextInput 
      password={true}
      style={[styles.input, styles.whiteFont]}
      placeholder="Please enter a valid password"
      placeholderTextColor="#FFF"
      onChangeText={(password) => this.setState({password})}
      value={this.state.password}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
      <TextInput
      password={true}
      style={[styles.input, styles.whiteFont]}
      placeholder="Please enter the password again"
      placeholderTextColor="#FFF"
      onChangeText={(passwordConf) => this.setState({passwordConf})}
      value={this.state.passwordConf}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
      <TextInput 
      style={[styles.input, styles.whiteFont]}
      placeholder="Which position do you play?"
      placeholderTextColor="#FFF"
      onChangeText={(position) => this.setState({position})}
      value={this.state.position}
      />
      </View>
      
      </View>
      <View style={styles.signin}>
      <TouchableHighlight onPress={this.onClickLogin}>
      <Text style={styles.whiteFont}>Sign Up Now</Text>
      </TouchableHighlight>
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







module.exports = Signup;