var firebase = require('./firebase');

var user = firebase.auth().currentUser;

module.exports = user;
