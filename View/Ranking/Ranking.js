'use strict';
var realm = require('../../Model/model.js');


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
  AlertIOS,
} from 'react-native';
var Challenge = require('./Challenge');

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
     
    }
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
    teams.players.forEach(function(current,i,Team){
      arr.push(current);
    })
    this.setState({
      loading: false,
      results:{
        teams: arr,
      }
    })

  }


  returnArrayPlayer(team){
    var arrPlayer = [];
    

    team.players.forEach(function(current,i,Team){
      arrPlayer.push(team.players);
    })

    return (arrPlayer)

  }

  returnReview(team){
    var arrReview = [];
    
    team.review.forEach(function(current,i,Team){
      arrReview.push(team.review);
    })
    return (arrReview)
  }

  setModalInvisibleAndProceed(visible, x, request) {
        
        if (this.state.selectedItem.teamname === this.props.user.team){
          AlertIOS.alert('Dude you cannot challenge your own team!');
        } else{
          this.setState({
            modalVisible: visible,
            selectedItem: x
        });
        AlertIOS.alert('Please fill in the detail of the challenge');
        this.props.navigator.push({
          title: 'Create Challenge',
          name: 'CreateChallenge',
          component: Challenge,
          passProps: {user: this.props.user, awayteam: this.state.selectedItem},
        })
        }

        
        
  }

  _Alert(){
    AlertIOS.alert(
          'Are you sure that you want to challenge the team?',
          'There is no turning back from this if the other team accepts the challenge!',
         [
         {text: 'On second thought NO!', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'Bring it on', onPress: () => this.setModalInvisibleAndProceed(!this.state.modalVisible, this.state.selectedItem, this.state.selectedItem)},
         ],
         );
  }




  render() {
    return (
      <Container>
      <Header >                            
        <Title>Hall of Fame</Title>        
      </Header>

      <Content>


      {this.state.loading? <Spinner /> : <List dataArray={this.props.ranks} renderRow={(team) =>               
        <ListItem button onPress={()=>this.setModalVisible(true, team)} > 
        <Thumbnail square size={80} source={{uri:team.picture}} />        
        <Text>Team: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{team.name}</Text></Text>
        <Text style={{color:'#007594'}}>{team.description}</Text>    
        <Text note>Score: <Text note style={{marginTop: 5}}>{team.rankpoint}</Text></Text>    
        </ListItem>                            
      }> </List> }




      <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <Card style={{paddingTop: 20}}>
      {!this.state.selectedItem ? <View />
        :  <CardItem cardBody style={{justifyContent: 'flex-start'}}>
        <View style={{alignItems: 'center'}}>
        <Image style={styles.modalImage} source={{uri:this.state.selectedItem.picture}}  />
        </View>
        <View style={styles.cardView}>

        <View style={{width: 150, left: 0}}>
        <H3 style={styles.header}> {this.state.selectedItem.name}</H3>
        <Text style={styles.negativeMargin} >
        Rank Point: <Text style={styles.bold}>{this.state.selectedItem.rankpoint}</Text>
        </Text>
        <Text style={styles.negativeMargin} >
        Description: <Text style={styles.bold}>{this.state.selectedItem.description}</Text>
        </Text>
        </View>

        <View style={{width: 240, right: 0}}>
        <Title>Team Rosters</Title>
        {this.state.isLoading? <Spinner /> : <List dataArray={this.returnArrayPlayer(this.state.selectedItem)} renderRow={(player) =>               
          <ListItem> 

          <View style={styles.containerTop}>

          <View style={{width: 30, height: 20, left: 0}} >
          <Thumbnail square size={30} source={{uri:player.picture}} />
          </View>
          <View style={{width: 70, height: 20, }}>
          <Text style={{fontWeight: '600', color: '#cc00cc', paddingLeft: 10, alignSelf:'center'}}>{player.nicknamename} </Text>
          </View>
          <View style={{width: 100, height: 20,  }}>
          <Text style={{fontWeight: '600', color: '#cc00cc', alignSelf: 'center', marginBottom: 20}}>{player.position} </Text>
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

        <View style={styles.buttons}>
          <View style={{width: 170}}>
          <Button success style={{alignSelf: 'center'}} onPress={() => {
            this._Alert()
          }}>Challenge</Button>
          </View>
          <View style={{width: 170}}>
          <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
            this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)
          }}>Back</Button>
          </View>

        </View>
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

    marginTop: 10,
  },

  buttons:{
    flexDirection: 'row',
    marginTop: 50,
  },
});







module.exports = Ranking;