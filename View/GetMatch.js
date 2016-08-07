'use strict';
var realm = require('../Model/model.js');
var JoinTeamView = require ('./JoinTeamView');
var CreateTeamView = require('./CreateTeamView');
var RequestList = require('./RequestList');
var CreateRequest = require('./CreateRequest');



import React, { Component } from 'react';
import { 
  Container, 
  Header, 
  Title, 
  Content, 
  Text, 
  Button ,
  H3,
} from 'native-base';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';
var windowSize = Dimensions.get('window');

class GetMatch  extends Component{
  constructor(props) {
    super(props);
    this.state = {
      
    };
   
  }
  _createRequest(){
    this.props.navigator.push({
      title: 'Create Request',
      name: 'CreateRequest',
      component: CreateRequest,
      passProps: {user: this.props.user},
    })

  }

  _getListRequest(){
    this.props.navigator.push({
      title: 'Get Request List',
      name: 'RequestList',
      component: RequestList,
      passProps: {user: this.props.user},
    })
  }
  render(){
    return(
      <Container>

        <Content>
        <View style={{alignItems:'center', justifyContent: 'center', flex: 1, flexDirection: 'column'}}>
          <Image style={styles.bg} source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/3c/69/35/3c69358f9f5a6ab1a986d32b9c84c022.jpg'}} />
        

          <View style={{height: 200, paddingTop: 150, marginTop:10}}>
          <H3 style={styles.font}> Get matched now!
          </H3>
          </View>


          <Button block rounded primary onPress={() => {this._getListRequest()}}>
           Get Match 
          </Button>

          <View style={{height: 90, alignItems:'center', justifyContent: 'center', flexDirection:'row'}}>
          <View style={styles.separator}/>
          <View style={{width: 30}}><H3 style={styles.font}> Or </H3></View>
          <View style={styles.separator}/>
          </View>

          <Button block rounded warning onPress={() => {this._createRequest()}}>
            Request 
          </Button>
          <View style={{marginTop:10}}>
          <H3 style={styles.font}> Request a match !</H3>
          </View>

        </View>


          
          
            
        </Content>
      </Container>
      );
  }
}

const styles = StyleSheet.create({
 bg: {
  position: 'absolute',
  left: 0,
  top: 0,
  width: windowSize.width,
  height: windowSize.height
},
font: {
  fontWeight: '300', 
  color: '#FFF', 
  alignItems:'center', 
  justifyContent: 'center',
  fontStyle: 'italic',
  fontSize: 21, 
},
separator: {
  height: 1,
  backgroundColor: '#dddddd',
  width: 100
},
  
});

module.exports = GetMatch;