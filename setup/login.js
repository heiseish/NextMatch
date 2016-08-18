'use strict';


var TabBar = require("../View/TabBar");
var realm = require('../Model/model.js');
var Signup = require('./Signup');
// var imagePicker = require('react-native-imagepicker');
// var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: "hLxzMyG17Ae5Tga4l6PQYB3TwVmOQLIY", domain: "heiseish.au.auth0.com"});

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	
  Dimensions,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  
  Platform,
} from 'react-native';
import {
  Button,
  Spinner,
  Icon,
  InputGroup,
  Input,
} from 'native-base';
var windowSize = Dimensions.get('window');

var firebaseApp = require('./Model/firebase');

class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			logged: false,
      profile: {},
      token: '',

    };
		this.itemsRef = firebaseApp.database().ref();
		
	}

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  openLogin(){
    lock.show({closable: true}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({
        token: token,
        profile: profile,
        logged: true,
      })
      // login by email/gmail
      if (this.state.profile.email){
        let users = realm.objects('User');
        let user = users.filtered('email == $0',this.state.profile.email)[0];

        if (user){

          this.props.navigator.push({
            title: 'Main',
            name: "TabBar",
            component: TabBar,
            passProps: {user:user,selectedTab:'profile'},
          });
        } else {
          realm.write(() => {


            realm.create('User',{
              id:    1,
              username: this.state.profile.email,
              password: 'giang',
              fullname: 'Hello',
              displayname: 'heisei',
              position: this.state.position || '',
              email: this.state.profile.email,
            })

          });

          let user = realm.objects('User').filtered('username == $0',this.state.username)[0];
          this.props.navigator.push({
            title: "Main",
            component: TabBar,
            passProps: {user: user},
          });
        }
      } else if (this.state.profile.name){
        let users = realm.objects('User');
        let user = users.filtered('fullname == $0',this.state.profile.name)[0];

        if (user){

          this.props.navigator.push({
            title: 'Main',
            name: "TabBar",
            component: TabBar,
            passProps: {user:user,selectedTab:'profile'},
          });
        } else {
          realm.write(() => {


            realm.create('User',{
              id:    3,
              username: this.state.username,
              password: this.state.password,
              fullname: this.state.fullname,
              displayname: this.state.displayname,
              position: this.state.position || '',
            })
          });

          this.props.navigator.push({
            title: 'Main',
            name: "TabBar",
            component: TabBar,
            passProps: {user:user,selectedTab:'profile'},
          });
        }
      }
    });
  }

  openTouchId(){
    lock.show({
      connections: ["touchid"],
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }

	
	render() {
    
		return (
			

			<View style={styles.container}>

        
      <Image style={styles.bg} source={require('../imgBackground/login.jpg')} />
      <View >
        <Text style={styles.title}>Next Match Reborn</Text>
      </View>
      <View >
        <Text style={styles.subtitle}>-Tap the ball to log in-</Text>
        
      </View>
      {(Platform.OS === 'ios') ? <View style={{alignSelf:'flex-end'}}><TouchableHighlight onPress={() => {this.openTouchId()}}><Text style={styles.greyFont}>Or by touch ID</Text></TouchableHighlight></View> : <View/>}
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => {this.openLogin()}}>
          <View style={{backgroundColor: 'transparent',width: 130, height: 130}}/>
        </TouchableWithoutFeedback>
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
        marginTop: 110,
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
    title: {
      color: '#FFF',
      fontWeight: '600',
      fontSize: 50,
      alignSelf: 'center',
      fontFamily: 'Academy Engraved LET',
      paddingTop: 110,
      // fontStyle: 'italic'
    },
    subtitle: {
      color: '#FFF',
      fontWeight: '600',
      fontSize: 25,
      alignSelf: 'center',
      fontFamily: 'Academy Engraved LET',
      paddingTop: 40,
      // fontStyle: 'italic'
    }
    
})
module.exports = Login;