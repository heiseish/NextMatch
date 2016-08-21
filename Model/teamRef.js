var firebase = require('./firebase');

var teamRef = firebase.database().ref('teams');


module.exports = teamRef;