'use strict';

var realm = require('../Model/model.js');
import React, { Component } from 'react';
var Login = require('../setup/setup')
var EditProfile = require('./editProfile');
var ProfileSearch = require('./ProfileSearch');
var SignOut = require('../Model/SignOut');

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

  returnUserImg(){
    if (this.props.user.imageStyle === 1) return require('../imgUser/1.png');
    if (this.props.user.imageStyle === 2) return require('../imgUser/2.jpg');
    if (this.props.user.imageStyle === 3) return require('../imgUser/3.jpg');
    if (this.props.user.imageStyle === 4) return require('../imgUser/4.jpg');
  }



  render() {
    return (
      <Container>
        <Header >
          <Button transparent onPress={() => {this._editProfile()}}>
              Edit
          </Button>
          <Title>{this.props.user.displayname}</Title>
          <Button transparent onPress={() => {this._search()}}>
              <Icon name="ios-search" />
          </Button>
        </Header>

        <Content >
                    
        <View style={styles.container}>
          
          <View>
            
            <Image style={styles.modalImage} source={this.returnUserImg()}  />
            <View >

            <Grid style={{alignSelf: 'center', width: 300}}>
              <Col>
                <Row><Text style={styles.subjectFont}>Position</Text></Row>
                <Row><Text style={styles.subjectFont}>Full name</Text></Row>
                <Row><Text style={styles.subjectFont}>Description</Text></Row>
              </Col>
              <Col style={{}}>
                <Row><Text style={styles.whiteFont}>{this.props.user.position}</Text></Row>
                <Row><Text style={styles.whiteFont}>{this.props.user.fullname}</Text></Row>
                <Row><Text style={styles.whiteFont}>{this.props.user.briefdesc}</Text></Row>
              </Col>
              <Col></Col>
            </Grid>
            </View>
          </View>
          </View>

          <View style={styles.containerBottom}>
            <Button danger rounded block onPress={() => {this._logout()}}>
                        <Icon name="ios-power" />
            </Button>
          </View>
          
        </Content>
      </Container>
       
    );
  }
}



// <Image style={styles.bg} source={{uri: 'https://3.bp.blogspot.com/-azG_Uh0T0qY/UOurj61nv0I/AAAAAAAACi0/YZZzOem_vRo/s1600/football-hd-wallpaper-soccer-iphone-5-wallpapers-06.jpg'}} />
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
    padding: 20,
    // backgroundColor: 'black',
  },
  containerBottom: {
    marginTop: 210,
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
  }
 

});

module.exports = Profile;