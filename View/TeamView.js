'use strict';

 var realm = require('../Model/model.js');

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Image,
  NavigatorIOS,
} from 'react-native';

class TeamView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
   
  }
 
  render() {
    var teamSelected = this.props.property;
 
    var rankpoint = teamSelected.rankpoint;
 
    return (
      <View style={styles.container}>
        <Image style={styles.image}
            source={{uri: teamSelected.image}} />
        <View style={styles.heading}>
          <Text style={styles.price}>{rankpoint} MMR</Text>
          <Text style={styles.title}>{teamSelected.teamname}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{teamSelected.teamdescription}</Text>
        <Text style={styles.description}>Not yet</Text>
      </View>
    );
  }
}



var styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

module.exports = TeamView;