var firebase = require('./firebase');

var matchRef = firebase.database().ref('matches');


module.exports = matchRef;