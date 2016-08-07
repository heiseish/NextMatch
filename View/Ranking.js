'use strict';
var realm = require('../Model/model.js');


import StarRating from 'react-native-star-rating';
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

var windowSize = Dimensions.get('window');

//string interpolation for NSPredicate
//holesObjects.filtered(`id == ${i}`)

// <Image style={styles.bg} source={{uri: 'https://s-media-cache-ak0.pinimg.com/236x/3c/94/29/3c9429a602f4241c10da7e25fa4bc621.jpg'}} />



class Ranking extends Component {
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
                teams: this.returnSortedTeam()
            }
    }
  }

  compare(a,b) {
    if (a.rankpoint > b.rankpoint)
      return -1;
    if (a.rankpoint < b.rankpoint)
      return 1;
    return 0;
  }
  returnSortedTeam(){
    var arr = [];
    let results = realm.objects('Team');
    results.forEach(function(current,i,Team){
      arr.push(current);
    })
    return (arr.sort(this.compare))

  }

  returnPlayerImage(player){
    if (player.image === '') return 'https://i0.wp.com/assets.plan.io/images/default_avatar.png'; 
    else return player.image;
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
    let teams = realm.objects('Team').filtered('teamname CONTAINS $0',this.state.search);
    teams.forEach(function(current,i,Team){
        arr.push(current);
    })
    this.setState({
        loading: false,
        results:{
          teams: arr,
        }
    })

  }
  _returnImage(team){
    if (team.image === '') return 'https://i0.wp.com/assets.plan.io/images/default_avatar.png';
    else return team.image;
  }

  returnArrayPlayer(team){
    var arrPlayer = [];
    let players= realm.objects('User').filtered('team == $0',team.teamname);

    players.forEach(function(current,i,Team){
      arrPlayer.push(current);
    })
  
    return (arrPlayer)

  }

  returnReview(team){
    var arrReview = [];
   let reviews = realm.objects('Review').filtered('team == $0',team.teamname);
   reviews.forEach(function(current,i,Team){
      arrReview.push(current);
    })
    return (arrReview)
  }




  render() {
    return (
      <Container>
      <Header searchBar rounded>                            
      <InputGroup>                        
      <Icon name="ios-search" />                        
      <Input placeholder="Search" value={this.state.search}  onChangeText={(text) => this.setState({search:text})} onSubmitEditing={()=>this.search()}/>                    
      </InputGroup>                    
      <Button transparent onPress={()=>this.search()}>Go</Button>                
      </Header>

      <Content>
       

      {this.state.loading? <Spinner /> : <List dataArray={this.state.results.teams} renderRow={(team) =>               
        <ListItem button onPress={()=>this.setModalVisible(true, team)} > 
        <Thumbnail square size={80} source={{uri: this._returnImage(team)}} />        
        <Text>Team: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{team.teamname}</Text></Text>
        <Text style={{color:'#007594'}}>{team.teamdescription}</Text>    
        <Text note>Score: <Text note style={{marginTop: 5}}>{team.rankpoint}</Text></Text>    
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
        <Image style={styles.modalImage} source={{uri: this._returnImage(this.state.selectedItem)}}  />

        <View style={styles.cardView}>

        <View style={{width: 150, left: 0}}>
         <H3 style={styles.header}> {this.state.selectedItem.teamname}</H3>
          <Text style={styles.negativeMargin} >
          Rank Point: <Text style={styles.bold}>{this.state.selectedItem.rankpoint}</Text>
          </Text>
          <Text style={styles.negativeMargin} >
          Description: <Text style={styles.bold}>{this.state.selectedItem.teamdescription}</Text>
          </Text>
        </View>

        <View style={{width: 240, right: 0}}>
          <Title>Team Rosters</Title>
          {this.state.isLoading? <Spinner /> : <List dataArray={this.returnArrayPlayer(this.state.selectedItem)} renderRow={(player) =>               
          <ListItem> 

            <View style={styles.containerTop}>

            <View style={{width: 30, height: 20, left: 0}} >
            <Thumbnail square size={30} source={{uri: this.returnPlayerImage(player)}} />
            </View>
             <View style={{width: 200, height: 20, right:0, paddingLeft: 10 }}>
           <Text style={{fontWeight: '600', color: '#cc00cc', right : 25, marginLeft: 55}}>{player.displayname}   {player.position}</Text>
           </View>
          
           </View>

            </ListItem>                            
           }> </List> }
          </View>

        </View>
        <View style={styles.cardBelow}>
          <H3 style={{alignSelf: 'center'}}>Review</H3>

          <List dataArray={this.returnReview(this.state.selectedItem)} renderRow={(review) =>               
          <ListItem style={{height:100,}}> 
            <View>
            <StarRating 
            disabled={true}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={review.point}
            starColor={'green'}
            />
            <Text>{review.comment}</Text>
            <Text note style={{fontWeight: '100'}}>    {review.reviewer}</Text> 
            </View>

            </ListItem>                            
           }> </List> 

        </View>

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
      flexDirection: 'row',
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
    // cardBelow: {
    //   width: windowSize.width,
    //   alignSelf: 'center',
    //   height: 150,
    //   color: 'black',
    // }
});







module.exports = Ranking;