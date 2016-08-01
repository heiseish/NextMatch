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
} from 'react-native';


class JoinTeamView extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      loading: false, 
      radio1 : true,
      check1: false,
      modalVisible: false,
      selectedItem: undefined,
      results: {
                teams: []
            }
    }
  }
  setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
  }
  toggleCheck() {
        this.setState({
            check1 : !this.state.check1
        })
  }

  _goBack(){
    this.props.navigator.pop();
  }

  search() {
    let arr = [];       
    this.setState({            
      loading: true          
    });
    let teams = realm.objects('Team').filtered('teamname CONTAINS $0',this.state.search);
    teams.forEach(function(current,i,Team){
        arr.push(teams[i]);
    })
    this.setState({
        loading: false,
        results:{
          teams: arr,
        }
    })

  }

  _returnImage(team){
    if (team.image === '') return 'https://i0.wp.com/assets.plan.io/images/default_avatar.png';
    else return team.image;
  }

  render(){
    return(
      <Container>
        <Header searchBar rounded>                         
          <InputGroup>                        
            <Icon name="ios-search" />                        
            <Input placeholder="Search" value={this.state.search}  onChangeText={(text) => this.setState({search:text})} onSubmitEditing={()=>this.search()}/>                    
            <Icon name="logo-steam" />
          </InputGroup>                    
          <Button transparent onPress={() => {this._goBack()}}>Cancel</Button>                
        </Header>

        <Content>
        <List dataArray={this.state.results.teams} renderRow={(team) =>               
        <ListItem button onPress={()=>this.setModalVisible(true, team)} > 
        <Thumbnail square size={80} source={{uri: this._returnImage(team)}} />        
        <Text>Team: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{team.teamname}</Text></Text>
        <Text style={{color:'#007594'}}>{team.teamdescription}</Text>    
        <Text note>Score: <Text note style={{marginTop: 5}}>{team.rankpoint}</Text></Text>    
        </ListItem>                            
      }> </List>

      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <Card style={{paddingTop: 20}}>
      {!this.state.selectedItem ? <View />
        :  <CardItem cardBody style={{justifyContent: 'flex-start'}}>
        <Image style={styles.modalImage} source={{uri: this.state.selectedItem.image}}  />
        <H3 style={styles.header}> {this.state.selectedItem.teamname}
        </H3>
        <Text style={styles.negativeMargin} >
        Rank Point: <Text style={styles.bold}>{this.state.selectedItem.rankpoint}</Text>
        </Text>
        <Text style={styles.negativeMargin} >
        Description: <Text style={styles.bold}>{this.state.selectedItem.teamdescription}</Text>
        </Text>
        <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
          this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
        }}>
        Go Back
        </Button>
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
    }
});


module.exports = JoinTeamView;