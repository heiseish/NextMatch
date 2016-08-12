'use strict';

var realm = require('../Model/model.js');
import React, { Component } from 'react';
import { Container, Content, InputGroup, Input , Icon, Header, Title, Button} from 'native-base';
import {AlertIOS} from 'react-native';


class Challenge extends Component {
    constructor(props) {
    super(props);
    this.state = {
      time: '',
      venue: '',
      additionalDescription: '',
      user: this.props.user,


      }

    }

    _goBack(){
        this.props.navigator.pop();
    }

    _Save(){

        realm.write(() => {
             realm.create('Request',{id:4, hometeam: this.props.user.team, awayteam: this.props.awayteam.teamname, time: this.state.time, venue: this.state.venue, additionalCondition: this.state.additionalDescription})
        });

        AlertIOS.alert('You have challenged the team. Beware!');
        this.props.navigator.pop();
       
    }
    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={() => {this._goBack()}}>
                        <Icon name="ios-arrow-dropleft" />
                    </Button>
                    <Title>Create New Request</Title>
                    <Button transparent onPress={() => {this._Save()}}>
                        <Icon name="ios-done-all" />
                    </Button>
                </Header>
                <Content>
                    <InputGroup borderType="underline" >
                        <Icon name="ios-clock" style={{color:'#384850'}}/>
                        <Input placeholder="Enter the timing of the match" 
                                onChangeText={(time) => this.setState({time})}
                                value={this.state.time}
                                />
                    </InputGroup>

                    <InputGroup borderType="underline" >
                        <Icon name="ios-locate" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your desired venue" 
                                onChangeText={(venue) => this.setState({venue})}
                                value={this.state.venue}
                                />


                    </InputGroup>
                    <InputGroup borderType="underline" >
                        <Icon name="ios-information" style={{color:'#384850'}}/>
                        <Input placeholder="Any additional note that you wish your opponent to take note?" 
                                onChangeText={(additionalDescription) => this.setState({additionalDescription})}
                                value={this.state.additionalDescription}
                                />
                    </InputGroup>


                    
                </Content>
            </Container>
        );
    }
}

module.exports = Challenge;