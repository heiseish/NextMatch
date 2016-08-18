var firebase = require('./firebase');


ChangePassword = function(email,cb){

	firebase.auth().sendPasswordResetEmail(email).then(function() {
  // Email sent.
  		cb(null);
	}, function(error) {
  // An error happened.
  		cb(error)
	});
}

module.exports = ChangePassword;