'use strict';

var realm = require('../Model/model.js');
import React, { Component } from 'react';
var Login = require('../setup/setup')
var EditProfile = require('./editProfile');
import Theme from '../Theme/Theme';

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
} from 'react-native';




class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }

  }
  _logout(){
    this.props.navigator.popToTop()
  }
  _editProfile(){
    this.props.navigator.push({
      title: 'Edit Profile',
      name: 'editProfile',
      component: EditProfile,
      passProps: {user: this.props.user},

    })
  }

  _returnImage(){
    if (this.props.user.image === '') return 'https://i0.wp.com/assets.plan.io/images/default_avatar.png';
    else return this.props.user.image;
  }

  render() {
    return (
      <Container theme={Theme}>
        <Header theme={Theme}>
          <Button transparent onPress={() => {this._editProfile()}}>
              Edit
          </Button>
          <Title>{this.props.user.displayname}</Title>
          <Button transparent onPress={() => {this._logout()}}>
              <Icon name="ios-power" />
          </Button>
        </Header>

        <Content theme={Theme}>
   
          <Image style={styles.modalImage} source={{uri: this._returnImage()}}  />
          <H3> {this.props.user.displayname}
        
          </H3>
          
            <Text theme={Theme}>
            Position: <Text>        {this.props.user.position}</Text>
            </Text>

            <Text >
            Full name: <Text>       {this.props.user.fullname}</Text>
            </Text>

            <Text >
            Description: <Text>      {this.props.user.briefdesc}</Text>
            </Text>
            
        </Content>
      </Container>
       
    );
  }
}

const styles = StyleSheet.create({
    header : {
        flex: 1,
        flexDirection: 'row',
        marginBottom: (Platform.OS==='ios') ? -7 : 0,
        lineHeight: 24,
        color: '#5357b6',
        alignItems: 'center',
    },
    modalImage: {
        resizeMode: 'contain',
        height: 200
    },
    bold: {
        fontWeight: '600'
    },
  
});

module.exports = Profile;