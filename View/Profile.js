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
  Dimensions,
} from 'react-native';
var windowSize = Dimensions.get('window');



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
      <Container>
        <Header >
          <Button transparent onPress={() => {this._editProfile()}}>
              Edit
          </Button>
          <Title>{this.props.user.displayname}</Title>
          <Button transparent onPress={() => {this._logout()}}>
              <Icon name="ios-power" />
          </Button>
        </Header>

        <Content >
        <View style={styles.container}>
          <Image style={styles.bg} source={{uri: 'https://3.bp.blogspot.com/-azG_Uh0T0qY/UOurj61nv0I/AAAAAAAACi0/YZZzOem_vRo/s1600/football-hd-wallpaper-soccer-iphone-5-wallpapers-06.jpg'}} />
          <View style= {styles.header}>
            <View style ={{width: 100, marginRight: 0}}>
            <Image style={styles.modalImage} source={{uri: this._returnImage()}}  />
            </View>
            <View style ={{width: 300, marginLeft: 10, marginTop: 20}}>
            <Text style={styles.subjectFont}>
            Position: <Text style={styles.whiteFont}>        {this.props.user.position}</Text>
            </Text>

            <Text style={styles.subjectFont}>
            Full name: <Text style={styles.whiteFont}>       {this.props.user.fullname}</Text>
            </Text>

            <Text style={styles.subjectFont}>
            Description: <Text style={styles.whiteFont}>      {this.props.user.briefdesc}</Text>
            </Text>
            </View>
          </View>
          </View>
        </Content>
      </Container>
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center', 
    justifyContent: 'center', 
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height
  },
  header:{
    flexDirection: 'row',
  },
  modalImage: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
  },
  bold: {
    fontWeight: '600'
  },
  subjectFont: {
      color: '#007594'
  },
  whiteFont: {
      color: '#FFF',
      fontWeight: '300',
  },
});

module.exports = Profile;