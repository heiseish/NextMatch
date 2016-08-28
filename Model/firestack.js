import Firestack from 'react-native-firestack'
// import { FirestackModule } from 'react-native-firestack'

const firestack = new Firestack();
// firestack.configure({
// 	debug: true,
// }).then(() => console.log("Project configured and ready to boot"));
// firestack.on('debug', msg => console.log('Received debug message', msg))


firestack.setStorageUrl('gs://nextmatch-8597c.appspot.com').then(() => console.log("Project configured and ready to boot"));
// const firestack = new Firestack();
// firestack.configure({storageBucket: "nextmatch-8597c.appspot.com"}).then(() => console.log("Project configured and ready to boot"));
module.exports = firestack;

