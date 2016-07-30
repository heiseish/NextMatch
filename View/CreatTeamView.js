'use strict';

var realm = require('../Model/model.js');
import React, { Component } from 'react';
import { Container, Content, InputGroup, Input , Icon, Header, Title, Button} from 'native-base';


class CreateTeamView extends Component {
    constructor(props) {
    super(props);
    this.state = {
      teamname: '',
      teamdescription: '',

      }

    }

    _goBack(){
        this.props.navigator.pop();
    }

    _Save(){
        // realm.write(() => {
        //      user.fullname = this.state.fullname;
        //      user.displayname = this.state.displayname;
        //      user.position = this.state.position;
        // });
        this.props.navigator.pop();
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
                        <Icon name="ios-information" style={{color:'#384850'}}/>
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