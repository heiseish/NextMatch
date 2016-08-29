'use strict';

var JoinTeamView = require ('./JoinTeamView');
var CreateTeamView = require('./CreateTeamView');
// var TeamPost = require('./TeamPost');
var TeamSetting = require('./TeamSetting');
var MailBox = require('./MailBox');
var TeamManagement = require('./TeamManagement')
var matchRef = require('../../Model/matchRef');

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
  Dimensions,
  ListView,
  RefreshControl,
  ScrollView
} from 'react-native';
var windowSize = Dimensions.get('window');


class YourTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      team: this.props.team,
      matchFinished:[],
      matchComing: [],
      challenge: [],
      request: [],
      gotMail:false,
    }

  }
  returnArrayMatches(state,cb){
    let arr =[]
    firebase.database().ref('match').once('value').then((snap)=>{
      snap.forEach((child)=>{
          if (child.val().awayteam === this.state.team.name && child.val().state === state) arr.push(child.val())
          if (child.val().hometeam === this.state.team.name && child.val().state === state) arr.push(child.val())
        })
      
      cb(null,arr)
    })


  }

  returnMailBox(cb){
    let arrChallenge = []
    let arrRequest = []
    let gotMail = false
    firebase.database().ref('teams/' + this.props.team.name).once('value').then((snap)=>{
      snap.child('challenge').forEach((child)=>{
        arrChallenge.push(child.val())
      })
      snap.child('request').forEach((child)=>{
        arrRequest.push(child.val())
      })
      if (arrChallenge.length > 0 || arrRequest.length > 0) gotMail = true;
      cb(null,arrChallenge,arrRequest,gotMail)
    })
  }

  componentDidMount(){
    this.returnArrayMatches('finished',(err,arr)=>{
      this.setState({matchFinished: arr})
      // console.log(this.state.matchFinished)
    })

    this.returnArrayMatches('coming',(err,arr)=>{
      this.setState({matchComing: arr})
      // console.log(this.state.matchComing)
    })

    this.returnMailBox((err,arrChallenge,arrRequest,gotMail)=>{
      this.setState({
        challenge: arrChallenge,
        request: arrRequest,
        gotMail: gotMail

      })
      // console.log(arrChallenge);
      // console.log(arrRequest);
      // console.log(gotMail)
    });


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
      passProps: {user: this.props.user,team: this.props.team}
    });

  }

  _openChallengeBox(){
    this.props.navigator.push({
      name: 'Challenge',
      title: 'Challenge',
      component: MailBox,
      passProps: {user: this.props.user,challenge: this.state.challenge,team:this.props.team,results:[]}
    });
  }

  _openTeamManagement(){
    this.props.navigator.push({
      name: 'Team Managment',
      title: 'Team Managment',
      component: TeamManagement,
      passProps: {user: this.props.user,request: this.state.request,team:this.props.team,rosters:[]}
    });
  }

  // _openTeamPost(){
  //   this.props.navigator.push({
  //     name: 'TeamChat',
  //     title: 'TeamChat',
  //     component: TeamPost,
  //     passProps: {user: this.props.user}
  //   });
  // }

  countChallenges(){
    return this.state.challenge.length + this.state.request.length

  }



