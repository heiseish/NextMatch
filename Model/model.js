const Realm = require('realm');
const UserSchema = {
				name: 'User',
				primaryKey: 'id',
				properties: {
    				id:    'int',    // primary key
    				user: 'string',
    				password: 'string'
    				
				}
};

const UpdatedUserSchema = {
  // The schema name is the same, so previous `Person` object
  // in the Realm will be updated
  name: 'User',
        primaryKey: 'id',
        properties: {
            id:    'int',    // primary key
            user: 'string',
            password: 'string',
            fullname: 'string',
            displayname: 'string',
            position: 'string',
            picture: {type: 'data', optional: true},
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
    rankpoint: {type: 'int', default: 0},
    teamdescription: {type: 'string', optional: true},
    review: {type: 'list', objectType: 'Review'},
  }
};
// let realm = new Realm({schema: [ReviewSchema, TeamSchema, UserSchema]});







// this will throw because the schema has changed
// and `schemaVersion` is not specified
// let realm = new Realm({schema: [UpdatedPersonSchema]});

// this will succeed and update the Realm to the new schema
let realm = new Realm({schema: [UpdatedUserSchema,TeamSchema, ReviewSchema], schemaVersion: 2});



module.exports = realm;




