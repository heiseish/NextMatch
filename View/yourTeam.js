import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

const ReviewSchema = {
  name: 'Review',
  properties: {
    review: 'int',
  }
};

const TeamSchema = {
  name: 'Team',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    teamname: 'string',
    rankpoint: 'int',
    teamdescription: 'string',
    review: {type: 'list', objectType: 'Review', optional: true},
  }
};
let realm = new Realm({schema: [ReviewSchema, TeamSchema]});

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
 
class YourTeam extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Welcome to your React Native Start Component!
        </Text>
      </View>
    );
  }
}
module.exports = YourTeam;