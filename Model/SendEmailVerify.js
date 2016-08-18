var user = require('./user');

SendEmailVerify = function(cb){

	user.sendEmailVerification().then(function() {
	  // Update successful.
	  cb(null)
	}, function(error) {
	  // An error happened.
		cb(error)
	});

module.exports = SendEmailVerify;