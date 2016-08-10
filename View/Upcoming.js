'use strict';

var realm = require('../Model/model.js');
var History = require('./History');
// import YouTube from 'react-native-youtube';
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

class Upcoming extends Component {
	constructor(props) {
		super(props);
		this.state = {
			radio1 : true,
			check1: false,
			modalVisible: false,
			selectedItem: undefined,
			isReady: true,
			status: '',
			quality: '',
			error: '',
			currentTime: '',
			duration: '',

		};
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


	returnArrayMatches(){
		var arr = [];
		let matches = realm.objects('Match').filtered('state = "coming"');
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

	returnVideoId(url){
		var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
		return id[1];
	}
	render(){
		return (
			<Container>
			<Content>

			{this.state.isLoading? <Spinner /> : <List dataArray={this.returnArrayMatches()} renderRow={(match) =>  
				<ListItem onPress={()=>this.setModalVisible(true, match)}> 
				<View style={{flex: 1, flexDirection: 'row', marginLeft: 0, marginRight:0, marginTop: 20}}>
				<View style={{width: 60, height: 60, left: 0, }} >
				<Thumbnail square size={60} source={this.returnTeamImage(match.hometeam)} />
				</View>
				<View style={{width: 230, height: 60}}>
				<Text style={{fontWeight: '600', color: '#996633', marginLeft: 20, marginTop: 10}}>{match.hometeam}  -  {match.awayteam}</Text>
				</View>
				<View style={{width: 60, height: 60, right: 0}}>
				<Image style={styles.image} source={this.returnTeamImage(match.awayteam)} />
				</View>
				</View>


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
				<View style={styles.containerTop}>

				<View style={{width: 80, height: 80, left: 0, }} >
				<Thumbnail square size={80} source={this.returnTeamImage(this.state.selectedItem.hometeam)} />
				</View>
				<View style={{width: 200, height: 80}}>
				<Text style={{fontWeight: '600', color: '#cc00cc', marginLeft: 20, marginTop: 20,}}>{this.state.selectedItem.hometeam} - {this.state.selectedItem.awayteam}</Text>
				</View>
				<View style={{width: 80, height: 80, right: 0}}>
				<Image style={{width: 80, height: 80}} source={this.returnTeamImage(this.state.selectedItem.awayteam)} />
				</View>
				</View>
				<View style={styles.negativeMargin}>
				<Text style={{fontSize:10, fontWeight : '600'}}>
				Thời gian: <Text style={styles.time}>{this.state.selectedItem.time}</Text>
				</Text>
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
var styles = StyleSheet.create({
	containerTop: {
      flex: 1,
      flexDirection: 'row', 
      marginTop: 5,
      backgroundColor: 'transparent',
    },
	container: {
		position: 'relative'
	},

	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	rowContainer: {
		flex: 1,
		flexDirection: 'row', 
		marginLeft: 20, 
		marginRight:20,
		padding: 10,
	},
	image:{
		width: 60,
		height: 60,
		alignItems: 'center',

	},
	score: {
		fontWeight: '400',
		fontSize: 50,
		color: '#e6ac00',
		position: 'relative',
		alignItems: 'center',
	},
	negativeMargin: {
        height: 100,
    }
});

module.exports = Upcoming;