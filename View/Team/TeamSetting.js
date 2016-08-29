'use strict';


import React, { Component } from 'react';
import { Container, Content, InputGroup, Input , Icon, Header, Title, Button, Text,Card,CardItem,Spinner} from 'native-base';
import {View, StyleSheet, Image, TouchableOpacity,Modal,Dimensions, AlertIOS} from 'react-native';
var Swiper = require('react-native-swiper');
var windowSize = Dimensions.get('window');
var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
var firebase =require('../../Model/firebase')
import RNFetchBlob from 'react-native-fetch-blob'
// var firestack = require('../../Model/firestack');


// BEFORE UPDATING AN OBJECT ON FIREBASE. MAKE SURE TO RETRIEVE IT FIRST

const polyfill = RNFetchBlob.polyfill

window.XMLHttpRequest = polyfill.XMLHttpRequest
window.Blob = polyfill.Blob


class TeamSetting extends Component {
    constructor(props) {
    super(props);
    this.state = {
      teamname: this.props.team.name,
      description: this.props.team.description,
      radio1 : true,
      check1: false,
      modalVisible: false,
      selectedItem: undefined,
      isLoading: false,
      team: this.props.team,
      previousname: this.props.team.name,
      avatarSource: '',
      pictureLoading: false,
      picture: this.props.team.picture
      }

    }

   
    _goBack(){
        this.props.navigator.pop();
    }

    _Save(){
        let team = this.state.team;
        team.name = this.state.teamname;
        team.description = this.state.description;
        firebase.database().ref('teams').on('value',(snap)=>{
            if (this.state.teamname === this.state.previousname){
                firebase.database().ref('teams/' + this.state.teamname).update(team);
                AlertIOS.alert('Saved!');
                this.props.navigator.pop()
            } else {
                if (snap.hasChild(this.state.teamname)) AlertIOS.alert('This name is already taken. Please choose another one')
                    else {
                        firebase.database().ref('teams/' + this.state.teamname).set(team);
                        firebase.database().ref('teams/' + this.state.previousname).remove();
                        AlertIOS.alert('Saved!');
                this.props.navigator.pop()

                    }
                }

         })
        
    }

    setModalVisible(visible, x) {
        this.setState({
            modalVisible: visible,
            selectedItem: x
        });
  }
  toggleCheck() {
  	this.setState({
  		check1 : !this.state.check1
  	})
  }
  _changeImage(){
        // this.setState({
        //     modalVisible: true
        // })
        
        var options = {
        	title: 'Select Display Picture',
        	storageOptions: {
        		skipBackup: true,
        		path: 'images'
        	}
        }

        ImagePicker.showImagePicker(options, (response) => {
        	console.log('Response = ', response);

        	if (response.didCancel) {
        		console.log('User cancelled image picker');
        	}
        	else if (response.error) {
        		console.log('ImagePicker Error: ', response.error);
        	}
        	else if (response.customButton) {
        		console.log('User tapped custom button: ', response.customButton);
        	}
        	else {
        	this.setState({pictureLoading:true})
            // You can display the image using either data...
            // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
            const source = {uri: '', isStatic: true};
          //   // or a reference to the platform specific asset location
          if (Platform.OS === 'ios') {
          	source = {uri: response.uri.replace('file://', ''), isStatic: true};
          } else {
          	source = {uri: response.uri, isStatic: true};
          }

          this.setState({
          	avatarSource: source
          });
          Blob.build(RNFetchBlob.wrap(source.uri), { type : 'image/jpeg' })
          .then((blob) => {
          	
          	var uploadTask = firebase.storage()
          	.ref('teams/' + this.props.team.name)
          	.put(blob, { contentType : 'image/png' })

          	uploadTask.on('state_changed', (snapshot) => {
          		// Observe state change events such as progress, pause, and resume
				  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				  console.log('Upload is ' + progress + '% done');
				  // switch (snapshot.state) {
				  //   case firebase.storage.TaskState.PAUSED: // or 'paused'
				  //     console.log('Upload is paused');
				  //     break;
				  //   case firebase.storage.TaskState.RUNNING: // or 'running'
				  //     console.log('Upload is running');
				  //     break;
				  // }
				}, (error) => {
				  // Handle unsuccessful uploads
				}, () => {


				  let team = this.props.team;
				  team.picture = uploadTask.snapshot.downloadURL;
				  firebase.database().ref('teams/'+ this.props.team.name).update(team);
				  this.setState({
					pictureLoading:false,
					picture: uploadTask.snapshot.downloadURL
				  })
				})


          	 })

				

     





      }

  	})
    }
    _exitModal(){
    	this.setState({
    		modalVisible: false
    	})
    }




    render() {

  
        return (
            <Container>
                <Header>
                    <Button transparent onPress={() => {this._goBack()}}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>Setting</Title>
                    <Button transparent onPress={() => {this._Save()}}>
                        <Icon name="ios-done-all" />
                    </Button>
                </Header>
                <Content>
                	{this.state.pictureLoading ? <Spinner/> :
                    <TouchableOpacity onPress={() => {this._changeImage()}}>
                        <Image style={styles.modalImage} source={{uri:this.state.picture}}  />
                    </TouchableOpacity>}
                   

                    <Text style={{color: '#000099'}}>Team name</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-eye" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your team name" 
                                onChangeText={(name) => this.setState({name})}
                                value={this.state.teamname}
                                />


                    </InputGroup>


                    <Text style={{color: '#000099'}}>Brief Description about your team</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-information-circle" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your team description" 
                                onChangeText={(description) => this.setState({description})}
                                value={this.state.description}
                                />
                    </InputGroup>

                   

                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
 
  modalImage: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
    alignSelf:'center'
  },
  wrapper: {

  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',

  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001a00',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003300',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',

  },
  slide5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001a00',
  },
  slide6: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003300',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 50
  },
  showcase:{
    position: 'absolute',
    width: windowSize.width,
    height: 410,
  },
  picShowcase: {
    width: windowSize.width, 
    marginBottom: 100, 
    top: 0, 
    marginTop: -160, 
    alignSelf: 'center', 
    alignItems: 'center'}
})

module.exports = TeamSetting;