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


class EditProfile extends Component {
    constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.nickname,
      position: this.props.user.position,
      radio1 : true,
      check1: false,
      modalVisible: false,
      selectedItem: undefined,
      isLoading: false,
        }

    }
    _goBack(){
        this.props.navigator.pop();
    }

    _Save(){
        var user = this.props.user;
        user.nickname = this.state.nickname;
        user.position = this.state.position;
        firebase.database().ref('users/' + this.props.user.userId).update(user);
        this.props.navigator.pop();
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
            .ref('users/' + this.props.user.userId)
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


                  let user = this.props.user;
                  user.picture = uploadTask.snapshot.downloadURL;
                  firebase.database().ref('users/'+ user.userId).update(user);
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
  _setProfile(imgStyle){
    let user = realm.objects('User').filtered('username == $0',this.props.user.username)[0];
    realm.write(() => {
       user.imageStyle = imgStyle;
   });

    
    this.setState({
        modalVisible: false,
    })
    AlertIOS.alert('Profile picture set successfully!');
}

returnUserImg(){
    if (this.props.user.imageStyle === 1) return require('../../imgUser/1.png');
    if (this.props.user.imageStyle === 2) return require('../../imgUser/2.jpg');
    if (this.props.user.imageStyle === 3) return require('../../imgUser/3.jpg');
    if (this.props.user.imageStyle === 4) return require('../../imgUser/4.jpg');
  }

    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPress={() => {this._goBack()}}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>Edit Profile</Title>
                    <Button transparent onPress={() => {this._Save()}}>
                        <Icon name="ios-done-all" />
                    </Button>
                </Header>
                <Content>
                    {this.state.pictureLoading ? <Spinner/> :
                    <TouchableOpacity onPress={() => {this._changeImage()}}>
                        <Image style={styles.modalImage} source={{uri:this.state.picture}}  />
                    </TouchableOpacity>}
                   
                    <Text style={{color: '#000099'}}>Nickname</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-man" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your desire nick name"
                                onChangeText={(nickname) => this.setState({nickname})}
                                value={this.state.nickname}
                        />
                    </InputGroup>

                    <Text style={{color: '#000099'}}>Position</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-football" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your position" 
                                onChangeText={(position) => this.setState({position})}
                                value={this.state.position}
                                />
                    </InputGroup>


                    <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                    <Swiper style={styles.wrapper} showsButtons={true} dot={<View style={{backgroundColor:'#ccffcc', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
                        <View style={styles.slide1}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../../imgUser/2.jpg')}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 350}}> 
                                <View style={{width:50}}>
                                    <Button large rounded block transparent onPress={() => {this._exitModal()}}>
                                        <Icon name="ios-exit-outline" style={{color: '#FFF'}} />
                                    </Button>
                                </View>
                                <View style={{width:200}}>
                                </View>
                                <View style={{width: 50}}>
                                    <Button large rounded block transparent onPress={() => {this._setProfile(2)}}>
                                        <Icon name="ios-checkmark-circle-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                

                                
                            </View>

                        </View>
                        <View style={styles.slide2}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../../imgUser/3.jpg')}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 350}}> 
                                <View style={{width:50}}>
                                    <Button large rounded block transparent onPress={() => {this._exitModal()}}>
                                        <Icon name="ios-exit-outline" style={{color: '#FFF'}} />
                                    </Button>
                                </View>
                                <View style={{width:200}}>
                                </View>
                                <View style={{width: 50}}>
                                    <Button large rounded block transparent onPress={() => {this._setProfile(3)}}>
                                        <Icon name="ios-checkmark-circle-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                

                                
                            </View>
                         </View>
                         <View style={styles.slide3}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../../imgUser/4.jpg')}/>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 350}}> 
                                <View style={{width:50}}>
                                    <Button large rounded block transparent onPress={() => {this._exitModal()}}>
                                        <Icon name="ios-exit-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                <View style={{width:200}}>
                                </View>
                                <View style={{width: 50}}>
                                    <Button large rounded block transparent onPress={() => {this._setProfile(4)}}>
                                        <Icon name="ios-checkmark-circle-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                

                                
                            </View>
                        </View>
                    </Swiper>
                  </Modal>

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

module.exports = EditProfile;