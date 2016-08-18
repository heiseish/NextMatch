'use strict';

var realm = require('../../Model/model.js');

import React,{Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image

} from 'react-native';

import { GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import { 
  Container, 
  Header, 
  Title, 
  Button,
  Icon,
  Content,
} from 'native-base';

var reverse = function(arr) {
 var result = [],
 ii = arr.length;
 for (var i = ii - 1;i !== 0;i--) {
   result.push(arr[i]);
 }
 return result;
}


class TeamPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);

    // this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    // this.onLoadEarlier = this.onLoadEarlier.bind(this);
     // this.renderAvatar = this.renderAvatar.bind(this);
    this._isAlright = null;
  }



  componentWillMount() {
    this._isMounted = true;
    if ((realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0].messages) && realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0].messages.length > 0){
      this.setState(() => {
        return {
         messages: reverse(realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0].messages)
       };
     });
    } else {
      this.setState(() => {
        return {
         messages: []
       };
     });

    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // onLoadEarlier() {
  //   this.setState((previousState) => {
  //     return {
  //       isLoadingEarlier: true,
  //     };
  //   });

  //   setTimeout(() => {
  //     if (this._isMounted === true) {
  //       this.setState((previousState) => {
  //         return {
  //           messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
  //           loadEarlier: false,
  //           isLoadingEarlier: false,
  //         };
  //       });
  //     }
  //   }, 1000); // simulating network
  // }

  goBack(){
    this.props.navigator.pop();
  }

  


  onSend(messages = []) {
    realm.write(() => {
      let TeamMsm = realm.objects('Team').filtered('teamname == $0',this.props.user.team)[0].messages;

        TeamMsm.push({
          _id: TeamMsm.length,
          text: messages[0].text,
          user: {
            _id: this.props.user.id,
            name: this.props.user.displayname,
            avatar: this.getAvatar()
          },
        })
     

      this.componentWillMount();

    });


  }
  // renderCustomActions(props) {
  //   if (Platform.OS === 'ios') {
  //     return (
  //       <CustomActions
  //         {...props}
  //       />
  //     );
  //   }
  //   const options = {
  //     'Action 1': (props) => {
  //       alert('option 1');
  //     },
  //     'Action 2': (props) => {
  //       alert('option 2');
  //     },
  //     'Cancel': () => {},
  //   };
  //   return (
  //     <Actions
  //       {...props}
  //       options={options}
  //     />
  //   );
  // }
  //   renderCustomView(props) {
  //   return (
  //     <CustomView
  //       {...props}
  //     />
  //   );
  // }

  
 


  renderBubble(props) {
    return (
      <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#f0f0f0',
        }
      }}
      />
      );
  }


  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
        {this.state.typingText}
        </Text>
        </View>
        );
    }
    return null;
  }

  getAvatar(){
    if (this.props.user.imageStyle === 1) return 'https://i.imgur.com/MbaeK8b.png'
    if (this.props.user.imageStyle === 2) return "https://i.imgur.com/LxkRAlL.jpg"
    if (this.props.user.imageStyle === 3) return "http://i.imgur.com/TqiBS0l.jpg"
    if (this.props.user.imageStyle === 4) return "http://i.imgur.com/KuRAxYI.jpg"
  }

  render() {
    return (
      <View style={styles.container}>
      <Header>
      <Button transparent onPress={()=> {this.goBack()}}>
      <Icon name="ios-arrow-back"/>
      </Button>
      <Title>Group Chat</Title>
      </Header>

      <GiftedChat
      messages={this.state.messages}
      onSend={this.onSend}
      // loadEarlier={this.state.loadEarlier}
      onLoadEarlier={this.onLoadEarlier}
      isLoadingEarlier={this.state.isLoadingEarlier}

      user={{
        _id: this.props.user.id,
      }}

      renderBubble={this.renderBubble}
      renderFooter={this.renderFooter}
      // renderAvatar={this.renderAvatar}
      />
      </View>

      );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  container: {
    flex: 1,
    
  },
});

module.exports= TeamPost;