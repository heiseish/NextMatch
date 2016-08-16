'use strict';


var TabBar = require("../View/TabBar");
var realm = require('../Model/model.js');
var Signup = require('./Signup');
// var imagePicker = require('react-native-imagepicker');
// var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: "hLxzMyG17Ae5Tga4l6PQYB3TwVmOQLIY", domain: "heiseish.au.auth0.com"});

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	
  Dimensions,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  
  Platform,
} from 'react-native';
import {
  Button,
  Spinner,
  Icon,
} from 'native-base';
var windowSize = Dimensions.get('window');

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';


class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			logged: false,
      profile: {},
      token: '',

    };
		
		
	}


  openLogin(){
    lock.show({closable: true}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({
        token: token,
        profile: profile,
        logged: true,
      })
      if (this.state.profile.email){
      let users = realm.objects('User');
      let user = users.filtered('email == $0',this.state.profile.email)[0];


      this.props.navigator.push({
        title: 'Main',
        name: "TabBar",
        component: TabBar,
        passProps: {user:user,selectedTab:'profile'},
      });
    } else if (this.state.profile.name){
      let users = realm.objects('User');
      let user = users.filtered('fullname == $0',this.state.profile.name)[0];


      this.props.navigator.push({
        title: 'Main',
        name: "TabBar",
        component: TabBar,
        passProps: {user:user,selectedTab:'profile'},
      });
    }
    });
  }

  openTouchId(){
    lock.show({
      connections: ["touchid"],
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }

	
	render() {
    
		return (
			

			<View style={styles.container}>

      <Image style={styles.bg} source={require('../imgBackground/login.jpg')} />
      <View >
        <Text style={styles.title}>Next Match Reborn</Text>
      </View>
      <View >
        <Text style={styles.subtitle}>-Tap the ball to log in-</Text>
      </View>
      {(Platform.OS === 'ios') ? <View style={{alignSelf:'flex-end'}}><TouchableHighlight onPress={() => {this.openTouchId()}}><Text style={styles.greyFont}>Or by touch ID</Text></TouchableHighlight></View> : <View/>}
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => {this.openLogin()}}>
          <View style={{backgroundColor: 'transparent',width: 130, height: 130}}/>
        </TouchableWithoutFeedback>
      </View>
      
      
      </View>
			
			);
	}
};

	
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
        marginTop: 110,
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
    title: {
      color: '#FFF',
      fontWeight: '600',
      fontSize: 50,
      alignSelf: 'center',
      fontFamily: 'Academy Engraved LET',
      paddingTop: 110,
      // fontStyle: 'italic'
    },
    subtitle: {
      color: '#FFF',
      fontWeight: '600',
      fontSize: 25,
      alignSelf: 'center',
      fontFamily: 'Academy Engraved LET',
      paddingTop: 40,
      // fontStyle: 'italic'
    }
    
})
module.exports = Login;