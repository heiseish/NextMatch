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

const RequestSchema = {
  name: 'Request',
  primaryKey: 'id',
  properties: { 
    id: 'int',
    hometeam: 'string',
    awayteam: {type: 'string', optional: true},
    time: {type: 'string', optional: true},
    venue: {type: 'string', optional: true},
    additionalCondition: {type: 'string', optional: true},
    
  }
};


let realm = new Realm({schema: [UserSchema,TeamSchema, ReviewSchema,MatchSchema,RequestSchema], schemaVersion: 7});
// realm.write(() => {

//   // realm.create('Match',{ 
//   //   id: 7,
//   //   hometeam: 'Chealsea FC',
//   //   awayteam: 'Arsenal FC',
//   //   state: 'coming',
//   //   time: '25th June',
    
//   // })
//   realm.create('Request',{ 
//     id: 2,
//     hometeam: 'Chelsea FC',
//     time: '13pm 26th June',
//     venue: 'Sân Hàng Đẫy',
//     aditionalCondition: 'Đi cọ sát là chủ ',
    
//   })
// });


module.exports = realm;




