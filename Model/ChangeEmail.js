var user = require('./user');

ChangeEmail = function(email,credential,cb){

	user.updateEmail(email).then(function() {
	  // Update successful.
	  cb(null)
	}, function(error) {
	  // An error happened.
	  user.reauthenticate(credential).then(function() {
  		// User re-authenticated.
  		cb(null)
		}, function(error) {
  		// An error happened.
  			cb(error)
			});


	});

module.exports = ChangeEmail;