var firebase = require('./firebase');

var userRef = firebase.database().ref('users');


module.exports = userRef;