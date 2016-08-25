'use strict';

var realm = require('../../Model/model.js');
var History = require('./History');
var Upcoming = require('./Upcoming');
var CalendarView = require('./CalendarView');
var firebase = require('../../Model/firebase')
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
      match: this.props.matchFinished.concat(this.props.matchComing)
		};
	}

  componentDidMount(){
    // let matchFinished = []
    // let matchComing = []
    // // console.log(new Date(Date.now()))
    // // console.log((new Date(Date.now())).toDateString())
    // // console.log(JSON.stringify(new Date(Date.now())))
    // // console.log(JSON.parse(JSON.stringify(new Date(Date.now()))))
    // firebase.database().ref('match').orderByChild('time').startAt(JSON.parse(JSON.stringify(new Date(Date.now() - 864000000)))).endAt(JSON.parse(JSON.stringify(new Date(Date.now() + 864000000)))).once('value').then((snap)=>{
    //   snap.forEach((child)=>{
    //     console.log(child.val())
    //     if (child.val().state === 'finished') matchFinished.push(child.val())
    //     else matchComing.push(child.val())
    //   })
    //   this.setState({
    //     matchComing: matchComing,
    //     matchFinished: matchFinished
    //   })
    // }) 
  }

  openCalendar(){
    this.props.navigator.push({
      title: 'CalendarView',
      name: 'calendarView',
      component: CalendarView,
      passProps: {user: this.props.user,match: this.state.match},

    })
  }

  render() {
    return (
     
      <View style={styles.container}>
        <ScrollableTabView style={{marginTop:10}}>

          <Upcoming tabLabel="Upcoming Matches" navigator={this.props.navigator} user={this.props.user} match={this.props.matchComing} />
          <History tabLabel="Match History" navigator={this.props.navigator} user={this.props.user} match={this.props.matchFinished}/>
          
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