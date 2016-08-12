'use strict';
var realm = require('../Model/model.js');
var JoinTeamView = require ('./JoinTeamView');
var CreateTeamView = require('./CreateTeamView');
var TeamPost = require('./TeamPost');
var TeamSetting = require('./TeamSetting');
var ChallengeList = require('./ChallengeList');
// import IconBadge from 'react-native-icon-badge';
import ScrollableTabView from 'react-native-scrollable-tab-view';
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
  Thumbnail,
  Badge,
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

  _setting(){
    this.props.navigator.push({
        name: 'Setting',
        title: 'Setting',
        component: TeamSetting,
        passProps: {user: this.props.user}
    });

  }

  _openChallengeBox(){
    this.props.navigator.push({
        name: 'Challenge',
        title: 'Challenge',
        component: ChallengeList,
        passProps: {user: this.props.user}
    });
  }
  
  countChallenges(){
    return realm.objects('Request').filtered('awayteam == $0',this.props.user.team).length;

  }

  returnTeamImage(teamname){
    let team = realm.objects('Team').filtered('teamname == $0',teamname)[0];
    if (team.imageStyle === 1) return require('../imgTeam/1.png');
    if (team.imageStyle === 2) return require('../imgTeam/2.jpg');
    if (team.imageStyle === 3) return require('../imgTeam/3.png');
    if (team.imageStyle === 4) return require('../imgTeam/4.png');
    if (team.imageStyle === 5) return require('../imgTeam/5.png');
    if (team.imageStyle === 6) return require('../imgTeam/6.jpg');
    if (team.imageStyle === 7) return require('../imgTeam/7.png');

  }

  returnPlayerImage(player){
    if (player.imageStyle === 1) return require('../imgUser/1.png');
    if (player.imageStyle === 2) return require('../imgUser/2.jpg');
    if (player.imageStyle === 3) return require('../imgUser/3.jpg');
    if (player.imageStyle === 4) return require('../imgUser/4.jpg');
  }
  

// <Image style={styles.bg} source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/3c/69/35/3c69358f9f5a6ab1a986d32b9c84c022.jpg'}} />

  render() {
    // var profilepic = this.props.user.image ? require('./my-icon-active.png') : require('./my-icon-inactive.png');
    if (this.props.user.team){
    let team = realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0];
    return (
      <Container>
        <Content>
        
        <View style={styles.containerTop}>
          <View style={{width: 80, height: 80, left: 0}} >
            <Image style={styles.modalImage} source={this.returnTeamImage(team.teamname)}  />
          </View>
          <View style={{width: 200, height: 80, right:0, paddingLeft: 10}} >
            <H3 style={styles.header}> {team.teamname}
            </H3>
            <Text >Rankpoint: <Text style={styles.bold}>        {team.rankpoint}</Text>
            </Text>
            <Text >Description: <Text style={styles.bold}>      {team.teamdescription}</Text>
            </Text>
          </View>
          
          {this.props.user.leader ? <View style={{width:30}}>
          <Button transparent onPress={() => {this._setting()}}>
          <Icon name="ios-settings" />
          </Button>
          </View> : <View/>}
          


          {this.props.user.leader ? <View style={{marginLeft: 10, width:40}}>
          <Button transparent onPress={() => {this._openChallengeBox()}}>
          <Icon name="ios-mail" badgeValue={2} />
          </Button>
          <Badge style={{position: 'absolute', width: 27, marginTop: -50, right:0, marginLeft: 30 }}>{this.countChallenges()}</Badge>
          </View> : <View/>}



          </View>
        
   
        
        <View style={{flex:1,height:300, marginTop: 40}}>

        <ScrollableTabView style={{marginTop:30}}>
          <TeamRoster tabLabel="Team players" navigator={this.props.navigator} user={this.props.user} />
          <UpcomingMatch tabLabel="Upcoming Matches" navigator={this.props.navigator} user={this.props.user}/>
          <TeamHistory tabLabel="Past Match" navigator={this.props.navigator} user={this.props.user}/>
          <TeamPost tabLabel="Team Post" navigator={this.props.navigator} user={this.props.user}/>
        </ScrollableTabView>
        </View>
        </Content>
      </Container>
    );



  } else {
    return (
       <Container>

        <Content>
        <View style={{alignItems:'center', justifyContent: 'center', flex: 1, flexDirection: 'column'}}>
          <Image style={styles.bg} source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/3c/69/35/3c69358f9f5a6ab1a986d32b9c84c022.jpg'}} />
        

          <View style={{height: 200, paddingTop: 150, marginTop:10}}>
          <H3 style={styles.font}> Oh it seems that you don't have a team yet
          </H3>
          </View>


          <Button block rounded primary onPress={() => {this._joinTeam()}}>
           Join 
          </Button>

          <View style={{height: 90, alignItems:'center', justifyContent: 'center', flexDirection:'row'}}>
          <View style={styles.separator}/>
          <View style={{width: 30}}><H3 style={styles.font}> Or </H3></View>
          <View style={styles.separator}/>
          </View>

          <Button block rounded warning onPress={() => {this._createTeam()}}>
            Create 
          </Button>
          <View style={{marginTop:10}}>
          <H3 style={styles.font}> a new team now !</H3>
          </View>

        </View>


          
          
            
        </Content>
      </Container>
      );

    }
  }
}

