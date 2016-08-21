'use strict';

const {AppRegistry} = require('react-native');
const Login = require('./setup/login.js')
var GetStateUser = require('./Model/GetStateUser');



import React, { Component } from 'react';
import { NavigatorIOS, Text,AppState} from 'react-native';

export default class NextMatchReborn extends Component {

  // renderScene(route, navigator) {
  //       switch (route.name) {
  //           case 'Login':
  //               return <Login navigator={navigator} />;
  //           case 'Signup':
  //               return <Signup navigator ={navigator}  />
  //           case 'TabBar':
  //               return <TabBar navigator={navigator} />;
  //           case 'Ranking':
  //               return <Ranking navigator={navigator} />;
  //           case 'editProfile':
  //               return <EditProfile navigator={navigator} />;
  //           case 'profile':
  //               return <Profile navigator={navigator} />;
            
  //           default :
  //               return <Login navigator={navigator}  />;
  //       }
  //   }
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
      // renderScene={ this.renderScene}
      />
 
      
      
      
    );
  }
}

console.disableYellowBox = true;


// <AppNavigator /*store={this.props.store}*/ />

AppRegistry.registerComponent('NextMatchReborn',() => NextMatchReborn);

// 