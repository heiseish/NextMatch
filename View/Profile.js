'use strict';

var realm = require('../Model/model.js');
import React, { Component } from 'react';
var Login = require('../setup/setup')
var EditProfile = require('./editProfile');
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
  render() {
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => {this._editProfile()}}>
              Edit
          </Button>
          <Title>{this.props.user.displayname}</Title>
          <Button transparent onPress={() => {this._logout()}}>
              <Icon name="ios-power" />
          </Button>
        </Header>

        <Content>
   
          <Image style={styles.modalImage} source={{uri: this.props.user.image}}  />
          <H3 style={styles.header}> {this.props.user.displayname}
        
          </H3>
          
            <Text >
            Position: <Text style={styles.bold}>        {this.props.user.position}</Text>
            </Text>

            <Text >
            Full name: <Text style={styles.bold}>       {this.props.user.fullname}</Text>
            </Text>

            <Text >
            Description: <Text style={styles.bold}>      {this.props.user.briefdesc}</Text>
            </Text>
            
        </Content>
      </Container>
       
    );
  }
}

const styles = StyleSheet.create({
    header : {
        marginLeft: -5,
        marginTop: 5,
        marginBottom: (Platform.OS==='ios') ? -7 : 0,
        lineHeight: 24,
        color: '#5357b6'
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