var realm = require('../Model/model.js');
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Image,
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123456',
  },
  image: {
  width: 217,
  height: 138,
}
});
 
class Match extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Get a match now!
        </Text>
        <Image source={require('../Resource/bird-robin-simple-logo.png')} style={styles.image}/>
      </View>
    );
  }
}
module.exports = Match;