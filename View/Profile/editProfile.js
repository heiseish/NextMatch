'use strict';

var realm = require('../../Model/model.js');
import React, { Component } from 'react';
import { Container, Content, InputGroup, Input , Icon, Header, Title, Button, Text,Card,CardItem,} from 'native-base';
import {View, StyleSheet, Image, TouchableOpacity,Modal,Dimensions, AlertIOS} from 'react-native';
var Swiper = require('react-native-swiper');
var windowSize = Dimensions.get('window');


class EditProfile extends Component {
    constructor(props) {
    super(props);
    this.state = {
      fullname: this.props.user.fullname,
      displayname: this.props.user.displayname,
      position: this.props.user.position,
      briefdesc: this.props.user.briefdesc,
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
    this.setState({
        modalVisible: true
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
                    <TouchableOpacity onPress={() => {this._changeImage()}}>
                        <Image style={styles.modalImage} source={this.returnUserImg()}  />
                    </TouchableOpacity>
                    <Text style={{color: '#000099'}}>Full name</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-man" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your full name"
                                onChangeText={(fullname) => this.setState({fullname})}
                                value={this.state.fullname}
                                 />
                    </InputGroup>

                    <Text style={{color: '#000099'}}>Display name</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-eye" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your displayname" 
                                onChangeText={(displayname) => this.setState({displayname})}
                                value={this.state.displayname}
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

                    <Text style={{color: '#000099'}}>Brief Description about you</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-information-circle" style={{color:'#384850'}}/>
                        <Input placeholder="Tell people about yourself" 
                                onChangeText={(briefdesc) => this.setState({briefdesc})}
                                value={this.state.briefdesc}
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