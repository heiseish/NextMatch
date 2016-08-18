import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  	apiKey: "AIzaSyBNo2gWh6T5JMj2MqolhDrzX6of2E_ZwzM",
    authDomain: "nextmatch-8597c.firebaseapp.com",
    databaseURL: "https://nextmatch-8597c.firebaseio.com",
    storageBucket: "nextmatch-8597c.appspot.com",
};


firebase.initializeApp(firebaseConfig);

// Create a reference with .ref() instead of new Firebase(url)


module.exports =firebase;