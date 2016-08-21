var userRef = require('./userRef');
var firebase =require('./firebase');



var grabUser = (userId,user,cb) =>{
	userRef.once('value').then((snap) =>{

		if (snap.hasChild(userId)) cb(null,user);
		else {
			console.log('Hi')
			firebase.database().ref('users/' + userId).set(user);
			cb(null,user)
		}
		
	})
	
}

module.exports = grabUser;