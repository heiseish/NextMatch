'use strict';

var realm = require('../Model/model.js');
import React, { Component } from 'react';
import { 
  Container, 
  Header, 
  Title, 
  Thumbnail,
  Text,
} from 'native-base';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { ListView } from 'realm/react-native';

 
class Match extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.returnArrayMatches())
    };
  }

  returnArrayMatches(){
    var arr = [];
    let matches = realm.objects('Match').filtered('state = "finished"');
    matches.forEach(function(current,i,Team){
      arr.push(matches[i]);
    })
    return (arr)

  }
  returnTeamImage(teamname){
    let team = realm.objects('Team').filtered('teamname == $0',teamname)[0];
    return team.image;
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row', marginLeft: 20, marginRight:20, marginTop: 20}}>
          <View style={{width: 130, height: 80, left: 0}} >
            <Thumbnail square size={60} source={{uri: this.returnTeamImage(rowData.hometeam)}} />
          </View>
          <View style={{width: 130, height: 80}}>
            <Text style={{fontWeight: '600', color: '#46ee4b', right : 25, top: 15, marginLeft: -5}}>{rowData.hometeam}  {rowData.hometeamscore} - {rowData.awayteamscore}  {rowData.awayteam}</Text>
          </View>
          <View style={{width: 130, height: 80, right: 0}}>
            <Image style={styles.image} source={{uri: this.returnTeamImage(rowData.awayteam)}} />
          </View>
          
      </View>
      <View style={styles.separator}/>
      </View>
    );
  }
 
  render() {
    return (


      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
}
var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'row', 
    marginLeft: 20, 
    marginRight:20,
    padding: 10,
  },
  image:{
    width: 60,
    height: 60,
    alignItems: 'center',
    // marginLeft: 181,
    // marginTop: 20,
    },
});

  // render() {

  //   return (
  //     <Container>
  //     <Header searchBar rounded>                            
  //       <Title> Match History </Title>               
  //     </Header>

  //     <Content >
  //     {this.state.loading? <Spinner /> : <List dataArray={this.returnArrayMatches()} renderRow={(match) =>               
  //       <ListItem button style={{flex: 1, flexDirection: 'row'}}> 
  //         <View style={{width: 50, height: 50}}>
  //           <Thumbnail square size={50} source={{uri: this.returnTeamImage(match.hometeam)}} /> 
  //         </View> 
  //         <View style={{width: 50, height: 50}}>
  //           <Text style={{fontWeight: '600', color: '#46ee4b', alignItems: 'center'}}>     {match.hometeam}  {match.hometeamscore} - {match.awayteamscore}</Text>
  //         </View> 
  //         <View style={{width: 50, height: 50}}>
  //           <Image style={styles.image} source={{uri: this.returnTeamImage(match.awayteam)}} />  
  //         </View>      
  //       </ListItem>                            
  //     }> </List> }
  //     </Content>
  //     </Container>


  //     );
//   }
// }

module.exports = Match;