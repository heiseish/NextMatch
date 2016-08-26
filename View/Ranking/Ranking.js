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
	TouchableHighlight,
	ListView,
	ScrollView,
	RefreshControl
} from 'react-native';
var Challenge = require('./Challenge');

var windowSize = Dimensions.get('window');



function temporarySwap(array)
{
    var left = null;
    var right = null;
    var length = array.length;
    for (left = 0, right = length - 1; left < right; left += 1, right -= 1)
    {
        var temporary = array[left];
        array[left] = array[right];
        array[right] = temporary;
    }
    return array;
}

class Ranking extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1.id !== row2.id});
		this.state = {
			dataSource: this.ds.cloneWithRows(this.props.ranks),
			radio1 : true,
			check1: false,
			modalVisible: false,
			selectedItem: undefined,
			isLoading: false,
			refreshing: false,

		}
	}




	setModalVisible(visible, x) {
		console.log(x);
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

	_onRefresh() {
		this.setState({refreshing: true});
		this._refreshArray('finished',(err)=>{
			if (!err) this.setState({refreshing:false})
		})
	}

	_refreshArray(state,cb){

		this.returnTopTeams((err,arr)=>{
			if (!err)
				this.setState({
					refreshing: false,
					dataSource: this.ds.cloneWithRows(arr)
				})

		})



	}
	returnTopTeams(cb){
		let arr = []
		firebase.database().ref('teams').orderByChild('rankpoint').limitToLast(50).once('value').then((snap)=>{
      			snap.forEach((child)=>{
        			// console.log(child.val())
       			 arr.push(child.val())
      			})


			cb(null,temporarySwap(arr));
		})


	}


	returnArrayPlayer(team){
		var arrPlayer = [];

		for (var key in team.players){
			arrPlayer.push(team.players[key])
		}


		return (arrPlayer)

	}

	returnReview(team){
		var arrReview = [];

		for (var key in team.review){
			arrReview.push(team.review[key])
		}
		return (arrReview)
	}

	setModalInvisibleAndProceed(visible, x, request) {

		if (this.state.selectedItem.name === this.props.team.name){
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





	renderRow(team) {
		return (
			<View style={styles.row}>
			<TouchableHighlight onPress={()=>{this.setModalVisible(true,team)}}>
			<View style={{flexDirection:'row'}}>	
				<Thumbnail square size={80} style={{marginBottom:10}} sty source={{uri:team.picture}} /> 
				<View style={{flexDirection:'column', marginLeft:20}}>       
				<Text>Team: <Text style={{fontWeight: '600', color: '#46ee4b'}}>{team.name}</Text></Text>
				<Text style={{color:'#007594'}}>{team.description}</Text>    
				<Text note>Score: <Text note style={{marginTop: 5}}>{team.rankpoint}</Text></Text> 
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
			<Header>
				<Title>Hall of Fame</Title>
			</Header>
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
						<Text style={{fontWeight: '600', color: '#cc00cc', paddingLeft: 10, alignSelf:'center'}}>{player.nickname} </Text>
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
						<Text note style={{fontWeight: '100',alignSelf:'flex-end'}}>    {review.reviewer}</Text> 
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




				</View>
				);
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1
	},
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
		height: 200,
		width:200,
		alignSelf: 'center'
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

	rowSeparator: {
    backgroundColor: '#009933',
    height:1,
    width: windowSize.width
  },
  row: {
    height:100,
  },
  scrollview:{
    height: 600,
  },
});







module.exports = Ranking;