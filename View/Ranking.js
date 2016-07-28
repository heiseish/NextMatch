// const Realm = require('realm');
var realm = require('../Model/model.js');

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  ListView,
} from 'react-native';
// import { ListView } from 'realm/react-native';
// realm.write(() => {
//   realm.create('Team', {id : 3,teamname:  'Haha United'});
// });
var arr = [];
let results = realm.objects('Team');
results.forEach(function(current,i,Team){
  arr.push(results[i]);
})


// function compare(a,b) {
//   if (a.lastName < b.lastName)
//     return -1;
//   if (a.lastName > b.lastName)
//     return 1;
//   return 0;
// }

function compare(a,b) {
  if (a.rankpoint < b.rankpoint)
    return -1;
  if (a.rankpoint > b.rankpoint)
    return 1;
  return 0;
}

class Row extends Component{
  render() {
    return (
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.text}>{this.props.teamname}        {this.props.rankpoint}</Text>
        </View>
      </View>
    );
  }
};


class Ranking extends Component{
  constructor(props){
        super(props);
        var ds = new ListView.DataSource({
        sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
        rowHasChanged: (r1, r2) => r1 !== r2
        });

        var {data, sectionIds} = this.renderListViewData(arr.sort(compare));

        this.state = {
          dataSource: ds.cloneWithRowsAndSections(data, sectionIds)
        }
    }
  
  componentDidMount() {
    var listViewScrollView = this.refs.listView.getScrollResponder();
    listViewScrollView.scrollTo({x:1, animated:true}); // Hack to get ListView to render fully
  }
  
  renderListViewData(users) {
    var data = {};
    var sectionIds = [];
    
    users.map((user) => {
      var section = user.teamname.charAt(0);
      if (sectionIds.indexOf(section) === -1) {
        sectionIds.push(section);
        data[section] = [];
      }
      data[section].push(user);
    });

    return {data, sectionIds};
  }
  
  // renderSectionHeader(data, sectionId) {
  //   var text;
  //   return (
  //     <View style={styles.sectionHeader}>
  //       <Text style={styles.sectionHeaderText}>{sectionId}</Text>
  //     </View>
  //   );
  // }
  
  renderRow(rowData) {
    return <Row {...rowData} style={styles.row} />
  }

  render() {
    return (
      <ListView
        ref="listView"
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        // renderSectionHeader={this.renderSectionHeader}
      />
    );
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
  },
  text: {
    fontSize: 24,
    fontWeight: "100",
    color: 'black',
  },
  sectionHeader: {
    backgroundColor: '#48D1CC'
  },
  sectionHeaderText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    color: 'white',
    paddingLeft: 10
  },
});








module.exports = Ranking;