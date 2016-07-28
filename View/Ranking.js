// const Realm = require('realm');
var realm = require('../Model/model.js');

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  // ListView,
  TouchableHighlight,
  Image,
} from 'react-native';
import { ListView } from 'realm/react-native';

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
 
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: dataSource.cloneWithRows(arr.sort(compare))
    };
  }

 
  renderRow(rowData, sectionID, rowID) {
    var mmr = rowData.rankpoint;

    return (

      <TouchableHighlight onPress={() => this.rowPressed(rowData.guid)}
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
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
 
}


var styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  // wrapper: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingRight: 10,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#e9e9e9',
  // },
  // text: {
  //   fontSize: 24,
  //   fontWeight: "100",
  //   color: 'black',
  // },

  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
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



// class Row extends Component{
//   render() {
//     return (
//       <View style={styles.wrapper}>
//       <TouchableHighlight underlayColor='#dddddd' onPress={() => this.rowPressed(rowData.guid)}>
//         <View>
//           <Text style={styles.text}>{this.props.teamname}        {this.props.rankpoint}</Text>
//         </View>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// };


// class Ranking extends Component{
//   constructor(props){
//         super(props);
//         var ds = new ListView.DataSource({
//         sectionHeaderHasChanged: (r1, r2) => r1 !== r2,
//         rowHasChanged: (r1, r2) => r1 !== r2
//         });

        // var {data, sectionIds} = this.renderListViewData(arr.sort(compare));

//         this.state = {
//           dataSource: ds.cloneWithRowsAndSections(data, sectionIds)
//         }
//     }
  
  // componentDidMount() {
  //   var listViewScrollView = this.refs.listView.getScrollResponder();
  //   listViewScrollView.scrollTo({x:1, animated:true}); // Hack to get ListView to render fully
  // }
  
//   renderListViewData(users) {
//     var data = {};
//     var sectionIds = [];
    
//     users.map((user) => {
//       var section = user.teamname.charAt(0);
//       if (sectionIds.indexOf(section) === -1) {
//         sectionIds.push(section);
//         data[section] = [];
//       }
//       data[section].push(user);
//     });

//     return {data, sectionIds};
//   }
  

  
//   renderRow(rowData) {
//     return <Row {...rowData} style={styles.row} />
//   }

//   render() {
//     return (
//       <ListView
//         ref="listView"
//         automaticallyAdjustContentInsets={false}
//         dataSource={this.state.dataSource}
//         renderRow={this.renderRow}
     
//       />
//     );
//   }
// };




module.exports = Ranking;