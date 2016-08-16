'use strict';

var realm = require('../Model/model.js');
import React, { Component } from 'react';
import { Container, Content, InputGroup, Input , Icon, Header, Title, Button, Text,Card,CardItem,} from 'native-base';
import {View, StyleSheet, Image, TouchableOpacity,Modal,Dimensions, AlertIOS} from 'react-native';
var Swiper = require('react-native-swiper');
var windowSize = Dimensions.get('window');



class TeamSetting extends Component {
    constructor(props) {
    super(props);
    this.state = {
      teamname: this.returnInfo('teamname'),
      description: this.returnInfo('teamdescription'),
      radio1 : true,
      check1: false,
      modalVisible: false,
      selectedItem: undefined,
      isLoading: false,
        }

    }

    returnInfo(info){
      let team = realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0];
      return team[info];
    }
    _goBack(){
        this.props.navigator.pop();
    }

    _Save(){
        let team = realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0];
        realm.write(() => {
             team.teamname = this.state.teamname;
             team.teamdescription = this.state.description;
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
    let team = realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0];
    realm.write(() => {
       user.imageStyle = imgStyle;
   });

    
    this.setState({
        modalVisible: false,
    })
    AlertIOS.alert('Profile picture set successfully!');
}

returnTeamImage(teamname){
    let team = realm.objects('Team').filtered('teamname == $0',teamname)[0];
    if (team.imageStyle === 1) return require('../imgTeam/1.png');
    if (team.imageStyle === 2) return require('../imgTeam/2.jpg');
    if (team.imageStyle === 3) return require('../imgTeam/3.png');
    if (team.imageStyle === 4) return require('../imgTeam/4.png');
    if (team.imageStyle === 5) return require('../imgTeam/5.png');
    if (team.imageStyle === 6) return require('../imgTeam/6.jpg');
    if (team.imageStyle === 7) return require('../imgTeam/7.png');

  }

    render() {
      let team = realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0];
  
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
                    <TouchableOpacity onPress={() => {this._changeImage()}}>
                        <Image style={styles.modalImage} source={this.returnTeamImage(this.props.user.team)}  />
                    </TouchableOpacity>
                   

                    <Text style={{color: '#000099'}}>Team name</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-eye" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your displayname" 
                                onChangeText={(teamname) => this.setState({teamname})}
                                value={this.state.teamname}
                                />


                    </InputGroup>


                    <Text style={{color: '#000099'}}>Brief Description about you</Text>
                    <View style={{height:20}} />
                    <InputGroup borderType="underline" >
                        <Icon name="ios-information-circle" style={{color:'#384850'}}/>
                        <Input placeholder="Enter your position" 
                                onChangeText={(description) => this.setState({description})}
                                value={this.state.description}
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
                                <Image style={styles.showcase} source={require('../imgTeam/2.jpg')}/>
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
                                <Image style={styles.showcase} source={require('../imgTeam/3.png')}/>
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
                                <Image style={styles.showcase} source={require('../imgTeam/4.png')}/>
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

                            <View style={styles.slide4}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../imgTeam/5.png')}/>
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
                                    <Button large rounded block transparent onPress={() => {this._setProfile(5)}}>
                                        <Icon name="ios-checkmark-circle-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                

                                
                            </View>

                        </View>
                        <View style={styles.slide5}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../imgTeam/6.jpg')}/>
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
                                    <Button large rounded block transparent onPress={() => {this._setProfile(6)}}>
                                        <Icon name="ios-checkmark-circle-outline" style={{color: '#FFF'}}/>
                                    </Button>
                                </View>
                                

                                
                            </View>
                         </View>
                         <View style={styles.slide6}>
                            <View style={styles.picShowcase}>
                                <Image style={styles.showcase} source={require('../imgTeam/7.png')}/>
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
                                    <Button large rounded block transparent onPress={() => {this._setProfile(7)}}>
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