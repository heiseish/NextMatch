'use strict';

var realm = require('../../Model/model.js');
import React, { Component } from 'react';
import { Container, Content, InputGroup, Input , Icon, Header, Title, Button} from 'native-base';
import {AlertIOS} from 'react-native';
var teamRef = require('../../Model/teamRef');
var firebase = require('../../Model/firebase')


class CreateTeamView extends Component {
    constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      username: this.props.user.username,
      abre: ''

      }

    }

    _goBack(){
        this.props.navigator.pop();
    }

    _Save(){
        // AlertIOS.alert('haha')

        teamRef.on('value',(snap)=>{
            // AlertIOS.alert('inside')

            if (this.state.name === ''){
                AlertIOS.alert('Please enter a valid team name')
            } else if (snap.hasChild(this.state.name)) {
                AlertIOS.alert('The name is already in use. Please use another one!')
            } else if (this.state.description === ''){
                AlertIOS.alert('Please enter a brief description about the team')
            } else if (this.state.abre === '') {
                AlertIOS.alert('Please enter a valid abreviation of the team name. eg Chelsea FC => CFC')
            } else {
                firebase.database().ref('teams').off();
                firebase.database().ref('teams/' + this.state.name).set({
                    abre: this.state.abre,
                    captain: this.props.user.nickname,
                    description: this.state.description,
                    matches: 0,
                    winrate: 0,
                    rankpoint: 0,
                    name: this.state.name,
                    picture: 'https://firebasestorage.googleapis.com/v0/b/nextmatch-8597c.appspot.com/o/1.png?alt=media&token=6f4256cc-4503-45bf-a970-680117c14aa9',
                    players :{
                        userId: this.props.user.userId
                    }

                })
              
                var user = this.props.user;
                user.team = this.state.name;
                user.leader = true;
                firebase.database().ref('users/' + this.props.user.userId).update(user);
                
                AlertIOS.alert('Your team has been successfully created. You have automatically been assigned as the team captain');
                this.props.navigator.pop();
            }
        })
    }
    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={() => {this._goBack()}}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>Create New Team</Title>
                    <Button transparent onPress={() => {this._Save()}}>
                        <Icon name="ios-done-all" />
                    </Button>
                </Header>
                <Content>
                
                    <InputGroup borderType="underline" >
                        <Icon name="ios-football" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your team name here" 
                                onChangeText={(name) => this.setState({name})}
                                value={this.state.name}
                                />
                    </InputGroup>

                    <InputGroup borderType="underline" >
                        <Icon name="ios-football" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your 3-4 letter team name abbreviation eg. Arsenal FC => AFC" 
                                onChangeText={(abre) => this.setState({abre})}
                                value={this.state.abre}
                                />
                    </InputGroup>

                    <InputGroup borderType="underline" >
                        <Icon name="ios-information-circle" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your team brief description" 
                                onChangeText={(description) => this.setState({description})}
                                value={this.state.description}
                                />
                        </InputGroup>
                </Content>
            </Container>
        );
    }
}

module.exports = CreateTeamView;