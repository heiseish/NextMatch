'use strict';
var realm = require('../Model/model.js');
var JoinTeamView = require ('./JoinTeamView');
var CreateTeamView = require('./CreateTeamView');

import { replaceRoute } from '../actions/route';

import React, { Component } from 'react';
import { 
  Container, 
  Header, 
  Title, 
  Content, 
  Text, 
  InputGroup, 
  Input, 
  Icon, 
  Button ,
  Card,
  CardItem,
  H3,
  H1,
  List,
  ListItem,
  Thumbnail
} from 'native-base';
import {
  Modal,
  StyleSheet,
  Platform,
  View,
  Image,
  Dimensions
} from 'react-native';
var windowSize = Dimensions.get('window');

 
class YourTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      
    }

  }
  _joinTeam(){
    this.props.navigator.push({
        name: 'JoinTeam',
        title: 'Join A Team',
        component: JoinTeamView,
    });
  }

  _createTeam(){
    this.props.navigator.push({
        name: 'CreatTeam',
        title: 'Create New Team',
        component: CreateTeamView,
        passProps: {user: this.props.user}
    });
  }
  returnTeamImage(teamname){
    let team = realm.objects('Team').filtered('teamname == $0',teamname)[0];
    return team.image;
  }
  returnArrayPlayer(){
    var arrPlayer = [];
    let matchesHome = realm.objects('User').filtered('team == $0',this.props.user.team);

    matchesHome.forEach(function(current,i,Team){
      arrPlayer.push(matchesHome[i]);
    })
  
    return (arrPlayer)

  }

  returnArrayMatches(){
    var arr = [];
    let matchesHome = realm.objects('Match').filtered('hometeam == $0',this.props.user.team);
    let matchesAway = realm.objects('Match').filtered('awayteam == $0',this.props.user.team)
    matchesHome.forEach(function(current,i,Team){
      arr.push(matchesHome[i]);
    })
    matchesAway.forEach(function(current,i,Team){
      arr.push(matchesAway[i]);
    })
    return (arr)

  }

  render() {
    // var profilepic = this.props.user.image ? require('./my-icon-active.png') : require('./my-icon-inactive.png');
    if (this.props.user.team){
    let team = realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0];
    return (
      <Container>
        <Content>
        <Image style={styles.bg} source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/b6/c3/51/b6c351202bcb0d11022d09247881d17f.jpg'}} />
        <View style={styles.containerTop}>
          <View style={{width: 80, height: 80, left: 0}} >
            <Image style={styles.modalImage} source={{uri: team.image}}  />
          </View>
          <View style={{width: 200, height: 80, right:0, paddingLeft: 10}} >
            <H3 style={styles.header}> {team.teamname}
            </H3>
            <Text >Rankpoint: <Text style={styles.bold}>        {team.rankpoint}</Text>
            </Text>
            <Text >Description: <Text style={styles.bold}>      {team.teamdescription}</Text>
            </Text>
          </View>
        </View>
    
        <Title>History</Title>
        
        {this.state.isLoading? <Spinner /> : <List dataArray={this.returnArrayMatches()} renderRow={(match) =>               
          <ListItem> 

          <View style={styles.containerTop}>

          <View style={{width: 130, height: 20, left: 0}} >
          <Thumbnail square size={30} source={{uri: this.returnTeamImage(match.hometeam)}} />
          </View>
          <View style={{width: 130, height: 20}}>
          <Text style={{fontWeight: '600', color: '#cc00cc', right : 25, marginLeft: -5}}>{match.hometeam} {match.hometeamscore}-{match.awayteamscore} {match.awayteam}</Text>
          </View>
          <View style={{width: 130, height: 20, right: 0}}>
          <Image style={styles.image} source={{uri: this.returnTeamImage(match.awayteam)}} />
          </View> 
          </View>
   
          </ListItem>                            
        }> </List> }


        <View style={{marginTop:10}}>
        <Title>Team Rosters</Title>
        {this.state.isLoading? <Spinner /> : <List dataArray={this.returnArrayPlayer()} renderRow={(player) =>               
          <ListItem> 

          <View style={styles.containerTop}>

          <View style={{width: 80, height: 20, left: 0}} >
          <Thumbnail square size={30} source={{uri: player.image}} />
          </View>
          <View style={{width: 200, height: 20, right:0, paddingLeft: 10 }}>
          <Text style={{fontWeight: '600', color: '#cc00cc', right : 25, marginLeft: -5}}>{player.displayname}   {player.position}</Text>
          </View>
          
          </View>
   
          </ListItem>                            
        }> </List> }
          </View>
        
            
        </Content>
      </Container>
    );
  } else {
    return (
       <Container>
        <Header>
          <Title></Title>
        </Header>

        <Content>
        <View style={{alignItems:'center', justifyContent: 'center', flex: 0.5}}>
        <H3 style={styles.header}> Oh it seems that you don't have a team now
        </H3>
        <Button block rounded primary onPress={() => {this._joinTeam()}}>
          Join 
        </Button>
        <Text> a team </Text>

        <Text> Or </Text>

        <Button block rounded success onPress={() => {this._createTeam()}}>
          Create 
        </Button>
        <Text> a new team now !</Text>
        </View>
          
          
            
        </Content>
      </Container>
      );

    }
  }
}





const styles = StyleSheet.create({
    containerTop: {
      flex: 1,
      flexDirection: 'row', 
      marginLeft: 20, 
      marginRight:20, 
      marginTop: 5,
      backgroundColor: 'transparent',
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header : {
        alignItems: 'center',
        lineHeight: 24,
        color: '#5357b6'
    },
    modalImage: {
        resizeMode: 'contain',
        width: 80,
        height: 80,
    },
    bold: {
        fontWeight: '600'
    },
    image:{
    width: 30,
    height: 30,
    alignItems: 'center',
    
  },
  
});

module.exports = YourTeam;