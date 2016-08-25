'use strict';
var realm = require('../../Model/model.js');


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
  Spinner,
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
var userRef = require('../../Model/userRef');

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
      players: [],
      opacity: 1,
    }
  }

  returnPlayers(){
    this.setState({isLoading:true})
    var arr = [];
    let results = userRef.once('value').then((snap)=>{
      snap.forEach((child)=>{
        arr.push(child.val());
      })
      this.setState({isLoading:false})
    });
   
    return (arr)

  }
  componentDidMount(){
    this.setState({
     players: this.returnPlayers()
    })
  }



  setModalVisible(visible, x,y) {
        this.setState({
            modalVisible: visible,
            selectedItem: x,
            opacity:y
        });
  }
  toggleCheck() {
        this.setState({
            check1 : !this.state.check1
        })
  }

  search() {      
    this.setState({            
      loading: true          
    });
    var arr = [];
    let results = userRef.on('value',(snap)=>{
      snap.forEach((child)=>{
        if (child.val().nickname.toLowerCase().search(this.state.search.toLowerCase()) !== -1) arr.push(child);
      })
    });
    this.setState({
        loading: false,
        players: arr,
    })

  }


  _goback(){
    this.props.navigator.pop();
  }

  render() {
    return (
      <Container  style={{opacity: this.state.opacity}}>
      <Header searchBar rounded>                            
      <InputGroup>                        
      <Icon name="ios-search" />                        
      <Input placeholder="Search" value={this.state.search}  onChangeText={(text) => this.setState({search:text})} onSubmitEditing={()=>this.search()}/>                    
      </InputGroup>                    
      <Button transparent onPress={()=>this._goback()}>Back</Button>                
      </Header>

      <Content>
       

      {this.state.loading? <Spinner /> : <List dataArray={this.state.players} renderRow={(player) =>               
        <ListItem button onPress={()=>this.setModalVisible(true, player,0.2)} > 
        <Thumbnail square size={80} source={{uri:player.picture}} />        
        <Text>Name: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{player.nickname}</Text></Text>
        <Text>Team: <Text style={{color:'#007594'}}>{player.team ? player.team : 'No Team yet'}</Text></Text>
        <Text note>Position: <Text note style={{marginTop: 5}}>{player.position}</Text></Text>    
        </ListItem>                            
      }> </List> }




      <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
      >
     
      {!this.state.selectedItem ? <View />
        :  <View style={styles.modal}>
        <Card>
        <CardItem style={{height:500}}>
        
        <Image style={styles.modalImage} source={{uri:this.state.selectedItem.picture}}  />
    
        <Grid style={{alignSelf: 'center', width: 300}}>
              <Col></Col>
              <Col>
                <Row><Text style={styles.subjectFont}>Nickname:</Text></Row>
                <Row><Text style={styles.subjectFont}>Position:</Text></Row>
                <Row><Text style={styles.subjectFont}>Team:</Text></Row>
              </Col>
              <Col style={{}}>
                <Row><Text style={styles.whiteFont}>{this.state.selectedItem.nickname}</Text></Row>
                <Row><Text style={styles.whiteFont}>{this.state.selectedItem.position}</Text></Row>
                <Row><Text style={styles.whiteFont}>{this.state.selectedItem.team}</Text></Row>
              </Col>
              <Col></Col>
              
            </Grid>


        <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
          this.setModalVisible(!this.state.modalVisible, this.state.selectedItem,1)
        }}>
        Go Back
        </Button>
        </CardItem>
       
        </Card>
         </View> 
       
      }
   
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
    modal: {
      width: 300,
      height:500,
      alignSelf: 'center',
      marginTop:80,
      backgroundColor: '#FFF'
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
        backgroundColor: 'transparent',
        resizeMode: 'contain',
        height: 200,
        width:200,
        alignSelf: 'center',

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