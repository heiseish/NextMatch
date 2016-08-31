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




class MailBox extends Component {
  constructor(props){
    super(props);
  }

  goBack(){
    this.props.navigator.pop();
  }
  componentDidMount(){

  }

  render(){
    return(
      <View style={styles.container}>

      

      <ScrollableTabView style={styles.scrollview}>
        
        <ChallengeList tabLabel="Challenge" navigator={this.props.navigator} user={this.props.user} team={this.props.team} challenge={this.props.challenge}/>
        <Results tabLabel="Results" navigator={this.props.navigator} user={this.props.user} team={this.props.team} results={this.props.results}/>

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



class ChallengeList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1.id !== row2.id});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.challenge),
      radio1 : true,
      check1: false,
      modalVisible: false,
      selectedItem: undefined,
      isReady: true,
      status: '',
      quality: '',
      error: '',
      currentTime: '',
      duration: '',
      refreshing: false,
      challenge: this.props.challenge

    };
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this._refreshArray((err)=>{
      if (!err) this.setState({refreshing:false})
    })
  }

  _refreshArray(cb){

    this.returnResult((err,arr)=>{
      if (!err)
        this.setState({
          refreshing: false,
          dataSource: this.ds.cloneWithRows(arr)
        })

    })



  }
  returnResult(cb){
    let arr = []
    firebase.database().ref('teams/' + this.props.team.name).child('challenge').once('value').then((snap)=>{
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
        let arr = this.state.challenge;
        arr = arr.filter((x)=> x.name !== request.name)
        this.setState({request: arr})

        firebase.database().ref('teams/' + this.props.team.name + '/challenge/' + request.name).remove();
        firebase.database().ref('match/' + request.time + request.abre + '-' + this.props.team.abre).set({
          "awayteam" : this.props.team.name,
          "awayteamabre" : this.props.team.abre,
          "awayteamscore" : 0,
          "hometeam" : request.name,
          "hometeamabre" : request.abre,
          "hometeamscore" : 0,
          "state" : 'coming',
          "time" : request.time,
          'id': request.time + request.abre + '-' + this.props.team.abre
        })

        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
        AlertIOS.alert('You have successfully accepted challenge from other team. Please check your upcoming matches in your Team tab and proceed to play in the according day');
        
  }

  _Alert(){
    AlertIOS.alert(
          'Are you sure that you want to accept the challenge?',
          'Once accepted two teams must proceed to match up.',
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




  returnTeamImage(name){
    var picture = ''
    firebase.database().ref('teams/' + name).on('value',(snap)=>{
      picture= snap.val().picture;
    })
    return picture;
  }

  renderRow(challenge) {
    return (
      <View>
      <TouchableHighlight onPress={()=>{this.setModalVisible(true,challenge)}}>
      <View style={styles.row}>

      <View style={{width: 60, height: 70, left: 0}} >
      <Thumbnail square size={50} source={{uri:challenge.picture}} />
      </View>
      <View style={{width: 250, height: 70}}>
      <Text style={{marginLeft:10}}>{challenge.time}</Text>
      <Text note style={{marginLeft:10}}>{challenge.venue}</Text>
      <Text note style={{marginLeft:10}}>{challenge.additionalCondition}</Text>
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
        :  <CardItem cardBody style={{justifyContent: 'flex-start',height: 500}}>
        <Image style={styles.modalImage} source={{uri:this.state.selectedItem.picture}}  />
        <H3 style={styles.header}> {this.state.selectedItem.hometeam}
        </H3>
        <Text style={styles.negativeMargin} >
        Time: <Text style={styles.bold}>{this.state.selectedItem.time}@{this.state.selectedItem.venue}</Text>
        </Text>
        <Text style={styles.negativeMargin} >
        Description: <Text style={styles.bold}>{this.state.selectedItem.additionalCondition}</Text>
        </Text>

        <View style={styles.buttons}>
          <View style={{width: 170}}>
          <Button success style={{alignSelf: 'center'}} onPress={() => {
            this._Alert()
          }}>Accept Challenge</Button>
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



class Results extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1.id !== row2.id});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.results),
      radio1 : true,
      check1: false,
      modalVisible: false,
      selectedItem: undefined,
      isReady: true,
      status: '',
      quality: '',
      error: '',
      refreshing: false,
      results: this.props.results,
      hometeamscore: '',
      awayteamscore: '',

    };
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this._refreshArray('finished',(err)=>{
      if (!err) this.setState({refreshing:false})
    })
  }

  _refreshArray(state,cb){

    this.returnResult((err,arr)=>{
      if (!err)
        this.setState({
          refreshing: false,
          dataSource: this.ds.cloneWithRows(arr)
        })

    })



  }
  returnResult(cb){
    let arr = []
    firebase.database().ref('teams/' + this.props.team.name).child('results').once('value').then((snap)=>{
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

  setModalInvisibleAndProceed(visible, x, result) {
        let arr = this.state.results;
        arr = arr.filter((x)=> x.id !== result.id)
        this.setState({result: arr})

        firebase.database().ref('teams/' + this.props.team.name + '/results/' + result.id).remove();
        firebase.database().ref('unconfirmed/' + result.id + '/statementfrom' + this.props.team.name).set({
          "awayteam" : result.awayteam,
          "awayteamabre" : result.awayteamabre,
          "awayteamscore" : this.state.awayteamscore,
          "hometeam" : result.hometeam,
          "hometeamabre" : result.hometeamabre,
          "hometeamscore" : this.state.hometeamscore,
        })

        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
        AlertIOS.alert('Thanks:D');
        
  }

  _Alert(){
    AlertIOS.alert(
          'Are you sure of the result?',
          'Once accepted you cannot change anymore',
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




  returnTeamImage(name){
    var picture = ''
    firebase.database().ref('teams/' + name).on('value',(snap)=>{
      picture= snap.val().picture;
    })
    return picture;
  }

  renderRow(result) {
    return (
      <View>
      <TouchableHighlight onPress={()=>{this.setModalVisible(true,result)}}>
      <View style={styles.row}>

      <View style={{width: 60, height: 70, left: 0}} >
      <Thumbnail square size={50} source={{uri:this.returnTeamImage(result.hometeam)}} />
      </View>
      <View style={{width: 250, height: 70}}>
      <Text note style={{alignSelf:'center'}}>{result.state}</Text>
      <Text style={{alignSelf:'center'}}>{result.hometeamabre}  -   {result.awayteamabre}</Text>
      <Text note style={{alignSelf:'center'}}>{result.time}</Text>
      <Text note style={{alignSelf:'center'}}>{result.venue}</Text>
      </View>
      <View style={{width: 60, height: 70, right: 0}}>
      <Image style={styles.image} source={{uri:this.returnTeamImage(result.awayteam)}} />
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
              <Text>{this.state.selectedItem.hometeam}</Text>
              <View style={{height:20}}>
              <InputGroup success borderType="regular" iconRight >
              <Icon name="ios-checkmark-circle" style={{color:'#00C497'}}/>
              <Input 
              
              placeholder="score"
              onChangeText={(hometeamscore) => this.setState({hometeamscore})}
              value={this.state.hometeamscore}
              />


              </InputGroup>
              </View>
              <Text>{this.state.selectedItem.awayteam}</Text>
              <View style={{height:20}}>
              <InputGroup success borderType="regular" iconRight >
              <Icon name="ios-checkmark-circle" style={{color:'#00C497'}}/>
              <Input 
              
              placeholder="score"
              onChangeText={() => this.setState({awayteamscore})}
              value={this.state.awayteamscore}
              />


              </InputGroup>
              </View>
              <View style={styles.buttons}>
                <View style={{width: 170}}>
                <Button success style={{alignSelf: 'center'}} onPress={() => {
                  this._Alert()
                }}>Submit</Button>
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







module.exports = MailBox;