'use strict';
var realm = require('../Model/model.js');



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








class ChallengeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      radio1 : true,
      check1: false,
      modalVisible: false,
      selectedItem: undefined,
      results: {
                request: this.returnRequest()
            }
    }

  }

  returnRequest(){
    var arr = [];
    let results = realm.objects('Request').filtered('awayteam == $0',this.props.user.team);
    results.forEach(function(current,i,Team){
      arr.push(current);
    })
    return (arr);

  }

  setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
  }

  setModalInvisibleAndProceed(visible, x, request) {
        
        realm.write(() => {
          let request = realm.objects('Request').filtered('id == $0',this.state.selectedItem.id)[0];
          realm.create('Match',{id: 7, hometeam: request.hometeam, awayteam: this.props.user.team, time: request.time, state: 'coming'});
          realm.delete(request);
        })

        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
        this.search();
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

  search() {
    let arr = [];       
    this.setState({            
      loading: true          
    });
    let requests = realm.objects('Request').filtered('hometeam CONTAINS $0',this.state.search);
    request.forEach(function(current,i,Team){
        arr.push(current
          );
    })
    this.setState({
        loading: false,
        results:{
          teams: arr,
        }
    })

  }
  _returnImage(request){
    let team = realm.objects('Team').filtered('teamname == $0',request.hometeam)[0];
    if (team.imageStyle === 1) return require('../imgTeam/1.png');
    if (team.imageStyle === 2) return require('../imgTeam/2.jpg');
    if (team.imageStyle === 3) return require('../imgTeam/3.png');
    if (team.imageStyle === 4) return require('../imgTeam/4.png');
    if (team.imageStyle === 5) return require('../imgTeam/5.png');
    if (team.imageStyle === 6) return require('../imgTeam/6.jpg');
    if (team.imageStyle === 7) return require('../imgTeam/7.png');
  }
  _goBack(){
    this.props.navigator.pop();
  }

  render() {
    return (
      <Container>
      <Header rounded>                         
          <Title> Challenge List </Title>                 
          <Button transparent onPress={() => {this._goBack()}}>Back</Button>                
        </Header>

      <Content>
      {this.state.loading? <Spinner /> : <List dataArray={this.state.results.request} renderRow={(request) =>               
        <ListItem button onPress={()=>this.setModalVisible(true, request)} > 
        <Thumbnail square size={80} source={this._returnImage(request)} />        
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
        <Image style={styles.modalImage} source={this._returnImage(this.state.selectedItem)}  />
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
        height: 200
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
});







module.exports = ChallengeList;