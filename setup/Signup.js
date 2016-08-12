'use strict';


var TabBar = require("../View/TabBar");
var realm = require('../Model/model.js');

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
  Image,
  Dimensions,
  AlertIOS,
  PickerIOS,
  TouchableHighlight,
  Modal,
} from 'react-native';
import {
  Button,
  Spinner,
  Container,
  Content,
  Header,
  Title,
  Icon,
  CardItem,
  Card,
} from 'native-base';
var PickerItemIOS = PickerIOS.Item;

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
var windowSize = Dimensions.get('window');
var showPositions = [{position: 'Striker'},{position: 'Midfielder'}, {position:'Center Back'}, {position:'Goal Keeper'}];

class Signup extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username:'', 
      password:'',
      passwordConf: '',
      // isLoggedIn: false,
      fullname: '',
      position: 'Position(Optional)',
      displayname: '',
      isLoading: false,
      modal: false,
      positionIndex:0,
     
    }
    this.onClickSignUp = this.onClickSignUp.bind(this);
  }
  _return(){
    this.props.navigator.pop();
  }



  onClickSignUp(){
    this.setState({isLoading: true})
    let user = realm.objects('User').filtered('username == $0',this.state.username)[0];
    if (this.state.passwordConf !== this.state.password) {
      AlertIOS.alert('Your passwords do not match. Please type in again')
      this._password.setNativeProps({text: ''});
      this._passwordConf.setNativeProps({text: ''});
      this.setState({isLoading: false})
    } else if (this.state.fullname === ''){
      AlertIOS.alert('Please enter a valid full name');
      this.setState({isLoading: false})
    } else if (this.state.displayname === ''){
      AlertIOS.alert('Please enter a valid display name');
      this.setState({isLoading: false})
    } else if (this.state.username === ''){
      AlertIOS.alert('Please enter a valid username');
      this.setState({isLoading: false})
    } else if (this.state.password === ''){
      AlertIOS.alert('Please enter a valid password');
      this.setState({isLoading: false})
    } else if ((user) && (user.username)){
      AlertIOS.alert('This username already exists. Please choose another one');
      this.setState({isLoading: false})
    } else {
      realm.write(() => {
        if (this.state.position === 'Position(Optional)'){
          this.setState({position: ''})
        }

        realm.create('User',{
            id:    3,
            username: this.state.username,
            password: this.state.password,
            fullname: this.state.fullname,
            displayname: this.state.displayname,
            position: this.state.position || '',
          })
      });
      
      let user = realm.objects('User').filtered('username == $0',this.state.username)[0];
      this.props.navigator.push({
            title: "Main",
            component: TabBar,
            passProps: {user: user},
        });
    }
  }

 

  render() {
    var _this = this;

    return (
      <Container>
       
      
      
     <Content>
      <Button transparent onPress={() => this._return()}>
        <Icon name="ios-arrow-dropleft-outline" />
      </Button>

      <View style={styles.container}>


      <Image style={styles.bg} source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/72/0d/cc/720dcc0dd534354d60ef8920ea92ce72.jpg'}}/>
      <View style={styles.header}>
      <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
      </View>
      <View style={styles.inputs}>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
      <TextInput 
      style={[styles.input, styles.whiteFont]}
      placeholder="Full name"
      placeholderTextColor="#FFF"
      onChangeText={(fullname) => this.setState({fullname})}
      value={this.state.fullname}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
      <TextInput 
      style={[styles.input, styles.whiteFont]}
      placeholder="Display name"
      placeholderTextColor="#FFF"
      onChangeText={(displayname) => this.setState({displayname})}
      value={this.state.displayname}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
      <TextInput 
      style={[styles.input, styles.whiteFont]}
      placeholder="Username"
      placeholderTextColor="#FFF"
      onChangeText={(username) => this.setState({username})}
      value={this.state.username}
      ref={component => this._password = component}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
      <TextInput 
      password={true}
      style={[styles.input, styles.whiteFont]}
      placeholder="Please enter a valid password"
      placeholderTextColor="#FFF"
      onChangeText={(password) => this.setState({password})}
      value={this.state.password}
      ref={component => this._password = component}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
      <TextInput
      password={true}
      style={[styles.input, styles.whiteFont]}
      placeholder="Please enter the password again"
      placeholderTextColor="#FFF"
      onChangeText={(passwordConf) => this.setState({passwordConf})}
      value={this.state.passwordConf}
      ref={component => this._passwordConf = component}
      />
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>


      <TouchableHighlight style={[styles.input, styles.whiteFont]} underlayColor="transparent" onPress={ () => this.setState({modal: true}) }>
       <Text style={{color: 'white'}}>{this.state.position}</Text>
     </TouchableHighlight>

     <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modal}
      onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <Card>
      <CardItem>
      <PickerIOS
          selectedValue={this.state.position}
          onValueChange={(position) => this.setState({position, positionIndex: showPositions[position]})}>
          {Object.keys(showPositions).map((position) => (
            <PickerItemIOS
              key={position}
              value={showPositions[position].position}
              label={showPositions[position].position}
            />
          ))}
        </PickerIOS>
        <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
            this.setState({modal: false})
          }}>Choose</Button>
          </CardItem>
          </Card>
      </Modal> 

      </View>
      <Button block warning onPress={this.onClickSignUp}>
      Sign Up
      </Button>
      </View>

      </View>
      </Content>
      </Container>
      );
  }
};




const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      // backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        // justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        // backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        marginBottom: 100,
        padding: 20,
        alignItems: 'center'
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .8
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#ffff80'
    },
    circles: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progress: {
      margin: 10,
    },
    separator: {
      height: 1,
      backgroundColor: '#dddddd',
      width: 100
    },
})







module.exports = Signup;