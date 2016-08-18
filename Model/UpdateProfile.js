var user = require('./user');

UpdateProfile = function(displayname,photoURL,cb){

	user.updateProfile({
	  displayName: displayname,
	  photoURL: photoURL
	}).then(function() {
	  // Update successful.
	  cb(null)
	}, function(error) {
	  // An error happened.
	  cb(error)
	});

module.exports = UpdateProfile;