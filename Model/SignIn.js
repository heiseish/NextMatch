var firebase = require('./firebase');

SignIn = function(email,password,cb){
	firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        cb(null,user);
      }).catch(function(error) {
      // Handle Errors here.
      cb(error);
    });
    
}

module.exports = SignIn;