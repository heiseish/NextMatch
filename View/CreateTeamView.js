'use strict';

var realm = require('../Model/model.js');
import React, { Component } from 'react';
import { Container, Content, InputGroup, Input , Icon, Header, Title, Button} from 'native-base';
import {AlertIOS} from 'react-native';


class CreateTeamView extends Component {
    constructor(props) {
    super(props);
    this.state = {
      teamname: '',
      teamdescription: '',
      username: this.props.user.username,

      }

    }

    _goBack(){
        this.props.navigator.pop();
    }

    _Save(){

        let team = realm.objects('Team').filtered('teamname == $0',this.state.teamname)[0];
        let user = realm.objects('User').filtered('username == $0',this.state.username)[0];
        if ((team) && (team.teamname)){
            AlertIOS.alert('The name is already in use. Please use another one!')
        } else {
        realm.write(() => {
             realm.create('Team',{id:5, teamname: this.state.teamname, teamdescription: this.state.teamdescription})
             user.team = this.state.teamname;
             user.leader = true;
        });

        AlertIOS.alert('Your team has been successfully created. You have automatically been assigned as the team captain');
        this.props.navigator.pop();
        }
    }
    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={() => {this._goBack()}}>
                        <Icon name="ios-arrow-dropleft" />
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
                                onChangeText={(teamname) => this.setState({teamname})}
                                value={this.state.teamname}
                                />
                    </InputGroup>

                    <InputGroup borderType="underline" >
                        <Icon name="ios-information-circle" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your team brief description" 
                                onChangeText={(teamdescription) => this.setState({teamdescription})}
                                value={this.state.teamdescription}
                                />
                        </InputGroup>
                </Content>
            </Container>
        );
    }
}

module.exports = CreateTeamView;