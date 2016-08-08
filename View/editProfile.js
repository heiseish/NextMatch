'use strict';

var realm = require('../Model/model.js');
import React, { Component } from 'react';
import { Container, Content, InputGroup, Input , Icon, Header, Title, Button, Text} from 'native-base';
import {View} from 'react-native';



class EditProfile extends Component {
    constructor(props) {
    super(props);
    this.state = {
      fullname: this.props.user.fullname,
      displayname: this.props.user.displayname,
      position: this.props.user.position,
      briefdesc: this.props.user.briefdesc,
        }

    }


    _goBack(){
        this.props.navigator.pop();
    }

    _Save(){
        let users = realm.objects('User');
        let user = users.filtered('username == $0',this.props.user.username)[0];
        realm.write(() => {
             user.fullname = this.state.fullname;
             user.displayname = this.state.displayname;
             user.position = this.state.position;
             user.briefdesc = this.state.briefdesc;
        });
        this.props.navigator.pop();
    }
    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={() => {this._goBack()}}>
                        <Icon name="ios-arrow-dropleft" />
                    </Button>
                    <Title>Edit Profile</Title>
                    <Button transparent onPress={() => {this._Save()}}>
                        <Icon name="ios-done-all" />
                    </Button>
                </Header>
                <Content>
                    <Text>Full name</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-man" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your full name"
                                onChangeText={(fullname) => this.setState({fullname})}
                                value={this.state.fullname}
                                 />
                    </InputGroup>

                    <Text>Display name</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-eye" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your displayname" 
                                onChangeText={(displayname) => this.setState({displayname})}
                                value={this.state.displayname}
                                />


                    </InputGroup>

                    <Text>Position</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-football" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your position" 
                                onChangeText={(position) => this.setState({position})}
                                value={this.state.position}
                                />
                    </InputGroup>

                    <Text>Brief Description about you</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-information-circle" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your position" 
                                onChangeText={(briefdesc) => this.setState({briefdesc})}
                                value={this.state.briefdesc}
                                />
                    </InputGroup>
                </Content>
            </Container>
        );
    }
}

module.exports = EditProfile;