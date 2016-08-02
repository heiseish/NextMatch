'use strict';

var realm = require('../Model/model.js');
import React, { Component } from 'react';
import { 
  Container, 
  Header, 
  Title, 
  Thumbnail,
  Text,
  Icon,
  Button,
  List,
  ListItem,
  Content,

} from 'native-base';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
var windowSize = Dimensions.get('window');

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  returnArrayMatches(){
    var arr = [];
    let matches = realm.objects('Match').filtered('state = "finished"');
    matches.forEach(function(current,i,Team){
      arr.push(current);
    })
    return (arr)

  }
  returnTeamImage(teamname){
    let team = realm.objects('Team').filtered('teamname == $0',teamname)[0];
    if (team.image === '') return 'https://i0.wp.com/assets.plan.io/images/default_avatar.png'; 
    else return team.image;
  }

  
  
 
  render() {
    return (

      <Container>
      <Content>
      <View style={styles.container}>
      <View>
      <Image style={styles.bg} source={{uri: 'https://s-media-cache-ak0.pinimg.com/564x/83/28/15/8328156f64be106b14493fe117023646.jpg'}} />
      </View>
      <Title> Match History </Title>

      <ScrollView style={{height:570, flex:1}}>
      <View>
      {this.state.isLoading? <Spinner /> : <List dataArray={this.returnArrayMatches()} renderRow={(match) =>  
        <ListItem> 
        <View style={{flex: 1, flexDirection: 'row', marginLeft: 0, marginRight:0, marginTop: 20}}>
        <View style={{width: 60, height: 60, left: 0, }} >
        <Thumbnail square size={60} source={{uri: this.returnTeamImage(match.hometeam)}} />
        </View>
        <View style={{width: 200, height: 60}}>
        <Text style={{fontWeight: '600', color: '#996633', marginLeft: 20}}>{match.hometeam}  {match.hometeamscore} - {match.awayteamscore}  {match.awayteam}</Text>
        </View>
        <View style={{width: 60, height: 60, right: 0}}>
        <Image style={styles.image} source={{uri: this.returnTeamImage(match.awayteam)}} />
        </View>
        </View>


      </ListItem>  
      }> </List> }
      </View>
        </ScrollView>
        </View>
      </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    position: 'relative'
  },

  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  bg: {
        marginTop: -32,
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: 650,
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
    
    },
});

 

module.exports = Match;