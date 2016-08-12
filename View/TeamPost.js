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
  H3,
} from 'native-base';
import {
  Modal,
  StyleSheet,
  Platform,
  View,
  Image,
  Dimensions,
  AlertIOS,
} from 'react-native';
import Swipeout from 'react-native-swipeout';



function getDate(){
  var today = new Date();
  var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd='0'+dd
    } 

    if(mm<10) {
      mm='0'+mm
    } 

    today = mm+'/'+dd+'/'+yyyy;
    return today;
  }

  class TeamPost extends Component{
    constructor(props){
      super(props)
      this.state= {
        post: '',
      }
    }
    _post(){
      realm.write(() => {
       realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0].post.push({post: this.state.post, poster: this.props.user.displayname, date: getDate()})
     });
      this.setState({
        post: '',
      })
      AlertIOS.alert('Posted!');
    }

    editPost(){

    }
    deletePost(){

    }


    render(){
      var swipeoutBtns = [
      {
        text: 'Edit',
        onPress: this.editPost(),
        backgroundColor: 'yellow',
        color: 'white',
        
      },
      {
        text: 'Delete',
        onPress: this.deletePost(),
        backgroundColor: 'red',
        color: 'white',
      }
      ]
      return(
        <Container>
        <Content>
        <View style={{flexDirection: 'row'}}>
        <View style={{width: 340}}>
        <InputGroup borderType="underline" >
        <Icon name="ios-chatboxes" style={{color:'#384850'}}/>
        <Input placeholder="Type your post"
        onChangeText={(post) => this.setState({post})}
        value={this.state.post}
        />
        </InputGroup>
        </View>
        <View style={{width:50}}>
        <Button rounded onPress={() => {this._post()}}>
        <Icon name="ios-send" />
        </Button>
        </View>

        </View>
        <View >
        <List dataArray={realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0].post} renderRow={(post) =>               
          <ListItem> 
          <View>
          <Swipeout right={swipeoutBtns} backgroundColor='white'>
          <H3 style={{fontWeight: '300', color: '#000080'}}> {post.post} </H3>
          <Text style={{alignSelf: 'flex-end'}}>{post.poster}</Text>
          </Swipeout>
          </View>
          </ListItem>                            
        }> </List> 
        </View>

        </Content>
        </Container>
        );
    }
  }

  module.exports = TeamPost;