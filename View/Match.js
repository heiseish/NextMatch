import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS
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
  }
});
 
class Match extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Get a match now!
        </Text>
      </View>
    );
  }
}
module.exports = Match;