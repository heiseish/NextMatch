'use strict';
var Ranking = require("./Ranking/Ranking.js");
var YourTeam = require("./Team/yourTeam.js");
var Match = require("./Match/Match.js");
var Profile = require("./Profile/Profile.js");
var realm = require('../Model/model.js');
var GetMatch = require('./GetMatch/GetMatch.js')
var firebase = require('../Model/firebase')
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

function temporarySwap(array)
{
    var left = null;
    var right = null;
    var length = array.length;
    for (left = 0, right = length - 1; left < right; left += 1, right -= 1)
    {
        var temporary = array[left];
        array[left] = array[right];
        array[right] = temporary;
    }
    return array;
}


class TabBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab:this.props.selectedTab,
      team:{},
      matchFinished:[],
      matchComing:[],
      ranks: [],
    };
   
  }

  componentDidMount(){
    firebase.database().ref('teams/' + this.props.user.team).on('value',(snap)=>{
      // console.log(snap.val());
      this.setState({team:snap.val()});
    })

    let matchFinished = []
    let matchComing = []
    let ranks = []
    // console.log(new Date(Date.now()))
    // console.log((new Date(Date.now())).toDateString())
    // console.log(JSON.stringify(new Date(Date.now())))
    // console.log(JSON.parse(JSON.stringify(new Date(Date.now()))))
    firebase.database().ref('match').orderByChild('time').startAt(JSON.parse(JSON.stringify(new Date(Date.now() - 864000000)))).endAt(JSON.parse(JSON.stringify(new Date(Date.now() + 864000000)))).once('value').then((snap)=>{
      snap.forEach((child)=>{
        // console.log(child.val())
        if (child.val().state === 'finished') matchFinished.push(child.val())
        else matchComing.push(child.val())
      })
      this.setState({
        matchComing: matchComing,
        matchFinished: matchFinished
      })
    })
    firebase.database().ref('teams').orderByChild('rankpoint').limitToLast(50).once('value').then((snap)=>{
      snap.forEach((child)=>{
        // console.log(child.val())
        ranks.push(child.val())
      })
      this.setState({ranks:temporarySwap(ranks)})
    }) 

  }

  

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
        <Ranking navigator={this.props.navigator} user={this.props.user} team ={this.state.team} ranks={this.state.ranks}/>
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
      <Match navigator={this.props.navigator} user={this.props.user} team ={this.state.team} matchFinished={this.state.matchFinished} matchComing={this.state.matchComing}/>
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
      {(!this.props.user.team) ? <YourTeam navigator={this.props.navigator} user={this.props.user} team ={this.state.team}/> : <GetMatch navigator={this.props.navigator} user={this.props.user} team ={this.state.team}/>}
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
      <YourTeam navigator={this.props.navigator} user={this.props.user} team ={this.state.team}/>
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
      <Profile navigator={this.props.navigator} user={this.props.user} team ={this.state.team}/>
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
