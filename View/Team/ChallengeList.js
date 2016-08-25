'use strict';
var realm = require('../../Model/model.js');



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
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';




class MailBox extends Component {
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
        
        <ChallengeList tabLabel="Challenge" navigator={this.props.navigator} user={this.props.user} team={this.props.team} challenge={this.props.challenge} />

        <RequestList tabLabel="Request to join" navigator={this.props.navigator} user={this.props.user} team={this.props.team} request={this.props.request} />
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
    this.state = {
      search: '',
      radio1 : true,
      check1: false,
      modalVisible: false,
      selectedItem: undefined,
      challenge: this.props.challenge
    }


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


  _goBack(){
    this.props.navigator.pop();
  }

  render() {
    return (
      <Container>

      <Content>
      {this.state.loading? <Spinner /> : <List dataArray={this.state.challenge} renderRow={(request) =>               
        <ListItem button onPress={()=>this.setModalVisible(true, request)} > 
        <Thumbnail square size={80} source={{uri:request.picture}} />        
        <Text>Team: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{request.hometeam}</Text></Text>
        <Text style={{color:'#007594'}}>{request.additionalCondition}</Text>    
        <Text note>Time: <Text note style={{marginTop: 5}}>{request.time}@{request.venue}</Text></Text>    
        </ListItem>                            
      }> </List> }




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




      </Content>
      </Container>

      );
  }
}

class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      radio1 : true,
      check1: false,
      modalVisible: false,
      selectedItem: undefined,
      request: this.props.request,
    }

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

  render() {
    return (
      <Container>

      <Content>
      {this.state.loading? <Spinner /> : <List dataArray={this.state.request} renderRow={(request) =>               
        <ListItem button onPress={()=>this.setModalVisible(true, request)} > 
        <Thumbnail square size={80} source={{uri:request.picture}} />        
        <Text>Name: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{request.nickname}</Text></Text>   
        </ListItem>                            
      }> </List> }




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




      </Content>
      </Container>

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
  overlay: {
    flex: 1,
    position: 'absolute',
    bottom:10,
    left: 170,
    backgroundColor: 'transparent',
    width: 80, 
    height: 80,
  } 
});







module.exports = MailBox;