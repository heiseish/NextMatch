'use strict';


var TabBar = require("../View/TabBar");
var realm = require('../Model/model.js');
var Signup = require('./Signup');

import * as Progress from 'react-native-progress';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
  	Image,
  	Dimensions,
  	TouchableHighlight,
  	NavigatorIOS,
  	TabBarIOS,
    AlertIOS,
} from 'react-native';

var windowSize = Dimensions.get('window');

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';


class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username:'', 
			password:'',
			// isLoggedIn: false,
			isLoading: false,
			progress: 0,
      		indeterminate: true,
      		size: 80,
      		showsText: true
		};
		this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickSignup = this.onClickSignup.bind(this);
		
	}

	

	onClickLogin(){
		// this.setState({ isLoading: true });
		// this.setState({ progress:0 });
		// let users = realm.objects('User');
		
		// let user = users.filtered('username == $0',this.state.username)[0];
		// if ((user) && user.password === this.state.password) {
				// this.setState({ progress:1 });
				this.props.navigator.push({
						title: "Main",
            component: TabBar,
            passProps: {username: this.state.username, password: this.state.password,isLoggedin:this.isLoggedIn},
				});
		
	// 	} else {
 //        AlertIOS.alert(
 //            'Your ussername-password pair is incorrect! Please try again'
 //          )
 //        this.setState({isLoading: false})
 //    }
	}
  onClickSignup(){
    this.props.navigator.push({
        title: "New Account",
        component:Signup,
        navigationBarHidden: false,
    });
  }

	render() {
		var spinner = this.state.isLoading ?
		(<Progress.Circle
			size={this.state.Size}
            style={styles.progress}
            showsText={this.state.showsText}
            progress={this.state.progress}
            indeterminate={this.state.indeterminate}
          	/>) : ( <View/>);;




		return (
			

			<View style={styles.container}>

			<Image style={styles.bg} source={{uri: 'https://s-media-cache-ak0.pinimg.com/736x/a3/03/3c/a3033c8b069b102dd3b1f15c56f9c541.jpg'}} />
			<View style={styles.header}>
			<Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
			</View>
			<View style={styles.inputs}>
			<View style={styles.inputContainer}>
			<Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
			<TextInput 
			style={[styles.input, styles.whiteFont]}
			placeholder="Username"
			placeholderTextColor="#FFF"
			onChangeText={(username) => this.setState({username})}
			value={this.state.username}
			/>
			</View>
			<View style={styles.inputContainer}>
			<Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
			<TextInput
			password={true}
			style={[styles.input, styles.whiteFont]}
			placeholder="Pasword"
			placeholderTextColor="#FFF"
			onChangeText={(password) => this.setState({password})}
			value={this.state.password}
			/>
			</View>
			<View style={styles.forgotContainer}>
			<Text style={styles.greyFont}>Forgot Password</Text>
			</View>
			</View>




			<View style={styles.signin}>
			{spinner}
			
			<TouchableHighlight onPress={this.onClickLogin}>
			<Text style={styles.whiteFont}>Sign In</Text>
			</TouchableHighlight>
			</View>
			<View style={styles.signup}>
			<Text style={styles.greyFont}>Don't have an account?</Text><TouchableHighlight onPress={this.onClickSignup}><Text style={styles.whiteFont}> Sign Up</Text></TouchableHighlight>
			</View>
			</View>
			);
	}
};
// <Progress.Circle
// size={this.state.Size}
// style={styles.progress}
// showsText={this.state.showsText}
// progress={this.state.progress}
// indeterminate={this.state.indeterminate}
// />
	
const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    },
    circles: {
    	flexDirection: 'row',
    	alignItems: 'center',
    },
    progress: {
    	margin: 10,
    },
    
})
module.exports = Login;