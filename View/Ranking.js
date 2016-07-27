const Realm = require('realm');
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  ListView,
} from 'react-native';
// import { ListView } from 'realm/react-native';
const UserSchema = {
        name: 'User',
        primaryKey: 'id',
        properties: {
            id:    'int',    // primary key
            user: 'string',
            password: 'string'
            
        }
};

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
    review: {type: 'list', objectType: 'Review'},
  }
};
let realm = new Realm({schema: [ReviewSchema, TeamSchema, UserSchema]});

var testData = [{"firstName":"Black","lastName":"Garrett"},
{"firstName":"Morales","lastName":"Duncan"},
{"firstName":"Ramos","lastName":"King"},
{"firstName":"Dunn","lastName":"Collins"},
{"firstName":"Fernandez","lastName":"Montgomery"},
{"firstName":"Burns","lastName":"Fox"},
{"firstName":"Richardson","lastName":"Kim"},
{"firstName":"Hanson","lastName":"Evans"},
{"firstName":"Anderson","lastName":"Hunt"},
{"firstName":"Carter","lastName":"Grant"},
{"firstName":"Ray","lastName":"Ruiz"},
{"firstName":"Hart","lastName":"Schmidt"},
{"firstName":"White","lastName":"Andrews"},
{"firstName":"Hall","lastName":"Holmes"},
{"firstName":"Hawkins","lastName":"Gomez"},
{"firstName":"Bowman","lastName":"Sullivan"},
{"firstName":"Brooks","lastName":"Evans"},
{"firstName":"Reyes","lastName":"Perez"},
{"firstName":"Dixon","lastName":"Barnes"},
{"firstName":"Ward","lastName":"Lee"},
{"firstName":"Berry","lastName":"Payne"},
{"firstName":"Murray","lastName":"Rose"},
{"firstName":"Stephens","lastName":"Fowler"},
{"firstName":"Rodriguez","lastName":"Lewis"},
{"firstName":"Cook","lastName":"Dean"}];

function compare(a,b) {
  if (a.lastName < b.lastName)
    return -1;
  if (a.lastName > b.lastName)
    return 1;
  return 0;
}

class SampleRow extends Component{
  render() {
    return (
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.text}>{this.props.lastName}, {this.props.firstName}</Text>
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

        var {data, sectionIds} = this.renderListViewData(testData.sort(compare));

        this.state = {
          dataSource: ds.cloneWithRowsAndSections(data, sectionIds)
        }
    }
  
  componentDidMount() {
    var listViewScrollView = this.refs.listView.getScrollResponder();
    listViewScrollView.scrollTo(1); // Hack to get ListView to render fully
  }
  
  renderListViewData(users) {
    var data = {};
    var sectionIds = [];
    
    users.map((user) => {
      var section = user.lastName.charAt(0);
      if (sectionIds.indexOf(section) === -1) {
        sectionIds.push(section);
        data[section] = [];
      }
      data[section].push(user);
    });

    return {data, sectionIds};
  }
  
  renderSectionHeader(data, sectionId) {
    var text;
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{sectionId}</Text>
      </View>
    );
  }
  
  renderRow(rowData) {
    return <SampleRow {...rowData} style={styles.row} />
  }

  render() {
    return (
      <ListView
        ref="listView"
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
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

// var arr = [];

// let teams = realm.objects('Team').sorted('rankpoint');
// let teams2 = teams.value;
// let team = {};

// teams.forEach(function(team,i,teams2){
//   arr.push(team);
// })
// console.log(arr[0]);
// // console.log(teams);




// Specify your own logic for sorting the datasource objects
// function compare(a,b) {
//   if (a.rankpoint < b.rankpoint)
//     return -1;
//   if (a.rankpoint > b.rankpoint)
//     return 1;
//   return 0;
// }

// class Row extends Component({
//   render() {
//     return (
//       <View style={styles.wrapper}>
//         <View>
//           <Text style={styles.text}>{this.props.lastName}, {this.props.firstName}</Text>
//         </View>
//       </View>
//     );
//   }
// });



 
// class Ranking extends Component {

//   // getInitialState() {
//   //       var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//   //       let teams = [ realm.objects('Team').sorted('rankpoint') ];
        
//   //       return {
//   //           //dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3']),
//   //           dataSource: ds.cloneWithRows(teams)
//   //       };
//   //   }

//     constructor(props){
//         super(props);
//         var ds = new ListView.DataSource({
//         rowHasChanged: (r1, r2) => r1 !== r2,
//         });
//         this.state = {
//           dataSource: ds.cloneWithRows(teams)
//         }
//     }

//     render() {
      
//       return (
//         <ListView
//           dataSource={this.state.dataSource}
//           renderRow={(rowData) => <Text>{rowData}</Text>}
//         />
//       );
//     }
  // getInitialState() {
  //   var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   return {
  //     dataSource: ds.cloneWithRows(['row 1', 'row 2']),
  //   };
  // }

  // render() {
  //   return (
  //     <ListView
  //     dataSource={this.state.dataSource.bind(this)}
  //     renderRow={(rowData) => <Text>{rowData}</Text>}
  //     />
  //     );
  // }
// }



module.exports = Ranking;