render() {
    // var profilepic = this.props.user.image ? require('./my-icon-active.png') : require('./my-icon-inactive.png');

    if (this.props.user.team){

      return (


        <View style={styles.container}>
        <View style={styles.containerTop}>
        <View style={{width: 80, height: 80, left: 0}} >
        <Image style={styles.modalImage} source={{uri: this.state.team.picture}}  />
        </View>
        <View style={{width: 200, height: 80, right:0, paddingLeft: 10}} >
        <H3 style={styles.header}> {this.state.team.name}
        </H3>
        <Text >Rankpoint: <Text style={styles.bold}>        {this.state.team.rankpoint}</Text>
        </Text>
        <Text >Description: <Text style={styles.bold}>      {this.state.team.description}</Text>
        </Text>

        </View>

        {this.props.user.leader ? <View style={{width:30}}>
        <Button transparent onPress={() => {this._setting()}}>
        <Icon name="ios-settings" />
        </Button>
        </View> : <View/>}

        <View style={{width:30,flexDirection:'column'}}>
        {this.props.user.leader ? <View style={{marginLeft: 10, width:40}}>
        <Button transparent onPress={() => {this._openChallengeBox()}}>
        <Icon name="ios-mail" />
        </Button>
        {this.state.gotMail ?<Badge style={{position: 'absolute', width: 27, marginTop: -50, right:0, marginLeft: 30 }}>{this.countChallenges()}</Badge> : <View/>}
        </View> : <View/>}

        {this.props.user.leader ? <View style={{marginLeft: 10, width:40}}>
        <Button transparent onPress={() => {this._openTeamManagement()}}>
        <Icon name="ios-person"/>
        </Button>
        {this.state.gotMail ?<Badge style={{position: 'absolute', width: 27, marginTop: -50, right:0, marginLeft: 30 }}>{this.countChallenges()}</Badge> : <View/>}
        </View> : <View/>}
        </View>



        

        </View>


        <View style={{height:600,marginTop:20}}>


        <ScrollableTabView>
        
        <UpcomingMatch tabLabel="Upcoming Matches" navigator={this.props.navigator} user={this.props.user} team={this.props.team} match={this.state.matchComing} />

        <TeamHistory tabLabel="Past Match" navigator={this.props.navigator} user={this.props.user} team={this.props.team} match={this.state.matchFinished} />
        </ScrollableTabView>
        </View>
        </View>

        );




    } else {
      return (
       <Container>

       <Content>
       <View style={{alignItems:'center', justifyContent: 'center', flex: 1, flexDirection: 'column'}}>
       <Image style={styles.bg} source={require('../../imgBackground/background.jpg')} />


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
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1.id !== row2.id});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.match),
      refreshing: false,
    }

  }
  _onRefresh() {
    this.setState({refreshing: true});
    this._refreshArray('finished',(err)=>{
      if (!err) this.setState({refreshing:false})
    })

    

  }
  _refreshArray(state,cb){
   
    this.returnArrayMatches('coming',(err,arr)=>{
      if (!err)
      this.setState({
        refreshing: false,
        dataSource: this.ds.cloneWithRows(arr)
      })
    })
    


  }

  componentDidMount(){
    this.returnArrayMatches('finished',(err)=>{
      if (!err) console.log('good')
    })
    
    
  }



  returnArrayMatches(state,cb){
    let arr = []
    firebase.database().ref('match').once('value').then((snap)=>{
      snap.forEach((child)=>{
        if (child.val().awayteam === this.props.team.name && child.val().state === state) arr.push(child.val())
          if (child.val().hometeam === this.props.team.name && child.val().state === state) arr.push(child.val())
        })
      
      cb(null,arr);
    })


  }

  returnTeamImage(name){
    var picture = ''
    firebase.database().ref('teams/' + name).on('value',(snap)=>{
      picture= snap.val().picture;
    })
    return picture;
  }

  renderRow(match) {
    return (


      <View>

      <View style={styles.row}>

      <View style={{width: 60, height: 70, left: 0}} >
      <Thumbnail square size={50} source={{uri:this.returnTeamImage(match.hometeam)}} />
      </View>
      <View style={{width: 260, height: 70}}>
      <Text style={{fontWeight: '600', color: '#77773c', alignSelf: 'center',marginTop:20}}>{match.hometeamabre}        {match.hometeamscore}-{match.awayteamscore}       {match.awayteamabre}</Text>
      </View>
      <View style={{width: 60, height: 70, right: 0}}>
      <Image style={styles.image} source={{uri:this.returnTeamImage(match.awayteam)}} />
      </View> 
      
      </View>
      <View style={styles.rowSeparator}/>
      </View>

      );
  }


  render(){
    return(

     <ScrollView style={styles.scrollview} 
     refreshControl={
      <RefreshControl
      refreshing={this.state.refreshing}
      onRefresh={()=>{this._onRefresh()}}
      />}>
     <ListView
     

      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}/>
      </ScrollView>

      
      );
  }
}




class TeamHistory extends Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1.id !== row2.id});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.match),
      refreshing: false,
    }

  }
  _onRefresh() {
    this.setState({refreshing: true});
    this._refreshArray('finished',(err)=>{
      if (!err) this.setState({refreshing:false})
    })

    

  }
  _refreshArray(state,cb){
   
    this.returnArrayMatches('finished',(err,arr)=>{
      if (!err)
      this.setState({
        refreshing: false,
        dataSource: this.ds.cloneWithRows(arr)
      })
    })
    


  }

  componentDidMount(){
    this.returnArrayMatches('finished',(err)=>{
      if (!err) console.log('good')
    })
    
    
  }



  returnArrayMatches(state,cb){
    let arr = []
    firebase.database().ref('match').once('value').then((snap)=>{
      snap.forEach((child)=>{
        if (child.val().awayteam === this.props.team.name && child.val().state === state) arr.push(child.val())
          if (child.val().hometeam === this.props.team.name && child.val().state === state) arr.push(child.val())
        })
      
      cb(null,arr);
    })


  }

  returnTeamImage(name){
    var picture = ''
    firebase.database().ref('teams/' + name).on('value',(snap)=>{
      picture= snap.val().picture;
    })
    return picture;
  }

  renderRow(match) {
    return (
      <View>

      <View style={styles.row}>

      <View style={{width: 60, height: 70, left: 0}} >
      <Thumbnail square size={50} source={{uri:this.returnTeamImage(match.hometeam)}} />
      </View>
      <View style={{width: 260, height: 70}}>
      <Text style={{fontWeight: '600', color: '#77773c', alignSelf: 'center',marginTop:20}}>{match.hometeamabre}        {match.hometeamscore}-{match.awayteamscore}       {match.awayteamabre}</Text>
      </View>
      <View style={{width: 60, height: 70, right: 0}}>
      <Image style={styles.image} source={{uri:this.returnTeamImage(match.awayteam)}} />
      </View> 
      
      </View>
      <View style={styles.rowSeparator}/>
      </View>
      );
  }


  render(){
    return(
      <View style={styles.container}>
     <ScrollView style={styles.scrollview} 
     refreshControl={
      <RefreshControl
      refreshing={this.state.refreshing}
      onRefresh={()=>{this._onRefresh()}}
      />}>
     <ListView
     

      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}/>
      </ScrollView>
      </View>

      
      );
  }
}




const styles = StyleSheet.create({
  container: {
    flex:1

  },
  containerTop: {
    flexDirection: 'row', 
    height:80,
    marginTop: 35,
    marginBottom:0
  },
  row: {
    marginTop: 10,
    flexDirection: 'row', 
    height:72,
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
    width: 50,
    height: 50,
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
  scrollview:{
    height: 600,
  },

  rowSeparator: {
    backgroundColor: '#009933',
    height:1,
    width: windowSize.width
  }
  
});

module.exports = YourTeam;