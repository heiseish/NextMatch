'use strict';

var realm = require('../Model/model.js');

import Calendar from 'react-native-calendar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import React, { Component } from 'react';
import { 
  Container, 
  Header, 
  Title, 
  Thumbnail,
  Text,
  Icon,
  Button,
  List,
  ListItem,
  Content,
  Card,
  CardItem,
  H3,
  Badge,
} from 'native-base';

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Modal,
  AlertIOS,
} from 'react-native';

var windowSize = Dimensions.get('window');


function getDate(){
  var today = new Date();
  var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd='0'+dd
    } 

    if(mm<10) {
      mm='0'+mm
    } 

    today = yyyy+'-'+mm+'-'+dd;
    return today;
  }


class CalendarView extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      dateSelected: getDate(),
      eventDates: this.loadevents(),


    }
  }

  loadevents(){
    var arr = [];
    let matches = realm.objects('Match');
    matches.forEach(function(current,i,Team){
      arr.push(current.time);
    })
    return (arr)
  }

  onDateSelect(date){
    this.setState({dateSelected: date.substring(0,date.indexOf("T"))})
  }


  goBack(){
    this.props.navigator.pop();
  }

  returnArrayMatches(date){
    var arr = [];
    let matches = realm.objects('Match').filtered('time == $0',date);
    matches.forEach(function(current,i,Team){
      arr.push(current);
    })
    return (arr)
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

  returnDate(){
    var arr = [];
    let matches = realm.objects('Match');
    matches.forEach(function(current,i,Team){
      arr.push(current.time);
    })
    return (arr)
  }

  render(){
    return(
      <View style={styles.container}>
      <View style={styles.overlay}>
          <Header>

            <Button transparent onPress={()=> {this.goBack()}}>
              <Icon name="ios-arrow-back"/>
            </Button>
            <Title>Calendar</Title>
          </Header>

            
          <Calendar
            scrollEnabled={true}              // False disables swiping. Default: True
            showControls={true}               // False hides prev/next buttons. Default: False
            prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
            nextButtonText={'Next'}           // Text for next button. Default: 'Next'
            onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
            onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
            onTouchNext={this.onTouchNext}    // Callback for next touch event
            onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
            onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
            eventDates={this.state.eventDates}       // Optional array of moment() parseable dates that will show an event indicator
            selectedDate={getDate()}       // Day to be selected
            customStyle={{day: {fontSize: 15, textAlign: 'center'}, eventIndicator: {backgroundColor: 'green'}}} // Customize any pre-defined styles
            weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
          />
         
          </View>

  
          <View style={{height:300, width: windowSize.width, alignSelf: 'flex-end', bottom: 0, left:0, marginTop:470,}}>

          {this.state.isLoading? <Spinner /> : <List dataArray={this.returnArrayMatches(this.state.dateSelected)} renderRow={(match) =>  
              <ListItem> 
              <View style={{flex: 1, flexDirection: 'row', marginLeft: 0, marginRight:0, marginTop: 20}}>
              <View style={{width: 60, height: 60, left: 0, }} >
              <Thumbnail square size={60} source={this.returnTeamImage(match.hometeam)} />
              </View>
              <View style={{width: 230, height: 60}}>
              <Text style={{fontWeight: '600', color: '#996633', marginLeft: 20, marginTop: 10}}>{match.hometeam}  {match.hometeamscore} - {match.awayteamscore}  {match.awayteam}</Text>
              </View>
              <View style={{width: 60, height: 60, right: 0}}>
              <Image style={styles.image} source={this.returnTeamImage(match.awayteam)} />
              </View>
              </View>



        </ListItem>  
      }> </List> }
      </View>
      </View>
    


    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  image:{
    width: 60,
    height: 60,
    alignItems: 'center',

  },
  overlay: {
    flex: 1,
    position: 'absolute',
    top:0,
    left:0,
    backgroundColor: 'transparent',
    width: windowSize.width,
    height: 500,
  } 
})

module.exports = CalendarView;