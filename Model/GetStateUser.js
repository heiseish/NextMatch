var firebase =require('./firebase');


var getStateUser = function(cb){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    cb(null,user)
  } else {
    // No user is signed in.
    cb('No user')
  }
});
}

module.exports = getStateUser;