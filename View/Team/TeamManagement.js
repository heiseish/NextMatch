'use strict';

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
  List,
  ListItem,
  Thumbnail,
  Card,
  CardItem,
  H3,
} from 'native-base';
import {
  Modal,
  StyleSheet,
  Platform,
  View,
  Image,
  AlertIOS,
  Dimensions,
  ListView,
  RefreshControl,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
var windowSize = Dimensions.get('window');





class TeamManagement extends Component {
  constructor(props){
    super(props);
  }

  goBack(){
    this.props.navigator.pop();
  }


  render(){
    return(
      <View style={styles.container}>

      

      <ScrollableTabView style={styles.scrollview}>
        
        <RequestList tabLabel="Requests" navigator={this.props.navigator} user={this.props.user} team={this.props.team} request={this.props.request} />
        <Roster tabLabel="Roster" navigator={this.props.navigator} user={this.props.user} team={this.props.team} roster={this.props.roster} />
        
        


        </ScrollableTabView>

        <View style={styles.overlay}>
        <Button transparent large  onPress={()=> {this.goBack()}}>
              <Icon name="md-close-circle"/>
        </Button>
      </View>
        </View>
    );
  }
}



class Roster extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1.id !== row2.id});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.roster),
      modalVisible: false,
      selectedItem: undefined,
      refreshing: false,
      roster: this.props.roster

    };
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this._refreshArray((err)=>{
      if (!err) this.setState({refreshing:false})
    })
  }

  _refreshArray(cb){

    this.returnRoster((err,arr)=>{
      if (!err)
        this.setState({
          refreshing: false,
          dataSource: this.ds.cloneWithRows(arr)
        })

    })



  }
  returnRoster(cb){
    let arr = []
    firebase.database().ref('teams/' + this.props.team.name).child('players').once('value').then((snap)=>{
       snap.forEach((child)=>{
         arr.push(child.val())
      })

      cb(null,arr);
    })


  }



  setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
  }
  



  setModalInvisibleAndProceed(visible, x, player) {
        if (player.userId === this.props.user.userId){
          AlertIOS.alert('You cannot kick yourself!')
        } else {
          let arr = this.state.roster;
          arr = arr.filter((x)=> x.userId !== request.userId)
          this.setState({roster: arr})

          firebase.database().ref('teams/' + this.props.team.name + '/players/' + player.userId).remove()
          firebase.database().ref('users/' + player.userId).child('team').remove()
        
          this.setState({
            modalVisible: visible,
            selectedItem: x
          });
          AlertIOS.alert('You have kicked the player');
      }

  }

  _Alert(){
    AlertIOS.alert(
          'Are you sure that you want to kick the player from your team?',
          ':(',
         [
         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'Yes', onPress: () => this.setModalInvisibleAndProceed(!this.state.modalVisible, this.state.selectedItem, this.state.selectedItem)},
         ],
         );
  }

  toggleCheck() {
        this.setState({
            check1 : !this.state.check1
        })
  }


  _goBack(){
    this.props.navigator.pop();
  }

  renderRow(player) {
    return (
      <View>
      <TouchableHighlight onPress={()=>{this.setModalVisible(true,player)}}>
      <View style={styles.row}>

      <View style={{width: 60, height: 70, left: 0}} >
      <Thumbnail style={{margin: 5}} square size={80} source={{uri:player.picture}} />
      </View>

      <View style={{width: 250, height: 70, marginLeft:90, marginTop:20}}>
      <Text note>Nickname: <Text style={{marginLeft:10}}>{player.nickname}</Text></Text>
      <Text note>Position: <Text style={{marginLeft:10}}>{player.position}</Text></Text>
      </View>
      
      </View>
      </TouchableHighlight>
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




      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <Card style={{paddingTop: 20}}>
      {!this.state.selectedItem ? <View />
        :  <CardItem cardBody style={{justifyContent: 'flex-start'}}>
        <Image style={styles.modalImage} source={{uri:this.state.selectedItem.picture}}  />
        <H3 style={styles.header}> {this.state.selectedItem.nickname}
        </H3>
        

        <View style={styles.buttons}>
          <View style={{width: 170}}>
          {this.props.user.leader ? 
          <Button warning style={{alignSelf: 'center'}} onPress={() => {
            this._Alert()
          }}>Kick Player</Button> : <View/>}
          </View>
          <View style={{width: 170}}>
          <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
            this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
          }}>Back</Button>
          </View>

        </View>
        </CardItem>
      }
      </Card>
      </Modal>




      </View>

      );
  }
}

