'use strict';

const {AppRegistry} = require('react-native');
const Login = require('./setup/setup.js')

import React, { Component } from 'react';
import { NavigatorIOS, Text } from 'react-native';

export default class NextMatch extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Login,
          title: 'My Initial Scene',
        }}
        style={{flex: 1}}
        navigationBarHidden={true}
      />
    );
  }
}




AppRegistry.registerComponent('NextMatch',() => NextMatch);
