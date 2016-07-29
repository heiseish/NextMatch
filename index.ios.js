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
          name: 'Login',
          component: Login,
          title: 'Log In',
        }}
        style={{flex: 1}}
        navigationBarHidden={true}
        renderScene={ this.renderScene }
      />
    );
  }
}






AppRegistry.registerComponent('NextMatch',() => NextMatch);

