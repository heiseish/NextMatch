'use strict';

var realm = require('../../Model/model.js');
import React, { Component } from 'react';
var Login = require('../../setup/setup')
var EditProfile = require('./editProfile');
var ProfileSearch = require('./ProfileSearch');
var SignOut = require('../../Model/SignOut');

import { 
  Container, 
  Header, 
  Title, 
  Content, 
  Text, 
  InputGroup, 
  Input, 
  Icon, 
  Button ,
  Card,
  CardItem,
  H3,
} from 'native-base';
import {
  StyleSheet,
  Platform,
  View,
  Image,
  Dimensions,
  PropTypes,
  AlertIOS,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
var windowSize = Dimensions.get('window');



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
    }

  }
  _logout(){
    SignOut(function(err){
      if (err) AlertIOS.alert(err)
        else this.props.navigator.popToTop();
    }.bind(this));

  
  }
  _editProfile(){
    this.props.navigator.push({
      title: 'Edit Profile',
      name: 'editProfile',
      component: EditProfile,
      passProps: {user: this.props.user},

    })
  }

  _search(){
    this.props.navigator.push({
        name: 'FindPlayer',
        title: 'Find Players',
        component: ProfileSearch,
        passProps: {user: this.props.user}
    });
  }




  render() {
    return (
      <View style={styles.container}>
      <Header >
      
      <Title>{this.props.user.nickname}</Title>

      </Header>
      <Image style={styles.modalImage} source={{uri:this.props.user.picture}}  />
      <View style={styles.containerBouttons}>

      <View style={styles.buttons}>

      <Button bordered rounded block onPress={() => {this._editProfile()}}>
      Edit profile
      <Icon name="ios-person-outline" />
      </Button>
      </View>

      <View style={styles.buttons}>
      <Button bordered success rounded block onPress={() => {this._aboutUs()}}>
      About us
      <Icon name="ios-information-circle-outline" />
      </Button>
      </View>

      <View style={styles.buttons}>
      <Button bordered warning rounded block onPress={() => {this._logout()}}>
      Feedback
      <Icon name="ios-mail-outline" />
      </Button>
      </View>



      <View style={styles.buttons}>
      <Button bordered danger rounded block onPress={() => {this._logout()}}>
      Log out
      <Icon name="ios-power-outline" />
      </Button>
      </View>
      </View>
      </View>
       
    );
  }
}


const styles = StyleSheet.create({
  modalImage: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
    alignSelf:'center'
  },
  bold: {
    fontWeight: '600'
  },
  subjectFont: {
      color: '#007594',
      alignSelf: 'center',
  },
  whiteFont: {
      color: '#331a00',
      fontWeight: '300',
  },
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  containerBouttons: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 200,
    height: 400,
    flexDirection: 'column'

  },
  buttons: {
    alignItems: 'center',
    margin: 20,
    width: 200

  }
 

});

module.exports = Profile;