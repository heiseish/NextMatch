var firebase = require('./firebase');

SignUP = function(email,password,cb){
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
		user.sendEmailVerification(); 
        cb(null,user);
      }).catch(function(error) {
      // Handle Errors here.
      cb(error);
    });
    
}

module.exports = SignUP;