var userRef = require('./userRef');
var firebase =require('./firebase');



var grabUser = (userId,user,cb) =>{
	userRef.once('value').then((snap) =>{

		if (snap.hasChild(userId)) {
			firebase.database().ref('users/' + userId).once('value').then((snap) => {cb(null,snap.val())})
		}
		else {
			user.leader = false;
			firebase.database().ref('users/' + userId).set(user);
			cb(null,user)
		}
		
	})
	
}

module.exports = grabUser;