class RequestList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1.id !== row2.id});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.request),
      modalVisible: false,
      selectedItem: undefined,
      refreshing: false,
      roster: this.props.request

    };
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this._refreshArray((err)=>{
      if (!err) this.setState({refreshing:false})
    })
  }

  _refreshArray(cb){

    this.returnRequest((err,arr)=>{
      if (!err)
        this.setState({
          refreshing: false,
          dataSource: this.ds.cloneWithRows(arr)
        })

    })



  }
  returnRequest(cb){
    let arr = []
    firebase.database().ref('teams/' + this.props.team.name).child('request').once('value').then((snap)=>{
       snap.forEach((child)=>{
         arr.push(child.val())
      })

      cb(null,arr);
    })


  }



  setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
  }
  



  setModalInvisibleAndProceed(visible, x, request) {
        let arr = this.state.request;
        arr = arr.filter((x)=> x.userId !== request.userId)
        this.setState({request: arr})
        firebase.database().ref('teams/' + this.props.team.name + '/players/' + request.userId).set(request)
        firebase.database().ref('teams/' + this.props.team.name + '/request/'  + request.nickname).remove()
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });


        
        AlertIOS.alert('You have successfully accepted challenge from other team. Please check your upcoming matches in your Team tab and proceed to play in the according day');

  }

  _Alert(){
    AlertIOS.alert(
          'Are you sure that you want to accept the player to your team?',
          'Once accepted the player will join the team',
         [
         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'Yes', onPress: () => this.setModalInvisibleAndProceed(!this.state.modalVisible, this.state.selectedItem, this.state.selectedItem)},
         ],
         );
  }

  toggleCheck() {
        this.setState({
            check1 : !this.state.check1
        })
  }


  _goBack(){
    this.props.navigator.pop();
  }

  renderRow(player) {
    return (
      <View>
      <TouchableHighlight onPress={()=>{this.setModalVisible(true,player)}}>
      <View style={styles.row}>

      <View style={{width: 60, height: 70, left: 0}} >
      <Thumbnail style={{margin: 5}} square size={80} source={{uri:player.picture}} />
      </View>

      <View style={{width: 250, height: 70, marginLeft:90, marginTop:20}}>
      <Text note>Nickname: <Text style={{marginLeft:10}}>{player.nickname}</Text></Text>
      <Text note>Position: <Text style={{marginLeft:10}}>{player.position}</Text></Text>
      </View>
      
      </View>
      </TouchableHighlight>
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




      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <Card style={{paddingTop: 20}}>
      {!this.state.selectedItem ? <View />
        :  <CardItem cardBody style={{justifyContent: 'flex-start'}}>
        <Image style={styles.modalImage} source={{uri:this.state.selectedItem.picture}}  />
        <H3 style={styles.header}> {this.state.selectedItem.nickname}
        </H3>
        

        <View style={styles.buttons}>
          <View style={{width: 170}}>
          <Button success style={{alignSelf: 'center'}} onPress={() => {
            this._Alert()
          }}>Accept Player</Button>
          </View>
          <View style={{width: 170}}>
          <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
            this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
          }}>Back</Button>
          </View>

        </View>
        </CardItem>
      }
      </Card>
      </Modal>




      </View>

      );
  }
}



const styles = StyleSheet.create({
    header : {
        marginLeft: -5,
        marginTop: 5,
        marginBottom: (Platform.OS==='ios') ? -7 : 0,
        lineHeight: 24,
        color: '#5357b6'
    },
    modalImage: {
        resizeMode: 'contain',
        height: 200,
        alignSelf: 'center',
        width:200
    },
    scrollview :{
      marginTop: 15,
    },
    bold: {
        fontWeight: '600'
    },
    negativeMargin: {
        marginBottom: -10
    },
    buttons:{
      flexDirection: 'row',
      marginTop: 50,
    },
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  row: {
    marginTop: 10,
    flexDirection: 'row', 
    height:72,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    bottom:10,
    left: 170,
    backgroundColor: 'transparent',
    width: 80, 
    height: 80,
  },
  scrollview:{
    height: 600,
  },

  rowSeparator: {
    backgroundColor: '#009933',
    height:1,
    width: windowSize.width
  },
  row: {
    flexDirection: 'row', 
    height:90,
  },
});







module.exports = TeamManagement;