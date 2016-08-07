'use strict';

var realm = require('../Model/model.js');
var History = require('./History');
var Upcoming = require('./Upcoming');
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

		};
	}

  render() {
    return (
    	<ScrollableTabView style={{marginTop:10}}>
    		<Upcoming tabLabel="Upcoming Matches" navigator={this.props.navigator} user={this.props.user} />
        	<History tabLabel="Match History" navigator={this.props.navigator} user={this.props.user}/>
        </ScrollableTabView>

      
    );
  }
}
	 	
module.exports = Match;