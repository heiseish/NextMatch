'use strict';
var Ranking = require("./Ranking/Ranking.js");
var YourTeam = require("./Team/yourTeam.js");
var Match = require("./Match/Match.js");
var Profile = require("./Profile/Profile.js");
var realm = require('../Model/model.js');
var GetMatch = require('./GetMatch/GetMatch.js')
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
  ActivityIndicatorIOS,
} from 'react-native';

class TabBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab:this.props.selectedTab,
      notifCount: 0,
      presses:0,
      team: this.searchForTeam(),
      user: this.returnUser(),
    };
   
  }

  searchForTeam(){
    let user = realm.objects('User').filtered('email == $0',this.props.user.email)[0];
    if (user.team) return true
    else return false;
  
  }
   returnUser(){
    return realm.objects('User').filtered('email == $0',this.props.user.email)[0];
   }
  // _renderContent(page) {
  //   return (
  //     <page navigator={this.props.navigator} user={this.props.user}/>
  //     );
  // }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="white"
        tintColor="#003300"
        barTintColor="#008000">

        <Icon.TabBarItem
        title="Ranking"
        iconName="ios-clipboard-outline"
        selectedIconName="ios-clipboard"
        selected={this.state.selectedTab === 'Ranking'}
        onPress={() => {
          this.setState({
            selectedTab: 'Ranking',
          });
        }}>
        <Ranking navigator={this.props.navigator} user={this.state.user}/>
        </Icon.TabBarItem>

        <Icon.TabBarItem

        title="Match"
        iconName="ios-clock-outline"
        selectedIconName="ios-clock"
        selected={this.state.selectedTab === 'Match'}
        onPress={() => {
          this.setState({
            selectedTab: 'Match',
          });
      }}>
      <Match navigator={this.props.navigator} user={this.state.user}/>
      </Icon.TabBarItem>

      <Icon.TabBarItem
        title="Play"
        iconName="ios-football-outline"
        selectedIconName="ios-football"
        selected={this.state.selectedTab === 'GetMatch'}
        onPress={() => {
          this.setState({
            selectedTab: 'GetMatch',
          });
        }}>
      {this.state.team ? <YourTeam navigator={this.props.navigator} user={this.state.user}/> : <GetMatch navigator={this.props.navigator} user={this.state.user}/>}
      </Icon.TabBarItem>


      <Icon.TabBarItem
        title="Team"
        iconName="ios-document-outline"
      selectedIconName="ios-document"
        selected={this.state.selectedTab === 'yourTeam'}
        onPress={() => {
          this.setState({
            selectedTab: 'yourTeam',
          });
      }}>
      <YourTeam navigator={this.props.navigator} user={this.state.user}/>
      </Icon.TabBarItem>


      <Icon.TabBarItem
      title="Profile"
      iconName="ios-man-outline"
      selectedIconName="ios-man"
      
      selected={this.state.selectedTab === 'profile'}
      onPress={() => {
        this.setState({
          selectedTab: 'profile',
        });
      }}>
      <Profile navigator={this.props.navigator} user={this.state.user}/>
      </Icon.TabBarItem>
      
      </TabBarIOS>
      );
  }

};
var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

module.exports = TabBar;
