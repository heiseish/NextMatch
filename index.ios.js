'use strict';

const {AppRegistry} = require('react-native');
const Login = require('./setup/setup.js')

import CodePush from 'react-native-code-push';
import AppNavigator from './setup/AppNavigator';
import React, { Component } from 'react';
import { NavigatorIOS, Text,AppState } from 'react-native';

export default class NextMatch extends Component {
  componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(state:string) {
        if (state === 'active') {
            CodePush.sync({installMode: CodePush.InstallMode.IMMEDIATE});
        }
    }
  renderScene(route, navigator) {
        switch (route.name) {
            case 'Login':
                return <Login navigator={navigator} />;
            case 'Signup':
                return <Signup navigator ={navigator}  />
            case 'TabBar':
                return <TabBar navigator={navigator} />;
            case 'Ranking':
                return <Ranking navigator={navigator} />;
            case 'TeamView':
                return <TeamView navigator={navigator} />;
            default :
                return <Login navigator={navigator}  />;
        }
    }
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




// <AppNavigator /*store={this.props.store}*/ />

AppRegistry.registerComponent('NextMatch',() => NextMatch);

// 