class UpcomingMatch extends Component{
  constructor(props){
    super(props)
  }
 returnTeamImage(teamname){
    let team = realm.objects('Team').filtered('teamname == $0',teamname)[0];
    if (team.imageStyle === 1) return require('../imgTeam/1.png');
    if (team.imageStyle === 2) return require('../imgTeam/2.jpg');
    if (team.imageStyle === 3) return require('../imgTeam/3.png');
    if (team.imageStyle === 4) return require('../imgTeam/4.png');
    if (team.imageStyle === 5) return require('../imgTeam/5.png');
    if (team.imageStyle === 6) return require('../imgTeam/6.jpg');
    if (team.imageStyle === 7) return require('../imgTeam/7.png');

  }

  returnPlayerImage(player){
    if (player.imageStyle === 1) return require('../imgUser/1.png');
    if (player.imageStyle === 2) return require('../imgUser/2.jpg');
    if (player.imageStyle === 3) return require('../imgUser/3.jpg');
    if (player.imageStyle === 4) return require('../imgUser/4.jpg');
  }
  
returnArrayMatches(state){
    var arr = [];
    let matchesHome = realm.objects('Match').filtered('hometeam == $0',this.props.user.team);
    let matchesAway = realm.objects('Match').filtered('awayteam == $0',this.props.user.team);
    matchesHome.forEach(function(current,i,Team){
      if (current.state === state) arr.push(current);
    })
    matchesAway.forEach(function(current,i,Team){
      if (current.state === state) arr.push(current);
    })
    return (arr)

  }
  
  render(){
    return(
      <Container>
      <Content>
       <List dataArray={this.returnArrayMatches('coming')} renderRow={(match) =>               
          <ListItem> 

          <View style={styles.containerTop}>

          <View style={{width: 30, height: 50, left: 0, }} >
          <Thumbnail square size={30} source={this.returnTeamImage(match.hometeam)} />
          </View>
          <View style={{width: 280, height: 50}}>
          <Text style={{fontWeight: '300', color: '#cc00cc', marginLeft: 98}}>{match.time}</Text>
          <Text style={{fontWeight: '600', color: '#cc00cc', marginLeft: 55}}>{match.hometeam} - {match.awayteam}</Text>
          </View>
          <View style={{width: 30, height: 50, right: 0}}>
          <Image style={styles.image} source={this.returnTeamImage(match.awayteam)} />
          </View> 
          </View>
   
          </ListItem>                            
        }> </List> 
            
        </Content>
      </Container>
    );
  }
}

class TeamRoster extends Component{
  constructor(props){
    super(props)
  }
  returnTeamImage(teamname){
    let team = realm.objects('Team').filtered('teamname == $0',teamname)[0];
    if (team.imageStyle === 1) return require('../imgTeam/1.png');
    if (team.imageStyle === 2) return require('../imgTeam/2.jpg');
    if (team.imageStyle === 3) return require('../imgTeam/3.png');
    if (team.imageStyle === 4) return require('../imgTeam/4.png');
    if (team.imageStyle === 5) return require('../imgTeam/5.png');
    if (team.imageStyle === 6) return require('../imgTeam/6.jpg');
    if (team.imageStyle === 7) return require('../imgTeam/7.png');

  }

