var firebase = require('./firebase');

SignOut = function(cb){
	firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  cb(null);
	}, function(error) {
		  // An error happened.
		  cb(error);
	});

}

module.exports = SignOut;