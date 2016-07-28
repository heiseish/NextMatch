'use strict';
var realm = require('../Model/model.js');
var TeamView = require('./TeamView');

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  // ListView,
  // Dimensions,
  TouchableHighlight,
  Image,
  NavigatorIOS,
} from 'react-native';
import { ListView } from 'realm/react-native';

// var windowSize = Dimensions.get('window');

var arr = [];
let results = realm.objects('Team');
results.forEach(function(current,i,Team){
  arr.push(results[i]);
})


function compare(a,b) {
  if (a.rankpoint > b.rankpoint)
    return -1;
  if (a.rankpoint < b.rankpoint)
    return 1;
  return 0;
}



class Ranking extends Component {
 //  renderScene(route, navigator) {
 //   if(route.component == 'Login') {
 //     return <TabBar navigator={navigator} />
 //   }
 //   if(route.component == 'Ranking') {
 //     return <TeamView navigator={navigator} />
 //   }
 // }
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.id !== r2.id});

    this.state = {
      dataSource: dataSource.cloneWithRows(arr.sort(compare))
    };
    // this.rowPressed = this.rowPressed.bind(this);
  }

  rowPressed(id) {
    var teamSelected = arr.filter(prop => prop.id === id)[0];

    this.props.navigator.push({
      title: "Team View",
      component: <TeamView/>,
      passProps: {property: teamSelected},
    });
  }


 
  renderRow(rowData, sectionID, rowID) {
    var mmr = rowData.rankpoint;

    return (

      <TouchableHighlight onPress={() => this.rowPressed(rowData.id)}
      underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            
            <Image style={styles.thumb} source={{ uri: rowData.image }} />
          <View  style={styles.textContainer}>
          <Text style={styles.rankpoint}>{mmr} MMR</Text>
          <Text style={styles.title}
            numberOfLines={1}>{rowData.teamname}</Text>
          </View>
        </View>
        <View style={styles.separator}/>
        </View>
      </TouchableHighlight>

      );
  }

  // componentDidMount() {
  //   ListView.scrollTo({x:1, animated:true})
  // }
 
  render() {
    return (

      <ListView
        // navigator={this.props.navigator}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>

    );
  }
 
}


var styles = StyleSheet.create({

  // bg: {
  //   position: 'absolute',
  //   left: 0,
  //   top: 0,
  //   width: windowSize.width,
  //   height: windowSize.height
  // },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 2
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  rankpoint: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});





module.exports = Ranking;