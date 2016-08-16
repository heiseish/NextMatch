'use strict';
var realm = require('../Model/model.js');


import React, { Component } from 'react';
import { 
  Container, 
  Header, 
  Title, 
  Content, 
  Text, 
  InputGroup, 
  Input, 
  Icon, 
  Button ,
  List,
  ListItem,
  Thumbnail,
  Card,
  CardItem,
  H3,
} from 'native-base';
import {
  Modal,
  StyleSheet,
  Platform,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
var windowSize = Dimensions.get('window');

//string interpolation for NSPredicate
//holesObjects.filtered(`id == ${i}`)

// <Image style={styles.bg} source={{uri: 'https://s-media-cache-ak0.pinimg.com/236x/3c/94/29/3c9429a602f4241c10da7e25fa4bc621.jpg'}} />



class ProfileSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      radio1 : true,
      check1: false,
      modalVisible: false,
      selectedItem: undefined,
      isLoading: false,
      results: {
                players: this.returnPlayers()
            }
    }
  }

  returnPlayers(){
    var arr = [];
    let results = realm.objects('User');
    results.forEach(function(current,i,Team){
      arr.push(current);
    })
    return (arr)

  }

  returnPlayerImage(player){
    if (player.imageStyle === 1) return require('../imgUser/1.png');
    if (player.imageStyle === 2) return require('../imgUser/2.jpg');
    if (player.imageStyle === 3) return require('../imgUser/3.jpg');
    if (player.imageStyle === 4) return require('../imgUser/4.jpg');
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

  search() {
    let arr = [];       
    this.setState({            
      loading: true          
    });
    let users = realm.objects('User').filtered('displayname CONTAINS $0',this.state.search);
    users.forEach(function(current,i,Team){
        arr.push(current);
    })
    this.setState({
        loading: false,
        results:{
          players: arr,
        }
    })

  }

  returnReview(team){
    var arrReview = [];
   let reviews = realm.objects('Review').filtered('team == $0',team.teamname);
   reviews.forEach(function(current,i,Team){
      arrReview.push(current);
    })
    return (arrReview)
  }

  _goback(){
    this.props.navigator.pop();
  }

  render() {
    return (
      <Container>
      <Header searchBar rounded>                            
      <InputGroup>                        
      <Icon name="ios-search" />                        
      <Input placeholder="Search" value={this.state.search}  onChangeText={(text) => this.setState({search:text})} onSubmitEditing={()=>this.search()}/>                    
      </InputGroup>                    
      <Button transparent onPress={()=>this._goback()}>Back</Button>                
      </Header>

      <Content>
       

      {this.state.loading? <Spinner /> : <List dataArray={this.state.results.players} renderRow={(player) =>               
        <ListItem button onPress={()=>this.setModalVisible(true, player)} > 
        <Thumbnail square size={80} source={this.returnPlayerImage(player)} />        
        <Text>Name: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{player.displayname}</Text></Text>
        <Text>Team: <Text style={{color:'#007594'}}>{player.team}</Text></Text>
        <Text note>Position: <Text note style={{marginTop: 5}}>{player.position}</Text></Text>    
        </ListItem>                            
      }> </List> }




      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <Card style={{paddingTop: 20}}>
      {!this.state.selectedItem ? <View />
        :  <CardItem cardBody style={{justifyContent: 'flex-start'}}>
        <View style={{alignItems: 'center'}}>
        <Image style={styles.modalImage} source={this.returnPlayerImage(this.state.selectedItem)}  />
        </View>
        <Grid style={{alignSelf: 'center', width: 300}}>
              <Col>
                <Row><Text style={styles.subjectFont}>Position</Text></Row>
                <Row><Text style={styles.subjectFont}>Full name</Text></Row>
                <Row><Text style={styles.subjectFont}>Description</Text></Row>
              </Col>
              <Col style={{}}>
                <Row><Text style={styles.whiteFont}>{this.state.selectedItem.position}</Text></Row>
                <Row><Text style={styles.whiteFont}>{this.state.selectedItem.fullname}</Text></Row>
                <Row><Text style={styles.whiteFont}>{this.state.selectedItem.briefdesc}</Text></Row>
              </Col>
              <Col></Col>
            </Grid>


        <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
          this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
        }}>
        Go Back
        </Button>
        </CardItem>
      }
      </Card>
      </Modal>




      </Content>
      </Container>

      );
  }
}

const styles = StyleSheet.create({
  containerTop: {
      flex: 1,
      flexDirection: 'row', 
      marginTop: 5,
      backgroundColor: 'transparent',
      marginLeft: 0,
    },
    cardView: {
      flexDirection: 'column',
      flex: 1,
      height: 110,
    },
    header : {
        marginLeft: -5,
        marginTop: 5,
        marginBottom: (Platform.OS==='ios') ? -7 : 0,
        lineHeight: 24,
        color: '#5357b6'
    },
    modalImage: {
        resizeMode: 'contain',
        height: 200
    },
    bold: {
        fontWeight: '600'
    },
    negativeMargin: {
        // marginBottom: -10
        marginTop: 10,
    },
  
});







module.exports = ProfileSearch;