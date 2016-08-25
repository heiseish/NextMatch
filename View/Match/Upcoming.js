'use strict';

var realm = require('../../Model/model.js');
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
	TouchableHighlight,
	ListView,
	ScrollView,
	RefreshControl
} from 'react-native';
var windowSize = Dimensions.get('window');

class Upcoming extends Component {
		constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1.id !== row2.id});
		this.state = {
			dataSource: this.ds.cloneWithRows(this.props.match),
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
			refreshing: false,
			match: this.props.match

		};
	}
	_onRefresh() {
		this.setState({refreshing: true});
		this._refreshArray('finished',(err)=>{
			if (!err) this.setState({refreshing:false})
		})
	}

	_refreshArray(state,cb){

		this.returnArrayMatches('coming',(err,arr)=>{
			if (!err)
				this.setState({
					refreshing: false,
					dataSource: this.ds.cloneWithRows(arr)
				})

		})



	}
	returnArrayMatches(state,cb){
		let arr = []
		firebase.database().ref('match').orderByChild('time').startAt(JSON.parse(JSON.stringify(new Date(Date.now() - 864000000)))).endAt(JSON.parse(JSON.stringify(new Date(Date.now() + 864000000)))).once('value').then((snap)=>{
			snap.forEach((child)=>{
				if (child.val().state !== 'finished') arr.push(child.val())
			})

			cb(null,arr);
		})


	}


	returnTeamImage(name){
		var picture = ''
		firebase.database().ref('teams/' + name).on('value',(snap)=>{
			picture= snap.val().picture;
		})
		return picture;
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

	returnVideo(match){
		if (match.ytvideo) return true;
		else return false;

	}

	returnVideoId(url){
		var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
		return id[1];
	}
	renderRow(match) {
		return (
			<View>
			<TouchableHighlight onPress={()=>{this.setModalVisible(true,match)}}>
			<View style={styles.row}>

			<View style={{width: 60, height: 70, left: 0}} >
			<Thumbnail square size={50} source={{uri:this.returnTeamImage(match.hometeam)}} />
			</View>
			<View style={{width: 250, height: 70}}>
			{(match.state === 'live') ? <Text style={{alignSelf:'center',fontWeight: '600', color: 'red',marginTop:10}}>LIVE</Text> :
			<Text style={{fontWeight: '600', color: '#77773c', alignSelf: 'center',marginTop:20}}>{match.time}</Text>
			}
			<Text style={{alignSelf:'center'}}>{match.hometeamabre}  -   {match.awayteamabre}</Text>
			<Text note style={{alignSelf:'center'}}>{match.venue}</Text>
			</View>
			<View style={{width: 60, height: 70, right: 0}}>
			<Image style={styles.image} source={{uri:this.returnTeamImage(match.awayteam)}} />
			</View> 

			</View>
			</TouchableHighlight>
			<View style={styles.rowSeparator}/>
			</View>
			);
	}


	render(){
		return(
			<View style={styles.container}>
			<ScrollView style={styles.scrollview} 
			refreshControl={
				<RefreshControl
				refreshing={this.state.refreshing}
				onRefresh={()=>{this._onRefresh()}}
				/>}>
				<ListView


				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}/>
				</ScrollView>

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
				<Thumbnail square size={80} source={{uri:this.returnTeamImage(this.state.selectedItem.hometeam)}} />
				</View>
				<View style={{width: 200, height: 80}}>
				<Text style={{fontWeight: '600', color: '#cc00cc', marginLeft: 20, marginTop: 20,}}>{this.state.selectedItem.hometeam} - {this.state.selectedItem.awayteam}</Text>
				</View>
				<View style={{width: 80, height: 80, right: 0}}>
				<Image style={{width: 80, height: 80}} source={{uri:this.returnTeamImage(this.state.selectedItem.awayteam)}} />
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


  		</View>
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
    },
    separator: {
    height: 1,
    backgroundColor: '#dddddd',
    width: 100
  },
  scrollview:{
    height: 600,
  },

  rowSeparator: {
    backgroundColor: '#009933',
    height:1,
    width: windowSize.width
  },
  row: {
    flexDirection: 'row', 
    height:72,
  },
});

module.exports = Upcoming;