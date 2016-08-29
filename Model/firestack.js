import Firestack from 'react-native-firestack'
// import { FirestackModule } from 'react-native-firestack'

const firestack = new Firestack();


firestack.configure({
	apiKey: "AIzaSyBNo2gWh6T5JMj2MqolhDrzX6of2E_ZwzM",
    authDomain: "nextmatch-8597c.firebaseapp.com",
    databaseURL: "https://nextmatch-8597c.firebaseio.com",
    storageBucket: "nextmatch-8597c.appspot.com"
}).then(() => console.log("Project configured and ready to boot"));

// firestack.storage.setStorageUrl('nextmatch-8597c.appspot.com');

// const firestack = new Firestack();
// firestack.configure({storageBucket: "nextmatch-8597c.appspot.com"}).then(() => console.log("Project configured and ready to boot"));
module.exports = firestack;

