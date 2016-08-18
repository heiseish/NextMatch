'use strict';

var realm = require('../../Model/model.js');
var History = require('./History');
var Upcoming = require('./Upcoming');
var CalendarView = require('./CalendarView');
// import YouTube from 'react-native-youtube';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import React, { Component } from 'react';
import { 
  Container, 
  Header, 
  Title, 
  Thumbnail,
  Text,
  Icon,
  Button,
  List,
  ListItem,
  Content,
  Card,
  CardItem,

} from 'native-base';

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Modal,
  AlertIOS,
} from 'react-native';
var windowSize = Dimensions.get('window');


class Match extends Component {
  constructor(props) {
		super(props);
		this.state = {
      modalVisible: false,
		};
	}
  openCalendar(){
    this.props.navigator.push({
      title: 'CalendarView',
      name: 'calendarView',
      component: CalendarView,
      passProps: {user: this.props.user},

    })
  }

  render() {
    return (
     
      <View style={styles.container}>
        <ScrollableTabView style={{marginTop:10}}>
          <Upcoming tabLabel="Upcoming Matches" navigator={this.props.navigator} user={this.props.user} />
          <History tabLabel="Match History" navigator={this.props.navigator} user={this.props.user}/>
        </ScrollableTabView>
        <View style={styles.overlay}>
          <Button success bordered large rounded onPress={() => {this.openCalendar()}}>
            <Icon name="ios-calendar-outline"/>
          </Button>
        </View>
      </View>

      



      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 30,
    bottom: 40,
    backgroundColor: 'transparent',
    width: 100, 
    height: 100,
  } 
})
	 	
module.exports = Match;