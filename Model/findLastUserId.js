var userRef = require('./userRef');


var findLastUserId = ()=>{
	var id = [];
	userRef.on('value',(snap)=>{
		snap.forEach((child) => {
              if (!child) return 1
              else { 
              	id.push(parseInt(child.val().userId));
              } 
         });
	})
	return (id.length+1)
}

module.exports = findLastUserId;