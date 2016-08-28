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
              <CardItem>
                <Text>Creator: Giang, Hung, Phuc</Text>
                <Text>App free dành cho những bạn trẻ yêu bóng đá muốn rèn luyện kĩ năng của mình bằng các trận giao hữu. Đồng thời cũng cho bạn trẻ cùng niềm đam mê giao lưu</Text>
              </CardItem>
            </Card>
          </Content>
      </Container>
    );
  }
}

module.exports = AboutUs;