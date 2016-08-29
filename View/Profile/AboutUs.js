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
} from 'react-native';
// var firestack = require('../../Model/firestack')
import Camera from 'react-native-camera'
import RNFetchBlob from 'react-native-fetch-blob'
// var firestack = require('../../Model/firestack');


const polyfill = RNFetchBlob.polyfill

window.XMLHttpRequest = polyfill.XMLHttpRequest
window.Blob = polyfill.Blob


class AboutUs extends Component {
  constructor(props){
    super(props);
  }



  _goBack(){
    this.props.navigator.pop();
  }
  render(){
    return(
      <Container>
        <Header>
          <Button transparent onPress={() => {this._goBack()}}>
             <Icon name="ios-arrow-back" />
          </Button>
               
          <Title> About Us </Title>
          </Header>
          <Content>
            <Card>
              <CardItem style={{height: 400}}>
                <Text>Creator: Giang, Hung, Phuc</Text>
                <Text>App free dành cho những bạn trẻ yêu bóng đá muốn rèn luyện kĩ năng của mình bằng các trận giao hữu. Đồng thời cũng cho bạn trẻ cùng niềm đam mê giao lưu</Text>
              </CardItem>
            </Card>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

module.exports = AboutUs;