  returnPlayerImage(player){
    if (player.imageStyle === 1) return require('../imgUser/1.png');
    if (player.imageStyle === 2) return require('../imgUser/2.jpg');
    if (player.imageStyle === 3) return require('../imgUser/3.jpg');
    if (player.imageStyle === 4) return require('../imgUser/4.jpg');
  }
  
  returnArrayPlayer(){
    var arrPlayer = [];
    let matchesHome = realm.objects('User').filtered('team == $0',this.props.user.team);

    matchesHome.forEach(function(current,i,Team){
      arrPlayer.push(matchesHome[i]);
    })
  
    return (arrPlayer)

  }

  render(){
    return(
      <Container>
      <Content>
      <List dataArray={this.returnArrayPlayer()} renderRow={(player) =>               
          <ListItem> 

          <View style={styles.containerTop}>

          <View style={{width: 80, height: 20, left: 0}} >
          <Thumbnail square size={30} source={this.returnPlayerImage(player)} />
          </View>
          <View style={{width: 200, height: 20, right:0, paddingLeft: 10 }}>
          <Text style={{fontWeight: '600', color: '#cc00cc', right : 25, marginLeft: 55}}>{player.displayname}   {player.position}</Text>
          </View>
          
          </View>
   
          </ListItem>                            
        }> </List> 
       
            
        </Content>
      </Container>
    );
  }
}


class TeamHistory extends Component{
  constructor(props){
    super(props)
  }
  returnTeamImage(teamname){
    let team = realm.objects('Team').filtered('teamname == $0',teamname)[0];
    if (team.imageStyle === 1) return require('../imgTeam/1.png');
    if (team.imageStyle === 2) return require('../imgTeam/2.jpg');
    if (team.imageStyle === 3) return require('../imgTeam/3.png');
    if (team.imageStyle === 4) return require('../imgTeam/4.png');
    if (team.imageStyle === 5) return require('../imgTeam/5.png');
    if (team.imageStyle === 6) return require('../imgTeam/6.jpg');
    if (team.imageStyle === 7) return require('../imgTeam/7.png');

  }

  returnPlayerImage(player){
    if (player.imageStyle === 1) return require('../imgUser/1.png');
    if (player.imageStyle === 2) return require('../imgUser/2.jpg');
    if (player.imageStyle === 3) return require('../imgUser/3.jpg');
    if (player.imageStyle === 4) return require('../imgUser/4.jpg');
  }

  returnArrayMatches(state){
    var arr = [];
    let matchesHome = realm.objects('Match').filtered('hometeam == $0',this.props.user.team);
    let matchesAway = realm.objects('Match').filtered('awayteam == $0',this.props.user.team);
    matchesHome.forEach(function(current,i,Team){
      if (current.state === state) arr.push(current);
    })
    matchesAway.forEach(function(current,i,Team){
      if (current.state === state) arr.push(current);
    })
    return (arr)

  }
  render(){
    return(
      <Container>
      <Content>
      <List dataArray={this.returnArrayMatches('finished')} renderRow={(match) =>               
          <ListItem> 

          <View style={styles.containerTop}>

          <View style={{width: 30, height: 20, left: 0, }} >
          <Thumbnail square size={30} source={this.returnTeamImage(match.hometeam)} />
          </View>
          <View style={{width: 280, height: 20}}>
          <Text style={{fontWeight: '600', color: '#cc00cc', marginLeft: 55}}>{match.hometeam} {match.hometeamscore}-{match.awayteamscore} {match.awayteam}</Text>
          </View>
          <View style={{width: 30, height: 20, right: 0}}>
          <Image style={styles.image} source={this.returnTeamImage(match.awayteam)} />
          </View> 
          </View>
   
          </ListItem>                            
        }> </List> 
       
            
        </Content>
      </Container>
    );
  }
}





const styles = StyleSheet.create({
    container: {
      height: 200,

    },
    containerTop: {
      flex: 1,
      flexDirection: 'row', 
      marginTop: 5,
      backgroundColor: 'transparent',
    },
    bg: {
      marginTop: -33,
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
  font: {
    fontWeight: '300', 
    color: '#FFF', 
    alignItems:'center', 
    justifyContent: 'center',
    fontStyle: 'italic',
    fontSize: 21, 
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    width: 100
  },
  
});

module.exports = YourTeam;