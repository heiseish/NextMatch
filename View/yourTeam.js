'use strict';
var realm = require('../Model/model.js');
var JoinTeamView = require ('./JoinTeamView');
var CreateTeamView = require('./CreateTeamView');

import { replaceRoute } from '../actions/route';

import React, { Component } from 'react';
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
  H1,
} from 'native-base';
import {
  Modal,
  StyleSheet,
  Platform,
  View,
  Image,
} from 'react-native';

 
class YourTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }

  }
  _joinTeam(){
    this.props.navigator.push({
        name: 'JoinTeam',
        title: 'Join A Team',
        component: JoinTeamView,
    });
  }

  _createTeam(){
    this.props.navigator.push({
        name: 'CreatTeam',
        title: 'Create New Team',
        component: CreateTeamView,
        passProps: {user: this.props.user}
    });
  }


  render() {
    // var profilepic = this.props.user.image ? require('./my-icon-active.png') : require('./my-icon-inactive.png');
    if (this.props.user.team){
    let team = realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0];
    return (
      <Container>
        <Header>
          
          <Title>{this.props.user.team}</Title>
         
        </Header>

        <Content>
   
          <Image style={styles.modalImage} source={{uri: team.image}}  />
          <H3 style={styles.header}> {team.teamname}
        
          </H3>
          
            <Text >
            Rankpoint: <Text style={styles.bold}>        {team.rankpoint}</Text>
            </Text>

            <Text >
            Description: <Text style={styles.bold}>      {team.teamdescription}</Text>
            </Text>
            
        </Content>
      </Container>
    );
  } else {
    return (
       <Container>
        <Header>
          <Title></Title>
        </Header>

        <Content>
        <H3 style={styles.header}> Oh it seems that you don't have a team now
        </H3>
        <Button primary onPress={() => {this._joinTeam()}}>
          Join 
        </Button>
        <Text> a team </Text>

        <Text> Or </Text>

        <Button success onPress={() => {this._createTeam()}}>
          Create 
        </Button>
        <Text> a new team now !</Text>
          
          
            
        </Content>
      </Container>
      );

    }
  }
}





const styles = StyleSheet.create({
    header : {
        alignItems: 'center',
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

module.exports = YourTeam;