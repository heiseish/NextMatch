'use strict';

import Realm from 'realm';


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
            team: {type: 'string', optional:true},
            teamnumber: {type: 'int', optional: true},
            
        }
};

const ReviewSchema = {
  name: 'Review',
  properties: {
    team: 'string',
    point: 'double',
    comment: {type: 'string', optional: true},
    reviewer: 'string',
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
    // review: {type: 'list', objectType: 'Review'},
    winrate: {type: 'int', default: 0},
    matches: {type: 'int', default: 0}
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
    ytvideo: {type: 'string', optional: true},
    
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




let realm = new Realm({schema: [UserSchema,TeamSchema, ReviewSchema,MatchSchema,RequestSchema]});

// realm.write(() => {
  

  
 


  
  
  
// });


module.exports = realm;




