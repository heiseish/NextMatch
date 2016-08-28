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
  Card,
  CardItem,
  H3,
} from 'native-base';
import {
  StyleSheet,
  Platform,
  View,
  Image,
  Dimensions,
  AlertIOS,
  TextInput,
} from 'react-native';
var firebase = require('../../Model/firebase')


class Feedback extends Component {
  constructor(props){
    super(props);
    this.state = {
      subject: '',
      text: ''
    }
  }

  _goBack(){
    this.props.navigator.pop();
  }

  submit(){
    if (this.state.text === ''){
      AlertIOS.alert('Do you even report?')
    } else if (this.state.subject === ''){
      AlertIOS.alert('You are missing the subject')
    } else {
    firebase.database().ref('feedback').push({
      subject: this.state.subject,
      text: this.state.text,
      sender: this.props.user.nickname
    })
    AlertIOS.alert('Done! thank you for your opinion');
    this.props.navigator.pop();
  }
}
  render(){
    return(
      <Container>

          <Header style={{backgroundColor: 'green'}}>
          <Button transparent onPress={() => {this._goBack()}}>
             <Icon name="ios-arrow-back" />
          </Button>
               
          <Title> Feedback </Title>
          </Header>
          <Content>
      
              <Text note style={{alignSelf: 'center',color: '#000099'}}>Feel free to send to use any feedback/reporting of issues/any features you want to see in the future</Text>


              <View style={{height:20}} />
              <InputGroup success borderType="regular" iconRight >
              <Icon name="ios-checkmark-circle" style={{color:'#00C497'}}/>
              <Input 
              
              placeholder="Subject" 
              onChangeText={(subject) => this.setState({subject})}
              value={this.state.subject}
              />


              </InputGroup>


              <TextInput
                  placeholder="Your essay goes here"
                  multiline = {true}
                  numberOfLines = {10}
                  style={{height: 300, borderColor: 'green', borderWidth: 1,marginTop: 20}}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                />
              <View style={{width: 300, alignSelf:'center',alignItems: 'center',marginTop: 20}}>
                <Button block success rounded onPress={()=>{this.submit()}}>
                  Submit
                </Button>
              </View>
        </Content>
        </Container>
    );
  }
}

module.exports = Feedback;