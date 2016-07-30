'use strict';

const Realm = require('realm');


const UserSchema = {

  name: 'User',
        primaryKey: 'username',
        properties: {
            id:    'int',   
            username: 'string', // primary key
            password: 'string',
            fullname: 'string',
            displayname: 'string',
            briefdesc: {type: 'string', optional:true},
            position: {type: 'string', optional: true},
            image: {type: 'string', optional: true},
            team: {type: 'string', optional:true}
            
        }
};

const ReviewSchema = {
  name: 'Review',
  properties: {
    review: 'int',
  }
};

const TeamSchema = {
  name: 'Team',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    teamname: 'string',
    image: {type: 'string', optional: true},
    rankpoint: {type: 'int', default: 0},
    teamdescription: {type: 'string', optional: true},
    review: {type: 'list', objectType: 'Review'},
  }
};

const MatchSchema = {
  name: 'Match',
  primaryKey: 'id',
  properties: { 
    id: 'int',
    hometeam: 'string',
    awayteam: 'string',
    state: {type: 'string', default: 'Coming'},
    time: {type: 'string', optional: true},
    hometeamscore: {type: 'int', optional: true},
    awayteamscore: {type: 'int', optional: true},
    
  }
};

let realm = new Realm({schema: [UserSchema,TeamSchema, ReviewSchema,MatchSchema], schemaVersion: 6});
// realm.write(() => {

//   realm.create('Match',{ 
//     id: 6,
//     hometeam: 'Phuc',
//     awayteam: 'Giang',
//     state: 'finished',
//     hometeamscore: 1,
//     awayteamscore: 69,
    
//   })
// });


module.exports = realm;




